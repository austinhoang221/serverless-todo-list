// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme, ThemeProvider } from "@aws-amplify/ui-react";


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
      <App />
      </ThemeProvider>
  </React.StrictMode>
);