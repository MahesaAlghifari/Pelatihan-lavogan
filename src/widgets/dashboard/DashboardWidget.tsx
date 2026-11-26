import {
  DashboardActivity,
  DashboardCalendar,
  DashboardChart,
  DashboardNotification,
  DashboardQuickAction,
  DashboardRecentCertificate,
  DashboardRecentParticipant,
  DashboardRecentTraining,
  DashboardSchedule,
  DashboardStats,
  DashboardTopInstructor,
  DashboardTopTraining,
  DashboardHero,
} from ".";


import {
  DashboardSkeleton,
} from "./components";


import {
  useDashboard,
} from "./hooks";


import {
  ErrorState,
} from "@/shared/components/states";



export function DashboardWidget() {


  const {

    stats,
    chart,

    recentTrainings,
    recentParticipants,

    activities,
    notifications,

    schedules,

    topTrainings,
    topInstructors,

    certificates,

    isLoading,
    error,

  } = useDashboard();






  if (isLoading) {

    return <DashboardSkeleton />;

  }





  if (error) {

    return (

      <ErrorState

        title="Dashboard Error"

        description={
          error.message
        }

      />

    );

  }







  return (

    <div
      className="
        space-y-6
      "
    >



      {/* ============================
          HERO HEADER
      ============================= */}

      <DashboardHero />







      {/* ============================
          STATS
      ============================= */}


      <DashboardStats

        stats={stats}

      />







      {/* ============================
          ANALYTICS
      ============================= */}


      <section

        className="
          grid
          gap-6

          xl:grid-cols-12
        "

      >


        <div

          className="
            xl:col-span-8
          "

        >

          <DashboardChart

            chart={chart}

          />

        </div>




        <div

          className="
            xl:col-span-4
          "

        >

          <DashboardCalendar />

        </div>



      </section>








      {/* ============================
          QUICK ACTION
      ============================= */}


      <DashboardQuickAction />









      {/* ============================
          RECENT
      ============================= */}


      <section

        className="
          grid
          gap-6

          lg:grid-cols-2
        "

      >


        <DashboardRecentTraining

          trainings={
            recentTrainings
          }

        />



        <DashboardRecentParticipant

          participants={
            recentParticipants
          }

        />


      </section>









      {/* ============================
          PERFORMANCE
      ============================= */}


      <section

        className="
          grid
          gap-6

          lg:grid-cols-2
        "

      >


        <DashboardTopTraining

          trainings={
            topTrainings
          }

        />



        <DashboardTopInstructor

          instructors={
            topInstructors
          }

        />


      </section>









      {/* ============================
          ACTIVITY
      ============================= */}


      <section

        className="
          grid
          gap-6

          lg:grid-cols-2
        "

      >


        <DashboardActivity

          activities={
            activities
          }

        />



        <DashboardNotification

          notifications={
            notifications
          }

        />


      </section>









      {/* ============================
          CERTIFICATE + SCHEDULE
      ============================= */}


      <section

        className="
          grid
          gap-6

          lg:grid-cols-2
        "

      >


        <DashboardRecentCertificate

          certificates={
            certificates
          }

        />



        <DashboardSchedule

          schedules={
            schedules
          }

        />


      </section>



    </div>

  );

}



export default DashboardWidget;