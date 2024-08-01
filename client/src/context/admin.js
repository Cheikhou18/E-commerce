import { createContext, useContext, useEffect, useState } from "react";
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

  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
