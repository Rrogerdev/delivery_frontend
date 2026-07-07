import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";




function Pagamentos() {

    const { isLogged } = useAuth();

    if (!isLogged) {
       return <Navigate to="/login" replace />;
    //    return <h1>Não está logado</h1>
      }
  return (
    <div>
      <h1>Bem-vindo a pagina de pagamentos!</h1>
    </div>
  );
}

export default Pagamentos;