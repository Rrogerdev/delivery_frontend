import axios from 'axios';

const servicos = {
  restaurante: "9521",
  cardapio: "9522",
  pedido: "9523",
  pagamento: "9524",
  usuario: "9525"
};

const baseURL = "http://academico3.rj.senac.br/20261prj5/delivery"

const createService = (serv) => {
  const api = axios.create({
    baseURL: `${baseURL}/${serv}`,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Adiciona o token automaticamente, caso exista
  api.interceptors.request.use((config) => {
    
    const token = localStorage.getItem("delivery_token");

    if (token) {
      console.log(token)
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return api;
};

export const restauranteApi = createService("restaurante");
export const pedidoApi = createService("pedido");
export const pagamentoApi = createService("pagamento");
export const usuarioApi = createService("usuario");

const apiService = {
  getUsuarios: async () => {
    return await usuarioApi.post("/usuarios");
  },

  getRestaurantes: async () => {
    return await restauranteApi.get('/restaurantes');
  },

  getPedidos: async () => {
    return await pedidoApi.get('/pedidos');
  },

  getPedidosByUsuario: async (id) => {
    return await pedidoApi.get(`/pedidos/usuario/${id}`);
  },

  getPratoNome: async (id) => {
    const data = await restauranteApi.get(`/pratos/${id}`)
    return data.data.nome
  },

  getCardapioByRestaurante: async (id) => {
    return await restauranteApi.get(`/restaurantes/${id}/pratos`)
  },

  // Nova função para criar o pedido enviando o payload para o backend
  criarPedido: async (dadosPedido) => {
    return await pedidoApi.post('/pedidos', dadosPedido);
  },

  criarUsuario: async (dadosUsuario) => {
    return await usuarioApi.post('/auth/registro/cliente', dadosUsuario)
  },

  logarUsuario: async (dadosLogin) =>{
    return await usuarioApi.post('/auth/login', dadosLogin)
  },

  realizarPagamento: async (dadosPagamento) =>{
    return await pagamentoApi.post("/pagamentos", dadosPagamento)
  },

  buscarCupom: async (cupomCodigo) =>{
    return await pagamentoApi.get(`/cupons/codigo/${cupomCodigo}`,)
  },

  atualizarPedido: async (idPedido) =>{
    return await pedidoApi.delete(`/pedidos/${idPedido}`)
  }
}

export default apiService;