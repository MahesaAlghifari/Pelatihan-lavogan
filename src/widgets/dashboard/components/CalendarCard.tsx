import type {
  PropsWithChildren,
} from "react";

import {
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";


export function CalendarCard({
  children,
}: PropsWithChildren) {

  return (

    <Card
      className="
        h-full
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
          gap-3
          pb-2
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

          <CalendarDays
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
              font-semibold
              text-slate-900
            "
          >
            Schedule
          </CardTitle>


          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Upcoming training events
          </p>

        </div>

      </CardHeader>


      <CardContent
        className="
          flex
          justify-center
          pb-5
          pt-2
        "
      >

        {children}

      </CardContent>

    </Card>

  );

}


export default CalendarCard;