/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Arquitetura Oficial dos 6 Macromódulos (Vercel Source of Truth)
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentMacro = 'macro3'; // Macromódulo 3: Saúde & Psicossocial
    this.currentSubTab = 'm3_enfermaria';
    this.termoBusca = '';
  }

  renderApp() {
    const stats = window.store.getEstatisticas();
    const acolhidos = window.store.getAcolhidos();
    const medicamentos = window.store.getMedicamentos();
    const sinaisVitais = window.store.getSinaisVitais();
    const prescricoes = window.store.getPrescricoes();
    const atendimentosPsico = window.store.getAtendimentosPsico();
    const odonto = window.store.getOdonto();
    const substancias = window.store.getSubstancias();
    const logs = window.store.getLogs();

    this.root.innerHTML = `
      <div class="app-container">
        <!-- Sidebar Navigation (6 Macromódulos Oficiais) -->
        <aside class="sidebar">
          <div class="sidebar-header" style="padding: 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(37,99,235,0.3);">
              FDJ
            </div>
            <div>
              <h2 style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">SGI — Fundação</h2>
              <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">Doutor Jesus</span>
            </div>
          </div>

          <nav class="sidebar-menu" style="padding: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem;">
            <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.5rem 0 0.2rem 0.5rem;">
              Menu de Macromódulos SGI
            </div>

            <button class="btn \${this.currentMacro === 'macro1' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setMacro('macro1')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="users"></i>
              <span>Macromódulo 1: Acolhidos</span>
            </button>

            <button class="btn \${this.currentMacro === 'macro2' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setMacro('macro2')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="boxes"></i>
              <span>Macromódulo 2: Administração</span>
            </button>

            <button class="btn \${this.currentMacro === 'macro3' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setMacro('macro3')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="heart-pulse"></i>
              <span>Macromódulo 3: Saúde & Psico</span>
            </button>

            <button class="btn \${this.currentMacro === 'macro4' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setMacro('macro4')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="calculator"></i>
              <span>Macromódulo 4: Financeiro MROSC</span>
            </button>

            <button class="btn \${this.currentMacro === 'macro5' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setMacro('macro5')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="network"></i>
              <span>Macromódulo 5: Delegação Focais</span>
            </button>

            <button class="btn \${this.currentMacro === 'macro6' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setMacro('macro6')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="shield-check"></i>
              <span>Macromódulo 6: TI & Redes</span>
            </button>
          </nav>
        </aside>

        <!-- Main Content Wrapper -->
        <div class="main-content-wrapper">
          <header class="header-bar" style="padding: 1rem 2rem; border-bottom: 1px solid var(--border-color); background: var(--bg-header); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h1 style="font-size: 1.25rem; font-weight: 800;">
                \${this.getMacroTitle()}
              </h1>
              <p style="font-size: 0.8rem; color: var(--text-muted);">SGI Fundação Doutor Jesus — Matriz Oficial Vercel MROSC</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-outline" onclick="window.print()">
                <i data-lucide="printer"></i>
                <span>Imprimir Relatório A4</span>
              </button>
            </div>
          </header>

          <main class="page-content">
            <!-- Render Sub-Tabs Bar for Macromódulo 3 -->
            \${this.currentMacro === 'macro3' ? `
              <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap: wrap;">
                <button class="btn \${this.currentSubTab === 'm3_enfermaria' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setSubTab('m3_enfermaria')">
                  <i data-lucide="activity"></i> 3.1. Enfermaria Central (Galpão E)
                </button>
                <button class="btn \${this.currentSubTab === 'm3_psicologia' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setSubTab('m3_psicologia')">
                  <i data-lucide="brain"></i> 3.2. Psicologia & Videochamadas
                </button>
                <button class="btn \${this.currentSubTab === 'm3_farmacia' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setSubTab('m3_farmacia')">
                  <i data-lucide="pill"></i> 3.3. Enfermagem & Psicotrópicos (344)
                </button>
                <button class="btn \${this.currentSubTab === 'm3_odonto' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setSubTab('m3_odonto')">
                  <i data-lucide="smile"></i> 3.4. Odontologia Terapêutica
                </button>
                <button class="btn \${this.currentSubTab === 'm3_catalogos' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setSubTab('m3_catalogos')">
                  <i data-lucide="list"></i> 3.5. Catálogos de Saúde Homologados
                </button>
              </div>
            ` : ''}

            <!-- Render Macromodule Specific Content -->
            \${this.renderMacroContent(acolhidos, sinaisVitais, prescricoes, medicamentos, atendimentosPsico, odonto, substancias, logs)}
          </main>
        </div>
      </div>

      <div id="modal-container"></div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setMacro(macro) {
    this.currentMacro = macro;
    if (macro === 'macro3') this.currentSubTab = 'm3_enfermaria';
    this.renderApp();
  }

  setSubTab(subTab) {
    this.currentSubTab = subTab;
    this.renderApp();
  }

  getMacroTitle() {
    switch (this.currentMacro) {
      case 'macro1': return 'Macromódulo 1: Gestão dos Acolhidos (Módulos 1.1 a 4.0 RDC 29)';
      case 'macro2': return 'Macromódulo 2: Gestão Administrativa, Almoxarifado RMI, Despensa & Frota';
      case 'macro3': return 'Macromódulo 3: Saúde, Enfermaria Central & Atendimento Psicossocial';
      case 'macro4': return 'Macromódulo 4: Prestação de Contas MROSC & Financeiro Segregado';
      case 'macro5': return 'Macromódulo 5: Matriz de Pessoas Focais & Organograma';
      case 'macro6': return 'Macromódulo 6 (Módulo 13): TI, Infraestrutura & Segurança de Redes';
      default: return 'SGI — Fundação Doutor Jesus';
    }
  }

  renderMacroContent(acolhidos, sinaisVitais, prescricoes, medicamentos, atendimentosPsico, odonto, substancias, logs) {
    // --- MACROMÓDULO 3 CONTENT ---
    if (this.currentMacro === 'macro3') {
      if (this.currentSubTab === 'm3_enfermaria') {
        return `
          <div class="card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h3><i data-lucide="activity" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.1. Apoio Saúde, Enfermaria Central & Sinais Vitais (Galpão E)</h3>
              <span class="badge badge-success">Enfermeira Chefe Juliana Santos (COREN-BA 48192)</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              Acompanhamento ambulatorial contínuo dos 300 acolhidos sob acompanhamento RDC 29 ANVISA. Acionamento SAMU 192 e registros de sinais vitais.
            </p>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Acolhido</th>
                    <th>Data/Hora</th>
                    <th>Pressão Arterial</th>
                    <th>Freq. Cardíaca</th>
                    <th>Glicemia</th>
                    <th>Temperatura</th>
                    <th>COREN Responsável</th>
                    <th>Evolução Clínica</th>
                  </tr>
                </thead>
                <tbody>
                  \${sinaisVitais.map(s => `
                    <tr>
                      <td><strong>\${s.id}</strong></td>
                      <td><strong>\${s.acolhidoNome}</strong></td>
                      <td>\${s.data}</td>
                      <td><span class="badge badge-info">\${s.pa}</span></td>
                      <td>\${s.fc}</td>
                      <td>\${s.glicemia}</td>
                      <td>\${s.temp}</td>
                      <td style="font-size: 0.8rem;">\${s.enfermeiro}</td>
                      <td style="font-size: 0.85rem; color: var(--text-muted);">\${s.observacao}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      if (this.currentSubTab === 'm3_psicologia') {
        return `
          <div class="card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h3><i data-lucide="brain" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.2. Psicologia Clínica & Dependência Química (CRP)</h3>
              <span class="badge badge-primary">Coordenação de Psicologia & Serviço Social</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
              Atendimentos individuais, grupo terapêutico, passe terapêutico e <strong>vídeo-chamadas familiares</strong> para acolhidos cujas famílias residem no interior da Bahia.
            </p>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Acolhido</th>
                    <th>Data</th>
                    <th>Modalidade</th>
                    <th>Equipe Multiprofissional</th>
                    <th>Parecer Psicossocial</th>
                    <th>Ação WhatsApp</th>
                  </tr>
                </thead>
                <tbody>
                  \${atendimentosPsico.map(p => `
                    <tr>
                      <td><strong>\${p.id}</strong></td>
                      <td><strong>\${p.acolhidoNome}</strong></td>
                      <td>\${p.data}</td>
                      <td><span class="badge badge-info">\${p.tipo}</span></td>
                      <td>\${p.profissional}</td>
                      <td style="max-width: 320px; font-size: 0.85rem; color: var(--text-muted);">\${p.parecer}</td>
                      <td>
                        <button class="btn btn-success btn-sm" onclick="window.ui.enviarBoletimWhatsApp('\${p.acolhidoId}')">
                          <i data-lucide="send"></i> Boletim WhatsApp
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      if (this.currentSubTab === 'm3_farmacia') {
        return `
          <div class="card" style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h3><i data-lucide="pill" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.3. Enfermagem & Farmácia (Aprazamento Medicamentoso Psiquiátrico)</h3>
              <span class="badge badge-warning">Dra. Ana Paula (Medicina / Psiquiatria)</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Acolhido</th>
                    <th>Medicamento Prescrito</th>
                    <th>Horário Aprazado</th>
                    <th>Dosagem</th>
                    <th>Médico Prescritor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  \${prescricoes.map(p => `
                    <tr>
                      <td><strong>\${p.id}</strong></td>
                      <td><strong>\${p.acolhidoNome}</strong></td>
                      <td><strong>\${p.medicamento}</strong></td>
                      <td><span class="badge badge-warning">\${p.horario}</span></td>
                      <td>\${p.dosagem}</td>
                      <td>\${p.prescritor}</td>
                      <td><span class="badge \${p.status.includes('Ministrado') ? 'badge-success' : 'badge-info'}">\${p.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="card">
            <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 1rem; color: var(--primary);">
              Catálogo de Psicotrópicos (Portaria 344 SVS/MS) — Farmácia Interna
            </h4>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Substância / Medicamento</th>
                    <th>Controle Sanitário</th>
                    <th>Classificação Portaria 344</th>
                    <th>Estoque Interno</th>
                  </tr>
                </thead>
                <tbody>
                  \${medicamentos.map(m => `
                    <tr>
                      <td><strong>\${m.id}</strong></td>
                      <td><strong>\${m.nome}</strong></td>
                      <td>
                        <span class="badge \${m.psicotropico ? 'badge-danger' : 'badge-success'}">
                          \${m.psicotropico ? '⚠️ Psicotrópico Controlado' : 'Isento'}
                        </span>
                      </td>
                      <td>\${m.portaria344}</td>
                      <td><strong>\${m.estoque} \${m.unidade}</strong></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      if (this.currentSubTab === 'm3_odonto') {
        return `
          <div class="card">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
              <h3><i data-lucide="smile" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.4. Odontologia Terapêutica & Autoestima (Gabinete Odontológico FDJ)</h3>
              <span class="badge badge-success">Gabinete Odontológico FDJ</span>
            </div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Acolhido</th>
                    <th>Data Atendimento</th>
                    <th>Procedimento Odontológico</th>
                    <th>Dentista Responsável</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  \${odonto.map(o => `
                    <tr>
                      <td><strong>\${o.id}</strong></td>
                      <td><strong>\${o.acolhidoNome}</strong></td>
                      <td>\${o.data}</td>
                      <td><strong>\${o.procedimento}</strong></td>
                      <td>\${o.dentista}</td>
                      <td><span class="badge badge-success">\${o.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      if (this.currentSubTab === 'm3_catalogos') {
        return `
          <div class="card">
            <h3 style="margin-bottom: 1rem;"><i data-lucide="list" style="vertical-align: middle;"></i> 3.5. Catálogos Homologados de Saúde & Substâncias Psicoativas</h3>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Substância Psicoativa Principal (Triagem)</th>
                    <th>Classificação Farmacológica</th>
                  </tr>
                </thead>
                <tbody>
                  \${substancias.map(s => `
                    <tr>
                      <td><strong>\${s.id}</strong></td>
                      <td><strong>\${s.nome}</strong></td>
                      <td><span class="badge badge-info">\${s.categoria}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }
    }

    // --- MACROMÓDULOS 1, 2, 4, 5, 6 FALLBACK VIEWS ---
    if (this.currentMacro === 'macro1') {
      return `
        <div class="card">
          <h3>Macromódulo 1: Gestão dos Acolhidos (Módulos 1.1 a 4.0)</h3>
          <p>Admissão, Leitos nos 4 Blocos, PTI RDC 29, Crachá QR Code, Quitação A4 e Altas.</p>
          <button class="btn btn-primary" onclick="window.ui.setMacro('macro3')">Voltar ao Macromódulo 3</button>
        </div>
      `;
    }

    if (this.currentMacro === 'macro2') {
      return `
        <div class="card">
          <h3>Macromódulo 2: Gestão Administrativa, Almoxarifado RMI, Despensa & Frota</h3>
          <p>Requisições de Material Interno (RMI), 4.000 refeições/dia, Horta Orgânica FDJ e Frota SUS.</p>
          <button class="btn btn-primary" onclick="window.ui.setMacro('macro3')">Voltar ao Macromódulo 3</button>
        </div>
      `;
    }

    if (this.currentMacro === 'macro4') {
      return `
        <div class="card">
          <h3>Macromódulo 4: Prestação de Contas MROSC & Financeiro Segregado</h3>
          <p>Contas Bancárias MROSC (Banco do Brasil x Caixa Doações), Extratos Segregados e DRE SJDH-BA.</p>
        </div>
      `;
    }

    if (this.currentMacro === 'macro5') {
      return `
        <div class="card">
          <h3>Macromódulo 5: Matriz de Pessoas Focais & Delegação de Poderes</h3>
          <p>Matriz de responsabilidades e alçadas operacionais por macromódulo.</p>
        </div>
      `;
    }

    return `
      <div class="card">
        <h3>Macromódulo 6 (Módulo 13): TI, Infraestrutura & Segurança de Redes</h3>
        <div class="table-container">
          <table class="data-table">
            <thead><tr><th>Horário</th><th>Evento TI</th></tr></thead>
            <tbody>\${logs.map(l => `<tr><td>\${l.timestamp}</td><td>\${l.mensagem}</td></tr>`)}</tbody>
          </table>
        </div>
      </div>
    `;
  }

  enviarBoletimWhatsApp(acolhidoId) {
    const acolhido = window.store.getAcolhidoById(acolhidoId) || { nome: "Lucas Silva Santos", familiarTel: "5571988421044" };
    const texto = encodeURIComponent(`Olá! Este é o Boletim Informativo de Saúde e Evolução de ${acolhido.nome} na Fundação Doutor Jesus (Candeias/BA).\nStatus: Estável em leito\nEvolução Psicossocial: Excelente adesão ao tratamento.`);
    window.open(`https://api.whatsapp.com/send?phone=${acolhido.familiarTel || '5571988421044'}&text=${texto}`, '_blank');
  }

  fecharModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
  }
}

window.ui = new UI();
