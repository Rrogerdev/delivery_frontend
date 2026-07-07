import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export default function Pagar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(false);

  const { valorTotal, itens, pedidoId } = location.state || {};
  const valorFinal = Math.max(0, valorTotal - desconto);

  const handleAplicarCupom = async () => {
    if (!cupom) return;
    try {
      const response = await apiService.buscarCupom(cupom);
      setDesconto(response.data.cupom_desconto || 0);
      setCupomAplicado(true);
      alert("Cupom aplicado com sucesso!");
    } catch (error) {
      alert("Cupom inválido.");
    }
  };

  const handlePagamento = async () => {
    setLoading(true);
    try {
      const body = { "pedido_id": pedidoId, "pagamentos_valor": valorFinal };
      await apiService.realizarPagamento(body);
      alert("Pagamento concluído com sucesso!");
      navigate('/');
    } catch (error) {
      console.error("Erro no pagamento:", error);
      alert("Erro ao processar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  if (!valorTotal) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'system-ui' }}>
        <h2>Nenhum pedido selecionado.</h2>
        <button onClick={() => navigate('/')} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="menu-container">
      <style>{`
        .menu-container { min-height: 100vh; background-color: #f9fafb; font-family: system-ui, sans-serif; color: #1f2937; }
        .navbar { display: flex; align-items: center; padding: 1rem 2rem; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .logo-box { display: flex; align-items: center; gap: 0.5rem; color: #dc2626; font-weight: 700; font-size: 1.25rem; }
        .logo-icon-bg { width: 2rem; height: 2rem; background-color: #dc2626; color: white; border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; }
        
        .content-section { max-width: 48rem; margin: 3rem auto; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #f3f4f6; }
        h1 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-bottom: 0.5rem; }
        
        .cupom-box { display: flex; gap: 0.5rem; margin: 1.5rem 0; }
        .input-cupom { flex: 1; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; color: #111827 !important; background-color: #ffffff !important; }
        .input-cupom:focus { outline: 2px solid #dc2626; border-color: transparent; }
        
        /* Força a cor no autocompletar do navegador */
        .input-cupom:-webkit-autofill, .input-cupom:-webkit-autofill:hover, .input-cupom:-webkit-autofill:focus {
            -webkit-text-fill-color: #111827;
            -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
            transition: background-color 5000s ease-in-out 0s;
        }

        .btn-cupom { padding: 0.75rem 1.5rem; background: #374151; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; }
        .btn-cupom:hover { background: #1f2937; }
        
        .summary-list { list-style: none; padding: 0; margin: 2rem 0; border-top: 1px solid #f3f4f6; }
        .summary-item { display: flex; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #f3f4f6; font-size: 0.95rem; }
        
        .total-price { display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: #111827; margin-top: 1rem; }
        .btn-pagar { width: 100%; margin-top: 2rem; padding: 1rem; background-color: #dc2626; color: white; border: none; border-radius: 0.5rem; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .btn-pagar:hover { background-color: #b91c1c; }
        .btn-pagar:disabled { background-color: #9ca3af; cursor: not-allowed; }
      `}</style>

      <header className="navbar">
        <div className="logo-box">
          <div className="logo-icon-bg">🍽️</div>
          MenuDigital
        </div>
      </header>

      <main className="content-section">
        <h1>Finalizar Pagamento</h1>
        <p style={{ color: '#6b7280' }}>Pedido #{pedidoId}</p>

        <div className="cupom-box">
          <input 
            className="input-cupom" 
            placeholder="Código do cupom" 
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
            disabled={cupomAplicado}
          />
          <button className="btn-cupom" onClick={handleAplicarCupom} disabled={cupomAplicado}>
            Aplicar
          </button>
        </div>

        <ul className="summary-list">
          {itens.map((item, index) => (
            <li key={index} className="summary-item">
              <span>{item.item_pedido_quantidade}x {item.prato_nome_buscado}</span>
              <span>R$ {item.item_pedido_preco.toFixed(2).replace('.', ',')}</span>
            </li>
          ))}
          {desconto > 0 && (
            <li className="summary-item" style={{ color: '#22c55e', fontWeight: 'bold' }}>
              <span>Desconto</span>
              <span>- R$ {desconto.toFixed(2).replace('.', ',')}</span>
            </li>
          )}
        </ul>

        <div className="total-price">
          <span>Total</span>
          <span style={{ color: '#dc2626' }}>R$ {valorFinal.toFixed(2).replace('.', ',')}</span>
        </div>

        <button 
          className="btn-pagar"
          onClick={handlePagamento}
          disabled={loading}
        >
          {loading ? "Processando..." : "Confirmar Pagamento"}
        </button>
      </main>
    </div>
  );
}