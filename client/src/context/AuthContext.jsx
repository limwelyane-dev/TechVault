import {
  createContext,
  useContext,
  useState,
} from "react";

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile", token],
    queryFn: getProfile,
    enabled: !!token,
    retry: false,
  });

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const user = data?.user;

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        isAuthenticated: !!user && !isError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}