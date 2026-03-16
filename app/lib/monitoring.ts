export function logError(error: unknown, context: string) {
  if (typeof window !== "undefined") {
    console.error(`[${context}]`, error);
  }
}

export function logEvent(event: string, payload?: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    console.info(`[event] ${event}`, payload ?? {});
  }
}
