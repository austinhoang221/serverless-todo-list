// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme, ThemeProvider } from "@aws-amplify/ui-react";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";
import "@aws-amplify/ui-react/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
