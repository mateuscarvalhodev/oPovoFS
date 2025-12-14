import * as postsApi from "../api/posts-api";
import type { CreatePostPayload, PostListItem } from "../types";
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

export type ListMyPostsInput = {
  page: number;
  perPage: number;
  query?: string;
};

export type ListMyPostsResult = {
  posts: PostListItem[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    prev: string | null;
    next: string | null;
  };
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

export async function listMyPosts(
  input: ListMyPostsInput
): Promise<ListMyPostsResult> {
  const res = await postsApi.getMyPosts({
    page: input.page,
    per_page: input.perPage,
    search: input.query?.trim() ? input.query.trim() : undefined,
  });

  const posts: PostListItem[] = res.data.map((p) => ({
    id: p.id,
    title: p.titulo,
    content: p.conteudo,
    authorName: "Você",
    createdAt: p.created_at,
  }));

  return {
    posts,
    meta: {
      current_page: res.current_page,
      last_page: res.last_page,
      per_page: res.per_page,
      total: res.total,
    },
    links: {
      prev: res.prev_page_url,
      next: res.next_page_url,
    },
  };
}

export async function getPostById(id: number): Promise<PostDetailsView> {
  const post = await postsApi.getPostById(id);

  return {
    id: post.id,
    title: post.titulo,
    content: post.conteudo,
    authorId: post.autor?.id ?? post.autor_id ?? 0,
    authorName: post.autor?.name ?? "Autor desconhecido",
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

export async function deletePost(id: number) {
  return postsApi.deletePost(id);
}
