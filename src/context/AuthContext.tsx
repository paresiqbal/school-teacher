"use client";
// next
import axios from "axios";
import { ReactNode, createContext, useState } from "react";

export interface IAdminContext {
  username: string;
  password: string;
}

export interface ITeacherContext {
  username: string;
  password: string;
  avatar: string;
  fullName: string;
  nip: string;
}

export interface IStudentContext {
  username: string;
  password: string;
  avatar: string;
  fullName: string;
  barcode: string;
  yearEntry: number;
}

// combine all user
export type User = IAdminContext | ITeacherContext | IStudentContext;

export interface IAuthContext {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  registerTeacher: (
    teacherData: Omit<ITeacherContext, "role">
  ) => Promise<void>;
  registerStudent: (
    studentData: Omit<IStudentContext, "role">
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      const { token, ...userData } = response.data;
      localStorage.setItem("token", token);
      console.log("Login successful");
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const registerTeacher = async (
    teacherData: Omit<ITeacherContext, "role">
  ): Promise<void> => {
    try {
      await axios.post(
        "http://localhost:3001/user/register/teacher",
        teacherData
      );
      console.log("Teacher registration successful");
      // Optionally, log the user in or update UI accordingly
    } catch (error) {
      console.error("Teacher registration error:", error);
      throw error;
    }
  };

  const registerStudent = async (
    studentData: Omit<IStudentContext, "role">
  ): Promise<void> => {
    try {
      await axios.post(
        "http://localhost:3001/user/register/student",
        studentData
      );
      console.log("Student registration successful");
      // Optionally, log the user in or update UI accordingly
    } catch (error) {
      console.error("Student registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    console.log("Logged out successfully");
    setUser(null);
  };

  const value = {
    user,
    login,
    registerTeacher,
    registerStudent,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
