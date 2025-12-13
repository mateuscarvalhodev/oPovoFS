import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(120),
  content: z
    .string()
    .min(10, "O conteúdo deve ter no mínimo 10 caracteres.")
    .max(10_000, "Conteúdo muito longo."),
});

type CreatePostValues = z.infer<typeof createPostSchema>;

export function NewPostPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "" },
    mode: "onSubmit",
  });

  useEffect(() => setOpen(true), []);

  function closeSheet() {
    setOpen(false);
    navigate("/posts", { replace: true });
  }

  async function onSubmit(values: CreatePostValues) {
    try {
      setIsSubmitting(true);

      console.log("create post payload:", values);

      closeSheet();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={(v) => (!v ? closeSheet() : setOpen(v))}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-4">
        <SheetHeader>
          <SheetTitle>Novo post</SheetTitle>
          <SheetDescription>
            Crie um novo post para publicar no blog.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        className="min-h-50"
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
