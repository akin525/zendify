import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import moment from "moment";
import { currencyFormatter, formatNumber } from "@/utils";
import { getSysStatByDate } from "../api/getSysStatByDate";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
});

export const SystemStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function getFormatfor(key, value) {
    switch (key) {
      case "vfd":
      case "gtb":
      case "providus":
      case "available_wallet_balance":
      case "system_balance":
      case "payout_sum":
      case "pending_wallet_balance":
      case "safehaven":
      case "collection_sum":
      case "fidelity":
      case "collection_fee":
      case "collection_sys_fee":
      case "netbank":
        return currencyFormatter(Number(value));
      default:
        return formatNumber(Number(value));
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setData(null);
    setLoading(true);
    const date = moment(data.date).format("YYYY-MM-DD");
    setDate(date);

    getSysStatByDate(date)
      .then((res) => {
        const data = res?.data;
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.message || "An error occured");
        setLoading(false);
      });
  }

  return (
    <>
      <div className="my-10 flex justify-center">
        <div className="flex w-full max-w-[800px] flex-col items-center space-y-4">
          <h1 className="pb-5 text-xl font-semibold text-primary">
            System Statistics by Date
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary px-6 hover:bg-primary/90"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>

          <p className="py-2 text-sm text-neutral-500">
            <span className="text-red-500">*</span>
            might take about 30 seconds - 2 minutes
          </p>

          <p className="py-3 text-neutral-500">
            <span className="text-red-500">{error}</span>
          </p>

          {data && !loading && (
            <div className="mt-5 w-full space-y-2 rounded-xl border-4 border-dashed border-primary/50 p-4">
              <header className=" text-2xl font-semibold text-primary">
                System Stat for {date}
              </header>

              <ul className="space-y-2 rounded-xl bg-white p-4">
                {data &&
                  Object.entries(data)?.map(([key, value], index) => (
                    <li key={index}>
                      <p className="space-x-2 text-wrap">
                        <span className="font-medium uppercase text-neutral-700">
                          {key}
                        </span>
                        :
                        <span className="font-semibold ">
                          {getFormatfor(key, value)}
                        </span>
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
