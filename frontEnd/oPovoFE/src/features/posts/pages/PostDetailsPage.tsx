import { useEffect, useMemo } from "react";
import { Link, Navigate, Outlet, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    if (!isValidId) {
      toast.error("ID do post inválido.");
    }
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
      <div className="mb-4">
        <Button asChild variant="outline">
          <Link to="/posts">← Voltar</Link>
        </Button>
      </div>

      {isInitialLoading ? (
        <PageLoading label="Carregando post..." />
      ) : !post ? (
        <p className="text-sm text-muted-foreground">Post não encontrado.</p>
      ) : (
        <div className="relative">
          {isRefetching ? <LoadingOverlay label="Atualizando..." /> : null}

          <Card>
            <CardHeader className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-2xl">{post.title}</CardTitle>

                {canEdit ? (
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

              <p className="text-sm text-muted-foreground">
                {post.authorName} • {formatDatePtBR(post.createdAt)}
              </p>
            </CardHeader>

            <CardContent>
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Outlet />
    </div>
  );
}
