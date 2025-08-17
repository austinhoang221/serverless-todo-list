import React from "react";
import { useAuth } from "../customHooks/useAuth";
import { verifyJWT } from "../api/auth.service";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [valid, setValid] = React.useState<boolean | null>(null); // null = loading

  React.useEffect(() => {
    const verifyToken = async () => {
      if(sessionStorage.getItem('context')){
        try{
          const accessToken = JSON.parse(sessionStorage.getItem('context') as string)?.accessToken
          const res = await verifyJWT(accessToken);
          setValid(res);
        }
        catch{
          console.error('Error passing context')
        }
      }
      else{
        setValid(false)
      }
    };
    verifyToken();
  }, []);

  if (valid === null) {
    return <div>Loading...</div>;
  }

  return valid ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
