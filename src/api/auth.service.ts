import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  GetUserCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const REGION = import.meta.env.VITE_REGION; // replace with your region
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; // replace with your Cognito App Client ID
const USER_POOL_ID = import.meta.env.VITE_USER_POOL_ID;

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

export const signIn = async (username: string, password: string) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  });

  try {
    const response = await cognitoClient.send(command);
    console.log("Auth successful", response);
    if (response.AuthenticationResult) {
      const { AccessToken, IdToken, RefreshToken } =
        response.AuthenticationResult;
      // You can now store these tokens (e.g., localStorage) or use them as needed
      const command = new GetUserCommand({
        AccessToken: AccessToken,
      });

      if (IdToken) {
        const getUserResponse = await cognitoClient.send(command);
        const { Username, UserAttributes } = getUserResponse;
        return {
          accessToken: AccessToken,
          userId: IdToken,
          userName: Username,
          refreshToken: RefreshToken,
          attributes: UserAttributes,
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
  const command = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "nickname",
        Value: nickName,
      },
    ],
  });
  try {
    const response = await cognitoClient.send(command);

    console.log("SignUp success:", response);
    return response;
  } catch (error) {
    console.error("SignUp error:", error);
    throw error;
  }
};

export const confirmSignUpUser = async (email: string, code: string) => {
  const command = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  });

  try {
    const response = await cognitoClient.send(command);
    console.log("Confirmation success:", response);

    return response;
  } catch (error) {
    console.error("Confirmation error:", error);
    throw error;
  }
};
