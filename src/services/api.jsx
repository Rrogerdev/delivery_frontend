import axios from 'axios';

const servicos = {
    restaurante: "9521",
    cardapio: "9522",
    pedido: "9523",
    pagamento: "9524",
    usuario: "9525"
  };
const baseURL = "http://10.136.38.50"

const createService = (port) =>
  axios.create({
    baseURL: `${baseURL}:${port}`,
    timeout: 5000,
    headers: { "Content-Type": "application/json" }
  });
export const restauranteApi = createService(9521);
export const cardapioApi = createService(9522);
export const pedidoApi = createService(9523);
export const pagamentoApi = createService(9524);
export const usuarioApi = createService(9523);

const apiService = {
    getUsuarios: async () => {
        return await usuarioApi.post("/usuarios");
    }
}



export default apiService;
