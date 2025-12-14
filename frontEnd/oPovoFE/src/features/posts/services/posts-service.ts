import * as postsApi from "../api/posts-api";
import type { PostListItem, CreatePostPayload } from "../types";
import type { PostsListResponse } from "../api/posts-api";
import { parsePtBrDateTimeToIso } from "@/shared/lib/date";

export type PostDetailsView = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type ListPostsInput = {
  page: number;
  perPage: number;
  query?: string;
};

export type ListPostsResult = {
  posts: PostListItem[];
  meta: PostsListResponse["meta"];
  links: PostsListResponse["links"];
};

export async function listPosts(
  input: ListPostsInput
): Promise<ListPostsResult> {
  const res = await postsApi.getPosts({
    page: input.page,
    per_page: input.perPage,
    search: input.query?.trim() ? input.query.trim() : undefined,
  });

  const posts: PostListItem[] = res.data.map((p) => ({
    id: p.id,
    title: p.titulo,
    content: "Clique para ver o post completo.",
    authorName: p.autor,
    createdAt: parsePtBrDateTimeToIso(p.data),
  }));

  return { posts, meta: res.meta, links: res.links };
}

export async function getPostById(id: number): Promise<PostDetailsView> {
  const post = await postsApi.getPostById(id);

  return {
    id: post.id,
    title: post.titulo,
    content: post.conteudo,
    authorId: post.autor.id,
    authorName: post.autor.name,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
  };
}

export async function createPost(input: { title: string; content: string }) {
  const payload: CreatePostPayload = {
    titulo: input.title,
    conteudo: input.content,
  };

  return postsApi.createPost(payload);
}

export async function updatePost(
  id: number,
  input: { title: string; content: string }
) {
  const payload: CreatePostPayload = {
    titulo: input.title,
    conteudo: input.content,
  };

  return postsApi.updatePost(id, payload);
}
