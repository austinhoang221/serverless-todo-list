import React from "react";
import { createContext } from "react";

export interface HomeContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const HomeContext = createContext<HomeContextType | null>(null);

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  return (
    <HomeContext.Provider value={{ loading, setLoading }}>
      {children}
    </HomeContext.Provider>
  );
};
