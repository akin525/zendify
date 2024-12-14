import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDashboardChartCount } from "../api/getDashboard";
import { Chart } from "./Chart";
import { ChartData } from "../types";

export const DashboardChartCount = () => {
  const [time, setTime] = useState("Daily");
  const { data: chartSumData, isPending, error } = useDashboardChartCount();
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    handleKeyChange(time);
  }, [chartSumData, time]);

  const handleChartSumChange = (value: string) => {
    setTime(value);
  };

  const handleKeyChange = (key: string) => {
    switch (key) {
      case "Daily":
        setData(chartSumData?.week);
        break;
      case "Weekly":
        setData(chartSumData?.month);
        break;
      case "Monthly":
        setData(chartSumData?.year);
        break;
      default:
        setData(chartSumData?.week);
    }
  };

  return (
    <div className="flex h-[400px] w-full flex-col gap-10 rounded-xl bg-white p-4 dark:border dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex items-center justify-between pb-5">
        <h3 className="text-sm font-semibold">Dashboard Chart Count</h3>

        <Select
          disabled={!chartSumData}
          defaultValue={time}
          onValueChange={handleChartSumChange}
        >
          <SelectTrigger className="w-[100px] dark:border dark:border-neutral-700">
            <SelectValue placeholder="Daily" />
          </SelectTrigger>
          <SelectContent className="dark:border-neutral-700 dark:bg-neutral-800">
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex h-full w-full items-center justify-center">
        <Chart data={data} isPending={isPending} error={error} />
      </div>
    </div>
  );
};
