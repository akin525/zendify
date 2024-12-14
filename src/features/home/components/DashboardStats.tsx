import { useDashboard } from "../api/getDashboard";
import { StatCard } from "./StatCard";

export const DashboardStats = () => {
  const { data, isPending } = useDashboard();
  return (
    <div className="grid gap-4 pb-5 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="All Business"
        isPending={isPending}
        value={data?.data?.all_biz}
      />
      <StatCard
        label="Active Business"
        isPending={isPending}
        value={data?.data?.active_biz}
      />
      <StatCard
        label="Pending Business"
        isPending={isPending}
        value={data?.data?.pending_biz}
      />
      <StatCard
        label="Blocked Business"
        isPending={isPending}
        value={data?.data?.blocked_biz}
      />
    </div>
  );
};
