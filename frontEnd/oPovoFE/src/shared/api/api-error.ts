import type { AxiosError } from "axios";

type ApiErrorPayload = {
  message?: string;
  errors?: Record<string, string[]>;
};

export function getApiErrorMessage(error: unknown): string {
  const err = error as AxiosError<ApiErrorPayload>;
  const msg = err?.response?.data?.message;
  if (msg) return msg;

  const errors = err?.response?.data?.errors;
  if (errors) {
    const firstKey = Object.keys(errors)[0];
    const firstMsg = firstKey ? errors[firstKey]?.[0] : undefined;
    if (firstMsg) return firstMsg;
  }

  return "Não foi possível concluir. Tente novamente.";
}
