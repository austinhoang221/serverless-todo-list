import React from "react";
import "./App.css";
import { useAuth } from "./customHooks/useAuth";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { Router } from "./Router";
import "@aws-amplify/ui-react/styles.css";
import { refreshToken } from "./api/auth.service";
import { RESPONSE_STATUS_CODE } from "./api/models/StatusCode";
import { showToast } from "./components/toast/Toast";
import { handleSignOut } from "./api/base.service";
import { ToastContainer } from "react-toastify";
import { HomeProvider } from "./context/HomeContext";

const App = () => {
  const { setAuth, expiresIn, loginResult } = useAuth();

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem("context"))
        setAuth(JSON.parse(sessionStorage.getItem("context")!));
    } catch {
      console.error("Error parsing context");
    }
  }, []);

  React.useEffect(() => {
    if (expiresIn && loginResult === "Successfully") {
      const runHeartbeat = () => {
        const needRefresh = accessTokenWillExpire();
        if (needRefresh) {
          refresh();
        }
      };
      const heartBeatInterval = setInterval(runHeartbeat, 60 * 1000);

      return () => clearInterval(heartBeatInterval);
    }
  }, [expiresIn, loginResult]);

  const refresh = async () => {
    try {
      const response = await refreshToken();
      if (response?.statusCode === RESPONSE_STATUS_CODE.OK) {
        setAuth({
          accessToken: response.body.AccessToken,
          expiresIn: response.body.ExpiresIn * 1000 + Date.now(),
        });
        const context = JSON.parse(sessionStorage.getItem("context")!);
        sessionStorage.setItem(
          "context",
          JSON.stringify({
            accessToken: response.body.AccessToken,
            loginResult: "Successfully",
            userId: context.userId,
            userName: context.userName,
            challenge: context.challenge,
            expiresIn: response.body.ExpiresIn * 1000 + Date.now(),
            user: context.userAttr,
          })
        );
      } else {
        showToast(
          "error",
          response?.message ?? "Session expired",
          response?.error
        );
        handleSignOut();
      }
    } catch (err) {
      // stop heartbeats
      sessionStorage.clear();
      window.location.href = "";
    }
  };

  function msToDateTime(ms: number): string {
    const date = new Date(ms);

    // Format: YYYY-MM-DD HH:mm:ss
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const accessTokenWillExpire = (): boolean => {
    console.log("Expire: " + msToDateTime(expiresIn));
    console.log("Now: " + msToDateTime(Date.now()));

    let needRefresh = false;
    if (expiresIn - Date.now() < 120 * 1000) {
      needRefresh = true;
    }

    return needRefresh;
  };

  return (
    <ThemeProvider>
      <HomeProvider>
        <Router />
      </HomeProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
