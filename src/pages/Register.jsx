import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
    const { isLogged } = useAuth();

    if (isLogged) {
       return <h1>tu já está logado</h1>
      }
  return (
    <div>
      <h1>Página de fazer conta</h1>
      <p>Faz formulário de registro</p>

    </div>
  );
}

export default Register;