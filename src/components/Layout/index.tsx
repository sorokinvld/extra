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
  welcome: string;
  ph: string;
  fav: string;
  rev: string;
  lg: string;
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
  welcome,
  ph,
  fav,
  rev,
  lg,
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
        welcome={welcome}
        ph={ph}
        fav={fav}
        rev={rev}
        lg={lg}
      />
      <div>{children}</div>
    </>
  );
};
