// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme, ThemeProvider } from "@aws-amplify/ui-react";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";
import "@aws-amplify/ui-react/styles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <AuthProvider>
            <App/>
    </AuthProvider>
  </React.StrictMode>
);
