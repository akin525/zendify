import { useEffect } from "react";

type PaginationItem = {
  url: string | null;
  label: string | number;
  active: boolean;
};

type PaginationProps = {
  isFetching: boolean;
  handlePageChange: (page: number | string) => void;
  data: PaginationItem[] | null | undefined;
  page?: number | null | string;
};

export function Pagination({
  handlePageChange,
  isFetching,
  data,
  page = null,
}: PaginationProps) {
  useEffect(() => {
    // const mainContent =
    //   document.getElementById("list") ||
    //   document.getElementById("main-content");

    window.scrollTo(0, 0);

    // if (mainContent) {
    //   mainContent.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
    // }
  }, [data]);

  return (
    <div className="my-4 flex flex-wrap justify-center gap-2  px-4">
      {data?.map((link, index: number) => (
        <button
          dangerouslySetInnerHTML={{ __html: link.label }}
          disabled={isFetching || !link.url}
          key={index}
          type="button"
          className={`rounded-lg px-3 py-2 disabled:cursor-not-allowed disabled:opacity-60  ${
            link.active ? "bg-primary font-bold text-white" : "bg-white dark:bg-neutral-700"
          } text-sm`}
          onClick={() => {
            if (!link.active) {
              if (
                link.label !== "Next &raquo;" &&
                link.label !== "&laquo; Previous"
              ) {
                handlePageChange(link.label);
              } else {
                if (page) {
                  if (link.label === "Next &raquo;") {
                    handlePageChange(Number(page) + 1);
                  }

                  if (link.label === "&laquo; Previous") {
                    handlePageChange(Number(page) - 1);
                  }
                }
              }
            }
          }}
        ></button>
      ))}
    </div>
  );
}
