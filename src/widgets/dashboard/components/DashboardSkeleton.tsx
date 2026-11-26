import {
  Skeleton,
} from "@/shared/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      {/* Stats */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-36 rounded-xl"
          />
        ))}

      </section>

      {/* Chart + Calendar */}
      <section className="grid gap-6 lg:grid-cols-3">

        <Skeleton className="h-[380px] lg:col-span-2 rounded-xl" />

        <Skeleton className="h-[380px] rounded-xl" />

      </section>

      {/* Quick Action */}
      <Skeleton className="h-40 rounded-xl" />

      {/* Recent */}
      <section className="grid gap-6 xl:grid-cols-2">

        <Skeleton className="h-[360px] rounded-xl" />

        <Skeleton className="h-[360px] rounded-xl" />

      </section>

      {/* Top */}
      <section className="grid gap-6 xl:grid-cols-2">

        <Skeleton className="h-[360px] rounded-xl" />

        <Skeleton className="h-[360px] rounded-xl" />

      </section>

      {/* Bottom */}
      <section className="grid gap-6 xl:grid-cols-2">

        <Skeleton className="h-[360px] rounded-xl" />

        <Skeleton className="h-[360px] rounded-xl" />

      </section>

    </div>
  );
}