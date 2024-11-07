"use client"; // Add this at the very top

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface LayoutProps {
  children: ReactNode;
}

interface LoadingContextType {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// Define the initial context with the correct type
const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {}, // This is a placeholder; the actual function will be provided by the provider
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
