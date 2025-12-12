import { Navigate, Route, Routes } from "react-router";
import { PostsListPage } from "@/features/posts/pages/postsListPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PostsListPage />} />

      <Route path="/posts" element={<PostsListPage />} />
      <Route path="posts/:id" element={<div>Detalhes do post:</div>} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
