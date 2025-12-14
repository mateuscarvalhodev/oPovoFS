import { apiBase } from "@/shared/api/apiBase";
import type { CreatePostPayload, Post } from "../types";

export type PostsListApiItem = {
  id: number;
  titulo: string;
  autor: string;
  data: string;
};

export type PostsListResponse = {
  data: PostsListApiItem[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type PostAuthorApi = {
  id: number;
  name: string;
  email: string;
};

export type PostDetailsApi = {
  id: number;
  titulo: string;
  conteudo: string;
  autor_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  autor: PostAuthorApi;
};

export async function getPosts(params: {
  page: number;
  per_page: number;
  search?: string;
}) {
  const { data } = await apiBase.get<PostsListResponse>("/posts", { params });
  return data;
}

export async function getPostById(id: number) {
  const { data } = await apiBase.get<PostDetailsApi | { data: PostDetailsApi }>(
    `/posts/${id}`
  );
  return "data" in data ? data.data : data;
}

export async function createPost(payload: CreatePostPayload) {
  const { data } = await apiBase.post<Post>("/posts", payload);
  return data;
}
