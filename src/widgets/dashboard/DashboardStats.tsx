import {
  TrendingUp,
  GraduationCap,
  Users,
  Award,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";

import type {
  DashboardStat,
} from "./types";


interface DashboardStatsProps {
  stats: DashboardStat[];
}


const iconMap = {
  training: GraduationCap,
  participant: Users,
  certificate: Award,
  completion: TrendingUp,
};


const colorMap = {
  training: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
  },
  participant: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
  },
  certificate: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
  },
  completion: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
  },
};



export function DashboardStats({
  stats,
}: DashboardStatsProps) {

  return (

    <div
      className="
        grid
        gap-5
        md:grid-cols-2
        xl:grid-cols-4
      "
    >

      {stats.map((item) => {

        const Icon = iconMap[item.key];

        const colors = colorMap[item.key];

        return (

          <Card
            key={item.id}
            className="
              rounded-2xl
              border-slate-100
              bg-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-md
            "
          >

            <CardContent className="p-6">

              <div className="flex items-start gap-4">

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    ${colors.bg}
                  `}
                >

                  <Icon
                    className={`
                      h-6
                      w-6
                      ${colors.icon}
                    `}
                  />

                </div>


                <div className="flex-1">

                  <p
                    className="
                      text-sm
                      font-medium
                      text-slate-500
                    "
                  >
                    {item.title}
                  </p>


                  <h3
                    className="
                      mt-1
                      text-3xl
                      font-bold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    {item.value}
                  </h3>

                </div>

              </div>


              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    font-semibold
                    text-emerald-500
                  "
                >

                  <TrendingUp className="h-4 w-4" />

                  +{item.trend}%

                </span>


                <span
                  className="
                    text-sm
                    text-slate-500
                  "
                >
                  {item.description}
                </span>

              </div>

            </CardContent>

          </Card>

        );

      })}

    </div>

  );

}


export default DashboardStats;