import { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage("weather_user", null);

  const signUp = useCallback(
    (userData) => {
      setUser({ name: userData.name, email: userData.email });
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, signUp, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
