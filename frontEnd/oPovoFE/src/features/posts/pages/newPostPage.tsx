import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { getApiErrorMessage } from "@/shared/api/api-error";
import * as PostsService from "@/features/posts/services/posts-service";

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(120, "O título é muito longo."),
  content: z
    .string()
    .min(10, "O conteúdo deve ter no mínimo 10 caracteres.")
    .max(10_000, "Conteúdo muito longo."),
});

type CreatePostValues = z.infer<typeof createPostSchema>;

export function NewPostSheet() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "" },
    mode: "onSubmit",
  });

  const isSubmitting = form.formState.isSubmitting;

  function closeSheet() {
    setOpen(false);
    navigate("/posts", { replace: true });
  }

  async function onSubmit(values: CreatePostValues) {
    form.clearErrors("root");

    try {
      await PostsService.createPost(values);

      toast.success("Post criado com sucesso!");
      closeSheet();
    } catch (err) {
      const message = getApiErrorMessage(err);

      toast.error(message);
      form.setError("root", { type: "server", message });
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeSheet();
        else setOpen(nextOpen);
      }}
    >
      <SheetContent side="right" className="w-full p-4 sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Novo post</SheetTitle>
          <SheetDescription>
            Crie um novo post para publicar no blog.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {form.formState.errors.root?.message ? (
                <p className="text-sm text-destructive" aria-live="polite">
                  {form.formState.errors.root.message}
                </p>
              ) : null}

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: Como organizei meu estudo..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escreva seu post aqui..."
                        className="min-h-52 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter className="mt-2 flex gap-2 sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeSheet}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Publicar"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
