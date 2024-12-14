import { useAllTerminalPageData } from "../api/useTerminal";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
// import DemoPage from "../components/Page";

export default function AllTerminal() {
  const { data, isPending } = useAllTerminalPageData();

  return (
    <>
      <div className=" container my-1 dark:bg-neutral-800">
        {isPending ? ( // If the data is loading then show a loading message
          "Loading..."
        ) : (
          <DataTable filter columns={columns} data={data?.data?.data || []} />
        )}
      </div>
    </>
  );
}
