import { Routes, Route, Navigate } from "react-router";

import { AppLayout } from "@/app/layouts/AppLayout";
import { WelcomePage } from "@/features/home/pages/WelcomePage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";

import { PostsListPage } from "@/features/posts/pages/postsListPage";
import { NewPostSheet } from "@/features/posts/pages/newPostPage";

import { PostDetailsPage } from "@/features/posts/pages/PostDetailsPage";
import { EditPostSheet } from "@/features/posts/components/EditPostSheet";

import { MyPostsPage } from "@/features/posts/pages/MyPostsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AppLayout />}>
        <Route path="/posts" element={<PostsListPage />}>
          <Route path="new" element={<NewPostSheet />} />
        </Route>

        <Route path="/posts/:id" element={<PostDetailsPage />}>
          <Route path="edit" element={<EditPostSheet />} />
        </Route>

        <Route path="/meus-posts" element={<MyPostsPage />} />

        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Route>
    </Routes>
  );
}
