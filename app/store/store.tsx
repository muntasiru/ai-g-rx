"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context
interface AppContextType {
  state: {
    text: string;
  };
  updateState: (value: string) => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({
    text: "",
  });

  const updateState = (value: string) => {
    setState((prev) => ({
      ...prev,
      text: value,
    }));
  };

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
