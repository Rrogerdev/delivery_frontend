// src/App.jsx
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cardapio from './pages/Cardapio';
import Checkout from './pages/Checkout';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restaurante/:id" element={<Cardapio />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;