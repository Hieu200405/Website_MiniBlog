import { useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContextObject";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    // Initialize user state based on token presence
    return localStorage.getItem("token") ? { loggedIn: true } : null;
  });
  const [loading] = useState(false); // No need for initial loading if we sync state directly

  const login = async (username, password) => {
    try {
      const res = await api.post("/auth/login", { username, password });
      const newToken = res.data.token;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser({ loggedIn: true });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed" 
      };
    }
  };

  const register = async (username, password) => {
    try {
      await api.post("/auth/register", { username, password });
      return { success: true };
    } catch (error) {
       return { 
        success: false, 
        message: error.response?.data?.message || "Register failed" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
