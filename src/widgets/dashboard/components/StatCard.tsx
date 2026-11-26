import type {
  ReactNode,
} from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/shared/components/ui/card";


interface StatCardProps {

  title: string;

  value: string | number;

  trend: number;

  description?: string;

  icon?: ReactNode;

}


export function StatCard({
  title,
  value,
  trend,
  description,
  icon,
}: StatCardProps) {


  const isPositive = trend >= 0;


  return (

    <Card
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-md
      "
    >

      <CardContent
        className="
          p-6
        "
      >


        {/* Icon */}

        {icon && (

          <div
            className="
              mb-5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
            "
          >

            {icon}

          </div>

        )}



        {/* Title */}

        <p
          className="
            text-sm
            font-medium
            text-slate-500
          "
        >

          {title}

        </p>



        {/* Value */}

        <h2
          className="
            mt-2
            text-4xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >

          {value}

        </h2>



        {/* Footer */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
          "
        >

          <span
            className={`
              flex
              items-center
              gap-1
              text-sm
              font-semibold

              ${
                isPositive
                ? "text-emerald-500"
                : "text-red-500"
              }
            `}
          >

            {
              isPositive
              ?
              <ArrowUpRight className="h-4 w-4"/>
              :
              <ArrowDownRight className="h-4 w-4"/>
            }


            {Math.abs(trend)}%

          </span>


          {
            description && (

              <span
                className="
                  text-sm
                  text-slate-500
                "
              >

                {description}

              </span>

            )
          }


        </div>


      </CardContent>


    </Card>

  );
}