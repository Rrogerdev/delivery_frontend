import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from "react-router-dom";
import { listarRestaurantes } from '../services/api';
import Header from '../components/Header';

function Home() {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  const [restaurantes, setRestaurantes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!isLogged) return;
    listarRestaurantes()
      .then(setRestaurantes)
      .catch(() => setErro('Não foi possível carregar os restaurantes.'))
      .finally(() => setCarregando(false));
  }, [isLogged]);

  if (!isLogged) return <Navigate to="/login" replace />;

  const s = {
    wrap: { fontFamily: "'Jost', sans-serif", color: '#1c1a17', background: '#f7f5f1', minHeight: '100vh' },
    content: { maxWidth: 880, margin: '0 auto', padding: '32px 24px' },
    title: { fontSize: 24, fontWeight: 500, marginBottom: 4 },
    sub: { color: '#8a8479', fontSize: 14, marginBottom: 24 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 },
    card: {
      background: '#fff', border: '1px solid #e4e0d8', borderRadius: 6,
      padding: 20, cursor: 'pointer', transition: 'border-color .15s',
    },
    nome: { fontWeight: 500, fontSize: 17, marginBottom: 4 },
    cat: { color: '#8b6f4e', fontSize: 12, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 },
    end: { color: '#8a8479', fontSize: 13 },
    msg: { color: '#8a8479', padding: 24 },
  };

  return (
    <div style={s.wrap}>
      <Header />
      <div style={s.content}>
        <div style={s.title}>Restaurantes</div>
        <div style={s.sub}>Escolha um restaurante para ver o cardápio</div>

        {carregando && <div style={s.msg}>Carregando…</div>}
        {erro && <div style={{ ...s.msg, color: '#9e3a38' }}>{erro}</div>}
        {!carregando && !erro && restaurantes.length === 0 && (
          <div style={s.msg}>Nenhum restaurante disponível no momento.</div>
        )}

        <div style={s.grid}>
          {restaurantes.map((r) => (
            <div
              key={r.id}
              style={s.card}
              onClick={() => navigate(`/restaurante/${r.id}`)}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8b6f4e')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e4e0d8')}
            >
              <div style={s.nome}>{r.nome}</div>
              {r.restaurante_categoria && <div style={s.cat}>{r.restaurante_categoria}</div>}
              {r.endereco && <div style={s.end}>{r.endereco}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;