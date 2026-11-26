import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


import {
  ChartTooltip,
} from "./ChartTooltip";


import type {
  DashboardChartData,
} from "../types";


interface Props {
  data: DashboardChartData[];
}


export function DashboardChartCard({
  data,
}: Props) {


  return (

    <div
      className="
        h-80
        w-full
      "
    >

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart
          data={data}
          margin={{
            top:20,
            right:20,
            left:0,
            bottom:10,
          }}
        >


          <CartesianGrid
            strokeDasharray="4 4"
            opacity={0.15}
          />


          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />


          <YAxis
            axisLine={false}
            tickLine={false}
          />


          <Tooltip
            content={
              <ChartTooltip />
            }
          />


          <Legend
            verticalAlign="top"
          />


          <Area
            type="monotone"
            dataKey="training"
            name="Training"
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.15}
          />


          <Area
            type="monotone"
            dataKey="participant"
            name="Participant"
            stroke="#22c55e"
            fill="none"
          />


        </AreaChart>


      </ResponsiveContainer>


    </div>

  );

}