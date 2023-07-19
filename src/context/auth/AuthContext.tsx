import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useState } from "react";
import { getCurrentUser } from "src/api/auth";
import { User } from "src/constants/types";

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
};

type AuthContextActionTypes = {
  authUser: (user: User) => void;
  logoutUser: () => void;
};

const defaultValue: AuthContextType & AuthContextActionTypes = {
  user: null,
  isAuth: false,
  authUser: () => {},
  logoutUser: () => {},
};

const AuthContext = createContext(defaultValue);

const AuthContextProvider = AuthContext.Provider;

export const withAuthContext = (component: () => React.ReactNode) => {
  const [auth, setAuth] = useState<AuthContextType>({
    user: null,
    isAuth: false,
  });

  const { data, isError } = useQuery(["GetCurrentUser"], getCurrentUser, {
    enabled: !auth.isAuth,
  });

  if (!auth.isAuth && !isError && data?.data) {
    setAuth({
      user: data.data,
      isAuth: true,
    });
  }

  const authUser = useCallback((user: User) => {
    setAuth({
      user,
      isAuth: true,
    });
  }, []);

  const logoutUser = useCallback(() => {
    setAuth({
      user: null,
      isAuth: false,
    });
  }, []);

  const contextValue = {
    ...auth,
    authUser,
    logoutUser,
  };

  return (
    <AuthContextProvider value={contextValue}>
      {component()}
    </AuthContextProvider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
