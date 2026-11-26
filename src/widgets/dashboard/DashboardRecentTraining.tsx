import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";


import {
  TrainingItem,
} from "./components";


import type {
  DashboardTraining,
} from "./types";


interface DashboardRecentTrainingProps {

  trainings:
    DashboardTraining[];

}



export function DashboardRecentTraining({
  trainings,
}: DashboardRecentTrainingProps) {


  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Recent Training
        </CardTitle>

      </CardHeader>


      <CardContent
        className="
          space-y-4
        "
      >

        {
          trainings
            .slice(0,3)
            .map((training) => (

              <TrainingItem
                key={training.id}
                training={training}
              />

            ))
        }


      </CardContent>


    </Card>
  );
}