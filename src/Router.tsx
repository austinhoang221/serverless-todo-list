import { BrowserRouter, Route, Routes } from "react-router"
import App from "./App"
import { PrivateRoute } from "./hoc/PrivateRoute"
import { Authentication } from "./pages/auth/Authentication"

export const Router = () => {
    return (
        <BrowserRouter>
    <Routes>
      <Route path="/"    element={
        <PrivateRoute>
          <App />
        </PrivateRoute>
      } />
      <Route path="/login" element={
        <Authentication/>

      }>
      
      </Route>
    </Routes>
  </BrowserRouter>
    )
}