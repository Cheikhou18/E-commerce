import { createContext, useContext, useEffect, useState } from "react";
import { post } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) return setIsAdmin(false);

    async function fetchUser() {
      const request = await post("/api/admin/verif", { id });

      if (!request.success) {
        return setIsAdmin(false);
      }

      if (request.roles.includes("ROLE_ADMIN")) {
        return setIsAdmin(true);
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
