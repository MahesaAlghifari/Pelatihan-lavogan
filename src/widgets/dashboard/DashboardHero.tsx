import {
  Plus,
  CalendarDays,
} from "lucide-react";


export function DashboardHero() {


  return (

    <section
      className="
        flex
        flex-col
        gap-6

        rounded-2xl

        bg-white

        border
        border-slate-100

        p-6

        shadow-sm

        md:flex-row
        md:items-center
        md:justify-between
      "
    >


      {/* Left Content */}

      <div>


        <p
          className="
            mb-2
            text-sm
            font-medium
            text-blue-600
          "
        >
          Welcome back 👋
        </p>



        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Good Morning, Lavogan
        </h1>



        <p
          className="
            mt-2
            max-w-xl
            text-sm
            text-slate-500
          "
        >
          Monitor your training performance,
          participant activity, and LMS growth
          from one dashboard.
        </p>


      </div>





      {/* Action */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >


        <button

          className="
            flex
            items-center
            gap-2

            rounded-xl

            border
            border-slate-200

            bg-white

            px-4
            py-2.5

            text-sm

            font-medium

            text-slate-700

            transition

            hover:bg-slate-50
          "

        >

          <CalendarDays
            className="
              h-4
              w-4
            "
          />

          Schedule

        </button>





        <button

          className="
            flex
            items-center
            gap-2

            rounded-xl

            bg-blue-600

            px-4
            py-2.5

            text-sm

            font-medium

            text-white

            transition

            hover:bg-blue-700
          "

        >

          <Plus
            className="
              h-4
              w-4
            "
          />

          Create Training

        </button>



      </div>



    </section>

  );

}


export default DashboardHero;