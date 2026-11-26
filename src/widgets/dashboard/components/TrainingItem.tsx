import {
  BookOpen,
  Users,
  CheckCircle2,
} from "lucide-react";

import type {
  DashboardTraining,
} from "../types";


interface TrainingItemProps {
  training: DashboardTraining;
}


export function TrainingItem({
  training,
}: TrainingItemProps) {

  return (
    <div
      className="
        rounded-xl
        border
        p-4
        transition
        hover:shadow-md
      "
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            bg-primary/10
          "
        >

          <BookOpen
            className="
              h-5
              w-5
              text-primary
            "
          />

        </div>



        <div className="flex-1">

          <h4
            className="
              text-sm
              font-semibold
            "
          >
            {training.title}
          </h4>


          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >
            {training.instructor}
          </p>


          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-4
              text-xs
              text-muted-foreground
            "
          >

            <span
              className="
                flex
                items-center
                gap-1
              "
            >

              <Users
                className="
                  h-3.5
                  w-3.5
                "
              />

              {training.participant}
              {" "}
              participants

            </span>



            <span
              className="
                flex
                items-center
                gap-1
              "
            >

              <CheckCircle2
                className="
                  h-3.5
                  w-3.5
                "
              />

              {training.completion}%

            </span>


          </div>


        </div>



        <span
          className="
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-xs
            font-medium
            text-primary
          "
        >
          {training.status}
        </span>


      </div>


    </div>
  );
}