import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";
function Home() {

    const { isLogged } = useAuth();

    if (!isLogged) {
       return <Navigate to="/login" replace />;
    //    return <h1>Não está logado</h1>
      }
  return (
    <div>
      <h1>Bem-vindo à minha página inicial!</h1>
      <p>Esta é a primeira página criada no React.</p>
    </div>
  );
}

export default Home;