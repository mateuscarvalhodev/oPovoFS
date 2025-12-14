import { apiBase } from "@/shared/api/apiBase";
import type { CreatePostPayload, Post } from "../types";

export async function createPost(payload: CreatePostPayload) {
  const { data } = await apiBase.post<Post>("/posts", payload);
  return data;
}
