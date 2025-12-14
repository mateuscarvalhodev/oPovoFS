import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { getApiErrorMessage } from "@/shared/api/api-error";
import { useDeletePost } from "../hooks/posts-queries";

type DeletePostDialogProps = {
  postId: number;
  onDeleted?: () => void;
  disabled?: boolean;
};

export function DeletePostDialog({
  postId,
  onDeleted,
  disabled,
}: DeletePostDialogProps) {
  const deletePost = useDeletePost();

  const isDeleting = deletePost.isPending;

  async function handleConfirm() {
    try {
      await deletePost.mutateAsync(postId);

      toast.success("Post excluído com sucesso!");
      onDeleted?.();
    } catch (err) {
      toast.error(getApiErrorMessage(err));
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Excluir post"
          disabled={disabled || isDeleting}
          className="text-destructive hover:text-destructive"
        >
          <span className="sr-only">Excluir</span>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir post?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é permanente e não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
