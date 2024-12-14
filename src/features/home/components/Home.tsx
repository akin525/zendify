import { WidthWrapper } from "@/components/Layout";
import { DashboardChartSum } from "./DashboardChartSum";
import { DashboardStats } from "./DashboardStats";
import { DashboardChartCount } from "./DashboardChartCount";

export function Home() {
  return (
    <>
      <WidthWrapper>
        <h1 className="pb-5 text-xl font-semibold text-primary">Dashboard</h1>

        <DashboardStats />
        <div className="xxl:grid-cols-2 grid gap-4">
          <DashboardChartSum />

          <DashboardChartCount />
        </div>
      </WidthWrapper>
    </>
  );
}
