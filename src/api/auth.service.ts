import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    SignUpCommand,
  } from "@aws-sdk/client-cognito-identity-provider";

  const REGION = "us-east-1"; // replace with your region
  const CLIENT_ID = "29fbdv3ovcfrhcjldcn7p12car"; // replace with your Cognito App Client ID
  
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
        const { AccessToken, IdToken, RefreshToken } = response.AuthenticationResult;
        // You can now store these tokens (e.g., localStorage) or use them as needed
        return { AccessToken, IdToken, RefreshToken };
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
  

  export const signUp = async (email: string) => {
    const command = new SignUpCommand({
      ClientId: CLIENT_ID, 
  Username: email, 
  UserAttributes: [
    {
      Name: "email",
      Value: email,
    },
    {
      Name: "nickname", // Must be all lowercase, even if in the error it's camelCase
      Value: email,
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
  