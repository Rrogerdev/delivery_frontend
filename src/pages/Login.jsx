import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from "react-router-dom";
import { login as loginApi } from '../services/api';
import { styles } from './authStyles';
import { FontImport } from './FontImport';

function Login() {
  const navigate = useNavigate();
  const { isLogged, entrar } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (isLogged) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit() {
    if (!email || !senha) {
      setErro('Preencha e-mail e senha.');
      return;
    }
    setErro('');
    setCarregando(true);
    try {
      const { token, user } = await loginApi(email, senha);
      entrar(token, user);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Não foi possível entrar. Verifique suas credenciais.';
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={styles.app}>
      <FontImport />
      <div style={styles.panelLeft}>
        <div style={styles.brand}>
          <div style={styles.brandIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <span style={styles.brandName}>DeliveryAPI</span>
        </div>
        <div>
          <div style={styles.heroLabel}>Plataforma de Delivery</div>
          <h1 style={styles.heroH1}>Gerencie<br />pedidos com<br /><em style={styles.heroEm}>precisão.</em></h1>
          <p style={styles.heroP}>Acesse sua conta para explorar restaurantes, montar pedidos e acompanhar entregas.</p>
        </div>
        <div style={styles.stats}>
          <div><div style={styles.statValue}>JWT</div><div style={styles.statLabel}>Autenticação</div></div>
          <div><div style={styles.statValue}>bcrypt</div><div style={styles.statLabel}>Senhas seguras</div></div>
          <div><div style={styles.statValue}>Prisma</div><div style={styles.statLabel}>ORM</div></div>
        </div>
      </div>

      <div style={styles.panelRight}>
        <div style={styles.card}>
          <div style={{ marginBottom: 24 }}>
            <div style={styles.formTitle}>Bem-vindo de volta</div>
            <div style={styles.formSubtitle}>Acesse sua conta para continuar</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>E-mail</label>
            <input
              style={styles.input}
              type="email"
              value={email}
              placeholder="seu@email.com"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Senha</label>
            <input
              style={styles.input}
              type="password"
              value={senha}
              placeholder="••••••••"
              onChange={(e) => setSenha(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          {erro && <div style={styles.alertError}>{erro}</div>}

          <button style={styles.btn} onClick={handleSubmit} disabled={carregando}>
            {carregando ? 'Entrando…' : 'Entrar na conta'}
          </button>

          <button style={styles.btnGhost} onClick={() => navigate('/register')}>
            Não tenho conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;