import axios from 'axios';

const servicos = {
    restaurante: "9521",
    cardapio: "9522",
    pedido: "9523",
    pagamento: "9524",
    usuario: "9525"
  };
const baseURL = "http://academico3.rj.senac.br/20261prj5/delivery"
const createService = (serv) =>{
  
  return axios.create({
    baseURL: `${baseURL}/${serv}`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" }
  });
}
export const restauranteApi = createService("restaurante");
export const pedidoApi = createService("pedido");
export const pagamentoApi = createService("pagamento");
export const usuarioApi = createService("usuario");

const apiService = {
    getUsuarios: async () => {
        return await usuarioApi.post("/usuarios");
    },

    getRestaurantes: async () =>{
      return await restauranteApi.get('/restaurantes');
    },

    getPedidos: async () =>{
      return await pedidoApi.get('/pedidos');
    },

    getPedidosByUsuario: async (id) =>{
      return await pedidoApi.get(`/pedidos/usuario/${id}`);
    },

    getCardapioByRestaurante: async (id) =>{
      return await restauranteApi.get(`/restaurantes/${id}/pratos`)
    }
}




export default apiService;
