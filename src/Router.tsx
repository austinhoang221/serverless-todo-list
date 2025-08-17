import { BrowserRouter, Route, Routes } from "react-router";
import ConfirmCode from "./pages/auth/ConfirmCode";
import AuthRedirect from "./hoc/AuthRedirect";
import PrivateRoute from "./hoc/PrivateRoute";
import { Login } from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Home } from "./pages/home/Home";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
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
