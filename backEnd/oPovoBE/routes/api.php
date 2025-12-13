<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'api.auth'])->group(function () {
    
    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/posts', [PostController::class, 'list']);

Route::get('/posts/{post}', [PostController::class, 'show']);

Route::middleware(['auth:sanctum', 'api.auth'])->group(function () {
    Route::prefix('posts')->name('post.')->group(function () {

        Route::post('/', [PostController::class, 'store']);
        Route::put('/{post}', [PostController::class, 'update']);
        Route::delete('/{post}', [PostController::class, 'destroy']);
        
    });

    Route::get('/meus-posts', [PostController::class, 'meusPosts']);

});