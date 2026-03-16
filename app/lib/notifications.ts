import { logEvent } from "./monitoring";

type NotificationPayload = {
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  href?: string;
};

export function pushNotification(payload: NotificationPayload) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("gwen_notifications");
  const data = stored ? JSON.parse(stored) : [];
  const next = [
    {
      id: crypto.randomUUID(),
      title: payload.title,
      detail: payload.message,
      time: "Baru saja",
      tone: payload.type === "success" ? "brand" : payload.type === "warning" ? "gold" : "teal",
      status: "unread",
      href: payload.href ?? "/notifications",
    },
    ...data,
  ];
  localStorage.setItem("gwen_notifications", JSON.stringify(next));
  window.dispatchEvent(new Event("gwen-notifications-updated"));
  logEvent("notification", payload);
}
