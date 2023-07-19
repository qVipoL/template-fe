import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useState } from "react";
import { getCurrentUser } from "src/api/auth";
import { User } from "src/constants/types";

export type AuthContextType = {
  user: User | null;
  isAuth: boolean;
};

type AuthContextActionTypes = {
  authUser: (user: User, token: string) => void;
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
  const accessToken = localStorage.getItem("accessToken");
  const [auth, setAuth] = useState<AuthContextType>({
    user: null,
    isAuth: false,
  });

  const { data, isError } = useQuery(["GetCurrentUser"], getCurrentUser, {
    enabled: Boolean(accessToken) && !auth.isAuth,
  });

  if (accessToken && !auth.isAuth && !isError && data?.data) {
    setAuth({
      user: data.data.user,
      isAuth: true,
    });
  }

  const authUser = useCallback((user: User, token: string) => {
    localStorage.setItem("accessToken", token);

    setAuth({
      user,
      isAuth: true,
    });
  }, []);

  const logoutUser = useCallback(() => {
    localStorage.removeItem("accessToken");
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
