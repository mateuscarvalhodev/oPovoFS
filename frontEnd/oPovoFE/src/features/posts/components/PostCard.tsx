import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostListItem } from "../types";
import { Link } from "react-router";

type PostCardProps = {
  post: PostListItem;
};
function formatDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
}

function makeExcerpt(text: string, max = 140) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return normalized.slice(0, max).trimEnd() + "...";
}

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
          {post.authorName} • {formatDate(post.createdAt)}
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
