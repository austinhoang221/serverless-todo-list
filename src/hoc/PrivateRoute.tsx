import { useAuth } from "../customHooks/useAuth";
import { verifyJWT } from "../api/auth.service";
import React from "react";
import { Navigate } from "react-router";

type PrivateRouteProps = {
    children: React.ReactNode;
  };
export const PrivateRoute = ({  children }: PrivateRouteProps) => {
    const [valid, setValid] = React.useState(false)
    const {token} = useAuth();
    React.useEffect(() => {
        verifyToken()
    }, [])
    const verifyToken = async() => {
        const res = await verifyJWT(token);
       setValid(res)
    }
   
    return valid ?  <>{children}</>: <Navigate to="/login" /> as React.ReactNode
}