import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { CircleUser, LogOut, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuthSession } from "@/features/auth/store/auth-session";
import * as AuthService from "@/features/auth/services/auth-service";
import { getApiErrorMessage } from "@/shared/api/api-error";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export function AppHeader() {
  const navigate = useNavigate();
  const session = useAuthSession();
  const isAuthenticated = Boolean(session?.token);

  async function handleLogout() {
    try {
      await AuthService.logout();
      toast.success("Você saiu da sua conta.");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link
          to="/posts"
          className="text-sm font-semibold tracking-wide hover:opacity-90"
        >
          O POVO
        </Link>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Menu do usuário"
                >
                  <Avatar className="h-9 w-9 border-4 border-blue-700">
                    <AvatarFallback>
                      {session?.user?.name ? (
                        initials(session.user.name)
                      ) : (
                        <CircleUser className="h-5 w-5" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="space-y-1">
                  <div className="text-sm font-medium leading-none">
                    {session?.user.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {session?.user.email}
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/meus-posts" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Meus posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/posts" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Todos os posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
