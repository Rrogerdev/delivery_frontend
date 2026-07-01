import React from 'react';
import Home from './pages/Home'; 
import Login from "./pages/Login";
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from "react-router-dom";
import Pagamentos from './pages/Pagamentos';
import Pedidos from './pages/Pedidos';
import Cardapio from './pages/Cardapio';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/cardapio/:id" element={<Cardapio />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
