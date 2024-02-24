"use client";
import { createContext, useContext, useState } from "react";

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

  // login function
  const login = (token: string, role: "teacher" | "admin") => {
    setAuthState({
      isAuthenticated: true,
      token: token,
      role: role,
    });

    // save token to local storage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  // logout function
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      role: null,
    });

    // remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // pass context
  const contextValue = {
    ...authState,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
