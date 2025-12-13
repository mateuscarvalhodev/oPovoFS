import { Navigate, Route, Routes } from "react-router";
import { PostsListPage } from "@/features/posts/pages/postsListPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { NewPostPage } from "@/features/posts/pages/newPostPage";
import { WelcomePage } from "@/features/home/pages/WelcomePage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/posts" element={<PostsListPage />}>
        <Route path="new" element={<NewPostPage />} />
        <Route path=":id" element={<div>Post Details (to-do)</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
