/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Renderização dos Macromódulos 1 & 2 (Almoxarifado, Despensa e Frota)
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentTab = 'dashboard';
    this.filtroStatus = 'todos';
    this.termoBusca = '';
  }

  renderApp() {
    const stats = window.store.getEstatisticas();
    const acolhidos = window.store.getAcolhidos();
    const almoxarifado = window.store.getAlmoxarifado();
    const despensa = window.store.getDespensa();
    const frota = window.store.getFrota();
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

    // Filtrar Almoxarifado
    const almoxFiltrado = almoxarifado.filter(a => !this.termoBusca || a.item.toLowerCase().includes(this.termoBusca.toLowerCase()) || a.id.toLowerCase().includes(this.termoBusca.toLowerCase()));

    // Filtrar Despensa
    const despensaFiltrada = despensa.filter(d => !this.termoBusca || d.item.toLowerCase().includes(this.termoBusca.toLowerCase()) || d.id.toLowerCase().includes(this.termoBusca.toLowerCase()));

    // Filtrar Frota
    const frotaFiltrada = frota.filter(f => !this.termoBusca || f.modelo.toLowerCase().includes(this.termoBusca.toLowerCase()) || f.placa.toLowerCase().includes(this.termoBusca.toLowerCase()) || f.motorista.toLowerCase().includes(this.termoBusca.toLowerCase()));

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
            <button class="btn \${this.currentTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('dashboard')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="layout-dashboard"></i>
              <span>Painel Executivo</span>
            </button>
            
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              Macromódulo 1: Acolhidos
            </div>

            <button class="btn \${this.currentTab === 'acolhidos' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('acolhidos')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="users"></i>
              <span>1. Gestão Acolhidos</span>
            </button>
            <button class="btn \${this.currentTab === 'pti' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('pti')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="file-badge-2"></i>
              <span>2. Prontuário & PTI</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              Macromódulo 2: Gestão Adm.
            </div>

            <button class="btn \${this.currentTab === 'almoxarifado' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('almoxarifado')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="package"></i>
              <span>Módulo Almoxarifado</span>
            </button>
            <button class="btn \${this.currentTab === 'despensa' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('despensa')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="shopping-bag"></i>
              <span>Módulo Despensa</span>
            </button>
            <button class="btn \${this.currentTab === 'frota' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('frota')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="truck"></i>
              <span>Módulo Frota</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              Saúde & TI
            </div>

            <button class="btn \${this.currentTab === 'saude' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('saude')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="heart-pulse"></i>
              <span>Saúde & Dietas</span>
            </button>
            <button class="btn \${this.currentTab === 'ti' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('ti')" style="justify-content: flex-start; width: 100%;">
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
              <p style="font-size: 0.8rem; color: var(--text-muted);">SGI Fundação Doutor Jesus — Sistema de Gestão Integrada</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.ui.abrirModalNovoAcolhido()">
                <i data-lucide="user-plus"></i>
                <span>Novo Acolhido (Triagem)</span>
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
                  <div class="stat-subtext"><i data-lucide="check-circle-2"></i> Residentes Ativos</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(217,119,6,0.12); color: #d97706; border-color: rgba(217,119,6,0.3);">
                  <i data-lucide="package"></i>
                </div>
                <div class="stat-info">
                  <h4>Almoxarifado Alertas</h4>
                  <div class="stat-value">\${stats.almoxCritico}</div>
                  <div class="stat-subtext" style="color: #d97706;"><i data-lucide="alert-circle"></i> Reposição de Materiais</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(220,38,38,0.12); color: #dc2626; border-color: rgba(220,38,38,0.3);">
                  <i data-lucide="shopping-bag"></i>
                </div>
                <div class="stat-info">
                  <h4>Despensa Alertas</h4>
                  <div class="stat-value">\${stats.despensaCritica}</div>
                  <div class="stat-subtext" style="color: #dc2626;"><i data-lucide="alert-triangle"></i> Estoque FEFO Baixo</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(5,150,105,0.12); color: #059669; border-color: rgba(5,150,105,0.3);">
                  <i data-lucide="truck"></i>
                </div>
                <div class="stat-info">
                  <h4>Veículos em Viagem</h4>
                  <div class="stat-value">\${stats.veiculosEmViagem} / \${stats.totalVeiculos}</div>
                  <div class="stat-subtext"><i data-lucide="navigation"></i> Frota em Operação</div>
                </div>
              </div>
            </div>

            <!-- Content Area Based on Active Tab -->
            \${this.renderTabContent(acolhidosFiltrados, almoxFiltrado, despensaFiltrada, frotaFiltrada, logs)}
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
      case 'acolhidos': return 'Macromódulo 1: Gestão dos Acolhidos & Triagem';
      case 'pti': return 'Módulo 2: Prontuário Eletrônico & PTI';
      case 'almoxarifado': return 'Macromódulo 2: Módulo de Almoxarifado';
      case 'despensa': return 'Macromódulo 2: Módulo de Despensa (Alimentos & FEFO)';
      case 'frota': return 'Macromódulo 2: Módulo de Frota & Transporte';
      case 'saude': return 'Gestão da Saúde & Controle de Dietas Especiais';
      case 'ti': return 'Módulo 13: TI & Logs Reativos de Auditoria';
      default: return 'Painel Executivo — SGI Fundação Doutor Jesus';
    }
  }

  renderTabContent(acolhidos, almoxarifado, despensa, frota, logs) {
    // 1. MÓDULO DE ALMOXARIFADO
    if (this.currentTab === 'almoxarifado') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <h3><i data-lucide="package" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo de Almoxarifado (Materiais, Ferramentas & Enxovais)</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovoAlmoxarifado()">
              <i data-lucide="plus-circle"></i> + Novo Material
            </button>
          </div>

          <div style="margin-bottom: 1rem;">
            <input type="text" class="form-input" placeholder="Buscar material no almoxarifado..." value="\${this.termoBusca}" oninput="window.ui.buscar(this.value)">
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Material / Item</th>
                  <th>Categoria</th>
                  <th>Localização</th>
                  <th>Saldo Atual</th>
                  <th>Estoque Mínimo</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                \${almoxarifado.map(a => `
                  <tr>
                    <td><strong>\${a.id}</strong></td>
                    <td><strong>\${a.item}</strong></td>
                    <td><span class="badge badge-info">\${a.categoria}</span></td>
                    <td>\${a.local}</td>
                    <td><strong style="font-size: 1.05rem; color: \${a.quantidade <= a.estoqueMinimo ? '#dc2626' : 'var(--text-main)'}">\${a.quantidade} u</strong></td>
                    <td>\${a.estoqueMinimo} u</td>
                    <td>
                      <span class="badge \${a.quantidade <= a.estoqueMinimo ? 'badge-danger' : 'badge-success'}">
                        \${a.quantidade <= a.estoqueMinimo ? 'Repor Urgente' : 'Normal'}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.3rem;">
                        <button class="btn btn-secondary btn-sm" onclick="window.ui.alterarAlmoxarifado('\${a.id}', 5)">+ 5</button>
                        <button class="btn btn-outline btn-sm" onclick="window.ui.alterarAlmoxarifado('\${a.id}', -1)">- 1</button>
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

    // 2. MÓDULO DE DESPENSA
    if (this.currentTab === 'despensa') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <h3><i data-lucide="shopping-bag" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo de Despensa (Alimentos & Insumos das Refeições)</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovoAlimentoDespensa()">
              <i data-lucide="plus-circle"></i> + Novo Alimento
            </button>
          </div>

          <div style="margin-bottom: 1rem;">
            <input type="text" class="form-input" placeholder="Buscar alimento na despensa..." value="\${this.termoBusca}" oninput="window.ui.buscar(this.value)">
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Alimento / Insumo</th>
                  <th>Categoria</th>
                  <th>Saldo em Estoque</th>
                  <th>Mínimo</th>
                  <th>Validade (FEFO)</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                \${despensa.map(d => `
                  <tr>
                    <td><strong>\${d.id}</strong></td>
                    <td><strong>\${d.item}</strong></td>
                    <td><span class="badge badge-primary">\${d.categoria}</span></td>
                    <td><strong style="font-size: 1.05rem; color: \${d.quantidade <= d.estoqueMinimo ? '#dc2626' : 'var(--text-main)'}">\${d.quantidade} u</strong></td>
                    <td>\${d.estoqueMinimo} u</td>
                    <td><span class="badge badge-info">\${d.validade}</span></td>
                    <td>
                      <span class="badge \${d.quantidade <= d.estoqueMinimo ? 'badge-danger' : 'badge-success'}">
                        \${d.quantidade <= d.estoqueMinimo ? 'Repor Urgente' : 'Normal'}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.3rem;">
                        <button class="btn btn-secondary btn-sm" onclick="window.ui.alterarDespensa('\${d.id}', 10)">+ 10</button>
                        <button class="btn btn-outline btn-sm" onclick="window.ui.alterarDespensa('\${d.id}', -1)">- 1</button>
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

    // 3. MÓDULO DE FROTA
    if (this.currentTab === 'frota') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <h3><i data-lucide="truck" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo de Frota & Veículos (Transporte de Acolhidos)</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalNovoVeiculo()">
              <i data-lucide="plus-circle"></i> + Novo Veículo
            </button>
          </div>

          <div style="margin-bottom: 1rem;">
            <input type="text" class="form-input" placeholder="Buscar modelo, placa ou motorista..." value="\${this.termoBusca}" oninput="window.ui.buscar(this.value)">
          </div>

          <div class="grid-2">
            \${frota.map(v => `
              <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-main);">\${v.modelo}</h4>
                  <span class="badge \${v.status === 'Em Viagem' ? 'badge-warning' : (v.status === 'Disponível' ? 'badge-success' : 'badge-info')}">
                    \${v.status}
                  </span>
                </div>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Placa:</strong> <span class="badge badge-primary">\${v.placa}</span> | <strong>KM:</strong> \${v.quilometragem}</p>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Motorista Responsável:</strong> \${v.motorista}</p>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Tipo:</strong> \${v.tipo}</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;"><strong>Destino Atual:</strong> \${v.destino}</p>

                <div style="display: flex; gap: 0.5rem;">
                  \${v.status === 'Em Viagem' ? `
                    <button class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center;" onclick="window.ui.alterarStatusFrota('\${v.id}', 'Disponível', 'Base Fundação')">
                      <i data-lucide="check"></i> Registrar Retorno à Base
                    </button>
                  ` : `
                    <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: center;" onclick="window.ui.alterarStatusFrota('\${v.id}', 'Em Viagem')">
                      <i data-lucide="navigation"></i> Lançar Nova Viagem
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // OUTRAS TABS (Saúde, TI, Acolhidos)
    if (this.currentTab === 'saude') {
      const acolhidosComDieta = window.store.getAcolhidos().filter(a => a.dieta && a.dieta !== 'Normal');
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="heart-pulse" style="vertical-align: middle; margin-right: 0.5rem;"></i> Controle de Dietas Especiais & Saúde</h3>
            <span class="badge badge-success">Gestão da Saúde</span>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código FDJ</th>
                  <th>Acolhido</th>
                  <th>Dieta Prescrita (Cozinha)</th>
                  <th>Acompanhamento Médico / Psicossocial</th>
                  <th>Leito</th>
                </tr>
              </thead>
              <tbody>
                \${acolhidosComDieta.map(a => `
                  <tr>
                    <td><strong>\${a.id}</strong></td>
                    <td><strong>\${a.nome}</strong></td>
                    <td><span class="badge badge-warning">\${a.dieta}</span></td>
                    <td>\${a.acompanhamentoMedico}</td>
                    <td>\${a.leito}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (this.currentTab === 'ti') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="shield-check" style="vertical-align: middle; margin-right: 0.5rem;"></i> Logs de Auditoria do Sistema SGI (Módulo 13)</h3>
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
                \${logs.length > 0 ? logs.map(l => `
                  <tr>
                    <td style="width: 200px; font-weight: 700;">\${l.timestamp}</td>
                    <td>\${l.mensagem}</td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="2" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                      Nenhum evento registrado até o momento.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // Default Tab Acolhidos
    return `
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1; min-width: 280px;">
            <div class="form-group" style="margin-bottom: 0; flex: 1;">
              <input type="text" class="form-input" id="search-input" placeholder="Buscar por nome, CPF ou Código FDJ..." value="\${this.termoBusca}" oninput="window.ui.buscar(this.value)">
            </div>
            <select class="form-select" style="width: 160px; margin-bottom: 0;" onchange="window.ui.filtrarStatus(this.value)">
              <option value="todos" \${this.filtroStatus === 'todos' ? 'selected' : ''}>Todos os Status</option>
              <option value="ativo" \${this.filtroStatus === 'ativo' ? 'selected' : ''}>Ativos</option>
              <option value="triagem" \${this.filtroStatus === 'triagem' ? 'selected' : ''}>Em Triagem</option>
            </select>
          </div>

          <span class="badge badge-primary">Macromódulo 1: Gestão de Acolhidos</span>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Código FDJ</th>
                <th>Nome do Acolhido</th>
                <th>CPF</th>
                <th>Status</th>
                <th>Fase PTI</th>
                <th>Leito / Bloco</th>
                <th>Oficina / Escala</th>
                <th>Dieta</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              \${acolhidos.length > 0 ? acolhidos.map(a => `
                <tr>
                  <td><strong>\${a.id}</strong></td>
                  <td><strong>\${a.nome}</strong></td>
                  <td>\${a.cpf}</td>
                  <td>
                    <span class="badge \${a.status === 'ativo' ? 'badge-success' : 'badge-warning'}">
                      \${a.status === 'ativo' ? 'Ativo' : 'Em Triagem'}
                    </span>
                  </td>
                  <td>
                    <span class="badge badge-info">Fase \${a.fasePTI} / 4</span>
                  </td>
                  <td>\${a.leito}</td>
                  <td>\${a.oficina}</td>
                  <td>\${a.dieta}</td>
                  <td>
                    <div style="display: flex; gap: 0.4rem;">
                      <button class="btn btn-outline btn-sm" onclick="window.ui.abrirProntuario('\${a.id}')" title="Ver Prontuário & PTI">
                        <i data-lucide="file-text"></i> PTI
                      </button>
                      <button class="btn btn-primary btn-sm" onclick="window.ui.abrirCracha('\${a.id}')" title="Gerar Crachá A4">
                        <i data-lucide="credit-card"></i> Crachá
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="9" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    Nenhum acolhido encontrado com os filtros selecionados.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // --- MÉTODOS DE ALMOXARIFADO & DESPENSA & FROTA ---
  alterarAlmoxarifado(id, delta) {
    window.store.alterarQtdAlmoxarifado(id, delta);
    this.renderApp();
  }

  alterarDespensa(id, delta) {
    window.store.alterarQtdDespensa(id, delta);
    this.renderApp();
  }

  alterarStatusFrota(id, status, destino) {
    let dest = destino;
    if (status === 'Em Viagem' && !dest) {
      dest = prompt("Destino/Objetivo da viagem:", "Salvador / Atendimento Médico");
    }
    if (status === 'Em Viagem' && !dest) return;
    window.store.alterarStatusVeiculo(id, status, dest);
    this.renderApp();
  }

  abrirModalNovoAlmoxarifado() {
    const item = prompt("Nome do material/item:");
    if (item && item.trim()) {
      const categoria = prompt("Categoria (Material de Limpeza / Ferramentas / Vestuário / Enxoval):", "Material de Limpeza") || "Geral";
      const local = prompt("Localização no almoxarifado:", "Depósito Central") || "Depósito Central";
      const quantidade = Number(prompt("Quantidade inicial:", "20")) || 20;

      window.store.addAlmoxarifadoItem({
        item: item.trim(),
        categoria,
        local,
        quantidade,
        estoqueMinimo: 10
      });
      this.renderApp();
    }
  }

  abrirModalNovoAlimentoDespensa() {
    const item = prompt("Nome do alimento/insumo:");
    if (item && item.trim()) {
      const categoria = prompt("Categoria (Grãos / Matinais / Óleos / Carnes):", "Grãos & Cereais") || "Geral";
      const quantidade = Number(prompt("Quantidade inicial:", "50")) || 50;
      const validade = prompt("Data de validade (AAAA-MM-DD):", "2026-12-31") || "2026-12-31";

      window.store.addDespensaItem({
        item: item.trim(),
        categoria,
        quantidade,
        estoqueMinimo: 15,
        validade
      });
      this.renderApp();
    }
  }

  abrirModalNovoVeiculo() {
    const modelo = prompt("Modelo do veículo (ex: Van Sprinter, Ônibus):");
    if (modelo && modelo.trim()) {
      const placa = prompt("Placa do veículo:", "ABC-1234") || "ABC-1234";
      const motorista = prompt("Motorista responsável:", "João Silva") || "João Silva";
      const tipo = prompt("Tipo de transporte (Transporte de Acolhidos / Emergência / Carga):", "Transporte de Acolhidos") || "Transporte de Acolhidos";

      window.store.addVeiculo({
        modelo: modelo.trim(),
        placa,
        motorista,
        tipo,
        destino: "Base Fundação",
        quilometragem: "50.000 km"
      });
      this.renderApp();
    }
  }

  buscar(termo) {
    this.termoBusca = termo;
    this.renderApp();
  }

  filtrarStatus(status) {
    this.filtroStatus = status;
    this.renderApp();
  }

  abrirModalNovoAcolhido() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content" style="max-width: 600px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
            <h3 style="font-weight: 800;"><i data-lucide="user-plus" style="vertical-align: middle;"></i> Novo Cadastro de Acolhido (Triagem)</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <form id="form-novo-acolhido" onsubmit="window.ui.salvarNovoAcolhido(event)">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Nome Completo *</label>
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
                <label class="form-label">Leito / Bloco de Destino</label>
                <input type="text" id="add-leito" class="form-input" value="Triagem - Leito 01">
              </div>
              <div class="form-group">
                <label class="form-label">Dieta Especial</label>
                <select id="add-dieta" class="form-select">
                  <option value="Normal">Normal</option>
                  <option value="Hipossódica (Pressão Alta)">Hipossódica (Pressão Alta)</option>
                  <option value="Diabética">Diabética</option>
                  <option value="Sem Glúten">Sem Glúten</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Contato de Emergência</label>
              <input type="text" id="add-emergencia" class="form-input" placeholder="(71) 99999-8888 - Parentesco">
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
              <button type="button" class="btn btn-secondary" onclick="window.ui.fecharModal()">Cancelar</button>
              <button type="submit" class="btn btn-primary"><i data-lucide="check"></i> Cadastrar Acolhido</button>
            </div>
          </form>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  salvarNovoAcolhido(e) {
    e.preventDefault();
    const nome = document.getElementById('add-nome').value;
    const cpf = document.getElementById('add-cpf').value;
    const rg = document.getElementById('add-rg').value;
    const origem = document.getElementById('add-origem').value;
    const leito = document.getElementById('add-leito').value;
    const dieta = document.getElementById('add-dieta').value;
    const contatoEmergencia = document.getElementById('add-emergencia').value;

    window.store.addAcolhido({
      nome, cpf, rg, origem, leito, dieta, contatoEmergencia,
      oficina: 'Triagem / Adaptação',
      acompanhamentoMedico: 'Aguardando Avaliação Médica'
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
            <h3><i data-lucide="file-text" style="vertical-align: middle;"></i> Prontuário Eletrônico & PTI — \${acolhido.nome}</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <div class="grid-2" style="margin-bottom: 1rem;">
            <div>
              <p><strong>Código FDJ:</strong> \${acolhido.id}</p>
              <p><strong>CPF:</strong> \${acolhido.cpf}</p>
              <p><strong>Leito:</strong> \${acolhido.leito}</p>
            </div>
            <div>
              <p><strong>Data de Admissão:</strong> \${acolhido.dataAdmissao}</p>
              <p><strong>Oficina Atual:</strong> \${acolhido.oficina}</p>
              <p><strong>Dieta:</strong> \${acolhido.dieta}</p>
            </div>
          </div>

          <!-- PTI Progress Card -->
          <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-highlight); margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem; color: var(--primary);">Evolução do Plano Terapêutico Individual (PTI)</h4>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 1rem;">
              <div style="flex: 1; text-align: center; padding: 0.5rem; border-radius: 6px; background: \${acolhido.fasePTI >= 1 ? 'var(--primary)' : 'var(--border-color)'}; color: #fff; font-size: 0.75rem; font-weight: 700;">
                Fase 1: Triagem
              </div>
              <div style="flex: 1; text-align: center; padding: 0.5rem; border-radius: 6px; background: \${acolhido.fasePTI >= 2 ? 'var(--primary)' : 'var(--border-color)'}; color: #fff; font-size: 0.75rem; font-weight: 700;">
                Fase 2: Conscientização
              </div>
              <div style="flex: 1; text-align: center; padding: 0.5rem; border-radius: 6px; background: \${acolhido.fasePTI >= 3 ? 'var(--primary)' : 'var(--border-color)'}; color: #fff; font-size: 0.75rem; font-weight: 700;">
                Fase 3: Capacitação
              </div>
              <div style="flex: 1; text-align: center; padding: 0.5rem; border-radius: 6px; background: \${acolhido.fasePTI >= 4 ? 'var(--primary)' : 'var(--border-color)'}; color: #fff; font-size: 0.75rem; font-weight: 700;">
                Fase 4: Reinserção
              </div>
            </div>

            <p style="font-size: 0.85rem; color: var(--text-muted);">
              \${acolhido.fasePTI < 4 ? `O acolhido está atualmente na <strong>Fase \${acolhido.fasePTI}</strong> do processo de recuperação.` : '🎉 <strong>Acolhido completou todas as 4 Fases do PTI!</strong> Pronto para reinserção social e profissional.'}
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            \${acolhido.fasePTI < 4 ? `
              <button class="btn btn-primary" onclick="window.ui.avancarPTI('\${acolhido.id}')">
                <i data-lucide="arrow-right-circle"></i> Avançar para Fase \${acolhido.fasePTI + 1}
              </button>
            ` : '<span></span>'}
            <button class="btn btn-secondary" onclick="window.ui.fecharModal()">Fechar Prontuário</button>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  avancarPTI(id) {
    window.store.avancarPTI(id);
    this.fecharModal();
    this.renderApp();
  }

  abrirCracha(id) {
    const acolhido = window.store.getAcolhidoById(id);
    if (!acolhido) return;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content" style="max-width: 500px; text-align: center;">
          <div class="no-print" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
            <h3>CRACHÁ DE IDENTIFICAÇÃO — A4</h3>
            <button class="btn btn-outline btn-sm" onclick="window.ui.fecharModal()"><i data-lucide="x"></i></button>
          </div>

          <!-- Printable Badge Card -->
          <div class="printable-cracha-card" style="border: 3px solid #2563eb; border-radius: 12px; padding: 1.5rem; background: #fff; color: #000; text-align: center; margin: 0 auto; max-width: 320px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <div style="background: #2563eb; color: #fff; padding: 0.5rem; border-radius: 6px; font-weight: 800; font-size: 0.9rem; margin-bottom: 1rem;">
              FUNDAÇÃO DOUTOR JESUS
            </div>

            <div style="width: 100px; height: 100px; border-radius: 50%; background: #e2e8f0; border: 2px solid #2563eb; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: #94a3b8;">
              👤
            </div>

            <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem;">\${acolhido.nome}</h3>
            <p style="font-size: 0.85rem; color: #2563eb; font-weight: 700; margin-bottom: 0.75rem;">\${acolhido.id}</p>

            <div style="font-size: 0.8rem; border-top: 1px dashed #cbd5e1; padding-top: 0.75rem; text-align: left;">
              <p style="margin-bottom: 4px;"><strong>CPF:</strong> \${acolhido.cpf}</p>
              <p style="margin-bottom: 4px;"><strong>Leito:</strong> \${acolhido.leito}</p>
              <p style="margin-bottom: 4px;"><strong>Oficina:</strong> \${acolhido.oficina}</p>
            </div>

            <div style="margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid #e2e8f0; font-size: 0.65rem; color: #64748b;">
              Documento de Identificação Interna — Validade 2026
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

  fecharModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
  }
}

window.ui = new UI();
