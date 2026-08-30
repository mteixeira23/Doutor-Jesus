/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Macromódulo 1: Gestão dos Acolhidos (Padrão RDC 29 ANVISA & Vercel)
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentTab = 'acolhidos';
    this.filtroStatus = 'todos';
    this.termoBusca = '';
  }

  renderApp() {
    const stats = window.store.getEstatisticas();
    const acolhidos = window.store.getAcolhidos();
    const blocos = window.store.getBlocos();
    const logs = window.store.getLogs();

    // Filtrar acolhidos
    const acolhidosFiltrados = acolhidos.filter(a => {
      const matchStatus = this.filtroStatus === 'todos' || a.status === this.filtroStatus;
      const matchBusca = !this.termoBusca || 
        a.nome.toLowerCase().includes(this.termoBusca.toLowerCase()) || 
        a.cpf.includes(this.termoBusca) ||
        a.id.toLowerCase().includes(this.termoBusca.toLowerCase());
      return matchStatus && matchBusca;
    });

    this.root.innerHTML = `
      <div class="app-container">
        <!-- Sidebar Navigation -->
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

          <nav class="sidebar-menu" style="padding: 1rem; display: flex; flex-direction: column; gap: 0.4rem;">
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.5rem 0 0.25rem 0.5rem;">
              1. Gestão dos Acolhidos (M1)
            </div>

            <button class="btn \${this.currentTab === 'acolhidos' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('acolhidos')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="users"></i>
              <span>1.1. Triagem & Admissão RDC 29</span>
            </button>
            <button class="btn \${this.currentTab === 'leitos' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('leitos')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="bed"></i>
              <span>1.2. Alojamentos & Leitos</span>
            </button>
            <button class="btn \${this.currentTab === 'pti' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('pti')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="file-text"></i>
              <span>2.0. Prontuário & PTI RDC 29</span>
            </button>
            <button class="btn \${this.currentTab === 'documentos' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('documentos')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="qr-code"></i>
              <span>3.0. Crachás, Quitação & WhatsApp</span>
            </button>
            <button class="btn \${this.currentTab === 'altas' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('altas')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="user-check"></i>
              <span>4.0. Altas & Transporte SUS</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              Outros Módulos
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
              <p style="font-size: 0.8rem; color: var(--text-muted);">SGI Fundação Doutor Jesus — Padrão RDC 29 ANVISA</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.ui.abrirModalNovaAdmissao()">
                <i data-lucide="user-plus"></i>
                <span>Nova Admissão (RDC 29)</span>
              </button>
            </div>
          </header>

          <main class="page-content">
            <!-- Stats Row -->
            <div class="grid-4" style="margin-bottom: 1.5rem;">
              <div class="card stat-card">
                <div class="stat-icon-wrapper">
                  <i data-lucide="users"></i>
                </div>
                <div class="stat-info">
                  <h4>Acolhidos Ativos</h4>
                  <div class="stat-value">\${stats.totalAtivos}</div>
                  <div class="stat-subtext"><i data-lucide="check-circle-2"></i> Residentes na Instituição</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(217,119,6,0.12); color: #d97706; border-color: rgba(217,119,6,0.3);">
                  <i data-lucide="clock"></i>
                </div>
                <div class="stat-info">
                  <h4>Em Triagem RDC 29</h4>
                  <div class="stat-value">\${stats.totalTriagem}</div>
                  <div class="stat-subtext" style="color: #d97706;"><i data-lucide="clipboard-check"></i> Adaptação Inicial</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(5,150,105,0.12); color: #059669; border-color: rgba(5,150,105,0.3);">
                  <i data-lucide="bed"></i>
                </div>
                <div class="stat-info">
                  <h4>Ocupação de Leitos</h4>
                  <div class="stat-value">\${stats.totalLeitosOcupados} / \${stats.totalLeitosTotais}</div>
                  <div class="stat-subtext"><i data-lucide="home"></i> Capacidade dos Alojamentos</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(37,99,235,0.12); color: #2563eb; border-color: rgba(37,99,235,0.3);">
                  <i data-lucide="award"></i>
                </div>
                <div class="stat-info">
                  <h4>Fase 3 e 4 do PTI</h4>
                  <div class="stat-value">\${stats.totalPTI34}</div>
                  <div class="stat-subtext"><i data-lucide="trending-up"></i> Reinserção Social</div>
                </div>
              </div>
            </div>

            <!-- Content Area Based on Active Tab -->
            \${this.renderTabContent(acolhidosFiltrados, blocos, logs)}
          </main>
        </div>
      </div>

      <!-- Modals Container -->
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
      case 'acolhidos': return '1.1. Gestão dos Acolhidos — Triagem & Admissão RDC 29';
      case 'leitos': return '1.2. Gestão de Alojamentos & Ocupação de Leitos';
      case 'pti': return '2.0. Prontuário Eletrônico & PTI (Plano Terapêutico Individual RDC 29)';
      case 'documentos': return '3.0. Emissão de Crachás QR Code, Quitação & Boletim WhatsApp';
      case 'altas': return '4.0. Altas Terapêuticas, Reinserção & Escala de Transporte SUS';
      case 'logs': return 'Módulo 13: TI & Logs de Auditoria do Sistema';
      default: return 'Macromódulo 1: Gestão dos Acolhidos — Fundação Doutor Jesus';
    }
  }

  renderTabContent(acolhidos, blocos, logs) {
    // 1.1. TRIAGEM & ADMISSÃO
    if (this.currentTab === 'acolhidos') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <h3><i data-lucide="users" style="vertical-align: middle; margin-right: 0.5rem;"></i> Cadastros & Admissões RDC 29 ANVISA</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovaAdmissao()">
              <i data-lucide="user-plus"></i> + Nova Admissão
            </button>
          </div>

          <!-- Search & Filter Bar -->
          <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem;">
            <input type="text" class="form-input" placeholder="Buscar por Nome, CPF ou Código FDJ..." value="\${this.termoBusca}" oninput="window.ui.buscar(this.value)" style="flex: 1;">
            <select class="form-select" style="width: 160px;" onchange="window.ui.filtrarStatus(this.value)">
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativos</option>
              <option value="triagem">Em Triagem</option>
            </select>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código FDJ</th>
                  <th>Nome do Acolhido</th>
                  <th>CPF / RG</th>
                  <th>Status</th>
                  <th>Alojamento / Leito</th>
                  <th>Checklist Admissão RDC 29</th>
                  <th>Fase PTI</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                \${acolhidos.map(a => `
                  <tr>
                    <td><strong>\${a.id}</strong></td>
                    <td><strong>\${a.nome}</strong></td>
                    <td>\${a.cpf}</td>
                    <td>
                      <span class="badge \${a.status === 'ativo' ? 'badge-success' : 'badge-warning'}">
                        \${a.status === 'ativo' ? 'Ativo' : 'Em Triagem'}
                      </span>
                    </td>
                    <td>\${a.leito}</td>
                    <td>
                      <div style="display: flex; gap: 0.2rem;">
                        <span class="badge \${a.checklist && a.checklist.kitHigiene ? 'badge-success' : 'badge-danger'}" title="Kit Higiene">Kit</span>
                        <span class="badge \${a.checklist && a.checklist.enxovalLeito ? 'badge-success' : 'badge-danger'}" title="Enxoval de Leito">Enxoval</span>
                        <span class="badge \${a.checklist && a.checklist.crachaIdentificacao ? 'badge-success' : 'badge-danger'}" title="Crachá">Crachá</span>
                      </div>
                    </td>
                    <td><span class="badge badge-info">Fase \${a.pti ? a.pti.faseAtual : 1} / 4</span></td>
                    <td>
                      <div style="display: flex; gap: 0.3rem;">
                        <button class="btn btn-outline btn-sm" onclick="window.ui.abrirProntuario('\${a.id}')" title="Prontuário & PTI">
                          <i data-lucide="file-text"></i> PTI
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="window.ui.abrirModalTrocaLeito('\${a.id}')" title="Trocar Leito">
                          <i data-lucide="bed"></i> Leito
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // 1.2. ALOJAMENTOS & LEITOS
    if (this.currentTab === 'leitos') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="bed" style="vertical-align: middle; margin-right: 0.5rem;"></i> 1.2. Gestão de Alojamentos & Quadro de Leitos</h3>
            <span class="badge badge-primary">Direção de Alojamentos</span>
          </div>

          <div class="grid-2">
            \${blocos.map(b => `
              <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--primary);">\${b.nome}</h4>
                  <span class="badge badge-info">\${b.ocupados} / \${b.capacidade} Leitos Ocupados</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                  <strong>Leitos PCD Térreos Acessíveis:</strong> \${b.pcd} leitos equipados
                </p>
                <div style="width: 100%; background: var(--border-color); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 1rem;">
                  <div style="width: \${(b.ocupados / b.capacidade) * 100}%; background: var(--primary); height: 100%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 2.0. PRONTUÁRIO & PTI
    if (this.currentTab === 'pti') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="file-text" style="vertical-align: middle; margin-right: 0.5rem;"></i> 2.0. Prontuário Eletrônico & Evolução PTI (RDC 29 ANVISA)</h3>
            <span class="badge badge-success">Serviço Social & Psicossocial</span>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código FDJ</th>
                  <th>Acolhido</th>
                  <th>Alojamento</th>
                  <th>Fase Atual PTI</th>
                  <th>Parecer Técnico da Evolução</th>
                  <th>Ações de Evolução</th>
                </tr>
              </thead>
              <tbody>
                \${acolhidos.map(a => `
                  <tr>
                    <td><strong>\${a.id}</strong></td>
                    <td><strong>\${a.nome}</strong></td>
                    <td>\${a.leito}</td>
                    <td><span class="badge badge-primary">Fase \${a.pti ? a.pti.faseAtual : 1} / 4</span></td>
                    <td style="max-width: 300px; font-size: 0.85rem; color: var(--text-muted);">
                      \${a.pti ? a.pti.parecerTecnico : 'Aguardando parecer inicial.'}
                    </td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="window.ui.abrirProntuario('\${a.id}')">
                        <i data-lucide="arrow-right-circle"></i> Evoluir PTI
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

    // 3.0. CRACHÁS, QUITAÇÃO & WHATSAPP
    if (this.currentTab === 'documentos') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="qr-code" style="vertical-align: middle; margin-right: 0.5rem;"></i> 3.0. Crachá QR Code, Declaração de Quitação & Envio via WhatsApp</h3>
            <span class="badge badge-info">Documentos Oficiais</span>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código FDJ</th>
                  <th>Acolhido</th>
                  <th>Familiar Responsável</th>
                  <th>Leito</th>
                  <th>Documentos Oficiais A4</th>
                  <th>Notificação WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                \${acolhidos.map(a => `
                  <tr>
                    <td><strong>\${a.id}</strong></td>
                    <td><strong>\${a.nome}</strong></td>
                    <td>\${a.familiarNome || 'Não informado'}</td>
                    <td>\${a.leito}</td>
                    <td>
                      <div style="display: flex; gap: 0.3rem;">
                        <button class="btn btn-outline btn-sm" onclick="window.ui.abrirCracha('\${a.id}')">
                          <i data-lucide="qr-code"></i> Crachá A4
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="window.ui.abrirQuitacao('\${a.id}')">
                          <i data-lucide="file-check"></i> Quitação A4
                        </button>
                      </div>
                    </td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="window.ui.enviarWhatsApp('\${a.id}')">
                        <i data-lucide="send"></i> Enviar via WhatsApp
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

    // 4.0. ALTAS & TRANSPORTE SUS
    if (this.currentTab === 'altas') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="user-check" style="vertical-align: middle; margin-right: 0.5rem;"></i> 4.0. Altas Terapêuticas, Desligamentos & Escala de Transporte SUS</h3>
            <span class="badge badge-success">Reinserção Social</span>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código FDJ</th>
                  <th>Acolhido</th>
                  <th>Status Tratamento</th>
                  <th>Leito Atual</th>
                  <th>Ações de Encerramento</th>
                </tr>
              </thead>
              <tbody>
                \${acolhidos.map(a => `
                  <tr>
                    <td><strong>\${a.id}</strong></td>
                    <td><strong>\${a.nome}</strong></td>
                    <td>
                      <span class="badge \${a.status === 'alta' ? 'badge-success' : 'badge-primary'}">
                        \${a.status === 'alta' ? 'Alta Concluída' : 'Em Tratamento'}
                      </span>
                    </td>
                    <td>\${a.leito}</td>
                    <td>
                      \${a.status !== 'alta' ? `
                        <button class="btn btn-danger btn-sm" onclick="window.ui.confirmarAlta('\${a.id}')">
                          <i data-lucide="check-square"></i> Confirmar Desligamento & Liberar Leito
                        </button>
                      ` : `
                        <span class="badge badge-success">Quitação Emitida</span>
                      `}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // MÓDULO 13 LOGS
    return `
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <h3><i data-lucide="shield-check" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 13: TI & Logs de Auditoria do Sistema SGI</h3>
          <span class="badge badge-primary">SuperAdmin / TI</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Horário / Data</th>
                <th>Evento do Sistema</th>
              </tr>
            </thead>
            <tbody>
              \${logs.map(l => `
                <tr>
                  <td style="width: 200px; font-weight: 700;">\${l.timestamp}</td>
                  <td>\${l.mensagem}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- MÉTODOS DE AÇÃO DO MACROMÓDULO 1 ---
  buscar(termo) {
    this.termoBusca = termo;
    this.renderApp();
  }

  filtrarStatus(status) {
    this.filtroStatus = status;
    this.renderApp();
  }

  abrirModalNovaAdmissao() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content" style="max-width: 650px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-weight: 800;"><i data-lucide="user-plus" style="vertical-align: middle;"></i> 1.1. Admissão & Anamnese RDC 29 ANVISA</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <form onsubmit="window.ui.salvarAdmissao(event)">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Nome Completo do Acolhido *</label>
                <input type="text" id="add-nome" class="form-input" required placeholder="Ex: Carlos Eduardo Silva">
              </div>
              <div class="form-group">
                <label class="form-label">CPF *</label>
                <input type="text" id="add-cpf" class="form-input" required placeholder="000.000.000-00">
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">RG</label>
                <input type="text" id="add-rg" class="form-input" placeholder="00.000.000-00">
              </div>
              <div class="form-group">
                <label class="form-label">Cidade / Origem</label>
                <input type="text" id="add-origem" class="form-input" placeholder="Ex: Salvador / BA">
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Alojamento / Bloco Destino</label>
                <select id="add-bloco" class="form-select">
                  <option value="Bloco A — Restauração">Bloco A — Restauração</option>
                  <option value="Bloco B — Renovação">Bloco B — Renovação</option>
                  <option value="Bloco C — Esperança">Bloco C — Esperança</option>
                  <option value="Bloco D — Graça">Bloco D — Graça</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Leito Específico</label>
                <input type="text" id="add-leito" class="form-input" value="Leito A-105 (Térreo PCD)">
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Familiar Responsável</label>
                <input type="text" id="add-familiar-nome" class="form-input" placeholder="Nome da Mãe / Responsável">
              </div>
              <div class="form-group">
                <label class="form-label">Telefone WhatsApp Familiar *</label>
                <input type="text" id="add-familiar-tel" class="form-input" value="5571988421044" placeholder="5571999998888">
              </div>
            </div>

            <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color); margin-bottom: 1rem;">
              <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem;">Checklist de Enxoval e Higiene (RDC 29):</h4>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.8rem;">
                <label><input type="checkbox" id="chk-kit" checked> Kit Higiene</label>
                <label><input type="checkbox" id="chk-enxoval" checked> Enxoval de Leito</label>
                <label><input type="checkbox" id="chk-vestuario" checked> Vestuário Padrão</label>
                <label><input type="checkbox" id="chk-cracha" checked> Crachá QR Code</label>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" class="btn btn-secondary" onclick="window.ui.fecharModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="check"></i> Cadastrar & Admitir</button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  salvarAdmissao(e) {
    e.preventDefault();
    const nome = document.getElementById('add-nome').value;
    const cpf = document.getElementById('add-cpf').value;
    const rg = document.getElementById('add-rg').value;
    const origem = document.getElementById('add-origem').value;
    const bloco = document.getElementById('add-bloco').value;
    const leito = document.getElementById('add-leito').value;
    const familiarNome = document.getElementById('add-familiar-nome').value;
    const familiarTel = document.getElementById('add-familiar-tel').value;

    window.store.addAcolhido({
      nome, cpf, rg, origem, bloco, leito, familiarNome, familiarTel,
      oficina: "Adaptação & Triagem",
      checklist: {
        kitHigiene: document.getElementById('chk-kit').checked,
        enxovalLeito: document.getElementById('chk-enxoval').checked,
        vestuarioPadrao: document.getElementById('chk-vestuario').checked,
        crachaIdentificacao: document.getElementById('chk-cracha').checked
      }
    });

    this.fecharModal();
    this.renderApp();
  }

  abrirProntuario(id) {
    const acolhido = window.store.getAcolhidoById(id);
    if (!acolhido) return;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content" style="max-width: 700px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3><i data-lucide="file-text" style="vertical-align: middle;"></i> 2.0. Prontuário RDC 29 — \${acolhido.nome}</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <p><strong>Código FDJ:</strong> \${acolhido.id} | <strong>CPF:</strong> \${acolhido.cpf} | <strong>Alojamento:</strong> \${acolhido.leito}</p>
          
          <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-highlight); margin: 1rem 0;">
            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">Evolução das Fases do PTI (RDC 29 ANVISA)</h4>
            <p><strong>Fase Atual:</strong> Fase \${acolhido.pti ? acolhido.pti.faseAtual : 1} de 4</p>
            <p style="font-size: 0.85rem; color: var(--text-muted);"><strong>Parecer Técnico:</strong> \${acolhido.pti ? acolhido.pti.parecerTecnico : ''}</p>
          </div>

          <div class="form-group">
            <label class="form-label">Atualizar Parecer Técnico da Evolução:</label>
            <textarea id="novo-parecer" class="form-input" style="height: 70px;">\${acolhido.pti ? acolhido.pti.parecerTecnico : ''}</textarea>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
            \${acolhido.pti && acolhido.pti.faseAtual < 4 ? `
              <button class="btn btn-primary" onclick="window.ui.evoluirPTI('\${acolhido.id}')">
                <i data-lucide="arrow-right-circle"></i> Avançar para a Fase \${acolhido.pti.faseAtual + 1}
              </button>
            ` : '<span class="badge badge-success">PTI Concluído (Fase 4)</span>'}
            <button class="btn btn-secondary" onclick="window.ui.fecharModal()">Fechar</button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  evoluirPTI(id) {
    const parecer = document.getElementById('novo-parecer').value;
    window.store.avancarPTI(id, parecer);
    this.fecharModal();
    this.renderApp();
  }

  abrirModalTrocaLeito(id) {
    const acolhido = window.store.getAcolhidoById(id);
    if (!acolhido) return;

    const novoBloco = prompt("Novo Bloco de Alojamento:", acolhido.bloco || "Bloco A — Restauração");
    const novoLeito = prompt("Novo Leito (ex: Leito A-108):", acolhido.leito || "Leito A-108");
    if (novoBloco && novoLeito) {
      window.store.trocarLeito(id, novoBloco, novoLeito);
      this.renderApp();
    }
  }

  abrirCracha(id) {
    const acolhido = window.store.getAcolhidoById(id);
    if (!acolhido) return;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content" style="max-width: 480px; text-align: center;">
          <div class="no-print" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
            <h3>CRACHÁ OFICIAL QR CODE — A4</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <div style="border: 3px solid #2563eb; border-radius: 12px; padding: 1.5rem; background: #fff; color: #000; text-align: center; margin: 0 auto; max-width: 320px;">
            <div style="background: #2563eb; color: #fff; padding: 0.5rem; border-radius: 6px; font-weight: 800; font-size: 0.9rem; margin-bottom: 1rem;">
              FUNDAÇÃO DOUTOR JESUS
            </div>
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">👤</div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a;">\${acolhido.nome}</h3>
            <p style="font-size: 0.85rem; color: #2563eb; font-weight: 700;">\${acolhido.id}</p>
            <p style="font-size: 0.8rem; margin-top: 0.5rem;"><strong>CPF:</strong> \${acolhido.cpf}</p>
            <p style="font-size: 0.8rem;"><strong>Alojamento:</strong> \${acolhido.leito}</p>
            <div style="margin-top: 0.75rem; background: #f1f5f9; padding: 0.5rem; border-radius: 6px; font-size: 0.7rem; color: #475569;">
              [ QR CODE DE IDENTIFICAÇÃO FDJ ]
            </div>
          </div>

          <div class="no-print" style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
            <button class="btn btn-primary" onclick="window.print()"><i data-lucide="printer"></i> Imprimir Crachá A4</button>
            <button class="btn btn-secondary" onclick="window.ui.fecharModal()">Fechar</button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  abrirQuitacao(id) {
    const acolhido = window.store.getAcolhidoById(id);
    if (!acolhido) return;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content" style="max-width: 600px;">
          <div class="no-print" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
            <h3>DECLARAÇÃO DE PLENA QUITAÇÃO — A4</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <div style="border: 1px solid #cbd5e1; padding: 2rem; background: #fff; color: #000; font-family: serif; line-height: 1.6;">
            <h3 style="text-align: center; font-weight: 800; font-size: 1.1rem; border-bottom: 2px solid #000; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
              DECLARAÇÃO DE PLENA, IRREVOGÁVEL E GERAL QUITAÇÃO
            </h3>
            <p>
              Declaramos para os devidos fins de direito que o(a) acolhido(a) <strong>\${acolhido.nome}</strong>, portador(a) do CPF <strong>\${acolhido.cpf}</strong>, matriculado sob o código <strong>\${acolhido.id}</strong>, cumpriu satisfatoriamente todas as etapas do Plano Terapêutico Individual na Fundação Doutor Jesus (Candeias/BA).
            </p>
            <p style="margin-top: 1rem;">
              Nada mais havendo a constar ou reclamar, concede-se a presente alta com plena quitação.
            </p>
            <p style="margin-top: 2rem; text-align: right;">Candeias/BA, \${new Date().toLocaleDateString('pt-BR')}.</p>
            <div style="margin-top: 3rem; text-align: center; border-top: 1px solid #000; padding-top: 0.5rem;">
              Assistente Social Valéria (Triagem & Admissão) — CRESS/BA
            </div>
          </div>

          <div class="no-print" style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1rem;">
            <button class="btn btn-primary" onclick="window.print()"><i data-lucide="printer"></i> Imprimir Declaração A4</button>
            <button class="btn btn-secondary" onclick="window.ui.fecharModal()">Fechar</button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  enviarWhatsApp(id) {
    const acolhido = window.store.getAcolhidoById(id);
    if (!acolhido) return;

    const telefone = acolhido.familiarTel || "5571988421044";
    const texto = encodeURIComponent(`Olá! Este é o Boletim Informativo de Saúde e Evolução de ${acolhido.nome} na Fundação Doutor Jesus (Candeias/BA).\nStatus: ${acolhido.status.toUpperCase()}\nAlojamento: ${acolhido.leito}\nFase PTI: Fase ${acolhido.pti ? acolhido.pti.faseAtual : 1} de 4\nEvolução Psicossocial: Excelente adesão ao tratamento RDC 29.`);
    
    window.open(`https://api.whatsapp.com/send?phone=${telefone}&text=${texto}`, '_blank');
  }

  confirmarAlta(id) {
    const motivo = prompt("Motivo da alta / desligamento:", "Alta Terapêutica Concluída com Sucesso");
    if (motivo) {
      window.store.concluirAlta(id, motivo);
      this.renderApp();
    }
  }

  fecharModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
  }
}

window.ui = new UI();
