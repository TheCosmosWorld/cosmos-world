import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  isVideoLoading: boolean;
  pauseRotation: boolean;
  setIsVideoLoading: (loading: boolean) => void;
  setPauseRotation: (moving: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [pauseRotation, setPauseRotation] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isVideoLoading,
        setIsVideoLoading,
        pauseRotation,
        setPauseRotation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
