export type PostListItem = {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
};

export type Post = {
  id: number;
  titulo: string;
  conteudo: string;
  autor_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type CreatePostPayload = {
  titulo: string;
  conteudo: string;
};
