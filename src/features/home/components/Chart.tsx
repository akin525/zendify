import { useState } from "react";
import { SyncLoader } from "react-spinners";
import {
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  ComposedChart,
  Legend,
  Tooltip,
} from "recharts";

function makeRechartData(data) {
  const rechartData = [];
  for (let i = 0; i < data?.labels?.length; i++) {
    rechartData.push({
      name: data.labels[i],
      collections_data: data.c_data[i],
      payouts_data: data.p_data[i],
    });
  }
  return rechartData;
}

export function Chart({ data, isPending, error }) {
  const newData = makeRechartData(data);
  const [opacity, setOpacity] = useState({
    collections_data: 1,
    payouts_data: 1,
  });

  const handleMouseEnter = (o) => {
    const { dataKey } = o;
    setOpacity((prev) => ({ ...prev, [dataKey]: 0.5 }));
  };

  const handleMouseLeave = (o) => {
    const { dataKey } = o;
    setOpacity((prev) => ({ ...prev, [dataKey]: 1 }));
  };
  return (
    <>
      {isPending ? (
        <SyncLoader size={16} color="#854FFF" />
      ) : (
        data && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={newData}
              margin={{
                top: 10,
                right: 20,
                bottom: 30,
                left: 80,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              {/* <YAxis /> */}

              <XAxis dataKey="name" className="text-xs">
                {/* <Label value="Date" position="bottom" dy={30} /> */}
              </XAxis>

              <Tooltip content={<CustomTooltip payload={data} active />} />

              <Legend
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              />

              <Line
                type="monotone"
                dataKey="collections_data"
                stroke="#854FFF"
                fill="#854FFF"
                strokeWidth={4}
                strokeOpacity={opacity.collections_data}
                // activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="payouts_data"
                stroke="#CA22EF"
                fill="#CA22EF"
                strokeWidth={4}
                strokeOpacity={opacity.payouts_data}
                // activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        )
      )}

      {error && <p className="text-center text-red-500">{error.message}</p>}
    </>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white p-2 text-xs shadow">
        <div className="">
          <p className="">
            Date:{" "}
            <span className="text-xs font-semibold">
              {payload[0].payload.name}
            </span>
          </p>

          <p className="text-primary">
            Collections:{" "}
            <span className="text-xs font-semibold">
              {payload[0].payload.collections_data}
            </span>
          </p>

          <p className="text-secondary">
            Payouts:{" "}
            <span className="text-xs font-semibold">
              {payload[0].payload.payouts_data}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};
