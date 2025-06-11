import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import ConfirmCode from "./pages/auth/ConfirmCode";
import AuthRedirect from "./hoc/AuthRedirect";
import PrivateRoute from "./hoc/PrivateRoute";
import { Login } from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/confirmCode" element={<ConfirmCode />}></Route>
        <Route path="*" element={<AuthRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};
