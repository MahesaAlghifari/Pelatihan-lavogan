import {
  Outlet,
} from "react-router-dom";


import {
  AppHeader,
  AppSidebar,
} from "@/widgets/shell";



export function AdminLayout() {


  return (

    <div
      className="
        flex
        h-screen
        w-full
        overflow-hidden
        bg-slate-50
      "
    >


      {/* Sidebar */}

      <AppSidebar />



      {/* Right Area */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
        "
      >



        {/* Header */}

        <AppHeader />




        {/* Scroll Area */}

        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            p-8
          "
        >


          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
            "
          >

            <Outlet />

          </div>


        </main>



      </div>



    </div>

  );

}


export default AdminLayout;