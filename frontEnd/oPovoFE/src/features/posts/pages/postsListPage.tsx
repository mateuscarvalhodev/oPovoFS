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
import {
  LoadingOverlay,
  PageLoading,
} from "@/features/auth/components/AppLoading";

export function PostsListPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 350);

  const [page, setPage] = useState(1);
  const perPage = 12;

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

  const isInitialLoading = postsQuery.isLoading;
  const isRefetching = postsQuery.isFetching && !postsQuery.isLoading;

  if (isInitialLoading) {
    return (
      <div className="mx-auto w-full max-w-6xl p-6">
        <PageLoading label="Carregando posts..." />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
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
          placeholder="Buscar por título..."
          aria-label="Buscar posts"
        />
      </header>

      <div className="relative">
        {isRefetching ? <LoadingOverlay label="Atualizando..." /> : null}

        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum post encontrado.
          </p>
        ) : (
          <PostsList posts={posts} />
        )}
      </div>

      {lastPage > 1 ? (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrev && !isRefetching)
                      setPage((p) => Math.max(1, p - 1));
                  }}
                  aria-disabled={!hasPrev || isRefetching}
                  className={
                    !hasPrev || isRefetching
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
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
                        if (!isRefetching) setPage(p);
                      }}
                      className={
                        isRefetching ? "pointer-events-none opacity-50" : ""
                      }
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
                    if (hasNext && !isRefetching)
                      setPage((p) => Math.min(lastPage, p + 1));
                  }}
                  aria-disabled={!hasNext || isRefetching}
                  className={
                    !hasNext || isRefetching
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
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
