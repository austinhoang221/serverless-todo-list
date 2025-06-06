import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const REGION = process.env.REACT_APP_REGION; // replace with your region
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; // replace with your Cognito App Client ID

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

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

export const signUp = async (email: string, nickName: string) => {
  const command = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
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
