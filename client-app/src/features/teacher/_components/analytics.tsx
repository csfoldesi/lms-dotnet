import { useGetAnalitics } from "../api/use-get-analytics";
import { Chart } from "./chart";
import { DataCard } from "./data-card";

export const Analytics = () => {
  const { data } = useGetAnalitics();

  if (!data) return;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Sales" value={data.totalSales} />
        <DataCard label="Total Revenue" value={data.totalRevenue} shouldFormat />
      </div>
      <Chart data={data.chartData} />
    </div>
  );
};
