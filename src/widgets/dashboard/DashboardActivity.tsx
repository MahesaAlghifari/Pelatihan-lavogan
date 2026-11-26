import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";


import {
  Award,
  BookOpen,
  Clock,
  UserPlus,
  Settings,
} from "lucide-react";


import type {
  DashboardActivityItem,
} from "./types";



interface DashboardActivityProps {

  activities: DashboardActivityItem[];

}



const activityIcons = {

  participant: UserPlus,

  training: BookOpen,

  certificate: Award,

  system: Settings,

};





export function DashboardActivity({
  activities,
}: DashboardActivityProps) {


  return (

    <Card
      className="
        h-full
      "
    >


      <CardHeader>

        <CardTitle
          className="
            text-base
          "
        >

          Recent Activity

        </CardTitle>


      </CardHeader>





      <CardContent>


        <div
          className="
            space-y-6
          "
        >



          {
            activities.map((activity, index)=>{


              const Icon =
                activityIcons[
                  activity.type
                ];



              return (

                <div

                  key={activity.id}

                  className="
                    relative
                    flex
                    gap-4
                  "

                >



                  {/* Timeline */}

                  {
                    index !== activities.length - 1 && (

                      <div
                        className="
                          absolute
                          left-5
                          top-10
                          h-full
                          w-px
                          bg-border
                        "
                      />

                    )
                  }






                  {/* Icon */}

                  <div
                    className="
                      relative
                      z-10

                      flex
                      h-10
                      w-10

                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-primary/10

                      text-primary
                    "
                  >

                    <Icon
                      className="
                        h-5
                        w-5
                      "
                    />


                  </div>







                  {/* Content */}

                  <div
                    className="
                      flex-1

                      rounded-xl

                      border

                      p-3

                      transition

                      hover:bg-muted/30
                    "
                  >


                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >

                      <p
                        className="
                          text-sm
                          font-semibold
                        "
                      >

                        {activity.title}

                      </p>


                      <span
                        className="
                          flex
                          items-center
                          gap-1

                          text-xs

                          text-muted-foreground
                        "
                      >

                        <Clock
                          className="
                            h-3
                            w-3
                          "
                        />

                        {activity.time}

                      </span>


                    </div>





                    <p
                      className="
                        mt-1

                        text-sm

                        text-muted-foreground
                      "
                    >

                      {activity.description}

                    </p>


                  </div>




                </div>

              );


            })
          }



        </div>



      </CardContent>



    </Card>

  );

}