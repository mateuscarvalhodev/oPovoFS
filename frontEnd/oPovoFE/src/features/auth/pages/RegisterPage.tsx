import { Link, useNavigate } from "react-router";
import * as AuthService from "@/features/auth/services/auth-service";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "../components/RegisterForm";
import type { RegisterFormValues } from "../schemas/register-schema";

export function RegisterPage() {
  const navigate = useNavigate();

  async function onSubmit(values: RegisterFormValues) {
    await AuthService.register({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    await AuthService.login({
      email: values.email,
      password: values.password,
    });

    navigate("/posts");
  }

  return (
    <div className="mx-auto w-full max-w-md p-6 md:w-md">
      <Card>
        <CardHeader className="space-y-2">
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
