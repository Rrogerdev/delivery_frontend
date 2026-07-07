import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";



export default function PedidosUsuario() {
  const [user, setUser] = useState({ nome: "teste" });
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();



  const { isLogged } = useAuth();

  if (!isLogged) {
     return <Navigate to="/login" replace />;
  //    return <h1>Não está logado</h1>
    }


  useEffect(() => {
    const getPedidos = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("delivery_user"));
        const response = await apiService.getPedidosByUsuario(userData.user_id);
        
        const pedidosData = response.data || response; 

        const pedidosComNomes = await Promise.all(
          pedidosData.map(async (pedido) => {
            const itensAtualizados = await Promise.all(
              pedido.itens.map(async (item) => {
                try {
                  const nome = await apiService.getPratoNome(item.prato_id);
                  return { ...item, prato_nome_buscado: nome };
                } catch (erroPrato) {
                  return { ...item, prato_nome_buscado: `Prato #${item.prato_id}` }; 
                }
              })
            );
            return { ...pedido, itens: itensAtualizados };
          })
        );

        setPedidos(pedidosComNomes);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };
    
    getPedidos();
  }, []);

  const getStatusPedido = (statusId) => {
    switch(statusId) {
      case 1: return 'Em preparo';
      case 2: return 'Entregue';
      default: return 'Cancelado';
    }
  };

  return (
    <div className="menu-container">
      <style>{`
        .menu-container { min-height: 100vh; background-color: #f9fafb; font-family: system-ui; color: #1f2937; }
        .navbar { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .logo-box { display: flex; align-items: center; gap: 0.5rem; color: #dc2626; font-weight: 700; font-size: 1.25rem; }
        .logo-icon-bg { width: 2rem; height: 2rem; background-color: #dc2626; color: white; border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; }
        .user-nav { display: flex; align-items: center; gap: 1.5rem; font-size: 0.875rem; }
        .avatar-circle { width: 2rem; height: 2rem; background-color: #dc2626; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .hero-banner { background: linear-gradient(135deg, #2A1613 0%, #1a0e0c 50%, #3a1d18 100%); color: white; padding: 5rem 2rem; }
        .hero-body { max-width: 72rem; margin: 0 auto; }
        .hero-title { font-size: 3rem; font-weight: 800; color: white; margin: 0 0 1rem 0; }
        .hero-title span { color: #ef4444; }
        .content-section { max-width: 72rem; margin: 0 auto; padding: 3rem 2rem; }
        .grid-layout { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
        .restaurant-card { background-color: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; display: flex; flex-direction: column; }
        .card-media { position: relative; height: 12rem; width: 100%; }
        .card-media img { width: 100%; height: 100%; object-fit: cover; }
        .status-tag { position: absolute; top: 1rem; right: 1rem; padding: 0.25rem 0.6rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 0.35rem; }
        .status-preparo { background-color: #f59e0b; color: white; }
        .status-entregue { background-color: #22c55e; color: white; }
        .status-cancelado { background-color: #ef4444; color: white; }
        .card-body { padding: 1.25rem; display: flex; flex-direction: column; flex: 1; }
        .items-list { font-size: 0.875rem; color: #4b5563; background-color: #f9fafb; padding: 0.75rem; border-radius: 0.5rem; margin-bottom: 1.5rem; border-left: 3px solid #dc2626; }
        .btn-ver-cardapio { padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; background-color: #dc2626; color: white; }
      `}</style>

      <header className="navbar">
        <div className="logo-box">MenuDigital</div>
        <div className="user-nav">
          <div className="avatar-circle">JS</div>
          <span>{user.nome}</span>
        </div>
      </header>

      <section className="hero-banner">
        <div className="hero-body">
          <h1 className="hero-title">Acompanhe seus <br /> <span>pedidos</span> recentes</h1>
        </div>
      </section>

      <main className="content-section">
        <div className="grid-layout">
          {pedidos.map((pedido) => {
            const textoStatus = getStatusPedido(pedido.pedido_status);
            
            return (
              <div key={pedido.pedido_id} className="restaurant-card">
                <div className="card-media">
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80" alt="restaurante" />
                  <div className={`status-tag ${textoStatus === 'Em preparo' ? 'status-preparo' : textoStatus === 'Entregue' ? 'status-entregue' : 'status-cancelado'}`}>
                    {textoStatus}
                  </div>
                </div>

                <div className="card-body">
                  <h3>Restaurante #{pedido.restaurante_id}</h3>
                  <div className="items-list">
                    <strong>Itens:</strong>
                    <ul>
                      {pedido.itens.map((item) => (
                        <li key={item.item_pedido_id}>
                          {item.item_pedido_quantidade}x {item.prato_nome_buscado}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-footer-layout">
                    <span>Total: R$ {pedido.pedido_valor_total?.toFixed(2).replace('.', ',')}</span>
                    <button 
                      className="btn-ver-cardapio"
                      onClick={() => navigate('/pagar', { 
                        state: { 
                          valorTotal: pedido.pedido_valor_total,
                          itens: pedido.itens,
                          pedidoId: pedido.pedido_id
                        } 
                      })}
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}