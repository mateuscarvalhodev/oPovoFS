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

export async function getPosts(params: {
  page: number;
  per_page: number;
  search?: string;
}) {
  const { data } = await apiBase.get<PostsListResponse>("/posts", { params });
  return data;
}

export async function createPost(payload: CreatePostPayload) {
  const { data } = await apiBase.post<Post>("/posts", payload);
  return data;
}
