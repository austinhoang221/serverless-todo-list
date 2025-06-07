import React from "react";
import { useAuth } from "../customHooks/useAuth";
import { verifyJWT } from "../api/auth.service";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [valid, setValid] = React.useState<boolean | null>(null); // null = loading
  const { token } = useAuth();

  React.useEffect(() => {
    const verifyToken = async () => {
      const res = await verifyJWT(token);
      setValid(res);
    };
    verifyToken();
  }, [token]);

  if (valid === null) {
    return <div>Loading...</div>;
  }

  return valid ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
