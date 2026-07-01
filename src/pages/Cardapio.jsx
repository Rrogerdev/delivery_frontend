import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { listarPratosDoRestaurante } from '../services/api';
import Header from '../components/Header';

function Cardapio() {
  const { isLogged } = useAuth();
  const { adicionar } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [pratos, setPratos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (!isLogged) return;
    listarPratosDoRestaurante(id)
      .then(setPratos)
      .catch(() => setErro('Não foi possível carregar o cardápio.'))
      .finally(() => setCarregando(false));
  }, [isLogged, id]);

  if (!isLogged) return <Navigate to="/login" replace />;

  const fmt = (n) => `R$ ${Number(n).toFixed(2).replace('.', ',')}`;

  const s = {
    wrap: { fontFamily: "'Jost', sans-serif", color: '#1c1a17', background: '#f7f5f1', minHeight: '100vh' },
    content: { maxWidth: 720, margin: '0 auto', padding: '32px 24px' },
    voltar: { background: 'none', border: 'none', color: '#8b6f4e', cursor: 'pointer', fontSize: 14, marginBottom: 16, fontFamily: "'Jost', sans-serif" },
    title: { fontSize: 24, fontWeight: 500, marginBottom: 24 },
    item: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: '#fff', border: '1px solid #e4e0d8', borderRadius: 6,
      padding: 16, marginBottom: 12,
    },
    nome: { fontWeight: 500, fontSize: 16 },
    desc: { color: '#8a8479', fontSize: 13, marginTop: 2 },
    preco: { color: '#8b6f4e', fontWeight: 500, marginTop: 6 },
    btn: {
      background: '#8b6f4e', color: '#fff', border: 'none', borderRadius: 4,
      padding: '8px 16px', cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: 14,
    },
    btnOff: {
      background: '#e4e0d8', color: '#8a8479', border: 'none', borderRadius: 4,
      padding: '8px 16px', cursor: 'not-allowed', fontSize: 14, fontFamily: "'Jost', sans-serif",
    },
    msg: { color: '#8a8479', padding: 24 },
  };

  return (
    <div style={s.wrap}>
      <Header />
      <div style={s.content}>
        <button style={s.voltar} onClick={() => navigate('/')}>← Voltar aos restaurantes</button>
        <div style={s.title}>Cardápio</div>

        {carregando && <div style={s.msg}>Carregando…</div>}
        {erro && <div style={{ ...s.msg, color: '#9e3a38' }}>{erro}</div>}
        {!carregando && !erro && pratos.length === 0 && (
          <div style={s.msg}>Este restaurante ainda não tem pratos cadastrados.</div>
        )}

        {pratos.map((prato) => {
          const indisponivel = prato.disponibilidade === 0;
          return (
            <div key={prato.id} style={s.item}>
              <div>
                <div style={s.nome}>{prato.nome}</div>
                {prato.descricao && <div style={s.desc}>{prato.descricao}</div>}
                <div style={s.preco}>{fmt(prato.preco)}</div>
              </div>
              <button
                style={indisponivel ? s.btnOff : s.btn}
                disabled={indisponivel}
                onClick={() => adicionar(prato, Number(id))}
              >
                {indisponivel ? 'Indisponível' : 'Adicionar'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cardapio;