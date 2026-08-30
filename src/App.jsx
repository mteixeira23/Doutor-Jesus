import React, { useState, useEffect } from 'react';

// Sample Acolhidos Data - Anti-Crash Defensive Fallback
const initialAcolhidos = [
  { id: "FDJ-2026-001", nome: "Lucas Silva Santos", cpf: "123.456.789-00", status: "ativo", leito: "Leito A-101 (Térreo PCD)", oficina: "Oficina de Elétrica", dieta: "Normal" },
  { id: "FDJ-2026-002", nome: "Mateus Santos Oliveira", cpf: "987.654.321-11", status: "triagem", leito: "Leito B-205", oficina: "Horta Orgânica FDJ", dieta: "Hipossódica (Pressão Alta)" }
];

export default function App() {
  const [acolhidos, setAcolhidos] = useState(() => {
    try {
      const data = localStorage.getItem('sgi_fdj_acolhidos');
      if (data && data !== '[]' && data !== 'null') {
        return JSON.parse(data);
      }
    } catch(e){}
    localStorage.setItem('sgi_fdj_acolhidos', JSON.stringify(initialAcolhidos));
    return initialAcolhidos;
  });

  const [selectedAcolhidoId, setSelectedAcolhidoId] = useState(() => {
    return (acolhidos && acolhidos.length > 0) ? acolhidos[0].id : "FDJ-2026-001";
  });

  const [activeMod8Tab, setActiveMod8Tab] = useState('mod8_resumo');
  const [currentView, setCurrentView] = useState('mod8_prontuario');

  // Safe Guarded Acolhido Selection (Impossível dar TypeError)
  const acolhidoAtual = (acolhidos && acolhidos.length > 0) 
    ? (acolhidos.find(a => a.id === selectedAcolhidoId) || acolhidos[0]) 
    : initialAcolhidos[0];

  return (
    <div className="app-container" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header Banner */}
      <header style={{ padding: '0.75rem 2rem', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#dc2626' }}>
          Fundação Dr. <span style={{ background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '4px' }}>JESUS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem' }}>
          <span style={{ fontWeight: 700, color: '#2563eb' }}>marcos.vinicius2323@...</span>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        {/* Left Sidebar Navigation for Módulo 8 (Screenshot Exact Layout) */}
        <aside style={{ width: '280px', background: '#fff', borderRight: '1px solid #e2e8f0', padding: '1.25rem' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '0.75rem 1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>🩺 Módulo 8: Prontuário Saúde</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Navegação deste módulo</div>
          </div>

          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            NAVEGAÇÃO INTERNA
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button 
              onClick={() => setActiveMod8Tab('mod8_resumo')}
              style={{
                textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
                background: activeMod8Tab === 'mod8_resumo' ? '#2563eb' : '#f8fafc',
                color: activeMod8Tab === 'mod8_resumo' ? '#fff' : '#0f172a',
                fontWeight: 700, fontSize: '0.8rem'
              }}
            >
              1. 👤 Resumo do Prontuário & Ficha Clínica
            </button>

            <button 
              onClick={() => setActiveMod8Tab('mod8_pti')}
              style={{
                textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
                background: activeMod8Tab === 'mod8_pti' ? '#2563eb' : '#f8fafc',
                color: activeMod8Tab === 'mod8_pti' ? '#fff' : '#0f172a',
                fontWeight: 700, fontSize: '0.8rem'
              }}
            >
              2. 🎯 Plano Terapêutico (PTI RDC 29)
            </button>

            <button 
              onClick={() => setActiveMod8Tab('mod8_aprazamento')}
              style={{
                textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
                background: activeMod8Tab === 'mod8_aprazamento' ? '#2563eb' : '#f8fafc',
                color: activeMod8Tab === 'mod8_aprazamento' ? '#fff' : '#0f172a',
                fontWeight: 700, fontSize: '0.8rem'
              }}
            >
              3. 💊 Aprazamento de Medicamentos
            </button>

            <button 
              onClick={() => setActiveMod8Tab('mod8_evolucoes')}
              style={{
                textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
                background: activeMod8Tab === 'mod8_evolucoes' ? '#2563eb' : '#f8fafc',
                color: activeMod8Tab === 'mod8_evolucoes' ? '#fff' : '#0f172a',
                fontWeight: 700, fontSize: '0.8rem'
              }}
            >
              4. 📈 Feed de Evoluções Clínicas
            </button>

            <button 
              onClick={() => setActiveMod8Tab('mod8_odonto')}
              style={{
                textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
                background: activeMod8Tab === 'mod8_odonto' ? '#2563eb' : '#f8fafc',
                color: activeMod8Tab === 'mod8_odonto' ? '#fff' : '#0f172a',
                fontWeight: 700, fontSize: '0.8rem'
              }}
            >
              5. 🦷 Odontologia & Autoestima
            </button>

            <button 
              onClick={() => setActiveMod8Tab('mod8_samu')}
              style={{
                textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '6px', cursor: 'pointer', border: 'none',
                background: activeMod8Tab === 'mod8_samu' ? '#2563eb' : '#f8fafc',
                color: activeMod8Tab === 'mod8_samu' ? '#fff' : '#0f172a',
                fontWeight: 700, fontSize: '0.8rem'
              }}
            >
              6. 🚑 Regulação SAMU 192
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '2rem', background: '#f8fafc', overflowY: 'auto' }}>
          {/* Acolhido Selection Card */}
          <div style={{ background: '#fff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.4rem' }}>
              ACOLHIDO EM ATENDIMENTO NO PRONTUÁRIO:
            </label>
            <select 
              value={acolhidoAtual.id}
              onChange={(e) => setSelectedAcolhidoId(e.target.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: '0.9rem', width: '320px' }}
            >
              {acolhidos.map(a => (
                <option key={a.id} value={a.id}>{a.nome} ({a.id} — {a.leito})</option>
              ))}
            </select>
          </div>

          {/* Sub-tab content */}
          {activeMod8Tab === 'mod8_resumo' && (
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                1. 👤 Resumo do Prontuário & Ficha Clínica — {acolhidoAtual.nome}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <p><strong>Código FDJ:</strong> {acolhidoAtual.id}</p>
                  <p><strong>CPF:</strong> {acolhidoAtual.cpf}</p>
                  <p><strong>Alojamento / Leito:</strong> {acolhidoAtual.leito}</p>
                </div>
                <div>
                  <p><strong>Status:</strong> <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Ativo</span></p>
                  <p><strong>Oficina Terapêutica:</strong> {acolhidoAtual.oficina}</p>
                  <p><strong>Dieta Prescrita:</strong> {acolhidoAtual.dieta}</p>
                </div>
              </div>
            </div>
          )}

          {activeMod8Tab === 'mod8_pti' && (
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>2. 🎯 Plano Terapêutico Individual (PTI RDC 29)</h3>
              <p>Acompanhamento das 4 fases ANVISA de reabilitação para {acolhidoAtual.nome}.</p>
            </div>
          )}

          {activeMod8Tab === 'mod8_aprazamento' && (
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>3. 💊 Aprazamento de Medicamentos</h3>
              <p>Quadro de medicação aprazada (Dra. Ana Paula) para {acolhidoAtual.nome}.</p>
            </div>
          )}

          {activeMod8Tab === 'mod8_evolucoes' && (
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>4. 📈 Feed de Evoluções Clínicas</h3>
              <p>Histórico de boletins da Psicologia, Enfermagem e Serviço Social.</p>
            </div>
          )}

          {activeMod8Tab === 'mod8_odonto' && (
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>5. 🦷 Odontologia & Autoestima</h3>
              <p>Avaliação odontológica de admissão para {acolhidoAtual.nome}.</p>
            </div>
          )}

          {activeMod8Tab === 'mod8_samu' && (
            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3>6. 🚑 Regulação SAMU 192</h3>
              <p>Protocolos de emergência médica e primeiros socorros.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
