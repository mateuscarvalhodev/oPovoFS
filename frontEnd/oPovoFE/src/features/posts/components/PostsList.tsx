import type { PostListItem } from "../types";
import { PostCard } from "./PostCard";

type PostListProps = {
  posts: PostListItem[];
};
export function PostsList({ posts }: PostListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={String(post.id)} post={post} />
      ))}
    </div>
  );
}
