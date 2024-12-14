export const DesktopPendingList = ({ fieldLength = 4 }) => {
  return (
    <>
      {Array(6)
        .fill("0")
        ?.map((_, index) => (
          <tr key={index + _}>
            {Array(fieldLength)
              .fill("")
              .map((header: number, index: number) => (
                <td key={index} className="pending px-6 py-2">
                  <div className=" h-6 animate-pulse rounded-xl bg-gray-300 text-left text-sm font-semibold uppercase tracking-wider">
                    {header}
                  </div>
                </td>
              ))}
          </tr>
        ))}
    </>
  );
};

export const MobilePendingList = () => {
  return (
    <>
      {Array(3)
        .fill("0")
        ?.map((item, index) => (
          <div
            key={index + item}
            className="flex flex-col gap-2 rounded-xl bg-white p-6 text-sm shadow"
          >
            <div className="flex animate-pulse items-center gap-2">
              <div className="h-4 w-10 rounded-full bg-neutral-200"></div>
              <div className="h-4 w-16 rounded-full bg-neutral-200"></div>
            </div>

            <div className="h-5 w-5/6 animate-pulse rounded-full bg-neutral-200"></div>
            <div className="h-5 w-4/6 animate-pulse rounded-full bg-neutral-200"></div>
            <div className="h-5 w-3/6 animate-pulse rounded-full bg-neutral-200"></div>

            <div className="flex animate-pulse items-center gap-2">
              <div className="h-5 w-16 rounded-full bg-neutral-200"></div>
              <div className="h-5 w-16 rounded-full bg-neutral-200"></div>
              <div className="h-5 w-16 rounded-full bg-neutral-200"></div>
            </div>
          </div>
        ))}
    </>
  );
};
