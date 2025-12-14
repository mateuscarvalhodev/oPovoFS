import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as PostsService from "@/features/posts/services/posts-service";
import type { ListPostsResult } from "@/features/posts/services/posts-service";

type ListInput = { page: number; perPage: number; query?: string };

export function usePostsList(input: ListInput) {
  return useQuery<ListPostsResult>({
    queryKey: ["posts", input.page, input.perPage, input.query ?? ""] as const,
    queryFn: () => PostsService.listPosts(input),
    placeholderData: keepPreviousData,
  });
}

export function usePostDetails(id: number) {
  return useQuery({
    queryKey: ["post", id] as const,
    queryFn: () => PostsService.getPostById(id),
    enabled: Number.isFinite(id),
  });
}

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string; content: string }) =>
      PostsService.createPost(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost(postId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string; content: string }) =>
      PostsService.updatePost(postId, payload),
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["posts"] }),
        qc.invalidateQueries({ queryKey: ["post", postId] }),
      ]);
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => PostsService.deletePost(postId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
