import { createContext, FC, ReactNode, useContext, useState } from "react";

export interface UserContext {
  user?: any;
  setUser: (user?: any) => void;
}

export const UserContextImpl = createContext<UserContext>({
  user: null,
  setUser: () => {},
});

export function useUser() {
  return useContext(UserContextImpl);
}

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>();

  return (
    <UserContextImpl.Provider value={{ user, setUser }}>
      {children}
    </UserContextImpl.Provider>
  );
};
