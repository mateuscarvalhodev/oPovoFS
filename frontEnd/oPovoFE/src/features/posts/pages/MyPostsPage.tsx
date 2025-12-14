import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useDebounce } from "@/shared/hooks/use-debounce";
import { getPaginationTokens } from "@/shared/lib/pagination";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useMyPostsList } from "@/features/posts/hooks/posts-queries";
import { MyPostCard } from "@/features/posts/components/MyPostCard";

export function MyPostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(() => {
    const raw = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(raw) && raw > 0 ? raw : 1;
  }, [searchParams]);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debouncedQuery = useDebounce(query, 350);

  const perPage = 12;

  const myPostsQuery = useMyPostsList({
    page,
    perPage,
    query: debouncedQuery,
  });

  const posts = myPostsQuery.data?.posts ?? [];
  const lastPage = myPostsQuery.data?.meta.last_page ?? 1;

  const hasPrev = page > 1;
  const hasNext = page < lastPage;

  const pages = useMemo(
    () => getPaginationTokens(page, lastPage),
    [page, lastPage]
  );

  function setPage(next: number) {
    const q = debouncedQuery.trim();
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", String(next));
      if (q) sp.set("q", q);
      else sp.delete("q");
      return sp;
    });
  }

  function onQueryChange(next: string) {
    setQuery(next);

    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", "1");
      if (next.trim()) sp.set("q", next.trim());
      else sp.delete("q");
      return sp;
    });
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <header className="mb-6 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Meus posts</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie seus posts: editar e excluir.
            </p>
          </div>

          <Button asChild>
            <Link to="/posts/new">Novo post</Link>
          </Button>
        </div>

        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar nos meus posts..."
          aria-label="Buscar meus posts"
        />
      </header>

      {myPostsQuery.isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Você ainda não tem posts.
        </p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <MyPostCard
              key={String(post.id)}
              post={post}
              onDeleted={() => {
                myPostsQuery.refetch();
              }}
            />
          ))}
        </div>
      )}

      {lastPage > 1 ? (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrev) setPage(page - 1);
                  }}
                  aria-disabled={!hasPrev}
                  className={!hasPrev ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {pages.map((p, idx) =>
                p === "…" ? (
                  <PaginationItem key={`e-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNext) setPage(page + 1);
                  }}
                  aria-disabled={!hasNext}
                  className={!hasNext ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
    </div>
  );
}
