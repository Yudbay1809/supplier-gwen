export function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function MediaGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function SummaryCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[24px] bg-white/90 p-5 shadow-sm">
      <div className="h-3 w-32 rounded bg-gray-200" />
      <div className="mt-3 h-8 w-20 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-28 rounded bg-gray-200" />
    </div>
  );
}

export function KontrabonCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[24px] border border-white/80 bg-white/90 p-5 shadow-sm">
      <div className="h-4 w-28 rounded bg-gray-200" />
      <div className="mt-3 h-6 w-44 rounded bg-gray-200" />
      <div className="mt-2 h-4 w-64 rounded bg-gray-200" />
      <div className="mt-4 h-20 rounded-2xl bg-gray-100" />
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="h-24 rounded-2xl bg-gray-100" />
        <div className="h-16 rounded-2xl bg-gray-100" />
      </div>
    </div>
  );
}

export function BrandCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-5 w-40 rounded bg-gray-200" />
        <div className="h-8 w-24 rounded bg-gray-200" />
      </div>
      <div className="h-16 rounded-2xl bg-gray-100" />
      <div className="mt-4 h-32 rounded-2xl bg-gray-100" />
    </div>
  );
}
