import * as postsApi from "../api/posts-api";
import type { Post } from "../types";

export async function createPost(input: {
  title: string;
  content: string;
}): Promise<Post> {
  return postsApi.createPost({
    titulo: input.title,
    conteudo: input.content,
  });
}
