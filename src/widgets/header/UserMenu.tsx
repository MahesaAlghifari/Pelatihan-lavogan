import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";


export function UserMenu() {

  const [open, setOpen] = useState(false);


  const menuRef = useRef<HTMLDivElement>(null);



  // close ketika klik luar
  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {

        setOpen(false);

      }

    }


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  }, []);



  return (

    <div
      ref={menuRef}
      className="
        relative
      "
    >


      {/* Trigger */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-lg
          px-3
          py-2
          hover:bg-muted
        "
      >

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-primary
            text-primary-foreground
            font-semibold
          "
        >
          L
        </div>


        <div
          className="
            hidden
            text-left
            md:block
          "
        >

          <p
            className="
              text-sm
              font-medium
            "
          >
            Lavogan Admin
          </p>


          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Administrator
          </p>

        </div>


        <ChevronDown
          className="
            h-4
            w-4
          "
        />

      </button>





      {/* Dropdown */}

      {
        open && (

          <div
            className="
              absolute
              right-0
              z-50
              mt-2
              w-56
              rounded-xl
              border
              bg-background
              p-2
              shadow-lg
            "
          >


            <div
              className="
                px-3
                py-2
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                "
              >
                Lavogan Admin
              </p>


              <p
                className="
                  text-xs
                  text-muted-foreground
                "
              >
                admin@lavogan.com
              </p>


            </div>


            <div
              className="
                my-2
                border-t
              "
            />



            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                hover:bg-muted
              "
            >

              <User
                className="
                  h-4
                  w-4
                "
              />

              Profile


            </button>



            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                hover:bg-muted
              "
            >

              <Settings
                className="
                  h-4
                  w-4
                "
              />

              Settings


            </button>



            <div
              className="
                my-2
                border-t
              "
            />



            <button
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-lg
                px-3
                py-2
                text-sm
                text-destructive
                hover:bg-destructive/10
              "
            >

              <LogOut
                className="
                  h-4
                  w-4
                "
              />

              Logout


            </button>



          </div>

        )
      }


    </div>

  );
}


export default UserMenu;