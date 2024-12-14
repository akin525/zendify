import { useParams } from "react-router-dom";
import { columns } from "./columns";
import { useTerminalTransactionsPageData } from "../../api";
import { DataTable } from "../../components/data-table";
import { SyncLoader } from "react-spinners";

export default function TerminalTransactions() {
  const { id } = useParams();

  const { data, isPending } = useTerminalTransactionsPageData(id);

  return (
    <>
      <div className=" container my-1 px-4 dark:bg-neutral-800">
        {isPending ? (
          <div className="flex min-h-[calc(100vh-150px)] items-center justify-center py-20">
            <SyncLoader size={14} color="#854FFF" />
          </div>
        ) : (
          <DataTable columns={columns} data={data?.data?.data || []} />
        )}
      </div>
    </>
  );
}
