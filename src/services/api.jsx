import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// Detecção de ambiente
//
// LOCAL  → cada serviço numa porta do localhost (9522–9525)
// SENAC  → todos sob academico3.rj.senac.br/20261prj5/delivery/*
//          (proxy reverso mapeia cada caminho para a porta interna)
//
// Observação sobre as portas (corrigidas em relação ao arquivo antigo):
//   restaurante + cardápio  → 9522  (mesmo container)
//   pedido                  → 9523
//   pagamento               → 9524
//   usuario                 → 9525
// ─────────────────────────────────────────────────────────────

const IS_DEV = import.meta.env.DEV;
const SENAC_BASE = IS_DEV
  ? '/api'                                              // passa pelo proxy do Vite
  : 'http://academico3.rj.senac.br/20261prj5/delivery'; // produção, chamada direta

function baseFor(servico, porta) {
  return `${SENAC_BASE}/${servico}`;
}

function createService(servico, porta) {
  const instance = axios.create({
    baseURL: baseFor(servico, porta),
    timeout: 8000,
    headers: { 'Content-Type': 'application/json' },
  });

  // Anexa o token JWT (emitido pelo serviço de usuário) em toda chamada.
  // Serviços que não exigem auth simplesmente ignoram o header.
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('delivery_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
}

export const usuarioApi     = createService('usuario', 9525);
export const restauranteApi = createService('restaurante', 9522);
export const cardapioApi    = createService('restaurante', 9522); // mesmo container do restaurante
export const pedidoApi      = createService('pedido', 9523);
export const pagamentoApi   = createService('pagamento', 9524);

// ─────────────────────────────────────────────────────────────
// USUÁRIO  (Express + JWT — campos user_*)
// ─────────────────────────────────────────────────────────────

export async function login(email, senha) {
  const { data } = await usuarioApi.post('/auth/login', {
    user_email: email,
    user_password: senha,
  });
  return data; // { token, user }
}

export async function registrarCliente(payload) {
  // payload: { user_name, user_email, user_password, user_cpf, user_telefone, cliente_data_nascimento? }
  const { data } = await usuarioApi.post('/auth/registro/cliente', payload);
  return data;
}

export async function registrarEntregador(payload) {
  const { data } = await usuarioApi.post('/auth/registro/entregador', payload);
  return data;
}

// ─────────────────────────────────────────────────────────────
// RESTAURANTE + CARDÁPIO  (Restify — campos nome/preco/id)
// ─────────────────────────────────────────────────────────────

export async function listarRestaurantes() {
  const { data } = await restauranteApi.get('/restaurantes');
  return data;
}

export async function listarPratosDoRestaurante(restauranteId) {
  const { data } = await cardapioApi.get(`/restaurantes/${restauranteId}/pratos`);
  return data;
}

// ─────────────────────────────────────────────────────────────
// PEDIDO  (Restify — campos usuario_id / restaurante_id / itens[].prato_id)
//
// IMPORTANTE: este serviço NÃO tem validação nem auth middleware.
// O usuario_id vem do usuário logado (user.user_id), enviado no body.
// O pedido_status é numérico — significado ainda não definido pelo grupo;
// usamos 1 como padrão (ajustar quando o dono do serviço definir a tabela).
// ─────────────────────────────────────────────────────────────

const STATUS_PEDIDO_PADRAO = 1; // TODO: confirmar tabela de status com o time

export async function criarPedido({ usuarioId, restauranteId, itens }) {
  // itens recebidos do carrinho: [{ prato, quantidade }]
  // onde `prato` é o objeto retornado pelo cardápio (tem id, nome, preco)
  const itensPayload = itens.map(({ prato, quantidade }) => ({
    prato_id: prato.id,                       // cardápio devolve `id` → pedido espera `prato_id`
    item_pedido_quantidade: quantidade,
    item_pedido_preco: prato.preco,
  }));

  const valorTotal = itens.reduce(
    (soma, { prato, quantidade }) => soma + prato.preco * quantidade,
    0
  );

  const { data } = await pedidoApi.post('/pedidos', {
    usuario_id: usuarioId,
    restaurante_id: restauranteId,
    pedido_status: STATUS_PEDIDO_PADRAO,
    pedido_valor_total: valorTotal,
    pedido_criacao_pedido: new Date().toISOString(),
    itens: itensPayload,
  });

  return data; // pedido criado, com pedido_id e itens
}

// ─────────────────────────────────────────────────────────────
// PAGAMENTO  (Restify — campos pedido_id / pagamentos_valor / cupom_id?)
// ─────────────────────────────────────────────────────────────

export async function criarPagamento({ pedidoId, valor, cupomId = null }) {
  const { data } = await pagamentoApi.post('/pagamentos', {
    pedido_id: pedidoId,
    pagamentos_valor: valor,
    cupom_id: cupomId,
  });
  return data;
}