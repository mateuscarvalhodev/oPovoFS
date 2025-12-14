import { useMemo, useState } from "react";
import { getPaginationTokens } from "@/shared/lib/pagination";
import { usePostsList } from "./posts-queries";

type UsePostsListParams = {
  query: string;
  perPage: number;
};

export function usePostsListHook({ query, perPage }: UsePostsListParams) {
  const [pageByQuery, setPageByQuery] = useState<Record<string, number>>({});

  const key = query ?? "";
  const page = pageByQuery[key] ?? 1;

  const setPage = (next: number | ((p: number) => number)) => {
    setPageByQuery((prev) => {
      const current = prev[key] ?? 1;
      const value = typeof next === "function" ? next(current) : next;
      return { ...prev, [key]: value };
    });
  };

  const postsQuery = usePostsList({ page, perPage, query });

  const posts = postsQuery.data?.posts ?? [];
  const lastPage = postsQuery.data?.meta.last_page ?? 1;
  const hasPrev = Boolean(postsQuery.data?.links.prev);
  const hasNext = Boolean(postsQuery.data?.links.next);

  const pages = useMemo(
    () => getPaginationTokens(page, lastPage),
    [page, lastPage]
  );

  return {
    posts,
    loading: postsQuery.isLoading,
    page,
    setPage,
    lastPage,
    hasPrev,
    hasNext,
    pages,
    reload: () => postsQuery.refetch(),
    isError: postsQuery.isError,
    error: postsQuery.error,
  };
}
