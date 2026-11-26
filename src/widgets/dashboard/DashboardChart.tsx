import {
  BarChart3,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  DashboardChartCard,
} from "./components";


import type {
  DashboardChartData,
} from "./types";


interface DashboardChartProps {
  chart: DashboardChartData[];
}



export function DashboardChart({
  chart,
}: DashboardChartProps) {

  return (

    <Card
      className="
        rounded-2xl
        border-slate-100
        bg-white
        shadow-sm
      "
    >

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-50
            "
          >

            <BarChart3
              className="
                h-5
                w-5
                text-blue-600
              "
            />

          </div>


          <div>

            <CardTitle
              className="
                text-base
              "
            >
              Training Analytics
            </CardTitle>


            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Training and participant growth
            </p>

          </div>


        </div>




        <button
          className="
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            py-2
            text-sm
            text-slate-600
            transition
            hover:bg-slate-50
          "
        >
          Monthly
        </button>


      </CardHeader>



      <CardContent>

        <DashboardChartCard
          data={chart}
        />

      </CardContent>


    </Card>

  );

}


export default DashboardChart;