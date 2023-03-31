export const closeOpenedComponent = (
  e: any,
  ref: React.RefObject<HTMLDivElement>,
  openState: boolean,
  setOpenState: (arg0: boolean) => void
) => {
  if (ref.current && openState && !ref.current.contains(e.target)) {
    setOpenState(false);
  }
};
