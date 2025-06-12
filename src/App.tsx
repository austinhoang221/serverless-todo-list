import React from "react";
import "./App.css";
import { useAuth } from "./customHooks/useAuth";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./Router";
import "@aws-amplify/ui-react/styles.css";

const App = () => {


  return (
    <ThemeProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
