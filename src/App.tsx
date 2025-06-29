import React from "react";
import "./App.css";
import { useAuth } from "./customHooks/useAuth";
import { ThemeProvider } from "@aws-amplify/ui-react";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./Router";
import "@aws-amplify/ui-react/styles.css";

const App = () => {
    const {setAuth } = useAuth(); 
  
  React.useEffect(() => {
    try {
      if (sessionStorage.getItem("context"))
        setAuth(JSON.parse(sessionStorage.getItem("context")!));
    } catch {
      console.error("Error parsing context");
    }
  }, []);


  return (
    <ThemeProvider>
        <Router />
    </ThemeProvider>
  );
};

export default App;
