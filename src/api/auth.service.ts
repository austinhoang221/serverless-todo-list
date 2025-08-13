import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { getAuthHeaders } from "./base.service";
import { APIResponseModel } from "./models/APIResponseModel";

const REGION = import.meta.env.VITE_REGION; // replace with your region
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; // replace with your Cognito App Client ID
const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID;

const API_URL = import.meta.env.VITE_API_URL;
const authUrl = "auth/";

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

export const verifyJWT = async (token: string) => {
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: USER_POOL_ID as string,
      tokenUse: "access",
      clientId: CLIENT_ID,
    });

    const payload = await verifier.verify(token, {
      clientId: CLIENT_ID as string,
      tokenUse: "access",
    });
    console.log("Decoded JWT:", payload);
    return true;
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const response = await fetch(API_URL + authUrl + "refresh-token", {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json as APIResponseModel;
  } catch (error) {
    console.error(error);
  }
};
export const signIn = async (username: string, password: string) => {
  try {
    const response = await fetch(API_URL + authUrl + "sign-in", {
      method: "POST",
      credentials: "include",
      headers: getAuthHeaders(),
      body: JSON.stringify({ username: username, password: password }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json as APIResponseModel;
  } catch (error) {
    console.error(error);
  }
};

export const signInWithSession = async (
  username: string,
  sessionId: string
) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    Session: sessionId,
  });

  try {
    const response = await cognitoClient.send(command);
    console.log("Auth successful", response);
    if (response.AuthenticationResult) {
      const { AccessToken, IdToken, RefreshToken } =
        response.AuthenticationResult;
      // You can now store these tokens (e.g., localStorage) or use them as needed
      const command = new AdminGetUserCommand({
        UserPoolId: IdToken,
        Username: username,
      });

      if (IdToken) {
        const getUserResponse = await cognitoClient.send(command);
        const { Username, UserCreateDate, UserLastModifiedDate, UserStatus } =
          getUserResponse;
        return {
          accessToken: AccessToken,
          userId: IdToken,
          userName: Username,
          refreshToken: RefreshToken,
          lastModifiedDate: UserLastModifiedDate,
          createdDate: UserCreateDate,
          status: UserStatus,
        };
      }
    }

    // Handle if a challenge like NEW_PASSWORD_REQUIRED comes up
    if (response.ChallengeName) {
      return { challenge: response.ChallengeName, session: response.Session };
    }
  } catch (error) {
    console.error("Auth failed", error);
    throw error;
  }
};
export const signUp = async (
  email: string,
  nickName: string,
  password: string
) => {
  try {
    const response = await fetch(API_URL + authUrl + "sign-up", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        email: email,
        nickname: nickName,
        password: password,
      }),
    });

    console.log("SignUp success:", response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json as APIResponseModel;
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
};

export const confirmSignUpUser = async (email: string, code: string) => {
  try {
    const response = await fetch(API_URL + authUrl + "confirm-code", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ email: email, code: code }),
    });
    console.log("Confirmation success:", response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json as APIResponseModel;
  } catch (error) {
    console.error("Confirmation error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(API_URL + authUrl + "sign-out", {
      method: "POST",
      headers: getAuthHeaders(),
    });
    console.log("Signout success:", response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json as APIResponseModel;
  } catch (error) {
    console.error("Confirmation error:", error);
    throw error;
  }
};
