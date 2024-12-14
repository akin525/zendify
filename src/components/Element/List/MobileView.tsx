import { currencyFormatter } from "@/utils";
import { ValuesProp } from "./types";

export const MobileListView = ({
  data,
  // action = "view-data",
  // type = null,
  // selectedKeys,
}) => {
  return (
    <>
      {data?.map((item: ValuesProp, index: number) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-xl bg-white p-6 text-sm shadow"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-neutral-500">
                #{item.id}
              </p>
              <p
                className={`${
                  item.status === "success"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500"
                } w-max rounded-full px-2 py-[2px] text-xs font-semibold`}
              >
                {item.status}
              </p>
            </div>
          </div>

          <p>
            <span className="font-medium">Reference:</span> {item.reference}
          </p>

          <p>
            <span className="font-medium">Created At:</span> {item.createdAt}
          </p>

          <p>
            <span className="font-medium">Amount:</span>{" "}
            <span className="font-bold text-secondary">
              {currencyFormatter(item.amount)}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};
