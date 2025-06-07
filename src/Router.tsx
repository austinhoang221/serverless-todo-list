import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { Authentication } from "./pages/auth/Authentication";
import ConfirmCode from "./pages/auth/ConfirmCode";
import AuthRedirect from "./hoc/AuthRedirect";
import PrivateRoute from "./hoc/PrivateRoute";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="/:type" element={<Authentication />} />
        <Route path="/confirm-code" element={<ConfirmCode />}></Route>
        <Route path="*" element={<AuthRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};
