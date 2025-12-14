import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import * as AuthService from "@/features/auth/services/auth-service";
import { getApiErrorMessage } from "@/shared/api/api-error";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "../components/RegisterForm";
import type { RegisterFormValues } from "../schemas/register-schema";

export function RegisterPage() {
  const navigate = useNavigate();

  async function onSubmit(values: RegisterFormValues) {
    try {
      await AuthService.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      await AuthService.login({
        email: values.email,
        password: values.password,
      });

      toast.success("Conta criada e login realizado.");
      navigate("/posts", { replace: true });
    } catch (err) {
      toast.error(getApiErrorMessage(err));
      throw err;
    }
  }

  return (
    <div className="min-h-screen w-full px-4 py-10 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-left">
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <p className="text-sm text-muted-foreground">
            Cadastre-se para publicar e gerenciar seus posts.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <RegisterForm onSubmit={onSubmit} />

          <div className="flex items-center justify-between text-sm">
            <Link to="/posts" className="text-muted-foreground hover:underline">
              Ver posts
            </Link>

            <Link to="/login" className="hover:underline">
              Já tenho conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
