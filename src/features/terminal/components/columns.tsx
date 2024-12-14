/* eslint-disable */

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import MapTerminalModal from './MapTerminalModal';
import { useState } from 'react';
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

import { Eye } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import storage from "@/utils/storage.ts";
export type Terminal = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed"| "unmapped";
  email: string;
  business_id: string;
  pid:number;
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
    accessorKey: "terminal_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Terminal ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const id: string | number = row.getValue("terminal_id");

      return <p className=" font-semibold">{id}</p>;
    },
  },
  {
    accessorKey: "serial_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serial Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Terminal Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "merchant_name",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Merchant Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pos_type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-max px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          POS TYPE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Terminal Balance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div className=" font-semibold text-emerald-500">{formatted}</div>;
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
              className={`w-max rounded-lg  bg-yellow-500/10 px-4 text-sm font-medium text-yellow-500`}
            >
              {status}
            </p>
          );
        case "active":
          return (
            <p
              className={`w-max rounded-lg bg-emerald-500/10 px-4 text-sm font-medium text-emerald-500`}
            >
              {status}
            </p>
          );
        case "inactive":
          return (
            <p
              className={`w-max rounded-lg bg-red-500/10 px-4 text-sm font-medium text-red-500`}
            >
              {status}
            </p>
          );
        default:
          return (
            <p
              className={`w-max rounded-lg bg-blue-500/10 px-4 text-sm font-medium text-blue-500`}
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
      const navigate = useNavigate();
      const [isModalOpen, setModalOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const handleMapTerminal = async (terminalId, businessId) => {
        setLoading(true);
        try {
          const response = await fetch(`${baseUrl}/map_terminal/${terminalId}/${businessId}`, {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to map the terminal");
          }

          const data = await response.json();
          toast.success(`Terminal mapped successfully: ${data.message}`); // Toast success message
          setLoading(false);
          window.location.reload(); // Reload page after success
        } catch (error) {
          console.error("Error mapping terminal:", error);
          toast.error(`Error mapping terminal: ${error.message}`); // Toast error message
          setLoading(false);
        }
      };

      const handleUnmapTerminal = async (terminalId) => {
        setLoading(true);
        try {
          const response = await fetch(`${baseUrl}/unmap_terminal/${terminalId}`, {
            method: "GET",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to unmap the terminal");
          }

          const data = await response.json();
          toast.success(`Terminal unmapped successfully: ${data.message}`); // Toast success message
          setLoading(false);
          window.location.reload(); // Reload page after success
        } catch (error) {
          console.error("Error unmapping terminal:", error);
          toast.error(`Error unmapping terminal: ${error.message}`); // Toast error message
          setLoading(false);
        }
      };

      const getToken = () => {
        const data = storage.getToken();
        return data ? data?.token : "";
      };

      const token = getToken();

      return (

          <div className="flex items-center gap-2">
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="flex flex-col items-center">
                    <SyncLoader size={14} color="#854FFF" />
                    <p className="mt-4 text-white">Uploading...</p>
                  </div>
                </div>
            )}

            {/* Eye icon to view terminal details */}
            <Eye
                size="16"
                onClick={() => {
                  navigate(`/terminal/${terminal.id}`);
                }}
            />


            {/* Dropdown menu for actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                {/* Option to copy terminal ID */}
                <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(terminal.id)}
                >
                  Copy terminal ID
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {terminal.pid === 0 ? (
                    <DropdownMenuItem onClick={() => setModalOpen(true)}>
                      {terminal.pid === 0 ? "Map Terminal" : "Retrieve/Unmap Terminal"}
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => handleUnmapTerminal(terminal.id)}>
                      {"Retrieve/Unmap Terminal"}
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
            <MapTerminalModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                terminalId={terminal.id}
                onMapTerminal={handleMapTerminal}
            />
          </div>
      );
    },
  },

];
