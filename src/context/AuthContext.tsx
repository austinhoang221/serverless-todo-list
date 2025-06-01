import { createContext, useContext, useState } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    changeAuthenticateState: (state: boolean) => void
  }
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const changeAuthenticateState = (state: boolean) => {
        setIsAuthenticated(state);
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, changeAuthenticateState}}>
          {children}
        </AuthContext.Provider>
      );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
  };