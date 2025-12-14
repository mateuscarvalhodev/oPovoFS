import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
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

import { getApiErrorMessage } from "@/shared/api/api-error";
import { usePostDetails, useUpdatePost } from "../hooks/posts-queries";

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

  const postId = useMemo(() => Number(id ?? NaN), [id]);
  const isValidId = Number.isFinite(postId) && postId > 0;

  const [open, setOpen] = useState(true);

  const closeSheet = useCallback(() => {
    setOpen(false);
    navigate(`/posts/${postId}`, { replace: true });
  }, [navigate, postId]);

  const postQuery = usePostDetails(postId);
  const updateMutation = useUpdatePost(postId);

  const form = useForm<EditPostValues>({
    resolver: zodResolver(editPostSchema),
    defaultValues: { title: "", content: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (!isValidId) toast.error("ID do post inválido.");
  }, [isValidId]);

  useEffect(() => {
    if (!postQuery.isError) return;
    toast.error(getApiErrorMessage(postQuery.error));
  }, [postQuery.isError, postQuery.error]);

  useEffect(() => {
    if (!postQuery.data) return;
    form.reset({
      title: postQuery.data.title,
      content: postQuery.data.content,
    });
  }, [postQuery.data, form]);

  async function onSubmit(values: EditPostValues) {
    form.clearErrors("root");

    try {
      await updateMutation.mutateAsync({
        title: values.title,
        content: values.content,
      });

      toast.success("Post atualizado com sucesso!");
      closeSheet();
    } catch (err) {
      const message = getApiErrorMessage(err);
      toast.error(message);
      form.setError("root", { type: "server", message });
    }
  }

  if (!isValidId) return <Navigate to="/posts" replace />;

  if (postQuery.isError) {
    return <Navigate to={`/posts/${postId}`} replace />;
  }

  const loadingPost = postQuery.isLoading;
  const isSubmitting = updateMutation.isPending;

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
