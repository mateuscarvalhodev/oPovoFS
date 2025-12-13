import { Link } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "../components/RegisterForm";
import type { RegisterFormValues } from "../components/RegisterForm";
export function RegisterPage() {
  async function onSubmit(values: RegisterFormValues) {
    console.log("register payload:", values);
  }

  return (
    <div className="mx-auto w-full max-w-md p-6">
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
