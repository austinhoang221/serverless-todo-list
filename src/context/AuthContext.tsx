import { AdminGetUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import React from "react";
import { createContext } from "react";
import { IUser } from "../models/interfaces/IUser";

interface AuthContextType {
  loginResult: string;
  refreshToken: string;
  accessToken: string;
  userName: string;
  user: IUser;
  expiresIn: number;
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
    accessToken: "",
    userName: "",
    expiresIn: 0,
    user: {
      email: "",
      email_verified: false,
      userId: "",
      userName: "",
      nickname: "",
      sub: "",
    },
  });

  const setAuth = (auth: Partial<AuthContextType>) => {
    setAuthState((prev) => ({
      ...prev,
      ...auth,
    }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
