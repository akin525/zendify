import { formatNumber } from "@/utils";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

type StatCardProps = {
  label?: string;
  value?: string | number;
  isPending?: boolean;
  route?: string;
};

export const StatCard = ({
  label = "----",
  value,
  isPending,
  route,
}: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (route) {
          navigate(route);
        }
      }}
      title={`${label} - ${value}`}
      className={`flex min-h-24 w-full cursor-pointer select-none flex-col-reverse  gap-3 rounded-lg bg-white p-6 text-primary transition-all duration-300 dark:border dark:border-neutral-700 dark:bg-neutral-800 ${route ? "hover:scale-105" : ""}`}
    >
      <p className=" text-sm font-semibold uppercase text-neutral-600 dark:text-neutral-300">
        {label}
      </p>

      <p className="break-words text-3xl font-bold lg:text-4xl">
        {isPending ? (
          <SyncLoader size={10} color="#854FFF" />
        ) : value == null || value == undefined ? (
          "----"
        ) : (
          formatNumber(Number(value))
        )}
      </p>
    </div>
  );
};
