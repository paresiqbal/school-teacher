"use client";
import { createContext, useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: "teacher" | "admin" | null;
}

interface IAuthContext extends AuthState {
  login: (token: string, role: "teacher" | "admin") => void;
  logout: () => void;
}

const defaultValues: IAuthContext = {
  isAuthenticated: false,
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(defaultValues);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  // set default state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    role: null,
  });

  return (
    <AuthContext.Provider value={defaultValues}>
      {children}
    </AuthContext.Provider>
  );
};
