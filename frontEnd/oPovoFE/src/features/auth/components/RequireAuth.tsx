import { Navigate, useLocation } from "react-router";
import { useAuthSession } from "@/features/auth/store/auth-session";

type RequireAuthProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

export function RequireAuth({
  children,
  redirectTo = "/login",
}: RequireAuthProps) {
  const session = useAuthSession();
  const location = useLocation();

  const isAuthenticated = Boolean(session?.token);

  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return <>{children}</>;
}
