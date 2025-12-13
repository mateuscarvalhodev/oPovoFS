import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome.").max(80),
    email: z.string().email("Informe um e-mail válido."),
    password: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .max(100),
    confirmPassword: z.string().min(6, "Confirme sua senha.").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });
