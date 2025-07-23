import React from "react";
import "./App.css";
import { useAuth } from "./customHooks/useAuth";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./Router";
import "@aws-amplify/ui-react/styles.css";
import { refreshToken } from "./api/auth.service";

const App = () => {
  const { setAuth, expiresIn } = useAuth();

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem("context"))
        setAuth(JSON.parse(sessionStorage.getItem("context")!));
    } catch {
      console.error("Error parsing context");
    }
  }, []);

  React.useEffect(() => {
    if (expiresIn) {
      const runHeartbeat = () => {
        const needRefresh = accessTokenWillExpire();
        if (needRefresh) {
          //renew token
          refresh(heartBeatInterval);
        }
      };
      const heartBeatInterval = setInterval(runHeartbeat, 60 * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expiresIn]);

  const refresh = async (heartBeatInterval: NodeJS.Timeout) => {
    try {
      const response = await refreshToken();
      if (response) {
        setAuth({
          accessToken: response.body.AccessToken,
          expiresIn: response.body.ExpiresIn + Date.now(),
        });
        const context = JSON.parse(sessionStorage.getItem("context")!);
        sessionStorage.setItem(
          "context",
          JSON.stringify({
            accessToken: response.body.AccessToken,
            loginresponse: "Successfully",
            userId: context.userId,
            userName: context.userName,
            challenge: context.challenge,
            expiresIn: response.body.ExpiresIn + Date.now(),
            user: context.userAttr,
          })
        );
      }
    } catch (err) {
      clearInterval(heartBeatInterval);
      sessionStorage.clear();
      window.location.href = "";
    }
  };

  const accessTokenWillExpire = (): boolean => {
    let needRefresh = false;
    if (expiresIn - Date.now() < 30) {
      needRefresh = true;
    }

    return needRefresh;
  };

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
