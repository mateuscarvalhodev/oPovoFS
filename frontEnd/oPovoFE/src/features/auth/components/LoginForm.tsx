import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getApiErrorMessage } from "@/shared/api/api-error";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";
import { PasswordInput } from "@/components/PasswordInput";

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  submitLabel?: string;
};

export function LoginForm({
  onSubmit,
  submitLabel = "Entrar",
}: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const isSubmitting = form.formState.isSubmitting;

  async function handleSubmit(values: LoginFormValues) {
    form.clearErrors("root");

    try {
      await onSubmit(values);
    } catch (err) {
      form.setError("root", {
        type: "server",
        message: getApiErrorMessage(err),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {form.formState.errors.root?.message ? (
          <p className="text-sm text-destructive" aria-live="polite">
            {form.formState.errors.root.message}
          </p>
        ) : null}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="seuemail@email.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="********"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
