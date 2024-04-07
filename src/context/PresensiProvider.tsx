import React, { createContext, useContext, useState, ReactNode } from "react";

interface PresensiData {
  subject?: string;
  date?: string;
  teacherId?: string;
}

interface PresensiContextType {
  presensiData: PresensiData;
  setPresensiData: React.Dispatch<React.SetStateAction<PresensiData>>;
}

const defaultContextValue: PresensiContextType = {
  presensiData: {},
  setPresensiData: () => {}, // Providing a no-operation function as default
};

const PresensiContext = createContext<PresensiContextType>(defaultContextValue);

export function usePresensi() {
  return useContext(PresensiContext);
}

interface PresensiProviderProps {
  children: ReactNode;
}

export function PresensiProvider({ children }: PresensiProviderProps) {
  const [presensiData, setPresensiData] = useState<PresensiData>({});

  const value = { presensiData, setPresensiData };

  return (
    <PresensiContext.Provider value={value}>
      {children}
    </PresensiContext.Provider>
  );
}
