import { Link } from "react-router";
import { Pencil } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { PostListItem } from "../types";
import { formatDatePtBR } from "@/shared/lib/date";
import { makeExcerpt } from "@/shared/lib/text";

import { DeletePostDialog } from "./DeletePostDialog";

type MyPostCardProps = {
  post: PostListItem;
  onDeleted?: () => void;
};

export function MyPostCard({ post, onDeleted }: MyPostCardProps) {
  return (
    <Card className="transition shadow hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg">
            <Link
              to={`/posts/${post.id}`}
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {post.title}
            </Link>
          </CardTitle>

          <div className="flex items-center gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon"
              aria-label="Editar post"
            >
              <Link to={`/posts/${post.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>

            <DeletePostDialog postId={post.id} onDeleted={onDeleted} />
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {formatDatePtBR(post.createdAt)}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {makeExcerpt(post.content)}
        </p>
      </CardContent>
    </Card>
  );
}
