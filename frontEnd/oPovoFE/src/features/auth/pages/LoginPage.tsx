import { Link } from "react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "../components/LoginForm";
import type { LoginFormValues } from "../components/LoginForm";

export function LoginPage() {
  async function onSubmit(values: LoginFormValues) {
    console.log("login payload:", values);
  }

  return (
    <div className="mx-auto md:w-md">
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
