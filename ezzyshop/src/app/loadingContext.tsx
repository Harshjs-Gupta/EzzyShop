"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const LoadingContext = createContext({
  loading: false,
  setLoading: (state: boolean) => {},
});

export const LoadingProvider = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
