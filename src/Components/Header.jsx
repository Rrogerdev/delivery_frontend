import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, sair } = useAuth();
  const { quantidadeTotal } = useCart();
  const navigate = useNavigate();

  const s = {
    bar: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px', borderBottom: '1px solid #e4e0d8', background: '#fff',
      fontFamily: "'Jost', sans-serif",
    },
    brand: { fontWeight: 600, fontSize: 18, color: '#8b6f4e', cursor: 'pointer' },
    right: { display: 'flex', alignItems: 'center', gap: 16, fontSize: 14 },
    cart: {
      cursor: 'pointer', border: '1px solid #e4e0d8', borderRadius: 4,
      padding: '6px 12px', background: '#f7f5f1',
    },
    logout: {
      cursor: 'pointer', border: 'none', background: 'transparent',
      color: '#8a8479', fontSize: 14, fontFamily: "'Jost', sans-serif",
    },
  };

  return (
    <div style={s.bar}>
      <span style={s.brand} onClick={() => navigate('/')}>DeliveryAPI</span>
      <div style={s.right}>
        <span>{user?.user_name || 'Usuário'}</span>
        <span style={s.cart} onClick={() => navigate('/checkout')}>
          Carrinho ({quantidadeTotal})
        </span>
        <button style={s.logout} onClick={() => { sair(); navigate('/login'); }}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Header;