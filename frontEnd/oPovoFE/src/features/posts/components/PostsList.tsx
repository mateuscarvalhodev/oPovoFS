import type { PostListItem } from "../types";
import { PostCard } from "./PostCard";

type PostListProps = {
  posts: PostListItem[];
};
export function PostsList({ posts }: PostListProps) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={String(post.id)} post={post} />
      ))}
    </div>
  );
}
