import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import type { PostListItem } from "../types";
import * as PostsService from "@/features/posts/services/posts-service";
import { getApiErrorMessage } from "@/shared/api/api-error";
import { getPaginationTokens } from "@/shared/lib/pagination";
import { onPostsChanged } from "./posts-events";

type UsePostsListParams = {
  query: string;
  perPage: number;
};

export function usePostsList({ query, perPage }: UsePostsListParams) {
  const [page, setPage] = useState(1);

  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [lastPage, setLastPage] = useState(1);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const reload = useCallback(() => setRefreshKey((k) => k + 1), []);

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    return onPostsChanged(() => {
      setPage(1);
      reload();
    });
  }, [reload]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        const res = await PostsService.listPosts({
          page,
          perPage,
          query,
        });

        if (!alive) return;

        setPosts(res.posts);
        setLastPage(res.meta.last_page ?? 1);
        setHasPrev(Boolean(res.links.prev));
        setHasNext(Boolean(res.links.next));
      } catch (err) {
        if (!alive) return;
        toast.error(getApiErrorMessage(err));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [page, perPage, query, refreshKey]);

  const pages = useMemo(
    () => getPaginationTokens(page, lastPage),
    [page, lastPage]
  );

  return {
    posts,
    loading,
    page,
    setPage,
    lastPage,
    hasPrev,
    hasNext,
    pages,
    reload,
  };
}
