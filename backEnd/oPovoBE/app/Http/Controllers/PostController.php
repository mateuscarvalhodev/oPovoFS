<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostListResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function list(Request $request)
    {
        $posts = Post::with('autor:id,name')
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('titulo', 'LIKE', "%{$search}%");
                });
            })
            ->latest()
            ->paginate($request->input('per_page', 12));

        return PostListResource::collection($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
        ]);

        $post = Post::create([
            'titulo' => $validated['titulo'],
            'conteudo' => $validated['conteudo'],
            'autor_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Post criado com sucesso',
            'post' => $post->load('autor:id,name,email')
        ], 201);
    }

    public function show(Post $post)
    {
        return response()->json($post->load('autor:id,name,email'));
    }

    public function update(Request $request, Post $post)
    {
        if ($post->autor_id !== Auth::id()) {
            return response()->json([
                'message' => 'Você não tem permissão para editar este post'
            ], 403);
        }

        $validated = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'conteudo' => 'sometimes|required|string',
        ]);

        $post->update($validated);

        return response()->json([
            'message' => 'Post atualizado com sucesso',
            'post' => $post->load('autor:id,name,email')
        ]);
    }

    public function destroy(Post $post)
    {
        if ($post->autor_id !== Auth::id()) {
            return response()->json([
                'message' => 'Você não tem permissão para deletar este post'
            ], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deletado com sucesso'
        ]);
    }

    public function meusPosts(Request $request)
    {
        $posts = Post::where('autor_id', Auth::id())
            ->latest()
            ->paginate($request->input("per_page", 12));

        return response()->json($posts);
    }
}
