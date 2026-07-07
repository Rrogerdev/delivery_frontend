import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const userData = JSON.parse(localStorage.getItem("delivery_user"))
  let Islog = false
  if (userData) Islog = true
  const [isLogged, setIsLogged] = useState(Islog);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}