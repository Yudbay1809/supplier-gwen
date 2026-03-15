"use client";

type DashboardNotificationItemProps = {
  title: string;
  detail: string;
  time: string;
  tone: string;
};

export default function DashboardNotificationItem({ title, detail, time, tone }: DashboardNotificationItemProps) {
  const toneClassMap: Record<string, string> = {
    brand: "bg-brand",
    gold: "bg-gold-soft",
    teal: "bg-teal",
    success: "bg-emerald-500",
    muted: "bg-gray-300",
  };

  const toneClass = toneClassMap[tone] ?? "bg-brand";

  return (
    <div className="rounded-2xl bg-[#F3FFFC] p-3">
      <div className="mb-1 flex items-center justify-between gap-3">
        <p className="font-poppins text-ink">{title}</p>
        <span className="text-xs text-muted-foreground font-inter">
          {time}
        </span>
      </div>
      <p className="text-sm text-muted-foreground font-inter">
        {detail}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
        <div className={`h-full w-1/2 rounded-full ${toneClass}`} />
      </div>
    </div>
  );
}
