import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Navigate, useNavigate } from "react-router-dom";
import { criarPedido, criarPagamento } from '../services/api';
import Header from '../components/Header';

function Checkout() {
  const { isLogged, user } = useAuth();
  const { itens, restauranteId, total, adicionar, remover, limpar } = useCart();
  const navigate = useNavigate();

  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null); // { pedidoId, pagamentoOk }

  if (!isLogged) return <Navigate to="/login" replace />;

  const fmt = (n) => `R$ ${Number(n).toFixed(2).replace('.', ',')}`;

  async function finalizar() {
    setErro('');
    setProcessando(true);
    try {
      // 1. Cria o pedido (serviço de pedido)
      const pedido = await criarPedido({
        usuarioId: user.user_id,
        restauranteId,
        itens,
      });

      const pedidoId = pedido.pedido_id;

      // 2. Cria o pagamento (serviço de pagamento). Se falhar, o pedido
      //    já existe — mostramos como criado e pagamento pendente, em vez
      //    de deixar o usuário sem feedback.
      let pagamentoOk = true;
      try {
        await criarPagamento({ pedidoId, valor: total });
      } catch {
        pagamentoOk = false;
      }

      setResultado({ pedidoId, pagamentoOk });
      limpar();
    } catch (err) {
      const msg = err.response?.data?.erro || err.response?.data?.error || 'Não foi possível criar o pedido.';
      setErro(msg);
    } finally {
      setProcessando(false);
    }
  }

  const s = {
    wrap: { fontFamily: "'Jost', sans-serif", color: '#1c1a17', background: '#f7f5f1', minHeight: '100vh' },
    content: { maxWidth: 640, margin: '0 auto', padding: '32px 24px' },
    title: { fontSize: 24, fontWeight: 500, marginBottom: 24 },
    item: {
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: '#fff', border: '1px solid #e4e0d8', borderRadius: 6,
      padding: 16, marginBottom: 12,
    },
    qtd: { display: 'flex', alignItems: 'center', gap: 8 },
    qtdBtn: { width: 28, height: 28, borderRadius: 4, border: '1px solid #e4e0d8', background: '#f7f5f1', cursor: 'pointer', fontSize: 16 },
    totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 500, margin: '20px 0' },
    btn: {
      width: '100%', background: '#8b6f4e', color: '#fff', border: 'none', borderRadius: 4,
      padding: 14, cursor: 'pointer', fontFamily: "'Jost', sans-serif", fontSize: 15, fontWeight: 500,
    },
    voltar: { background: 'none', border: 'none', color: '#8b6f4e', cursor: 'pointer', fontSize: 14, fontFamily: "'Jost', sans-serif" },
    msg: { color: '#8a8479', padding: 24, textAlign: 'center' },
    erro: { background: 'rgba(158,58,56,.08)', border: '1px solid rgba(158,58,56,.25)', color: '#9e3a38', padding: 12, borderRadius: 4, marginBottom: 12, fontSize: 14 },
    sucesso: { background: '#fff', border: '1px solid #e4e0d8', borderRadius: 6, padding: 32, textAlign: 'center' },
    check: { fontSize: 40, color: '#4a7c59', marginBottom: 12 },
  };

  // Tela de confirmação
  if (resultado) {
    return (
      <div style={s.wrap}>
        <Header />
        <div style={s.content}>
          <div style={s.sucesso}>
            <div style={s.check}>✓</div>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 8 }}>Pedido realizado!</div>
            <div style={{ color: '#8a8479', marginBottom: 4 }}>Pedido #{resultado.pedidoId}</div>
            <div style={{ color: resultado.pagamentoOk ? '#4a7c59' : '#9e3a38', fontSize: 14, marginBottom: 24 }}>
              {resultado.pagamentoOk ? 'Pagamento registrado com sucesso.' : 'Pagamento pendente — registre depois.'}
            </div>
            <button style={s.btn} onClick={() => navigate('/')}>Voltar ao início</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <Header />
      <div style={s.content}>
        <div style={s.title}>Seu carrinho</div>

        {itens.length === 0 ? (
          <>
            <div style={s.msg}>Seu carrinho está vazio.</div>
            <button style={s.voltar} onClick={() => navigate('/')}>← Ver restaurantes</button>
          </>
        ) : (
          <>
            {itens.map(({ prato, quantidade }) => (
              <div key={prato.id} style={s.item}>
                <div>
                  <div style={{ fontWeight: 500 }}>{prato.nome}</div>
                  <div style={{ color: '#8b6f4e', fontSize: 14, marginTop: 4 }}>{fmt(prato.preco)}</div>
                </div>
                <div style={s.qtd}>
                  <button style={s.qtdBtn} onClick={() => remover(prato.id)}>−</button>
                  <span>{quantidade}</span>
                  <button style={s.qtdBtn} onClick={() => adicionar(prato, restauranteId)}>+</button>
                </div>
              </div>
            ))}

            <div style={s.totalRow}>
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>

            {erro && <div style={s.erro}>{erro}</div>}

            <button style={s.btn} onClick={finalizar} disabled={processando}>
              {processando ? 'Processando…' : 'Finalizar pedido'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;