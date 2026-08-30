/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Renderização de Componentes e Interface
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
  }

  renderApp() {
    const stats = window.store.getEstatisticas();
    const acolhidos = window.store.getAcolhidos();
    const estoque = window.store.getEstoque();

    this.root.innerHTML = `
      <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
          <div class="sidebar-header" style="padding: 1.5rem 1.25rem; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 38px; height: 38px; border-radius: 8px; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem;">
              FDJ
            </div>
            <div>
              <h2 style="font-size: 1rem; font-weight: 700; color: var(--text-main); line-height: 1.2;">SGI - Fundação</h2>
              <span style="font-size: 0.75rem; color: var(--text-muted);">Doutor Jesus</span>
            </div>
          </div>

          <nav class="sidebar-menu" style="padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <button class="btn btn-outline active" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="layout-dashboard"></i>
              <span>Painel Executivo</span>
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="users"></i>
              <span>1. Gestão Acolhidos</span>
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="clipboard-list"></i>
              <span>Triagem & Leitos</span>
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="package"></i>
              <span>2. Almoxarifado / Estoque</span>
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="utensils"></i>
              <span>Refeições (1.240 Acolhidos)</span>
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="heart-pulse"></i>
              <span>Saúde & Dietas</span>
            </button>
            <button class="btn btn-secondary" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="shield-check"></i>
              <span>Módulo 13: TI & Admin</span>
            </button>
          </nav>
        </aside>

        <!-- Main Content Area -->
        <div class="main-content-wrapper">
          <header class="header-bar" style="padding: 1rem 2rem; border-bottom: 1px solid var(--border-color); background: var(--bg-header); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h1 style="font-size: 1.35rem; font-weight: 800;">Painel Executivo da Fundação Doutor Jesus</h1>
              <p style="font-size: 0.85rem; color: var(--text-muted);">Sistema de Gestão Integrada (SGI) — Operações em Tempo Real</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <button id="btn-novo-acolhido" class="btn btn-primary">
                <i data-lucide="user-plus"></i>
                <span>Novo Acolhido</span>
              </button>
            </div>
          </header>

          <main class="page-content">
            <!-- Stats Grid -->
            <div class="grid-4" style="margin-bottom: 2rem;">
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
                  <i data-lucide="clipboard-check"></i>
                </div>
                <div class="stat-info">
                  <h4>Em Triagem</h4>
                  <div class="stat-value">\${stats.totalTriagem}</div>
                  <div class="stat-subtext" style="color: #d97706;"><i data-lucide="clock"></i> Admissões Recentes</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(5,150,105,0.12); color: #059669; border-color: rgba(5,150,105,0.3);">
                  <i data-lucide="utensils"></i>
                </div>
                <div class="stat-info">
                  <h4>Almoço Comunitário</h4>
                  <div class="stat-value">\${stats.totalRefeicoes}</div>
                  <div class="stat-subtext"><i data-lucide="check-check"></i> Pratos Servidos / Dia</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(220,38,38,0.12); color: #dc2626; border-color: rgba(220,38,38,0.3);">
                  <i data-lucide="alert-triangle"></i>
                </div>
                <div class="stat-info">
                  <h4>Estoque Crítico</h4>
                  <div class="stat-value">\${stats.estoqueCritico}</div>
                  <div class="stat-subtext" style="color: #dc2626;"><i data-lucide="package-search"></i> Itens Abaixo do Mínimo</div>
                </div>
              </div>
            </div>

            <!-- Table of Acolhidos -->
            <div class="card" style="margin-bottom: 2rem;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                <h3><i data-lucide="user-check" style="vertical-align: middle; margin-right: 0.5rem;"></i> Cadastros Recentes de Acolhidos</h3>
                <span class="badge badge-primary">Macromódulo 1</span>
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
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${acolhidos.map(a => `
                      <tr>
                        <td><strong>\${a.id}</strong></td>
                        <td>\${a.nome}</td>
                        <td>\${a.cpf}</td>
                        <td>
                          <span class="badge \${a.status === 'ativo' ? 'badge-success' : 'badge-warning'}">
                            \${a.status === 'ativo' ? 'Ativo' : 'Em Triagem'}
                          </span>
                        </td>
                        <td>Fase \${a.fasePTI} / 4</td>
                        <td>\${a.leito}</td>
                        <td>\${a.oficina}</td>
                        <td>
                          <button class="btn btn-outline btn-sm" onclick="alert('Imprimindo Crachá do Acolhido \${a.nome}')">
                            <i data-lucide="credit-card"></i> Crachá
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Inventory / Despensa Section -->
            <div class="card">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
                <h3><i data-lucide="boxes" style="vertical-align: middle; margin-right: 0.5rem;"></i> Visão Geral do Estoque (Despensa & Cozinha)</h3>
                <span class="badge badge-info">FEFO & Abastecimento</span>
              </div>

              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Código Item</th>
                      <th>Descrição do Item</th>
                      <th>Qtd em Estoque</th>
                      <th>Estoque Mínimo</th>
                      <th>Setor</th>
                      <th>Validade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    \${estoque.map(e => `
                      <tr>
                        <td><strong>\${e.id}</strong></td>
                        <td>\${e.item}</td>
                        <td>\${e.quantidade} u</td>
                        <td>\${e.estoqueMinimo} u</td>
                        <td>\${e.setor}</td>
                        <td>\${e.validade}</td>
                        <td>
                          <span class="badge \${e.quantidade <= e.estoqueMinimo ? 'badge-danger' : 'badge-success'}">
                            \${e.quantidade <= e.estoqueMinimo ? 'Repor Urgente' : 'Ok'}
                          </span>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

window.ui = new UI();
