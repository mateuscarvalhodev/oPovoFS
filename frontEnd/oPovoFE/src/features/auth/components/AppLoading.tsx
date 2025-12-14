import { Loader2 } from "lucide-react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

type SpinnerProps = {
  label?: string;
  className?: string;
};

export function Spinner({ label, className }: SpinnerProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <Loader2 className="h-4 w-4 animate-spin" />
      {label ? (
        <span className="text-sm text-muted-foreground">{label}</span>
      ) : null}
    </div>
  );
}

export function PageLoading({ label = "Carregando..." }: { label?: string }) {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center p-6">
      <Spinner label={label} />
    </div>
  );
}

export function LoadingOverlay({
  label = "Carregando...",
}: {
  label?: string;
}) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
      <Spinner label={label} />
    </div>
  );
}

export function GlobalTopLoader() {
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const active = fetching + mutating > 0;

  return active ? (
    <div className="sticky top-0 z-50">
      <div className="h-0.5 w-full animate-pulse bg-primary" />
    </div>
  ) : null;
}
