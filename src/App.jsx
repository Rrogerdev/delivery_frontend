// src/App.jsx
import React from 'react';
import Home from './pages/Home'; // Importa a página criada
import Login from "./pages/Login";
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
