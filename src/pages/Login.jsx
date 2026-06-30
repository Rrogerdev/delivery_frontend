import React, { useState } from 'react';

// ── Configuração da URL Base ────────────────────────────────────────
const BASE_URL = typeof window !== 'undefined'
  ? window.location.origin + window.location.pathname.replace(/\/(login|cadastro)\/?$/, '').replace(/\/$/, '')
  : '';

// ── Estilos CSS Originais ───────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #f7f5f1;
    --surface:   #ffffff;
    --border:    #e4e0d8;
    --accent:    #8b6f4e;
    --accent-dk: #6b5239;
    --text:      #1c1a17;
    --muted:     #8a8479;
    --success:   #4a7c59;
    --error:     #9e3a38;
    --radius:    4px;
  }

  .app-container {
    height: 100%;
    background: var(--bg);
    color: var(--text);
    font-family: 'Jost', sans-serif;
    font-size: 15px;
    font-weight: 300;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
  }

  .panel-left {
    position: relative;
    background: #2a2420;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px;
    overflow: hidden;
  }

  .panel-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 50% at 10% 20%, rgba(139,111,78,.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
  }

  .brand-icon {
    width: 36px;
    height: 36px;
    background: var(--accent);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .brand-icon svg { color: #fff; }

  .brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: .5px;
    color: #f0ece4;
  }

  .hero { position: relative; }

  .hero-label {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    opacity: .9;
  }

  .hero h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(42px, 4vw, 64px);
    font-weight: 500;
    line-height: 1.08;
    letter-spacing: -.5px;
    margin-bottom: 24px;
    color: #f0ece4;
  }

  .hero h1 em { font-style: italic; color: #c9a97a; }

  .hero p {
    color: #9e9488;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.8;
    max-width: 320px;
  }

  .stats { display: flex; gap: 36px; position: relative; }

  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
    color: #c9a97a;
    letter-spacing: .5px;
  }

  .stat-label {
    font-size: 11px;
    font-weight: 300;
    color: #6e6358;
    margin-top: 4px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .panel-right {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 24px;
  }

  .card { width: 100%; max-width: 440px; }

  .tabs {
    display: flex;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 4px;
    margin-bottom: 32px;
  }

  .tab {
    flex: 1;
    padding: 10px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .3px;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all .2s;
  }

  .tab.active { background: var(--accent); color: #fff; }

  .form-view { display: none; flex-direction: column; gap: 16px; }
  .form-view.active { display: flex; }

  .form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -.3px;
    margin-bottom: 2px;
  }

  .form-subtitle {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 8px;
  }

  label {
    font-size: 11px;
    font-weight: 400;
    color: var(--muted);
    display: block;
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  input, select {
    width: 100%;
    padding: 12px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--text);
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 300;
    outline: none;
    transition: border-color .2s;
    -webkit-appearance: none;
  }

  input:focus, select:focus { border-color: var(--accent); }
  input::placeholder { color: var(--muted); }

  .field { display: flex; flex-direction: column; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .section-label {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--accent);
    margin-top: 6px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }

  .entregador-fields { display: none; flex-direction: column; gap: 16px; }
  .entregador-fields.show { display: flex; }

  .btn {
    width: 100%;
    padding: 13px;
    background: var(--accent);
    border: none;
    border-radius: var(--radius);
    color: #fff;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .5px;
    cursor: pointer;
    transition: background .2s, transform .1s;
    margin-top: 4px;
  }

  .btn:hover  { background: var(--accent-dk); }
  .btn:active { transform: scale(.98); }
  .btn:disabled { opacity: .5; cursor: not-allowed; }

  .alert {
    padding: 12px 14px;
    border-radius: var(--radius);
    font-size: 13px;
    display: none;
  }

  .alert.success { background: rgba(74,124,89,.1);  border: 1px solid rgba(74,124,89,.3);  color: var(--success); display: block; }
  .alert.error   { background: rgba(158,58,56,.08); border: 1px solid rgba(158,58,56,.25); color: var(--error);   display: block; }

  .dashboard { display: none; width: 100%; }
  .dashboard.active { display: block; }

  .dash-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .dash-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -.3px;
  }

  .dash-subtitle { font-size: 13px; color: var(--muted); margin-top: 2px; }

  .btn-sm { padding: 8px 14px; font-size: 13px; width: auto; margin-top: 0; }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
  }

  .btn-ghost:hover { background: var(--surface); color: var(--text); }

  .profile-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    margin-bottom: 20px;
  }

  .profile-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .avatar {
    width: 52px;
    height: 52px;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: #fff;
    flex-shrink: 0;
  }

  .profile-name {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-size: 20px;
  }

  .profile-role { font-size: 12px; color: var(--muted); margin-top: 2px; }

  .badge {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: .3px;
    margin-left: auto;
  }

  .badge-cliente    { background: rgba(139,111,78,.15); color: var(--accent); }
  .badge-entregador { background: rgba(74,124,89,.15);  color: var(--success); }
  .badge-admin      { background: rgba(110,99,140,.18); color: #6e638c; }

  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .info-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 4px; }
  .info-value { font-size: 14px; font-weight: 400; }

  .token-box {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px;
    margin-top: 16px;
  }

  .token-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px; }

  .token-value {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: var(--accent);
    word-break: break-all;
    line-height: 1.5;
  }

  .divider { height: 1px; background: var(--border); margin: 4px 0; }

  @media (max-width: 768px) {
    .app-container { grid-template-columns: 1fr; }
    .panel-left { display: none; }
    .panel-right { padding: 32px 20px; align-items: flex-start; padding-top: 48px; }
  }
`;

export default function DeliveryAuth() {
  // ── Estados de Autenticação e Visibilidade ────────────────────────
  const [token, setToken] = useState(() => localStorage.getItem('delivery_token') || null);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('delivery_user') || 'null'));
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && /\/cadastro\/?$/.test(window.location.pathname)) {
      return 'register';
    }
    return 'login';
  });

  // ── Estados do Formulário de Login ──────────────────────────────
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginAlert, setLoginAlert] = useState({ message: '', type: '' });

  // ── Estados do Formulário de Cadastro ───────────────────────────
  const [regRole, setRegRole] = useState('CLIENTE');
  const [regName, setRegName] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regNascimento, setRegNascimento] = useState('');
  
  // Campos específicos do Entregador
  const [regCnhNumero, setRegCnhNumero] = useState('');
  const [regCnhCategoria, setRegCnhCategoria] = useState('A');
  const [regCnhValidade, setRegCnhValidade] = useState('');
  const [regVeiculoTipo, setRegVeiculoTipo] = useState('MOTO');
  const [regVeiculoPlaca, setRegVeiculoPlaca] = useState('');
  const [registerAlert, setRegisterAlert] = useState({ message: '', type: '' });

  // ── Lógica de Abas ────────────────────────────────────────────────
  const switchTab = (tab) => {
    setActiveTab(tab);
    setLoginAlert({ message: '', type: '' });
    setRegisterAlert({ message: '', type: '' });
  };

  // ── Manipulação do Login ──────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = loginEmail.trim();
    const password = loginPassword;

    if (!email || !password) {
      return setLoginAlert({ message: 'Preencha e-mail e senha.', type: 'error' });
    }

    setLoginAlert({ message: '', type: '' });

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setLoginAlert({ 
          message: data.error || data.message || 'Credenciais inválidas.', 
          type: 'error' 
        });
      }

      const userToken = data.token;
      const userData = data.user ?? data;

      setToken(userToken);
      setUser(userData);
      localStorage.setItem('delivery_token', userToken);
      localStorage.setItem('delivery_user', JSON.stringify(userData));

    } catch (err) {
      setLoginAlert({ 
        message: 'Não foi possível conectar à API. Verifique se o servidor está rodando.', 
        type: 'error' 
      });
    }
  };

  // ── Manipulação do Cadastro ───────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    const name = regName.trim();
    const cpf = regCpf.trim();
    const phone = regPhone.trim();
    const email = regEmail.trim();
    const password = regPassword;

    if (!name || !cpf || !email || !password) {
      return setRegisterAlert({ message: 'Nome, CPF, e-mail e senha são obrigatórios.', type: 'error' });
    }

    if (password.length < 8) {
      return setRegisterAlert({ message: 'A senha deve ter no mínimo 8 caracteres.', type: 'error' });
    }

    const body = {
      user_name: name,
      user_email: email,
      user_password: password,
      user_cpf: cpf.replace(/\D/g, ''),
      user_telefone: phone.replace(/\D/g, ''),
    };

    let endpoint;

    if (regRole === 'ENTREGADOR') {
      endpoint = '/auth/registro/entregador';

      const cnhNumero = regCnhNumero.replace(/\D/g, '');
      const cnhValidade = regCnhValidade;
      const veiculoTipo = regVeiculoTipo;
      const veiculoPlaca = regVeiculoPlaca.trim().toUpperCase();

      const requerPlaca = ['MOTO', 'CARRO'].includes(veiculoTipo);

      if (!cnhNumero || !cnhValidade) {
        return setRegisterAlert({ message: 'Preencha número e validade da CNH.', type: 'error' });
      }

      if (requerPlaca && !veiculoPlaca) {
        return setRegisterAlert({ message: 'Placa é obrigatória para moto ou carro.', type: 'error' });
      }

      body.entregador_cnh_numero = cnhNumero;
      body.entregador_cnh_categoria = regCnhCategoria;
      body.entregador_cnh_validade = cnhValidade;
      body.entregador_veiculo_tipo = veiculoTipo;
      if (veiculoPlaca) body.entregador_veiculo_placa = veiculoPlaca;

    } else {
      endpoint = '/auth/registro/cliente';
      if (regNascimento) body.cliente_data_nascimento = regNascimento;
    }

    setRegisterAlert({ message: '', type: '' });

    try {
      const res = await fetch(BASE_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        return setRegisterAlert({ 
          message: data.error || data.message || 'Erro ao criar conta.', 
          type: 'error' 
        });
      }

      setRegisterAlert({ message: 'Conta criada com sucesso! Faça login para continuar.', type: 'success' });
      setTimeout(() => switchTab('login'), 1500);

    } catch (err) {
      setRegisterAlert({ 
        message: 'Não foi possível conectar à API. Verifique se o servidor está rodando.', 
        type: 'error' 
      });
    }
  };

  // ── Logout ────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem('delivery_token');
    localStorage.removeItem('delivery_user');
    setToken(null);
    setUser(null);
    switchTab('login');
  };

  // ── Helpers de renderização do Dashboard ──────────────────────────
  const getInitials = () => {
    if (!user) return '?';
    const fullName = user.user_name || user.user_email || '?';
    return fullName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  };

  const roleMap = {
    CLIENTE: 'Cliente',
    ENTREGADOR: 'Entregador',
    ADMIN: 'Administrador',
  };
  const roleKey = user?.user_role ? user.user_role.toUpperCase() : '';
  const badgeClass = { CLIENTE: 'badge-cliente', ENTREGADOR: 'badge-entregador', ADMIN: 'badge-admin' }[roleKey] || 'badge-cliente';

  return (
    <div className="app-container">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Panel Esquerdo */}
      <div className="panel-left">
        <div className="brand">
          <div className="brand-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <span className="brand-name">DeliveryAPI</span>
        </div>

        <div className="hero">
          <div className="hero-label">Plataforma de Delivery</div>
          <h1>Gerencie<br/>usuários com<br/><em>precisão.</em></h1>
          <p>API RESTful para cadastro e autenticação de clientes e entregadores — construída com Express, Prisma e JWT.</p>
        </div>

        <div className="stats">
          <div>
            <div className="stat-value">JWT</div>
            <div className="stat-label">Autenticação</div>
          </div>
          <div>
            <div className="stat-value">bcrypt</div>
            <div className="stat-label">Senhas seguras</div>
          </div>
          <div>
            <div className="stat-value">Prisma</div>
            <div className="stat-label">ORM</div>
          </div>
        </div>
      </div>

      {/* Panel Direito */}
      <div className="panel-right">
        <div className="card">

          {!token || !user ? (
            <div id="auth-view">
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'login' ? 'active' : ''}`} 
                  onClick={() => switchTab('login')}
                >
                  Entrar
                </button>
                <button 
                  className={`tab ${activeTab === 'register' ? 'active' : ''}`} 
                  onClick={() => switchTab('register')}
                >
                  Cadastrar
                </button>
              </div>

              {/* Login */}
              <form 
                id="form-login" 
                className={`form-view ${activeTab === 'login' ? 'active' : ''}`}
                onSubmit={handleLogin}
              >
                <div>
                  <div className="form-title">Bem-vindo de volta</div>
                  <div className="form-subtitle">Acesse sua conta para continuar</div>
                </div>

                <div className="field">
                  <label>E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Senha</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                {loginAlert.message && (
                  <div className={`alert ${loginAlert.type}`}>{loginAlert.message}</div>
                )}

                <button type="submit" className="btn">Entrar na conta</button>
              </form>

              {/* Cadastro */}
              <form 
                id="form-register" 
                className={`form-view ${activeTab === 'register' ? 'active' : ''}`}
                onSubmit={handleRegister}
              >
                <div>
                  <div className="form-title">Criar conta</div>
                  <div className="form-subtitle">Preencha os dados para se registrar</div>
                </div>

                <div className="field">
                  <label>Tipo de conta</label>
                  <select value={regRole} onChange={(e) => setRegRole(e.target.value)}>
                    <option value="CLIENTE">Cliente</option>
                    <option value="ENTREGADOR">Entregador</option>
                  </select>
                </div>

                <div className="field">
                  <label>Nome completo</label>
                  <input 
                    type="text" 
                    placeholder="João Silva" 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>

                <div className="row">
                  <div className="field">
                    <label>CPF</label>
                    <input 
                      type="text" 
                      placeholder="000.000.000-00" 
                      value={regCpf}
                      onChange={(e) => setRegCpf(e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Telefone</label>
                    <input 
                      type="tel" 
                      placeholder="(11) 99999-9999" 
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label>E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Senha</label>
                  <input 
                    type="password" 
                    placeholder="Mínimo 8 caracteres" 
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>

                {/* Campo exclusivo do cliente */}
                {regRole !== 'ENTREGADOR' && (
                  <div className="field" style={{ display: 'flex' }}>
                    <label>Data de nascimento <span style={{ textTransform: 'none', letterSpacing: 0 }}>(opcional)</span></label>
                    <input 
                      type="date" 
                      value={regNascimento}
                      onChange={(e) => setRegNascimento(e.target.value)}
                    />
                  </div>
                )}

                {/* Campos exclusivos do entregador */}
                <div className={`entregador-fields ${regRole === 'ENTREGADOR' ? 'show' : ''}`}>
                  <div className="section-label">Dados do entregador</div>

                  <div className="row">
                    <div className="field">
                      <label>Número da CNH</label>
                      <input 
                        type="text" 
                        placeholder="00000000000" 
                        value={regCnhNumero}
                        onChange={(e) => setRegCnhNumero(e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Categoria</label>
                      <select value={regCnhCategoria} onChange={(e) => setRegCnhCategoria(e.target.value)}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Validade da CNH</label>
                    <input 
                      type="date" 
                      value={regCnhValidade}
                      onChange={(e) => setRegCnhValidade(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <div className="field">
                      <label>Tipo de veículo</label>
                      <select value={regVeiculoTipo} onChange={(e) => setRegVeiculoTipo(e.target.value)}>
                        <option value="MOTO">Moto</option>
                        <option value="CARRO">Carro</option>
                        <option value="BICICLETA">Bicicleta</option>
                        <option value="A_PE">A pé</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Placa</label>
                      <input 
                        type="text" 
                        placeholder="ABC1D23" 
                        value={regVeiculoPlaca}
                        onChange={(e) => setRegVeiculoPlaca(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {registerAlert.message && (
                  <div className={`alert ${registerAlert.type}`}>{registerAlert.message}</div>
                )}

                <button type="submit" className="btn">Criar conta</button>
              </form>
            </div>
          ) : (
            /* Dashboard */
            <div id="dashboard-view" className="dashboard active">
              <div className="dash-header">
                <div>
                  <div className="dash-title">Minha conta</div>
                  <div className="dash-subtitle">Informações do usuário autenticado</div>
                </div>
                <button className="btn btn-sm btn-ghost" onClick={handleLogout}>Sair</button>
              </div>

              <div className="profile-card">
                <div className="profile-row">
                  <div className="avatar">{getInitials()}</div>
                  <div>
                    <div className="profile-name">{user.user_name || user.user_email || '—'}</div>
                    <div className="profile-role">{user.user_email || '—'}</div>
                  </div>
                  <span className={`badge ${badgeClass}`}>{roleMap[roleKey] || user.user_role || '—'}</span>
                </div>

                <div className="divider" style={{ marginBottom: '16px' }}></div>

                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-label">CPF</div>
                    <div className="info-value">{user.user_cpf || '—'}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Telefone</div>
                    <div className="info-value">{user.user_telefone || '—'}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Tipo</div>
                    <div className="info-value">{roleMap[roleKey] || user.user_role || '—'}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">ID</div>
                    <div className="info-value" style={{ fontSize: '12px', fontFamily: 'monospace' }}>{user.user_id || '—'}</div>
                  </div>
                </div>

                <div className="token-box">
                  <div className="token-label">Token JWT (session)</div>
                  <div className="token-value">{token ? token.slice(0, 80) + '…' : '—'}</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}