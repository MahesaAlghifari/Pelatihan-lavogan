import {
  useState,
} from "react";

import {
  CalendarCard,
} from "./components";

import {
  Calendar,
} from "@/shared/components/ui/calendar";


export function DashboardCalendar() {

  const [
    date,
    setDate,
  ] = useState<Date | undefined>(
    new Date()
  );


  return (

    <CalendarCard>

      <Calendar

        mode="single"

        selected={date}

        onSelect={setDate}

        className="
          w-full
        "

      />

    </CalendarCard>

  );

}


export default DashboardCalendar;