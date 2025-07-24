import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type { User } from "../types/user";

interface ChatDataContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  getAvatarUrl: (userId: string) => string;
}

const UserContext = createContext<ChatDataContextType | undefined>(undefined);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getAvatarUrl = (userId: string): string => {
    return `https://ui-avatars.com/api/?name=${userId}&rounded=true&background=ffffff`;
  };

  const initializeUser = () => {
    const userData: User = {
      id: "customer@mail.com",
      name: "king customer",
      role: 2,
    };
    setCurrentUser(userData);
  };

  useEffect(() => {
    initializeUser();
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      getAvatarUrl,
    }),
    [currentUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context;
};
