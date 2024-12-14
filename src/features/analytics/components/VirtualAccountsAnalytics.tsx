import { StatCard } from "@/features/home/components/StatCard";
import { useVirtualAccountStat } from "../api/virtual-acoount-stat";

export const VirtualAccountAnalytics = () => {
  const { data, isPending } = useVirtualAccountStat();
  return (
    <>
      <h1 className="pb-5 text-xl font-semibold text-primary">
        Virtual Account Stats
      </h1>
      <div className="grid gap-4 pb-5 md:grid-cols-2">
        <StatCard label="VFD" isPending={isPending} value={data?.vfd} />
        <StatCard label="GTB" isPending={isPending} value={data?.gtb} />
        <StatCard
          label="PROVIDUS"
          isPending={isPending}
          value={data?.providus}
        />
        <StatCard
          label="SAFEHAVEN"
          isPending={isPending}
          value={data?.safehaven}
        />
        <StatCard
          label="Netbank"
          isPending={isPending}
          value={data?.netbank}
        />
      </div>
    </>
  );
};
