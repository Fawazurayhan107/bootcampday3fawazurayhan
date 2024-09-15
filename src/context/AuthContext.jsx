import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [ token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const login = (newToken) => {
        setToken(newToken);
    }

    const logout = () => {
        setToken(null);
    }

    useEffect(() => {
        if (token){
            localStorage.setItem("token", token);
            navigate("/products")
        } else {
            localStorage.removeItem("token");
            navigate("/login")
        }
    }, [navigate, token]);

    return(
        <AuthContext.Provider value={{ token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider ");
    }

    return context;   
}