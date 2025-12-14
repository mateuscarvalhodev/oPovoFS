import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WelcomePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-5xl px-6 py-14">
        <section className="relative overflow-hidden rounded-2xl border bg-background p-8 shadow-sm">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(600px_circle_at_20%_20%,hsl(var(--primary))_0%,transparent_60%),radial-gradient(700px_circle_at_80%_30%,hsl(var(--ring))_0%,transparent_55%)]" />

          <div className="relative flex flex-col gap-5">
            <p className="text-sm font-medium text-muted-foreground">
              Blog colaborativo • O POVO
            </p>

            <h1 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Bem-vindo ao seu blog colaborativo.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Leia posts da comunidade e, ao se autenticar, crie e gerencie suas
              próprias publicações com navegação fluida, estados de loading/erro
              e uma base sólida para integração com a API.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="lg">
                <Link to="/posts">Ver posts</Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Leitura rápida</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Cards com resumo e navegação para o conteúdo completo.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organização</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Estrutura por features, componentes reutilizáveis e rotas claras.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Boas práticas</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Tratamento de erros e loading states, pronto para evoluir com
              React Query.
            </CardContent>
          </Card>
        </section>

        <footer className="mt-10 text-sm text-muted-foreground"></footer>
      </div>
    </div>
  );
}
