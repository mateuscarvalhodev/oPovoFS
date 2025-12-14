import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import * as PostsService from "@/features/posts/services/posts-service";
import type { PostDetailsView } from "@/features/posts/services/posts-service";
import { getApiErrorMessage } from "@/shared/api/api-error";
import { formatDatePtBR } from "@/shared/lib/date";

// ✅ ajuste o import pra onde está seu getSession
import { getSession } from "@/features/auth/services/auth-service";

export function PostDetailsPage() {
  const { id } = useParams();
  const postId = Number(id);

  const [post, setPost] = useState<PostDetailsView | null>(null);
  const [loading, setLoading] = useState(true);

  // lê a sessão (sem estado global)
  const session = useMemo(() => getSession(), []);

  const canEdit =
    session?.user?.id && post?.authorId
      ? session!.user.id === post!.authorId
      : false;

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        if (!Number.isFinite(postId)) {
          throw new Error("ID do post inválido.");
        }

        const data = await PostsService.getPostById(postId);
        if (!alive) return;

        setPost(data);
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
  }, [postId]);

  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-4">
        <Button asChild variant="outline">
          <Link to="/posts">← Voltar</Link>
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando post...</p>
      ) : !post ? (
        <p className="text-sm text-muted-foreground">Post não encontrado.</p>
      ) : (
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-2xl">{post.title}</CardTitle>

              {canEdit ? (
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
      )}
    </div>
  );
}
