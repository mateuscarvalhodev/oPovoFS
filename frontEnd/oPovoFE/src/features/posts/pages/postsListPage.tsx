import { Button } from "@/components/ui/button";
import { PostsList } from "../components/PostsList";
import type { PostListItem } from "../types";
import { Link, Outlet } from "react-router";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";

const mockPosts: PostListItem[] = [
  {
    id: 1,
    title: "Primeiro post",
    content:
      "Esse é um exemplo de conteúdo para ver o resumo no card. Lorem Impsu at qqqqq /posts.",
    authorName: "Mateus",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Segundo post",
    content:
      "Mais um post de exemplo. A lista blablabla lorem impsu blabla at.",
    authorName: "Isadora",
    createdAt: new Date().toISOString(),
  },
];

export function PostsListPage() {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockPosts;

    return mockPosts.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q)
      );
    });
  }, [query]);
  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <header className="mb-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Posts</h2>
            <p className="text-sm text-muted-foreground">
              Veja as publicações mais recentes.
            </p>
          </div>

          <Button asChild>
            <Link to="/posts/new">Novo post</Link>
          </Button>
        </div>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título, autor ou conteúdo..."
          aria-label="Buscar posts"
        />
      </header>

      <PostsList posts={filteredPosts} />
      <Outlet />
    </div>
  );
}
