import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  ClipboardList,
  FileText,
  Users,
  Award,
  Settings,
  User,
} from "lucide-react";


import {
  NavLink,
} from "react-router-dom";



interface AppNavigationProps {

  collapsed?: boolean;

  variant?: "admin" | "participant";

  onItemClick?: () => void;

}



const adminNavigation = [

  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },


  {
    title: "Training",
    href: "/admin/training",
    icon: GraduationCap,
  },


  {
    title: "Learning Path",
    href: "/admin/learning-path",
    icon: BookOpen,
  },


  {
    title: "Modules",
    href: "/admin/modules",
    icon: ClipboardList,
  },


  {
    title: "Materials",
    href: "/admin/materials",
    icon: FileText,
  },


  {
    title: "Participants",
    href: "/admin/participants",
    icon: Users,
  },


  {
    title: "Certificates",
    href: "/admin/certificates",
    icon: Award,
  },


  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },


];

const participantNavigation = [
  {
    title: "Dashboard",
    href: "/participant/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Training Programs",
    href: "/participant/schemes",
    icon: GraduationCap,
  },
  {
    title: "Learning Materials",
    href: "/participant/learning",
    icon: BookOpen,
  },
  {
    title: "Certificates",
    href: "/participant/certificate",
    icon: Award,
  },
  {
    title: "Profile",
    href: "/participant/profile",
    icon: User,
  },
];





export function AppNavigation({

  collapsed = false,

  variant = "admin",

  onItemClick,

}: AppNavigationProps) {
  const navigation =
    variant === "participant" ? participantNavigation : adminNavigation;



  return (

    <nav
      className="
        flex
        flex-col
        gap-2
      "
    >


      {
        navigation.map((item)=>{


          const Icon = item.icon;



          return (

            <NavLink

              key={item.href}

              to={item.href}

              onClick={onItemClick}


              title={
                collapsed
                  ? item.title
                  : undefined
              }


              className={({isActive}) =>

                `
                group
                relative
                flex
                items-center
                rounded-xl
                transition-all
                duration-200

                ${
                  collapsed
                    ?
                    `
                    h-12
                    w-12
                    justify-center
                    `
                    :
                    `
                    gap-3
                    px-4
                    py-3
                    `
                }


                ${
                  isActive
                    ?
                    `
                    bg-blue-50
                    text-blue-600
                    `
                    :
                    `
                    text-slate-600
                    hover:bg-slate-50
                    hover:text-slate-900
                    `
                }

                `
              }


            >


              {
                ({isActive}) => (

                  <>


                    {/* Active bar */}

                    {
                      isActive && !collapsed && (

                        <span

                          className="
                            absolute
                            left-0
                            h-6
                            w-1
                            rounded-r-full
                            bg-blue-600
                          "

                        />

                      )
                    }





                    {/* Icon */}

                    <Icon

                      size={21}

                      strokeWidth={2}

                      className={

                        `
                        shrink-0
                        transition-colors

                        ${
                          isActive
                            ?
                            "text-blue-600"
                            :
                            "text-slate-400 group-hover:text-slate-700"
                        }

                        `

                      }

                    />






                    {/* Label */}

                    {
                      !collapsed && (

                        <span

                          className="
                            text-sm
                            font-medium
                            whitespace-nowrap
                          "

                        >

                          {item.title}

                        </span>

                      )
                    }







                    {/* Tooltip */}

                    {
                      collapsed && (

                        <span

                          className="
                            pointer-events-none
                            absolute
                            left-14
                            hidden

                            rounded-lg

                            bg-slate-900

                            px-3
                            py-2

                            text-xs
                            font-medium

                            text-white

                            shadow-lg

                            group-hover:block

                            whitespace-nowrap

                            z-50
                          "

                        >

                          {item.title}

                        </span>

                      )
                    }



                  </>

                )
              }



            </NavLink>


          );


        })
      }


    </nav>

  );

}



export default AppNavigation;