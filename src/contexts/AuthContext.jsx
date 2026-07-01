import { createContext, useContext, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  // Lê a sessão salva no localStorage (sobrevive a F5)
  const [token, setToken] = useState(() => localStorage.getItem("delivery_token"));
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("delivery_user") || "null")
  );

  const isLogged = Boolean(token);

  // Chamado após login/registro bem-sucedido
  function entrar(novoToken, novoUser) {
    localStorage.setItem("delivery_token", novoToken);
    localStorage.setItem("delivery_user", JSON.stringify(novoUser));
    setToken(novoToken);
    setUser(novoUser);
  }

  function sair() {
    localStorage.removeItem("delivery_token");
    localStorage.removeItem("delivery_user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isLogged, token, user, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}