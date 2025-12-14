import * as postsApi from "../api/posts-api";
import type { PostListItem } from "../types";

function brDateTimeToIso(value: string): string {
  const [datePart, timePart] = value.split(" ");
  const [dd, mm, yyyy] = datePart.split("/").map(Number);
  const [hh, min] = (timePart ?? "00:00").split(":").map(Number);

  const d = new Date(yyyy, (mm ?? 1) - 1, dd ?? 1, hh ?? 0, min ?? 0);
  return d.toISOString();
}

export async function listPosts(input: {
  page: number;
  perPage: number;
  query?: string;
}) {
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
    createdAt: brDateTimeToIso(p.data),
  }));

  return { posts, meta: res.meta, links: res.links };
}

export async function createPost(input: { title: string; content: string }) {
  return postsApi.createPost({
    titulo: input.title,
    conteudo: input.content,
  });
}
