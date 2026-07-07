import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // IMPORTADO O NAVIGATOR
import apiService from '../services/api';

export default function MenuDigital() {
  const [user, setUser] = useState({});
  const [restaurantes, setRestaurantes] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ESTADO PARA CONTROLAR O MENU DO PERFIL
  const navigate = useNavigate(); // INICIALIZADO O NAVIGATOR

  useEffect(() => {
    const getRestaurantes = async () => {
      try {
        const response = await apiService.getRestaurantes();
        setRestaurantes(response.data || response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    getRestaurantes();
    const userData = JSON.parse(localStorage.getItem("delivery_user"))
    setUser(userData)
  }, []);

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
          position: relative; /* Adicionado para posicionamento do menu */
          z-index: 10;
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
          position: relative; /* Garante que o menu alinhe com o container do perfil */
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          user-select: none;
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

        /* Menu Dropdown do Usuário */
        .profile-dropdown {
          position: absolute;
          top: 110%;
          right: 0;
          background-color: white;
          min-width: 160px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.15s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          padding: 0.75rem 1rem;
          color: #374151;
          text-align: left;
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background-color 0.2s;
        }

        .dropdown-item:hover {
          background-color: #f3f4f6;
          color: #dc2626;
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

        /* Cards */
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
          background-color: #e5e7eb;
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

        .status-aberto { background-color: #22c55e; color: white; }
        .status-fechado { background-color: #f87171; color: white; }
        
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
          color: #dc2626;
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
          margin: 0 0 0.25rem 0;
        }
        
        .card-description {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
          min-height: 1.25rem;
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

        .card-footer-layout {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dishes-label {
          font-size: 0.875rem;
          color: #9ca3af;
          font-weight: 500;
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
        
        .btn-indisponivel { background-color: #e5e7eb; color: #9ca3af; cursor: not-allowed; }
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
          {/* Adicionado onClick para abrir/fechar o menu */}
          <div className="user-profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="avatar-circle">JS</div>
            <span>{user.user_name}</span>
            {/* O ícone rotaciona levemente dependendo do estado do menu */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
              style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>

          {/* MENU DROPDOWN CONDICIONAL */}
          {isMenuOpen && (
            <div className="profile-dropdown">
              <button 
                className="dropdown-item" 
                onClick={() => {
                  setIsMenuOpen(false); // Fecha o menu ao clicar
                  navigate('/pedidos'); // Redireciona
                }}
              >
                <span>📦</span> Meus Pedidos
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-body">
          <div className="hero-badge">
            <span>👾</span> Cardápio Digital
          </div>
          <h1 className="hero-title">
            Escolha seu <br />
            <span>restaurante</span> favorito
          </h1>
          <p className="hero-text">Navegue pelo cardápio completo de cada restaurante e descubra pratos incríveis.</p>
        </div>
      </section>

      {/* Listagem */}
      <main className="content-section">
        <div className="content-title-block">
          <h2>Restaurantes disponíveis</h2>
          <p>{restaurantes.length} {restaurantes.length === 1 ? 'estabelecimento' : 'estabelecimentos'}</p>
        </div>

        <div className="grid-layout">
          {restaurantes.map((restaurante) => {
            const isAberto = restaurante.status === 1;
            const textoStatus = isAberto ? "Aberto" : "Fechado";
            const classeStatus = isAberto ? "status-aberto" : "status-fechado";
            const classeBotao = isAberto ? "btn-ver-cardapio btn-ver-cardapio-vermelho" : "btn-ver-cardapio btn-indisponivel";
            const textoBotao = isAberto ? "Ver cardápio" : "Indisponível";
            
            const imagemFallback = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80";

            return (
              <div key={restaurante.id} className="restaurant-card">
                
                <div className="card-media">
                  <img src={restaurante.imagem || imagemFallback} alt={restaurante.nome} />
                  <div className={`status-tag ${classeStatus}`}>
                    <div className="status-dot"></div>
                    {textoStatus}
                  </div>
                  <div className="category-tag">
                    <span>🍽️</span>
                    {restaurante.restaurante_categoria}
                  </div>
                </div>

                <div className="card-body">
                  <h3>{restaurante.nome}</h3>
                  <p className="card-description">
                    {restaurante.descricao ? restaurante.descricao : ""}
                  </p>
                  
                  <div className="info-item">
                    <span style={{ fontSize: '1rem' }}>📍</span>
                    <span>{restaurante.endereco}</span>
                  </div>
                  
                  <div className="info-item" style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1rem' }}>📞</span>
                    <span>{restaurante.restaurante_telefone}</span>
                  </div>

                  <div className="card-footer-layout">
                    <span className="dishes-label">
                      Visualizar
                    </span>
                    <button 
                      className={classeBotao}
                      onClick={() => isAberto && navigate(`/cardapio/${restaurante.id}`)}
                      disabled={!isAberto}
                    >
                      {textoBotao}
                      {isAberto && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      )}
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