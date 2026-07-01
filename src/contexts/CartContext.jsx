import { createContext, useContext, useState } from "react";

const CartContext = createContext({});

export function CartProvider({ children }) {
  // itens: [{ prato, quantidade }]  (prato = objeto vindo do cardápio)
  const [itens, setItens] = useState([]);
  // pedido só pode conter pratos de UM restaurante por vez
  const [restauranteId, setRestauranteId] = useState(null);

  function adicionar(prato, restId) {
    // Se está mudando de restaurante, zera o carrinho
    if (restauranteId !== null && restauranteId !== restId) {
      const trocar = window.confirm(
        "Seu carrinho tem itens de outro restaurante. Deseja esvaziar e começar um novo pedido?"
      );
      if (!trocar) return;
      setItens([{ prato, quantidade: 1 }]);
      setRestauranteId(restId);
      return;
    }

    setRestauranteId(restId);
    setItens((atual) => {
      const existe = atual.find((i) => i.prato.id === prato.id);
      if (existe) {
        return atual.map((i) =>
          i.prato.id === prato.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...atual, { prato, quantidade: 1 }];
    });
  }

  function remover(pratoId) {
    setItens((atual) => {
      const novo = atual
        .map((i) =>
          i.prato.id === pratoId ? { ...i, quantidade: i.quantidade - 1 } : i
        )
        .filter((i) => i.quantidade > 0);
      if (novo.length === 0) setRestauranteId(null);
      return novo;
    });
  }

  function limpar() {
    setItens([]);
    setRestauranteId(null);
  }

  const total = itens.reduce(
    (soma, { prato, quantidade }) => soma + prato.preco * quantidade,
    0
  );

  const quantidadeTotal = itens.reduce((s, i) => s + i.quantidade, 0);

  return (
    <CartContext.Provider
      value={{ itens, restauranteId, total, quantidadeTotal, adicionar, remover, limpar }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}