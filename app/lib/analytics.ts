export type AnalyticsEvent = {
  name: string;
  at: string;
  payload?: Record<string, unknown>;
};

const KEY = "gwen_analytics_queue";

export function trackEvent(name: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(KEY);
  const queue: AnalyticsEvent[] = stored ? JSON.parse(stored) : [];
  queue.unshift({ name, at: new Date().toISOString(), payload });
  localStorage.setItem(KEY, JSON.stringify(queue.slice(0, 100)));
}

export function getQueuedEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearEvents() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
