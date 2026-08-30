/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Renderização do Macromódulo 1 & Macromódulo 2 (Gestão Administrativa)
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentTab = 'dashboard';
    this.filtroStatus = 'todos';
    this.termoBusca = '';
    this.filtroSetorEstoque = 'todos';
  }

  renderApp() {
    const stats = window.store.getEstatisticas();
    const acolhidos = window.store.getAcolhidos();
    const estoque = window.store.getEstoque();
    const oficinas = window.store.getOficinas();
    const refeicoes = window.store.getRefeicoes();
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

    // Filtrar Estoque FEFO
    const estoqueFiltrado = estoque.filter(e => {
      const matchSetor = this.filtroSetorEstoque === 'todos' || e.setor === this.filtroSetorEstoque;
      const matchBusca = !this.termoBusca || e.item.toLowerCase().includes(this.termoBusca.toLowerCase()) || e.id.toLowerCase().includes(this.termoBusca.toLowerCase());
      return matchSetor && matchBusca;
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
              Macromódulo 2: Administração
            </div>

            <button class="btn \${this.currentTab === 'estoque' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('estoque')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="boxes"></i>
              <span>5. Estoque FEFO</span>
            </button>
            <button class="btn \${this.currentTab === 'refeicoes' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('refeicoes')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="utensils-crossed"></i>
              <span>6. Refeições (1.240)</span>
            </button>
            <button class="btn \${this.currentTab === 'oficinas' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('oficinas')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="wrench"></i>
              <span>7. Escala de Oficinas</span>
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
              <p style="font-size: 0.8rem; color: var(--text-muted);">SGI Fundação Doutor Jesus — Módulo de Gestão Integrada</p>
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
                  <i data-lucide="clipboard-check"></i>
                </div>
                <div class="stat-info">
                  <h4>Em Triagem</h4>
                  <div class="stat-value">\${stats.totalTriagem}</div>
                  <div class="stat-subtext" style="color: #d97706;"><i data-lucide="clock"></i> Admissões Recentes</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(220,38,38,0.12); color: #dc2626; border-color: rgba(220,38,38,0.3);">
                  <i data-lucide="package-search"></i>
                </div>
                <div class="stat-info">
                  <h4>Estoque Crítico</h4>
                  <div class="stat-value">\${stats.estoqueCritico}</div>
                  <div class="stat-subtext" style="color: #dc2626;"><i data-lucide="alert-circle"></i> Reposição Necessária</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(5,150,105,0.12); color: #059669; border-color: rgba(5,150,105,0.3);">
                  <i data-lucide="gift"></i>
                </div>
                <div class="stat-info">
                  <h4>Kits de Admissão</h4>
                  <div class="stat-value">\${stats.kitsAdmissaoDisponiveis}</div>
                  <div class="stat-subtext"><i data-lucide="check"></i> Disponíveis em Estoque</div>
                </div>
              </div>
            </div>

            <!-- Content Area Based on Active Tab -->
            \${this.renderTabContent(acolhidosFiltrados, estoqueFiltrado, oficinas, refeicoes, logs)}
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
      case 'estoque': return 'Macromódulo 2 (Módulo 5): Controle de Estoque FEFO & Almoxarifado';
      case 'refeicoes': return 'Macromódulo 2 (Módulo 6): Gestão de Refeições (1.240 Acolhidos)';
      case 'oficinas': return 'Macromódulo 2 (Módulo 7): Escala de Oficinas de Capacitação';
      case 'saude': return 'Gestão da Saúde & Controle de Dietas Especiais';
      case 'ti': return 'Módulo 13: TI & Logs Reativos de Auditoria';
      default: return 'Painel Executivo — SGI Fundação Doutor Jesus';
    }
  }

  renderTabContent(acolhidos, estoque, oficinas, refeicoes, logs) {
    // TABA ESTOQUE FEFO (MACROMÓDULO 2)
    if (this.currentTab === 'estoque') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <h3><i data-lucide="boxes" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 5: Controle de Estoque FEFO (First Expired, First Out)</h3>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary" onclick="window.ui.abrirModalNovoItemEstoque()">
                <i data-lucide="plus-circle"></i> + Novo Insumo
              </button>
            </div>
          </div>

          <!-- Filtros de Estoque -->
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div class="form-group" style="margin-bottom: 0; flex: 1;">
              <input type="text" class="form-input" placeholder="Buscar por insumo..." value="\${this.termoBusca}" oninput="window.ui.buscar(this.value)">
            </div>
            <select class="form-select" style="width: 200px; margin-bottom: 0;" onchange="window.ui.filtrarSetorEstoque(this.value)">
              <option value="todos">Todos os Setores</option>
              <option value="Despensa Geral">Despensa Geral</option>
              <option value="Cozinha Industrial">Cozinha Industrial</option>
              <option value="Triagem / Recepção">Triagem / Recepção</option>
            </select>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Insumo / Descrição</th>
                  <th>Saldo Atual</th>
                  <th>Mínimo</th>
                  <th>Setor</th>
                  <th>Validade (Regra FEFO)</th>
                  <th>Status</th>
                  <th>Ações de Entrada / Saída</th>
                </tr>
              </thead>
              <tbody>
                \${estoque.map(e => `
                  <tr>
                    <td><strong>\${e.id}</strong></td>
                    <td><strong>\${e.item}</strong></td>
                    <td><strong style="font-size: 1.05rem; color: \${e.quantidade <= e.estoqueMinimo ? '#dc2626' : 'var(--text-main)'}">\${e.quantidade} \${e.unidade || 'u'}</strong></td>
                    <td>\${e.estoqueMinimo} \${e.unidade || 'u'}</td>
                    <td>\${e.setor}</td>
                    <td><span class="badge badge-info">\${e.validade}</span></td>
                    <td>
                      <span class="badge \${e.quantidade <= e.estoqueMinimo ? 'badge-danger' : 'badge-success'}">
                        \${e.quantidade <= e.estoqueMinimo ? 'Repor Urgente' : 'Ok'}
                      </span>
                    </td>
                    <td>
                      <div style="display: flex; gap: 0.3rem;">
                        <button class="btn btn-secondary btn-sm" onclick="window.ui.adicionarEstoque('\${e.id}')" title="Registrar Entrada (+)">
                          + Reposição
                        </button>
                        <button class="btn btn-outline btn-sm" onclick="window.ui.deduzirEstoque('\${e.id}')" title="Registrar Consumo (-)">
                          - Consumo
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

    // TAB REFEIÇÕES (MACROMÓDULO 2 - MÓDULO 6)
    if (this.currentTab === 'refeicoes') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="utensils-crossed" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 6: Gestão de Refeições (Café e Almoço para 1.240 Acolhidos)</h3>
            <span class="badge badge-primary">Cozinha Industrial</span>
          </div>

          <div class="grid-2" style="margin-bottom: 1.5rem;">
            \${refeicoes.map(r => `
              <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-highlight);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--primary);">\${r.refeicao}</h4>
                  <span class="badge \${r.status === 'Servido' ? 'badge-success' : 'badge-warning'}">\${r.status}</span>
                </div>
                <p style="font-size: 0.9rem; margin-bottom: 0.5rem;"><strong>Quantidade:</strong> \${r.quantidade} Acolhidos atendidos</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;"><strong>Cardápio do Dia:</strong> \${r.cardapio}</p>

                \${r.status !== 'Servido' ? `
                  <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center;" onclick="window.ui.confirmarRefeicaoServida('\${r.id}')">
                    <i data-lucide="check"></i> Confirmar Refeição Servida & Baixar Estoque
                  </button>
                ` : `
                  <div style="text-align: center; color: #059669; font-weight: 700; font-size: 0.85rem;">
                    <i data-lucide="check-check" style="vertical-align: middle;"></i> Refeição Servida e Insumos Baixados no FEFO
                  </div>
                `}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // TAB OFICINAS (MACROMÓDULO 2 - MÓDULO 7)
    if (this.currentTab === 'oficinas') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="wrench" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 7: Escalas de Oficinas de Capacitação</h3>
            <span class="badge badge-info">Capacitação Profissional</span>
          </div>

          <div class="grid-2">
            \${oficinas.map(o => `
              <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-main);">\${o.nome}</h4>
                  <span class="badge badge-primary">\${o.ocupadas} / \${o.vagas} Vagas</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem;"><strong>Instrutor Responsável:</strong> \${o.responsavel}</p>
                <p style="font-size: 0.85rem; color: var(--text-main);"><strong>Atividade Principal:</strong> \${o.atividade}</p>
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

  filtrarSetorEstoque(setor) {
    this.filtroSetorEstoque = setor;
    this.renderApp();
  }

  adicionarEstoque(id) {
    const qtd = prompt("Quantidade a adicionar ao estoque (+ Reposição/Doação):", "10");
    if (qtd && !isNaN(qtd) && Number(qtd) > 0) {
      window.store.adicionarQuantidadeEstoque(id, Number(qtd));
      this.renderApp();
    }
  }

  deduzirEstoque(id) {
    const qtd = prompt("Quantidade a deduzir do estoque (- Consumo):", "1");
    if (qtd && !isNaN(qtd) && Number(qtd) > 0) {
      window.store.deduzirItemEstoque(id, Number(qtd));
      this.renderApp();
    }
  }

  confirmarRefeicaoServida(id) {
    window.store.registrarRefeicaoServida(id);
    this.renderApp();
  }

  abrirModalNovoItemEstoque() {
    const item = prompt("Nome do novo insumo/produto:");
    if (item && item.trim()) {
      const quantidade = Number(prompt("Quantidade inicial em estoque:", "50")) || 50;
      const estoqueMinimo = Number(prompt("Estoque mínimo de segurança:", "10")) || 10;
      const setor = prompt("Setor (Despensa Geral / Cozinha Industrial / Triagem / Recepção):", "Despensa Geral") || "Despensa Geral";
      const validade = prompt("Data de validade (AAAA-MM-DD):", "2026-12-31") || "2026-12-31";

      window.store.addEstoqueItem({
        item: item.trim(),
        quantidade,
        estoqueMinimo,
        setor,
        validade,
        unidade: "unidades"
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
