import { PostsList } from "../components/PostsList";
import type { PostListItem } from "../types";

const mockPosts: PostListItem[] = [
  {
    id: 1,
    title: "Primeiro post",
    content:
      "Esse é um exemplo de conteúdo para ver o resumo no card. Lorem Impsu at qqqqq /posts.",
    authorName: "Mateus",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Segundo post",
    content:
      "Mais um post de exemplo. A lista blablabla lorem impsu blabla at.",
    authorName: "Isadora",
    createdAt: new Date().toISOString(),
  },
];

export function PostsListPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="text-sm text-muted-foreground">
            Veja as publicações mais recentes.
          </p>
        </header>
        <PostsList posts={mockPosts} />
      </div>
    </>
  );
}
