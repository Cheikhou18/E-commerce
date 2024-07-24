import React, { createContext, useContext, useState, useEffect } from "react";
import { get } from "..";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await get("/api/user-info"); // Modifier l'URL selon votre API
        setUser(response);

        if (response.roles.includes("ROLE_ADMIN")) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des infos utilisateur:",
          error
        );
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
