import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostListItem } from "../types";
import { Link } from "react-router";
import { makeExcerpt } from "@/shared/lib/text";
import { formatDatePtBR } from "@/shared/lib/date";

type PostCardProps = {
  post: PostListItem;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="transition shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">
          <Link
            to={`/posts/${post.id}`}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {post.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {post.authorName} • {formatDatePtBR(post.createdAt)}
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
