/* eslint-disable */

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";

import { Eye } from "iconsax-react";
// import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/stores/modal";
export type Terminal = {
  id: string;
  title: string;
  amount: number;
  status:
    | "pending"
    | "processing"
    | "success"
    | "failed"
    | "active"
    | "inactive";
  description: string;
  type: string;
  ref: string;
};

export const columns: ColumnDef<Terminal>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id: string | number = row.getValue("title");

      return <p className=" font-semibold">{id}</p>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // console.log(row)
      const type = row?.original?.type;
      // console.log(type);
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return (
        <div
          className={`font-semibold ${type != "debit" ? "text-emerald-500" : "text-red-500"}`}
        >
          {type != "debit" ? "+" : "-"}
          {formatted}
        </div>
      );
    },
  },

  {
    accessorKey: "init_bal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Init Bal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // console.log(row)
      const type = row?.original?.type;
      // console.log(type);
      const init_bal = parseFloat(row.getValue("init_bal"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(init_bal);

      return (
        <div
          className={`font-semibold ${type != "debit" ? "text-emerald-500" : "text-red-500"}`}
        >
          {formatted}
        </div>
      );
    },
  },

  {
    accessorKey: "new_bal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          New Bal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      // console.log(row)
      const type = row?.original?.type;
      // console.log(type);
      const new_bal = parseFloat(row.getValue("new_bal"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(new_bal);

      return (
        <div
          className={`font-semibold ${type != "debit" ? "text-emerald-500" : "text-red-500"}`}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time: string = row.getValue("created_at");

      const formattedDate = moment(time).format("HH:mm:ss, DD-MM-YYYY ");

      return (
        <div>
          <p>{formattedDate}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      switch (status) {
        case "pending":
          return (
            <p
              className={`w-max rounded-lg  bg-yellow-500/10 px-4 text-sm font-bold text-yellow-500`}
            >
              {status}
            </p>
          );
        case "success":
          return (
            <p
              className={`w-max rounded-lg bg-emerald-500/10 px-4 text-sm font-bold text-emerald-500`}
            >
              {status}
            </p>
          );
        case "failed":
          return (
            <p
              className={`w-max rounded-lg bg-red-500/10 px-4 text-sm font-bold text-red-500`}
            >
              {status}
            </p>
          );
        default:
          return (
            <p
              className={`w-max rounded-lg bg-blue-500/10 px-4 text-sm font-bold text-blue-500`}
            >
              {status}
            </p>
          );
      }

      // return <p className={``}>{status}</p>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const terminal = row.original;
      const { openModal } = useModalStore();

      const showDataModal = (data: any) => {
        openModal({
          action: "view-data",
          type: "terminal-transaction",
          data: data,
          id: data.id,
        });
      };

      return (
        <div className="flex items-center gap-2">
          {/* {console.log(terminal)} */}
          <Eye
            size="16"
            onClick={() => {
              showDataModal(terminal);
              // navigate(`/terminal/${terminal.id}`);
            }}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(terminal.ref)}
              >
                Copy Transaction Ref
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>View terminal</DropdownMenuItem> */}
              {/* <DropdownMenuItem onClick={() => {}}>
                Update Terminal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                Map/Unmap Terminal
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
