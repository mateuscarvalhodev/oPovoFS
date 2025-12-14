import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PostsList } from "../components/PostsList";

import { useDebounce } from "@/shared/hooks/use-debounce";
import { getApiErrorMessage } from "@/shared/api/api-error";
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
import { usePostsList } from "../hooks/posts-queries";

export function PostsListPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const [page, setPage] = useState(1);
  const perPage = 10;

  const postsQuery = usePostsList({
    page,
    perPage,
    query: debouncedQuery,
  });

  const posts = postsQuery.data?.posts ?? [];
  const lastPage = postsQuery.data?.meta.last_page ?? 1;
  const hasPrev = Boolean(postsQuery.data?.links.prev);
  const hasNext = Boolean(postsQuery.data?.links.next);

  const pages = useMemo(
    () => getPaginationTokens(page, lastPage),
    [page, lastPage]
  );

  if (postsQuery.isError) {
    toast.error(getApiErrorMessage(postsQuery.error));
  }

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
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar por título, autor ou conteúdo..."
          aria-label="Buscar posts"
        />
      </header>

      {postsQuery.isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum post encontrado.</p>
      ) : (
        <PostsList posts={posts} />
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
                    if (hasPrev) setPage((p) => Math.max(1, p - 1));
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
                    if (hasNext) setPage((p) => Math.min(lastPage, p + 1));
                  }}
                  aria-disabled={!hasNext}
                  className={!hasNext ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
