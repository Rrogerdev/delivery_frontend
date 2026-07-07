import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from "react-router-dom";



export default function Cardapio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pratos, setPratos] = useState([]);
  const [restauranteInfo, setRestauranteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adicionando, setAdicionando] = useState(false);
  const [user, setUser] = useState({})


  const { isLogged } = useAuth();

  if (!isLogged) {
     return <Navigate to="/login" replace />;
  //    return <h1>Não está logado</h1>
    }



  useEffect(() => {
    const getCardapioDados = async () => {
      try {

        setUser(userData)
        setLoading(true);
        const response = await apiService.getCardapioByRestaurante(id);
        
        const dadosCardapio = response.data || response;
        console.log("Dados do cardápio recebidos da API aa: ", dadosCardapio);
        
        setPratos(dadosCardapio);

        if (dadosCardapio && dadosCardapio.length > 0 && dadosCardapio[0].restaurante) {
          setRestauranteInfo(dadosCardapio[0].restaurante);
        } else {
          setRestauranteInfo({
            nome: "Cardápio do Estabelecimento",
            restaurante_categoria: "Geral",
            endereco: "Endereço não informado",
            restaurante_telefone: "Telefone não informado"
          });
        }
      } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
      } finally {
        setLoading(false);
      }
    };
        const userData = JSON.parse(localStorage.getItem("delivery_user"))
    if (id) {
      getCardapioDados();
    }
  }, [id]);

  const handleAdicionarPedido = async (prato) => {
    try {
      setAdicionando(true);
      
      const usuario_id = user.user_id;

      const payload = {
        usuario_id: usuario_id,
        restaurante_id: parseInt(id),
        pedido_status: 1,
        pedido_valor_total: parseFloat(prato.preco || prato.prato_preco),
        pedido_criacao_pedido: new Date().toISOString(), // SOLUÇÃO DO FRONTEND: Envia a data para evitar o erro do backend
        itens: [
          {
            prato_id: prato.id || prato.prato_id,
            item_pedido_quantidade: 1,
            item_pedido_preco: parseFloat(prato.preco || prato.prato_preco)
          }
        ]
      };

      const response = await apiService.criarPedido(payload);
      console.log("Pedido registrado com sucesso:", response.data);
      alert(`1x ${prato.nome} adicionado ao pedido!`);
      
    } catch (error) {
      console.error("Erro ao adicionar prato ao pedido:", error);
      alert("Falha ao processar o pedido. Tente novamente.");
    } finally {
      setAdicionando(false);
    }
  };

  const pratosAgrupados = pratos.reduce((acc, prato) => {
    const categoriaNome = prato.categoria?.nome || "Outros";
    if (!acc[categoriaNome]) acc[categoriaNome] = [];
    acc[categoriaNome].push(prato);
    return acc;
  }, {});

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando cardápio...</div>;

  return (
    <div className="cardapio-page">
      <style>{`
        .cardapio-page { min-height: 100vh; background-color: #f9fafb; font-family: system-ui, -apple-system, sans-serif; color: #1f2937; }
        .btn-voltar { display: inline-flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #4b5563; font-weight: 600; cursor: pointer; padding: 1.5rem 2rem; font-size: 0.95rem; }
        .btn-voltar:hover { color: #dc2626; }
        .restaurant-header { background-color: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 2rem; }
        .header-content { max-width: 72rem; margin: 0 auto; }
        .header-content h1 { font-size: 2.25rem; font-weight: 800; margin: 0.5rem 0; color: #111827; }
        .restaurant-meta { display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.875rem; color: #6b7280; }
        .menu-sections { max-width: 72rem; margin: 0 auto; padding: 2rem; }
        .category-section { margin-bottom: 3rem; }
        .category-title { font-size: 1.5rem; font-weight: 700; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .dish-card { background: white; border: 1px solid #f3f4f6; border-radius: 0.75rem; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .dish-card.indisponivel { opacity: 0.5; }
        .dish-info h4 { font-size: 1.125rem; font-weight: 700; margin: 0 0 0.5rem 0; }
        .dish-info p { font-size: 0.875rem; color: #6b7280; margin: 0 0 1rem 0; }
        .dish-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; }
        .dish-price { font-size: 1.25rem; font-weight: 700; color: #22c55e; }
        .badge-indisponivel { background-color: #ef4444; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 0.375rem; }
        
        .btn-adicionar { background-color: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: background-color 0.2s; }
        .btn-adicionar:hover:not(:disabled) { background-color: #dc2626; }
        .btn-adicionar:disabled { background-color: #fca5a5; cursor: not-allowed; }
      `}</style>

      <button className="btn-voltar" onClick={() => navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg>
        Voltar
      </button>

      <header className="restaurant-header">
        <div className="header-content">
          <h1>{restauranteInfo?.nome}</h1>
          <div className="restaurant-meta">
            <span>🍽️ {restauranteInfo?.restaurante_categoria}</span>
            <span>📍 {restauranteInfo?.endereco}</span>
            <span>📞 {restauranteInfo?.restaurante_telefone}</span>
          </div>
        </div>
      </header>

      <main className="menu-sections">
        {Object.keys(pratosAgrupados).length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
            Nenhum prato encontrado para este restaurante.
          </div>
        ) : (
          Object.keys(pratosAgrupados).map((categoriaNome) => (
            <section key={categoriaNome} className="category-section">
              <h3 className="category-title">{categoriaNome}</h3>
              <div className="menu-grid">
                {pratosAgrupados[categoriaNome].map((prato) => {
                  const disponivel = prato.disponibilidade === 1;
                  const precoFormatado = Number(prato.preco || prato.prato_preco).toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  });

                  return (
                    <div key={prato.id || prato.prato_id} className={`dish-card ${!disponivel ? 'indisponivel' : ''}`}>
                      <div className="dish-info">
                        <h4>{prato.nome}</h4>
                        <p>{prato.descricao || "Sem descrição disponível."}</p>
                      </div>
                      <div className="dish-footer">
                        <span className="dish-price">{precoFormatado}</span>
                        {disponivel ? (
                          <button 
                            className="btn-adicionar" 
                            onClick={() => handleAdicionarPedido(prato)}
                            disabled={adicionando}
                          >
                            {adicionando ? 'Adicionando...' : 'Adicionar'}
                          </button>
                        ) : (
                          <span className="badge-indisponivel">Esgotado</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </main>
    </div>
  );
}