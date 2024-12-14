type InfoContainerProps = {
  label: string;
  value: string;
  customStyle?: string;
};

export const InfoContainer = ({
  label,
  value,
  customStyle = "",
}: InfoContainerProps) => {
  return (
    <>
      {value && (
        <div className={`flex flex-col gap-1  ${customStyle}`}>
          <p className="text-xs font-semibold">{label}</p>
          <div className="col-span-1 flex min-h-12 items-center overflow-hidden rounded-lg border bg-white p-1 px-4 dark:border-neutral-600 dark:bg-neutral-800">
            <p className="dark:text-neutral-200">{value}</p>
          </div>
        </div>
      )}
    </>
  );
};
