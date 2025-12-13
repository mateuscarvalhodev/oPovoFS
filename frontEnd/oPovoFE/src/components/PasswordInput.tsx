import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  inputClassName?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, inputClassName, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const buttonId = useId();

    return (
      <div className={cn("relative", className)}>
        <Input
          ref={ref}
          type={visible ? "text" : "password"}
          className={cn("pr-10", inputClassName)}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-controls={buttonId}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
