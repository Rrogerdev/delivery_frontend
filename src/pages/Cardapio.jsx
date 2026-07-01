import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export default function Cardapio() {
  const { id } = useParams(); // Captura o ID do restaurante da URL (ex: /cardapio/1)
  const navigate = useNavigate();
  const [pratos, setPratos] = useState([]);
  const [restauranteInfo, setRestauranteInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardapioDados = async () => {
      try {
        setLoading(true);
        // Faz a chamada real para a sua API passando o ID do restaurante por parâmetro
        const response = await apiService.getCardapioByRestaurante(id);
        
        // Garante a extração dos dados mesmo se vierem dentro de .data ou diretamente no array
        const dadosCardapio = response.data || response;
        console.log("Dados do cardápio recebidos da API: ", dadosCardapio);
        
        setPratos(dadosCardapio);

        // Como o nó 'restaurante' veio na estrutura anterior, buscamos as informações dele do primeiro prato encontrado
        if (dadosCardapio && dadosCardapio.length > 0 && dadosCardapio[0].restaurante) {
          setRestauranteInfo(dadosCardapio[0].restaurante);
        } else {
          // Fallback caso a rota retorne apenas os pratos sem o objeto restaurante aninhado
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

    if (id) {
      getCardapioDados();
    }
  }, [id]);

  // Agrupa os itens do cardápio por categoria automaticamente
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
        .dish-footer { display: flex; align-items: center; justify-content: space-between; }
        .dish-price { font-size: 1.25rem; font-weight: 700; color: #22c55e; }
        .badge-indisponivel { background-color: #ef4444; color: white; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 0.375rem; }
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
                  const precoFormatado = Number(prato.preco).toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  });

                  return (
                    <div key={prato.id} className={`dish-card ${!disponivel ? 'indisponivel' : ''}`}>
                      <div className="dish-info">
                        <h4>{prato.nome}</h4>
                        <p>{prato.descricao || "Sem descrição disponível."}</p>
                      </div>
                      <div className="dish-footer">
                        <span className="dish-price">{precoFormatado}</span>
                        {!disponivel && <span className="badge-indisponivel">Esgotado</span>}
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