import { Navigate } from "react-router";
import { useAuthSession } from "@/features/auth/store/auth-session";

type RedirectIfAuthProps = {
  children: React.ReactNode;
  to?: string;
};

export function RedirectIfAuth({
  children,
  to = "/posts",
}: RedirectIfAuthProps) {
  const session = useAuthSession();
  const isAuthenticated = Boolean(session?.token);

  if (isAuthenticated) {
    return <Navigate to={to} replace />;
  }

  return <>{children}</>;
}
