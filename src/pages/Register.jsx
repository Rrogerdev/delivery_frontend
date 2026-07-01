import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from "react-router-dom";
import { registrarCliente, registrarEntregador } from '../services/api';
import { styles } from './authStyles';
import { FontImport } from './FontImport';

function Register() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const [role, setRole] = useState('CLIENTE');
  const [form, setForm] = useState({
    nome: '', cpf: '', telefone: '', email: '', senha: '', nascimento: '',
    cnhNumero: '', cnhCategoria: 'A', cnhValidade: '',
    veiculoTipo: 'MOTO', veiculoPlaca: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  if (isLogged) {
    return <Navigate to="/" replace />;
  }

  const set = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });
  const isEntregador = role === 'ENTREGADOR';

  async function handleSubmit() {
    setErro('');
    setSucesso('');

    if (!form.nome || !form.cpf || !form.email || !form.senha) {
      setErro('Nome, CPF, e-mail e senha são obrigatórios.');
      return;
    }
    if (form.senha.length < 8) {
      setErro('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    const payload = {
      user_name: form.nome,
      user_email: form.email,
      user_password: form.senha,
      user_cpf: form.cpf.replace(/\D/g, ''),       // só dígitos (regex exige 11)
      user_telefone: form.telefone.replace(/\D/g, ''),
    };

    setCarregando(true);
    try {
      if (isEntregador) {
        const placa = form.veiculoPlaca.trim().toUpperCase();
        const requerPlaca = ['MOTO', 'CARRO'].includes(form.veiculoTipo);

        if (!form.cnhNumero || !form.cnhValidade) {
          setErro('Preencha número e validade da CNH.');
          setCarregando(false);
          return;
        }
        if (requerPlaca && !placa) {
          setErro('Placa é obrigatória para moto ou carro.');
          setCarregando(false);
          return;
        }

        await registrarEntregador({
          ...payload,
          entregador_cnh_numero: form.cnhNumero.replace(/\D/g, ''),
          entregador_cnh_categoria: form.cnhCategoria,
          entregador_cnh_validade: form.cnhValidade,
          entregador_veiculo_tipo: form.veiculoTipo,
          ...(placa ? { entregador_veiculo_placa: placa } : {}),
        });
      } else {
        await registrarCliente({
          ...payload,
          ...(form.nascimento ? { cliente_data_nascimento: form.nascimento } : {}),
        });
      }

      setSucesso('Conta criada com sucesso! Redirecionando para o login…');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao criar conta. Verifique os dados.';
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
          <h1 style={styles.heroH1}>Faça parte<br />da nossa<br /><em style={styles.heroEm}>rede.</em></h1>
          <p style={styles.heroP}>Cadastre-se como cliente para pedir, ou como entregador para fazer entregas.</p>
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
            <div style={styles.formTitle}>Criar conta</div>
            <div style={styles.formSubtitle}>Preencha os dados para se registrar</div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Tipo de conta</label>
            <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="CLIENTE">Cliente</option>
              <option value="ENTREGADOR">Entregador</option>
            </select>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Nome completo</label>
            <input style={styles.input} type="text" value={form.nome} placeholder="João Silva" onChange={set('nome')} />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>CPF</label>
              <input style={styles.input} type="text" value={form.cpf} placeholder="000.000.000-00" onChange={set('cpf')} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Telefone</label>
              <input style={styles.input} type="tel" value={form.telefone} placeholder="(11) 99999-9999" onChange={set('telefone')} />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>E-mail</label>
            <input style={styles.input} type="email" value={form.email} placeholder="seu@email.com" onChange={set('email')} />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Senha</label>
            <input style={styles.input} type="password" value={form.senha} placeholder="Mínimo 8 caracteres" onChange={set('senha')} />
          </div>

          {!isEntregador && (
            <div style={styles.field}>
              <label style={styles.label}>Data de nascimento (opcional)</label>
              <input style={styles.input} type="date" value={form.nascimento} onChange={set('nascimento')} />
            </div>
          )}

          {isEntregador && (
            <>
              <div style={styles.sectionLabel}>Dados do entregador</div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Número da CNH</label>
                  <input style={styles.input} type="text" value={form.cnhNumero} placeholder="00000000000" onChange={set('cnhNumero')} />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Categoria</label>
                  <select style={styles.input} value={form.cnhCategoria} onChange={set('cnhCategoria')}>
                    {['A', 'B', 'AB', 'C', 'D', 'E'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Validade da CNH</label>
                <input style={styles.input} type="date" value={form.cnhValidade} onChange={set('cnhValidade')} />
              </div>
              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Tipo de veículo</label>
                  <select style={styles.input} value={form.veiculoTipo} onChange={set('veiculoTipo')}>
                    <option value="MOTO">Moto</option>
                    <option value="CARRO">Carro</option>
                    <option value="BICICLETA">Bicicleta</option>
                    <option value="A_PE">A pé</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Placa</label>
                  <input style={styles.input} type="text" value={form.veiculoPlaca} placeholder="ABC1D23" onChange={set('veiculoPlaca')} />
                </div>
              </div>
            </>
          )}

          {erro && <div style={styles.alertError}>{erro}</div>}
          {sucesso && <div style={styles.alertSuccess}>{sucesso}</div>}

          <button style={styles.btn} onClick={handleSubmit} disabled={carregando}>
            {carregando ? 'Criando…' : 'Criar conta'}
          </button>

          <button style={styles.btnGhost} onClick={() => navigate('/login')}>
            Já tenho conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;