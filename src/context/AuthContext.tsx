"use client";
import { createContext } from "react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: "teacher" | "admin" | null;
}

interface IAuthContext {}

const defaultValues: IAuthContext = {};

export const AuthContext = createContext<IAuthContext>(defaultValues);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const contextValue: IAuthContext = {};

  return (
    <AuthContext.Provider value={defaultValues}>
      {children}
    </AuthContext.Provider>
  );
};
