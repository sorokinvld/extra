import { ReactNode } from "react";
import Header from "../Header/Header";

interface Props {
  currentPage: string;
  home: string;
  hotels: string;
  trips: string;
  tours: string;
  contact: string;
  login: string;
  menu: string;
  signup: string;
  children?: ReactNode;
}

export const Layout = ({
  currentPage,
  home,
  hotels,
  trips,
  tours,
  contact,
  login,
  menu,
  signup,
  children,
}: Props) => {
  return (
    <>
      <Header
        currentPage={currentPage}
        home={home}
        hotels={hotels}
        trips={trips}
        tours={tours}
        contact={contact}
        login={login}
        signup={signup}
        menu={menu}
      />
      <div>{children}</div>
    </>
  );
};
