const accent = '#8b6f4e';
const accentDk = '#6b5239';
const border = '#e4e0d8';
const muted = '#8a8479';
const text = '#1c1a17';

export const styles = {
  app: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '100vh',
    background: '#f7f5f1',
    color: text,
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
  },
  panelLeft: {
    position: 'relative',
    background: '#2a2420',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 48,
    overflow: 'hidden',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandIcon: {
    width: 36, height: 36, background: accent, borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  brandName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20, fontWeight: 600, letterSpacing: '.5px', color: '#f0ece4',
  },
  heroLabel: {
    fontSize: 11, fontWeight: 400, letterSpacing: '3px',
    textTransform: 'uppercase', color: accent, marginBottom: 20, opacity: .9,
  },
  heroH1: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(42px, 4vw, 64px)', fontWeight: 500, lineHeight: 1.08,
    letterSpacing: '-.5px', marginBottom: 24, color: '#f0ece4',
  },
  heroEm: { fontStyle: 'italic', color: '#c9a97a' },
  heroP: { color: '#9e9488', fontSize: 14, fontWeight: 300, lineHeight: 1.8, maxWidth: 320 },
  stats: { display: 'flex', gap: 36 },
  statValue: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22, fontWeight: 500, color: '#c9a97a', letterSpacing: '.5px',
  },
  statLabel: {
    fontSize: 11, fontWeight: 300, color: '#6e6358', marginTop: 4,
    letterSpacing: '1px', textTransform: 'uppercase',
  },
  panelRight: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' },
  card: { width: '100%', maxWidth: 440 },
  formTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 30, fontWeight: 600, letterSpacing: '-.3px', marginBottom: 2,
  },
  formSubtitle: { fontSize: 13, color: muted, marginBottom: 8 },
  label: {
    fontSize: 11, fontWeight: 400, color: muted, display: 'block',
    marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1.2px',
  },
  input: {
    width: '100%', padding: '12px 14px', background: '#fff',
    border: `1px solid ${border}`, borderRadius: 4, color: text,
    fontFamily: "'Jost', sans-serif", fontSize: 14, fontWeight: 300,
    outline: 'none', WebkitAppearance: 'none',
  },
  field: { display: 'flex', flexDirection: 'column', marginBottom: 16 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  sectionLabel: {
    fontSize: 11, fontWeight: 400, letterSpacing: '1.5px',
    textTransform: 'uppercase', color: accent, marginTop: 6,
    paddingTop: 14, borderTop: `1px solid ${border}`, marginBottom: 16,
  },
  btn: {
    width: '100%', padding: 13, background: accent, border: 'none',
    borderRadius: 4, color: '#fff', fontFamily: "'Jost', sans-serif",
    fontSize: 14, fontWeight: 500, letterSpacing: '.5px', cursor: 'pointer',
    marginTop: 4,
  },
  btnGhost: {
    width: '100%', padding: 13, background: 'transparent',
    border: `1px solid ${border}`, borderRadius: 4, color: muted,
    fontFamily: "'Jost', sans-serif", fontSize: 14, fontWeight: 500,
    cursor: 'pointer', marginTop: 10,
  },
  alertError: {
    padding: '12px 14px', borderRadius: 4, fontSize: 13,
    background: 'rgba(158,58,56,.08)', border: '1px solid rgba(158,58,56,.25)',
    color: '#9e3a38', marginBottom: 12,
  },
  alertSuccess: {
    padding: '12px 14px', borderRadius: 4, fontSize: 13,
    background: 'rgba(74,124,89,.1)', border: '1px solid rgba(74,124,89,.3)',
    color: '#4a7c59', marginBottom: 12,
  },
  accent, accentDk, border, muted, text,
};