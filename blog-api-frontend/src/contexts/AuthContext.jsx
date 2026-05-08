import { createContext, useState } from "react";
import API from "../services/API";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (data) => {
    const res = await API.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);
    setUser(res.data.user);
    return true
  };

  const register = async (data) => {
    await API.post("/auth/register", data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};