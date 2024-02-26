import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie"; // Import useCookies

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
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]); // Use cookies
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: !!cookies.token, // Determine authentication based on token cookie existence
    token: cookies.token || null,
    role: cookies.role as "teacher" | "admin" | null,
  });

  // login function
  const login = (token: string, role: "teacher" | "admin") => {
    setAuthState({
      isAuthenticated: true,
      token: token,
      role: role,
    });

    // Save token and role to cookies instead of local storage
    setCookie("token", token, { path: "/" }); // Add options as needed
    setCookie("role", role, { path: "/" }); // Add options as needed
  };

  // logout function
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      token: null,
      role: null,
    });

    // Remove token and role from cookies
    removeCookie("token", { path: "/" }); // Add options as needed
    removeCookie("role", { path: "/" }); // Add options as needed
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
