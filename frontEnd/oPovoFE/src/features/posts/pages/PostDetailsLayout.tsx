import { Outlet } from "react-router";
import { PostDetailsPage } from "./PostDetailsPage";

export function PostDetailsLayout() {
  return (
    <>
      <PostDetailsPage />
      <Outlet />
    </>
  );
}
