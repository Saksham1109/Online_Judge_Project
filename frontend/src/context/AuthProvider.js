import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const navigate = useNavigate();

  const login = (authToken, userId) => {
    try {
      sessionStorage.setItem("token", authToken);
      sessionStorage.setItem("userId",userId);
      setToken(authToken);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");

    setToken("");
    setUserId("");

    navigate("/user/signIn");
  };
  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>);
};