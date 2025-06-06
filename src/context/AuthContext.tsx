import { AdminGetUserCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { createContext } from "react";

interface AuthContextType {
  loginResult: string;
  refreshToken: string;
  token: string;
  userName: string;
  user: AdminGetUserCommandOutput;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
