import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";



interface SidebarContextType {

  collapsed: boolean;

  toggle: () => void;

  closeMobile: () => void;

  mobileOpen: boolean;

  setMobileOpen: (
    value:boolean
  ) => void;

}



const SidebarContext =
  createContext<
    SidebarContextType | undefined
  >(undefined);





export function SidebarProvider(
  {
    children,
  }:{
    children:ReactNode;
  }
){


  const [
    collapsed,
    setCollapsed
  ] = useState(false);



  const [
    mobileOpen,
    setMobileOpen
  ] = useState(false);





  function toggle(){

    setCollapsed(
      prev => !prev
    );

  }






  function closeMobile(){

    setMobileOpen(false);

  }





  return (

    <SidebarContext.Provider

      value={{

        collapsed,

        toggle,

        closeMobile,

        mobileOpen,

        setMobileOpen,

      }}

    >

      {children}

    </SidebarContext.Provider>

  );


}







export function useSidebar(){

  const context =
    useContext(
      SidebarContext
    );


  if(!context){

    throw new Error(
      "useSidebar must be inside SidebarProvider"
    );

  }


  return context;

}

export function useOptionalSidebar() {
  return useContext(SidebarContext);
}