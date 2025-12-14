import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
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

import * as PostsService from "@/features/posts/services/posts-service";
import { getApiErrorMessage } from "@/shared/api/api-error";

import { notifyPostsChanged } from "../hooks/posts-events";

const editPostSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(120, "O título é muito longo."),
  content: z
    .string()
    .min(10, "O conteúdo deve ter no mínimo 10 caracteres.")
    .max(10_000, "O conteúdo é muito longo."),
});

type EditPostValues = z.infer<typeof editPostSchema>;

export function EditPostSheet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);

  const [open, setOpen] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);

  const form = useForm<EditPostValues>({
    resolver: zodResolver(editPostSchema),
    defaultValues: { title: "", content: "" },
    mode: "onSubmit",
  });

  const closeSheet = useCallback(() => {
    setOpen(false);
    navigate(`/posts/${postId}`, { replace: true });
  }, [navigate, postId]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoadingPost(true);

        if (!Number.isFinite(postId)) {
          throw new Error("ID do post inválido.");
        }

        const post = await PostsService.getPostById(postId);
        if (!alive) return;

        form.reset({ title: post.title, content: post.content });
      } catch (err) {
        if (!alive) return;
        toast.error(getApiErrorMessage(err));
        closeSheet();
      } finally {
        if (alive) setLoadingPost(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, [postId, form, closeSheet]);

  async function onSubmit(values: EditPostValues) {
    form.clearErrors("root");

    try {
      await PostsService.updatePost(postId, values);
      toast.success("Post atualizado com sucesso!");
      notifyPostsChanged();
      closeSheet();
    } catch (err) {
      const message = getApiErrorMessage(err);
      toast.error(message);
      form.setError("root", { type: "server", message });
    }
  }

  const isSubmitting = form.formState.isSubmitting;

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
          <SheetTitle>Editar post</SheetTitle>
          <SheetDescription>
            Altere o título e/ou o conteúdo do post.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {loadingPost ? (
            <p className="text-sm text-muted-foreground">
              Carregando conteúdo...
            </p>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
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
                        <Input placeholder="Título do post" {...field} />
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
                        <Textarea className="min-h-52 resize-y" {...field} />
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
                    {isSubmitting ? "Salvando..." : "Salvar"}
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
