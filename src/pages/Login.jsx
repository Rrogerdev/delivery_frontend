import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const { isLogged } = useAuth();

    if (isLogged) {
       return <h1>tu já está logado</h1>
      }
  return (
    <div>
      <h1>Página de fazer login</h1>
      <p>Faz formulário de login</p>

      <button onClick={() => navigate("/register")}>Não tenho conta</button>
    </div>
  );
}

export default Login;