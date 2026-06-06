import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = "Ocorreu um erro inesperado.",
): string {
  if (!axios.isAxiosError(error)) {
    return fallbackMessage;
  }

  const { message } = error.response?.data ?? {};

  if (Array.isArray(message)) {
    return message.join(" ");
  }

  return message || fallbackMessage;
}