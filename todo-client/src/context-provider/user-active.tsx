import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../services/users-service";

const UserActiveContext = createContext<UserActiveContextType | null>(null);

interface UserActiveContextType {
  userActive: User | null;
  setUserActive: (user: User) => void;
  setUserLogout: () => void;
}

export const UserActiveProvider = ({ children }: UserActiveProviderProps) => {
  const [userActiveState, setUserActiveState] = useState<User | null>(null);

  const setUserActive = (id: User) => setUserActiveState(id);
  const setUserLogout = () => setUserActiveState(null);

  return (
    <UserActiveContext.Provider
      value={{
        userActive: userActiveState,
        setUserActive,
        setUserLogout,
      }}
    >
      {children}
    </UserActiveContext.Provider>
  );
};

interface UserActiveProviderProps {
  children: ReactNode;
}

export const useUserActive = () => {
  const { userActive, setUserActive } = useContext(UserActiveContext)!;
  return { userActive, setUserActive };
};
