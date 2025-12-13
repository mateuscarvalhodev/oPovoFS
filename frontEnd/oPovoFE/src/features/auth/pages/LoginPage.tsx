import { Link, useNavigate } from "react-router";
import * as AuthService from "@/features/auth/services/auth-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "../components/LoginForm";
import type { LoginFormValues } from "../schemas/login-schema";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/shared/api/api-error";

export function LoginPage() {
  const navigate = useNavigate();

  async function onSubmit(values: LoginFormValues) {
    try {
      await AuthService.login(values);

      toast.success("Login realizado com sucesso.");
      navigate("/posts");
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      throw err;
    }
  }

  return (
    <div className="mx-auto w-full max-w-md p-6 md:w-md">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">O Povo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Acesse sua conta para gerenciar seus posts.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <LoginForm onSubmit={onSubmit} />

          <div className="flex items-center justify-between text-sm">
            <Link to="/posts" className="text-muted-foreground hover:underline">
              Ver posts
            </Link>

            <Link to="/register" className="hover:underline">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
