/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Macromódulo 3: Gestão da Saúde, Enfermagem & Atendimento Psicossocial (Vercel Official)
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentTab = 'enfermaria';
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
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
          <div class="sidebar-header" style="padding: 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #059669, #047857); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; box-shadow: 0 4px 12px rgba(5,150,105,0.3);">
              FDJ
            </div>
            <div>
              <h2 style="font-size: 0.95rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">SGI — Fundação</h2>
              <span style="font-size: 0.75rem; color: #059669; font-weight: 600;">Saúde & Psicossocial</span>
            </div>
          </div>

          <nav class="sidebar-menu" style="padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.5rem 0 0.25rem 0.5rem;">
              Outros Macromódulos
            </div>
            <button class="btn btn-secondary" onclick="window.ui.setTab('acolhidos')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="users"></i>
              <span>1. Gestão dos Acolhidos</span>
            </button>
            <button class="btn btn-secondary" onclick="window.ui.setTab('almoxarifado')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="boxes"></i>
              <span>2. Gestão Administrativa</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: #059669; text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              3. Saúde & Psicossocial (M3)
            </div>

            <button class="btn \${this.currentTab === 'enfermaria' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('enfermaria')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="heart-pulse"></i>
              <span>3.1. Enfermaria & Sinais Vitais</span>
            </button>
            <button class="btn \${this.currentTab === 'farmacia' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('farmacia')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="pill"></i>
              <span>3.2. Prescrição & Psicotrópicos</span>
            </button>
            <button class="btn \${this.currentTab === 'psicologia' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('psicologia')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="brain"></i>
              <span>3.3. Psicologia & Videochamadas</span>
            </button>
            <button class="btn \${this.currentTab === 'odonto' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('odonto')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="smile"></i>
              <span>3.4. Odontologia & Autoestima</span>
            </button>
            <button class="btn \${this.currentTab === 'catalogos_saude' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('catalogos_saude')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="activity"></i>
              <span>3.5. Catálogos & Substâncias</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              TI
            </div>
            <button class="btn btn-secondary" onclick="window.ui.setTab('logs')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="shield-check"></i>
              <span>Módulo 13: TI & Logs</span>
            </button>
          </nav>
        </aside>

        <!-- Main Content Area -->
        <div class="main-content-wrapper">
          <header class="header-bar" style="padding: 1rem 2rem; border-bottom: 1px solid var(--border-color); background: var(--bg-header); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h1 style="font-size: 1.25rem; font-weight: 800;">
                \${this.getTabTitle()}
              </h1>
              <p style="font-size: 0.8rem; color: var(--text-muted);">SGI Fundação Doutor Jesus — Apoio Saúde & Enfermaria Central (Galpão E)</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.ui.abrirModalSinaisVitais()">
                <i data-lucide="heart"></i>
                <span>Registrar Sinais Vitais</span>
              </button>
            </div>
          </header>

          <main class="page-content">
            <!-- Stats Row M3 -->
            <div class="grid-4" style="margin-bottom: 1.5rem;">
              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(5,150,105,0.12); color: #059669; border-color: rgba(5,150,105,0.3);">
                  <i data-lucide="activity"></i>
                </div>
                <div class="stat-info">
                  <h4>Sinais Vitais Hoje</h4>
                  <div class="stat-value">\${stats.totalSinaisVitais}</div>
                  <div class="stat-subtext"><i data-lucide="check"></i> Galpão E (Enfermaria)</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(37,99,235,0.12); color: #2563eb; border-color: rgba(37,99,235,0.3);">
                  <i data-lucide="pill"></i>
                </div>
                <div class="stat-info">
                  <h4>Aprazamentos Psiquiátricos</h4>
                  <div class="stat-value">\${stats.totalPrescricoes}</div>
                  <div class="stat-subtext"><i data-lucide="clock"></i> Dra. Ana Paula</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(124,58,237,0.12); color: #7c3aed; border-color: rgba(124,58,237,0.3);">
                  <i data-lucide="brain"></i>
                </div>
                <div class="stat-info">
                  <h4>Atendimentos Psicossociais</h4>
                  <div class="stat-value">\${stats.totalAtendimentosPsico}</div>
                  <div class="stat-subtext"><i data-lucide="video"></i> Inclui Videochamadas</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(217,119,6,0.12); color: #d97706; border-color: rgba(217,119,6,0.3);">
                  <i data-lucide="smile"></i>
                </div>
                <div class="stat-info">
                  <h4>Atendimentos Odonto</h4>
                  <div class="stat-value">\${odonto.length}</div>
                  <div class="stat-subtext"><i data-lucide="check-circle"></i> Gabinete FDJ</div>
                </div>
              </div>
            </div>

            <!-- Tab Content M3 -->
            \${this.renderTabContent(sinaisVitais, prescricoes, medicamentos, atendimentosPsico, odonto, substancias, logs, acolhidos)}
          </main>
        </div>
      </div>

      <div id="modal-container"></div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setTab(tab) {
    this.currentTab = tab;
    this.renderApp();
  }

  getTabTitle() {
    switch (this.currentTab) {
      case 'enfermaria': return '3.1. Apoio Saúde, Enfermaria Central & Sinais Vitais (Galpão E)';
      case 'farmacia': return '3.2. Prontuário Médico, Aprazamento & Psicotrópicos (Portaria 344)';
      case 'psicologia': return '3.3. Atendimento Psicossocial, Serviço Social & Videochamadas Familiares';
      case 'odonto': return '3.4. Odontologia Terapêutica & Restauração da Autoestima';
      case 'catalogos_saude': return '3.5. Catálogo de Substâncias Psicoativas & Tipos de Atendimento';
      case 'acolhidos': return 'Macromódulo 1: Gestão dos Acolhidos RDC 29';
      case 'almoxarifado': return 'Macromódulo 2: Gestão Administrativa';
      case 'logs': return 'Módulo 13: TI & Logs de Auditoria';
      default: return 'Macromódulo 3: Gestão da Saúde & Atendimento Psicossocial';
    }
  }

  renderTabContent(sinaisVitais, prescricoes, medicamentos, atendimentosPsico, odonto, substancias, logs, acolhidos) {
    // 3.1. ENFERMARIA CENTRAL & SINAIS VITAIS
    if (this.currentTab === 'enfermaria') {
      return `
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="heart-pulse" style="vertical-align: middle; margin-right: 0.5rem;"></i> Apoio Saúde & Enfermaria Central (Galpão E)</h3>
            <span class="badge badge-success">Enfermeira Chefe Juliana Santos (COREN-BA 48192)</span>
          </div>

          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Monitoramento de Sinais Vitais dos 1.240 acolhidos sob acompanhamento RDC 29 ANVISA. Acionamento de emergências médicas (SAMU 192).
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
                  <th>Responsável COREN</th>
                  <th>Observação Clínica</th>
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

    // 3.2. FARMÁCIA & PSICOTRÓPICOS (PORTARIA 344)
    if (this.currentTab === 'farmacia') {
      return `
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="pill" style="vertical-align: middle; margin-right: 0.5rem;"></i> Aprazamento Medicamentoso Psiquiátrico (Dra. Ana Paula)</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovaPrescricao()">
              <i data-lucide="plus-circle"></i> + Nova Prescrição Médica
            </button>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Acolhido</th>
                  <th>Medicamento Prescrito</th>
                  <th>Horário (Aprazamento)</th>
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

        <!-- CATÁLOGO FARMÁCIA INTERNA -->
        <div class="card">
          <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 1rem; color: var(--primary);">
            <i data-lucide="boxes" style="vertical-align: middle;"></i> Catálogo da Farmácia Interna & Psicotrópicos (Portaria 344 SVS/MS)
          </h4>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Medicamento & Miligramagem</th>
                  <th>Classificação Sanitária</th>
                  <th>Classificação Portaria 344</th>
                  <th>Saldo em Estoque</th>
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

    // 3.3. PSICOLOGIA & VIDEOCHAMADAS FAMILIARES
    if (this.currentTab === 'psicologia') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="brain" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.3. Atendimento Psicossocial, Serviço Social & Videochamadas Familiares</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovoAtendimentoPsico()">
              <i data-lucide="plus-circle"></i> + Registrar Atendimento
            </button>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Acolhido</th>
                  <th>Data</th>
                  <th>Modalidade de Atendimento</th>
                  <th>Equipe Multiprofissional</th>
                  <th>Parecer de Evolução Psicossocial</th>
                  <th>WhatsApp Familiar</th>
                </tr>
              </thead>
              <tbody>
                \${atendimentosPsico.map(psi => `
                  <tr>
                    <td><strong>\${psi.id}</strong></td>
                    <td><strong>\${psi.acolhidoNome}</strong></td>
                    <td>\${psi.data}</td>
                    <td><span class="badge badge-info">\${psi.tipo}</span></td>
                    <td>\${psi.profissional}</td>
                    <td style="max-width: 320px; font-size: 0.85rem; color: var(--text-muted);">\${psi.parecer}</td>
                    <td>
                      <button class="btn btn-success btn-sm" onclick="window.ui.enviarBoletimWhatsApp('\${psi.acolhidoId}')">
                        <i data-lucide="send"></i> Enviar Boletim
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

    // 3.4. ODONTOLOGIA TERAPÊUTICA & AUTOESTIMA
    if (this.currentTab === 'odonto') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="smile" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.4. Odontologia Terapêutica & Restauração da Autoestima</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovoOdonto()">
              <i data-lucide="calendar"></i> + Agendar Atendimento Odontológico
            </button>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Acolhido</th>
                  <th>Data Agendamento</th>
                  <th>Procedimento Odontológico</th>
                  <th>Gabinete Odontológico</th>
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

    // 3.5. CATÁLOGO DE SUBSTÂNCIAS PSICOATIVAS
    if (this.currentTab === 'catalogos_saude') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="activity" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.5. Catálogo de Substâncias Psicoativas (Triagem)</h3>
            <span class="badge badge-primary">Homologado ANVISA</span>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Substância Psicoativa Principal</th>
                  <th>Classificação Farmacológica</th>
                </tr>
              </thead>
              <tbody>
                \${substancias.map(sub => `
                  <tr>
                    <td><strong>\${sub.id}</strong></td>
                    <td><strong>\${sub.nome}</strong></td>
                    <td><span class="badge badge-info">\${sub.categoria}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // NAVEGAÇÃO EXTERNA (SE NAVEGADO PARA OUTROS MACROMÓDULOS)
    if (this.currentTab === 'acolhidos' || this.currentTab === 'almoxarifado') {
      window.location.reload();
    }

    // LOGS
    return `
      <div class="card">
        <h3>Módulo 13: TI & Logs</h3>
        <div class="table-container">
          <table class="data-table">
            <thead><tr><th>Data/Hora</th><th>Evento</th></tr></thead>
            <tbody>
              \${logs.map(l => `<tr><td>\${l.timestamp}</td><td>\${l.mensagem}</td></tr>`)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- MÉTODOS DE AÇÃO DO MACROMÓDULO 3 ---
  abrirModalSinaisVitais() {
    const acolhidos = window.store.getAcolhidos();
    const acolhidoNome = prompt("Nome do Acolhido para Sinais Vitais:", acolhidos[0] ? acolhidos[0].nome : "Lucas Silva Santos");
    if (acolhidoNome) {
      const pa = prompt("Pressão Arterial (ex: 120x80 mmHg):", "120x80 mmHg") || "120x80 mmHg";
      const fc = prompt("Frequência Cardíaca (ex: 76 bpm):", "76 bpm") || "76 bpm";
      const glicemia = prompt("Glicemia (ex: 94 mg/dL):", "94 mg/dL") || "94 mg/dL";
      const temp = prompt("Temperatura (ex: 36.5 °C):", "36.5 °C") || "36.5 °C";

      window.store.registrarSinaisVitais({
        acolhidoId: "FDJ-2026-001",
        acolhidoNome,
        pa, fc, glicemia, temp,
        observacao: "Atendimento de rotina na Enfermaria FDJ."
      });
      this.renderApp();
    }
  }

  abrirModalNovaPrescricao() {
    const acolhidoNome = prompt("Nome do Acolhido:", "Lucas Silva Santos");
    if (acolhidoNome) {
      const medicamento = prompt("Medicamento Prescrito (ex: Haloperidol 5mg):", "Haloperidol 5mg");
      const horario = prompt("Horário de Aprazamento (ex: 08:00h e 20:00h):", "08:00h") || "08:00h";
      const dosagem = prompt("Dosagem:", "1 comprimido") || "1 comprimido";

      window.store.novaPrescricao({
        acolhidoId: "FDJ-2026-001",
        acolhidoNome,
        medicamento,
        horario,
        dosagem
      });
      this.renderApp();
    }
  }

  abrirModalNovoAtendimentoPsico() {
    const acolhidoNome = prompt("Nome do Acolhido:", "Lucas Silva Santos");
    if (acolhidoNome) {
      const tipo = prompt("Modalidade (Vídeo-chamada com Psicologia / Atendimento Individual / Grupo):", "Vídeo-chamada com Psicologia") || "Atendimento Individual";
      const parecer = prompt("Parecer da Evolução Psicossocial:", "Excelente adesão ao tratamento e acompanhamento familiar.") || "Evolução clínica estável.";

      window.store.registrarAtendimentoPsico({
        acolhidoId: "FDJ-2026-001",
        acolhidoNome,
        tipo,
        parecer
      });
      this.renderApp();
    }
  }

  abrirModalNovoOdonto() {
    const acolhidoNome = prompt("Nome do Acolhido:", "Lucas Silva Santos");
    if (acolhidoNome) {
      const procedimento = prompt("Procedimento Odontológico:", "Avaliação Odontológica de Admissão & Restauração");
      window.store.agendarOdonto({
        acolhidoId: "FDJ-2026-001",
        acolhidoNome,
        procedimento
      });
      this.renderApp();
    }
  }

  enviarBoletimWhatsApp(acolhidoId) {
    const acolhido = window.store.getAcolhidoById(acolhidoId) || { nome: "Lucas Silva Santos", familiarTel: "5571988421044", status: "ativo" };
    const texto = encodeURIComponent(`Olá! Este é o Boletim Informativo de Saúde e Evolução de ${acolhido.nome} na Fundação Doutor Jesus (Candeias/BA).\nStatus: Estável em leito\nAtendimento Psicossocial: Excelente adesão ao tratamento RDC 29.`);
    window.open(`https://api.whatsapp.com/send?phone=${acolhido.familiarTel || '5571988421044'}&text=${texto}`, '_blank');
  }

  fecharModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
  }
}

window.ui = new UI();
