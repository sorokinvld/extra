import { Dispatch, SetStateAction, useEffect } from "react";
import { closeOpenedComponent } from "../utils/closeOpenedComponent";

export function useCloseOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  openState: boolean,
  setOpenState: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      closeOpenedComponent(e, ref, openState, setOpenState)
    );

    return () => {
      document.removeEventListener("mousedown", (e) =>
        closeOpenedComponent(e, ref, openState, setOpenState)
      );
    };
  }, [openState, ref, setOpenState]);
}
