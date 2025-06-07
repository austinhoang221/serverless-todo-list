// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Theme, ThemeProvider } from "@aws-amplify/ui-react";
import { Router } from "./Router";
import { AuthProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root")!);

const theme: Theme = {
  name: 'my-theme',
  tokens: {
    colors: {
      font: {
        primary: { value: '#008080' },
        // ...
      },
    },
  },
};
// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
  <AuthProvider>
      <Router />
  </AuthProvider>
      </ThemeProvider>
  </React.StrictMode>
);