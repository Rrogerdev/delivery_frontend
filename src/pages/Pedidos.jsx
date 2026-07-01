import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function PedidosUsuario() {
  const [user, setUser] = useState({ nome: "teste" });
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const getPedidos = async () => {
      try {
        const data = await apiService.getPedidos();
        console.log("dados da api: ", data.data)
        setPedidos(data.data);
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };
    getPedidos();
  }, []);

  // Função auxiliar para traduzir o status numérico da API para texto
  const getStatusPedido = (statusId) => {
    switch(statusId) {
      case 1: return 'Em preparo';
      case 2: return 'Entregue';
      default: return 'Cancelado';
    }
  };

  return (
    <div className="menu-container">
      {/* Estilos CSS Injetados DIRETAMENTE no JSX */}
      <style>{`
        .menu-container {
          min-height: 100vh;
          background-color: #f9fafb;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #1f2937;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Header */
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .logo-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc2626;
          font-weight: 700;
          font-size: 1.25rem;
        }

        .logo-icon-bg {
          width: 2rem;
          height: 2rem;
          background-color: #dc2626;
          color: white;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .avatar-circle {
          width: 2rem;
          height: 2rem;
          background-color: #dc2626;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        /* Hero */
        .hero-banner {
          background: linear-gradient(135deg, #2A1613 0%, #1a0e0c 50%, #3a1d18 100%);
          color: white;
          padding: 5rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .hero-body {
          max-width: 72rem;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #422722;
          color: #EAB308;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.375rem 0.75rem;
          border-radius: 9999px;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          margin: 0 0 1rem 0;
          letter-spacing: -0.025em;
          color: white;
        }

        .hero-title span {
          color: #ef4444;
        }

        .hero-text {
          color: #d1d5db;
          font-size: 1.125rem;
          margin: 0;
        }

        /* Grid & Main Content */
        .content-section {
          max-width: 72rem;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .content-title-block {
          margin-bottom: 2rem;
        }

        .content-title-block h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .content-title-block p {
          color: #6b7280;
          font-size: 0.875rem;
          margin: 0.25rem 0 0 0;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        /* Cards de Pedidos */
        .restaurant-card {
          background-color: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border: 1px solid #f3f4f6;
          display: flex;
          flex-direction: column;
        }

        .card-media {
          position: relative;
          height: 12rem;
          width: 100%;
        }

        .card-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .status-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        /* Variações de Cores para o Status do Pedido */
        .status-preparo { background-color: #f59e0b; color: white; }
        .status-entregue { background-color: #22c55e; color: white; }
        .status-cancelado { background-color: #ef4444; color: white; }
        
        .status-dot {
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
        }

        .category-tag {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .card-body {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-body h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .order-number {
          font-size: 0.85rem;
          color: #9ca3af;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .items-list {
          font-size: 0.875rem;
          color: #4b5563;
          background-color: #f9fafb;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          border-left: 3px solid #dc2626;
        }

        .card-footer-layout {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dishes-label {
          font-size: 1rem;
          color: #111827;
          font-weight: 700;
        }

        .btn-ver-cardapio {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .btn-ver-cardapio-vermelho { background-color: #dc2626; color: white; }
        .btn-ver-cardapio-vermelho:hover { background-color: #b91c1c; }
      `}</style>

      {/* Navbar */}
      <header className="navbar">
        <div className="logo-box">
          <div className="logo-icon-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
              <path d="M7 2v20"></path>
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path>
            </svg>
          </div>
          MenuDigital
        </div>
        <div className="user-nav">
          <div className="user-profile">
            <div className="avatar-circle">JS</div>
            <span>{user.nome}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-body">
          <div className="hero-badge">
            <span>📦</span> Histórico de Pedidos
          </div>
          <h1 className="hero-title">
            Acompanhe seus <br />
            <span>pedidos</span> recentes
          </h1>
          <p className="hero-text">Verifique o status de preparo e entrega das suas refeições em tempo real.</p>
        </div>
      </section>

      {/* Listagem de Pedidos */}
      <main className="content-section">
        <div className="content-title-block">
          <h2>Seus Pedidos</h2>
          <p>{pedidos.length} {pedidos.length === 1 ? 'pedido localizado' : 'pedidos localizados'}</p>
        </div>

        <div className="grid-layout">
          {pedidos.map((pedido) => {
            // Convertendo o status numérico para texto
            const textoStatus = getStatusPedido(pedido.pedido_status);
            
            return (
              <div key={pedido.pedido_id} className="restaurant-card">
                
                <div className="card-media">
                  {/* Mantive um fallback para a imagem já que a API de pedidos não retorna uma */}
                  <img src={"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"} alt={`Restaurante ${pedido.restaurante_id}`} />
                  
                  <div className={`status-tag ${
                    textoStatus === 'Em preparo' ? 'status-preparo' : 
                    textoStatus === 'Entregue' ? 'status-entregue' : 'status-cancelado'
                  }`}>
                    <div className="status-dot"></div>
                    {textoStatus}
                  </div>

                  {/* Fallback visual para categoria já que a API de pedidos não traz isso */}
                  <div className="category-tag" style={{ color: '#dc2626' }}>
                    <span>🍽️</span>
                    Restaurante #{pedido.restaurante_id}
                  </div>
                </div>

                <div className="card-body">
                  {/* Como a API de pedidos só tem o ID do restaurante, mostramos ele ou um texto genérico */}
                  <h3>Restaurante #{pedido.restaurante_id}</h3>
                  <div className="order-number">Pedido #{pedido.pedido_id}</div>
                  
                  <div className="info-item">
                    <span style={{ fontSize: '1rem' }}>📅</span>
                    {/* Formatando a data da API */}
                    <span>{new Date(pedido.pedido_criacao_pedido).toLocaleDateString('pt-BR')} às {new Date(pedido.pedido_criacao_pedido).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>

                  {/* Iterando sobre os itens do pedido (Duplo map) */}
                  <div className="items-list">
                    <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Itens do pedido:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {pedido.itens.map((item) => (
                        <li key={item.item_pedido_id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span>{item.item_pedido_quantidade}x Prato #{item.prato_id}</span>
                          <span style={{ fontWeight: 500 }}>R$ {item.item_pedido_preco.toFixed(2).replace('.', ',')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="card-footer-layout">
                    <span className="dishes-label">
                      Total: R$ {pedido.pedido_valor_total?.toFixed(2).replace('.', ',')}
                    </span>
                    <button className="btn-ver-cardapio btn-ver-cardapio-vermelho">
                      Acompanhar
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
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