import { AppHeader } from "@/components/AppHeader";
import { Outlet } from "react-router";

export function AppLayout() {
  return (
    <div className="min-h-dvh">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
