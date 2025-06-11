import { AdminGetUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import React from "react";
import { createContext } from "react";

interface AuthContextType {
  loginResult: string;
  refreshToken: string;
  token: string;
  userName: string;
  user: any;
  setAuth: (auth: Partial<AuthContextType>) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = React.useState<
    Omit<AuthContextType, "setAuth">
  >({
    loginResult: "",
    refreshToken: "",
    token: "",
    userName: "",
    user: {} as AdminGetUserCommandOutput,
  });

  const setAuth = (auth: Partial<AuthContextType>) => {
    setAuthState((prev) => ({
      ...prev,
      ...auth,
    }));
    localStorage.setItem("context", JSON.stringify(auth));
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
