import { AppHeader } from "@/components/AppHeader";
import { GlobalTopLoader } from "@/features/auth/components/AppLoading";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="min-h-dvh">
      <GlobalTopLoader />
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
