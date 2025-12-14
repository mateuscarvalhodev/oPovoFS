import { Routes, Route, Navigate } from "react-router";

import { WelcomePage } from "@/features/home/pages/WelcomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

import { NewPostSheet } from "@/features/posts/pages/newPostPage";
import { PostsListPage } from "@/features/posts/pages/postsListPage";
import { PostsLayout } from "@/features/posts/pages/PostsLayout";
import { EditPostSheet } from "@/features/posts/components/EditPostSheet";
import { PostDetailsLayout } from "@/features/posts/pages/PostDetailsLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/posts" element={<PostsLayout />}>
        <Route index element={<PostsListPage />} />
        <Route path="new" element={<NewPostSheet />} />
        <Route path=":id" element={<PostDetailsLayout />}>
          <Route path="edit" element={<EditPostSheet />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
