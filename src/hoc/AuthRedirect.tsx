import { useEffect, useState } from "react";
import { useAuth } from "../customHooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { verifyJWT } from "../api/auth.service";

const validTypes = ["login", "signUp"];

const AuthRedirect = () => { 
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { type } = useParams();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const isValid = await verifyJWT(accessToken);

      if (isValid && accessToken) {
        navigate("/", { replace: true });
      } else {
        const targetType = validTypes.includes(type ?? "") ? type : "login";
        navigate(`/${targetType}`, { replace: true });
      }

      setChecked(true);
    };

    verifyToken();
  }, [accessToken, type, navigate]);

  // Optional loading state
  return !checked ? <div>Checking authentication...</div> : null;
};

export default AuthRedirect;
