import { useEffect, useMemo } from "react";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Pencil, Calendar, User2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getApiErrorMessage } from "@/shared/api/api-error";
import { formatDatePtBR } from "@/shared/lib/date";

import { useAuthSession } from "@/features/auth/store/auth-session";
import { DeletePostDialog } from "@/features/posts/components/DeletePostDialog";
import { usePostDetails } from "@/features/posts/hooks/posts-queries";
import {
  LoadingOverlay,
  PageLoading,
} from "@/features/auth/components/AppLoading";

export function PostDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const postId = useMemo(() => Number(id ?? NaN), [id]);
  const isValidId = Number.isFinite(postId) && postId > 0;

  const session = useAuthSession();
  const postQuery = usePostDetails(postId);

  useEffect(() => {
    if (!isValidId) toast.error("ID do post inválido.");
  }, [isValidId]);

  useEffect(() => {
    if (!postQuery.isError) return;
    toast.error(getApiErrorMessage(postQuery.error));
  }, [postQuery.isError, postQuery.error]);

  if (!isValidId) {
    return <Navigate to="/posts" replace />;
  }

  const post = postQuery.data ?? null;

  const canEdit =
    Boolean(session?.token) &&
    Boolean(session?.user?.id) &&
    Boolean(post?.authorId) &&
    session!.user.id === post!.authorId;

  const isInitialLoading = postQuery.isLoading;
  const isRefetching = postQuery.isFetching && !postQuery.isLoading;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Button asChild variant="outline">
          <Link to="/posts" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        {post && canEdit ? (
          <div className="flex items-center gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label="Editar post"
            >
              <Link to="edit">
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>

            <DeletePostDialog
              postId={post.id}
              onDeleted={() => navigate("/posts", { replace: true })}
            />
          </div>
        ) : null}
      </div>

      {isInitialLoading ? (
        <PageLoading label="Carregando post..." />
      ) : !post ? (
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Post não encontrado.
        </div>
      ) : (
        <article className="relative">
          {isRefetching ? <LoadingOverlay label="Atualizando..." /> : null}

          <header className="mb-6 space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User2 className="h-4 w-4" />
                <span>{post.authorName}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.createdAt}>
                  {formatDatePtBR(post.createdAt)}
                </time>
              </div>
            </div>

            <div className="h-px w-full bg-border" />
          </header>

          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <div className="whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </div>
        </article>
      )}

      <Outlet />
    </div>
  );
}
