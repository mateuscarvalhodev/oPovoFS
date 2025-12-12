import { Navigate, Route, Routes } from "react-router";
import { PostsListPage } from "../../features/posts/pages/postsListPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";

export function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PostsListPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
