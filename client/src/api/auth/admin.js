import React, { createContext, useContext, useState, useEffect } from "react";
import { post } from "..";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) return;

    async function fetchUser() {
      const request = await post("/api/admin/verif", { id });

      if (!request.success) {
        return;
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
};

export const useAuth = () => useContext(AuthContext);
