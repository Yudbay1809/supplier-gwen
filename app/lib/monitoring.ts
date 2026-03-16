export function logError(error: unknown, context: string) {
  if (typeof window !== "undefined") {
    console.error(`[${context}]`, error);
  }
}
