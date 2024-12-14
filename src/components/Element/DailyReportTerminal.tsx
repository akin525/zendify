import { WidthWrapper } from "@/components/Layout";
import { useParams } from "react-router-dom";

import {useTerminalDashboard} from "@/features/terminal/api";
import {useEffect, useState} from "react";
import {date} from "yup";
import axios from "axios";

export default function DailyReportTerminal() {
  const { id } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useTerminalDashboard({
    id,
    config: { enabled: !!id },
  });
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        if (!id || !date) return;

        async function fetchData() {
            setIsPending(true);

            function setData(data: any) {

            }

            try {
                const response = await axios.get(`${process.env.BASE_URL}/terminal_daily_report/${id}/${date}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching daily report data:", error);
            } finally {
                setIsPending(false);
            }
        }

        fetchData();
    }, [id, date]);

  return (
    <>
      <WidthWrapper>

          <>
          </>


      </WidthWrapper>
    </>
  );
}

