import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) {
      setIsAdmin(false);
      setUser({});
      return;
    }

    async function fetchUser() {
      const request = await get("/api/users/" + id);

      if (!request.success) {
        setIsAdmin(false);
        return setUser({});
      }

      const userData = request.response;
      setUser(userData);

      if (userData?.roles.includes("ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    }

    fetchUser();
  }, []);

  function logout() {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("id");
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAdmin, setIsAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
