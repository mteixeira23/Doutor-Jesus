/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Macromódulo 2: Almoxarifado RMI, Despensa 4.000 ref/dia, Frota SUS & Cadastros MROSC
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentTab = 'almoxarifado';
    this.termoBusca = '';
  }

  renderApp() {
    const stats = window.store.getEstatisticas();
    const acolhidos = window.store.getAcolhidos();
    const almoxarifado = window.store.getAlmoxarifado();
    const rmis = window.store.getRMI();
    const despensa = window.store.getDespensa();
    const frota = window.store.getFrota();
    const cadastros = window.store.getCadastrosAdm();
    const logs = window.store.getLogs();

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
            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.5rem 0 0.25rem 0.5rem;">
              1. Gestão Acolhidos
            </div>
            <button class="btn btn-secondary" onclick="window.ui.setTab('acolhidos')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="users"></i>
              <span>1. Gestão dos Acolhidos</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              2. Gestão Administrativa
            </div>

            <button class="btn \${this.currentTab === 'almoxarifado' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('almoxarifado')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="boxes"></i>
              <span>Módulo 5: Almoxarifado & RMI</span>
            </button>
            <button class="btn \${this.currentTab === 'despensa' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('despensa')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="utensils"></i>
              <span>Módulo 6: Despensa (4.000 ref)</span>
            </button>
            <button class="btn \${this.currentTab === 'frota' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('frota')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="truck"></i>
              <span>Módulo 7: Frota & Transporte SUS</span>
            </button>
            <button class="btn \${this.currentTab === 'cadastros' ? 'btn-primary' : 'btn-secondary'}" onclick="window.ui.setTab('cadastros')" style="justify-content: flex-start; width: 100%;">
              <i data-lucide="clipboard-list"></i>
              <span>Cadastros MROSC (2.1 a 2.5)</span>
            </button>

            <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin: 0.75rem 0 0.25rem 0.5rem;">
              Tecnologia & Logs
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
              <p style="font-size: 0.8rem; color: var(--text-muted);">SGI Fundação Doutor Jesus — Prestação de Contas MROSC (TCE-BA & SJDH)</p>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem;">
              <button class="btn btn-outline" onclick="window.print()">
                <i data-lucide="printer"></i>
                <span>Imprimir Manual PDF</span>
              </button>
            </div>
          </header>

          <main class="page-content">
            <!-- Stats Row M2 -->
            <div class="grid-4" style="margin-bottom: 1.5rem;">
              <div class="card stat-card">
                <div class="stat-icon-wrapper">
                  <i data-lucide="boxes"></i>
                </div>
                <div class="stat-info">
                  <h4>Almoxarifado Central</h4>
                  <div class="stat-value">\${almoxarifado.length} Itens</div>
                  <div class="stat-subtext"><i data-lucide="check"></i> Tombados MROSC</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(217,119,6,0.12); color: #d97706; border-color: rgba(217,119,6,0.3);">
                  <i data-lucide="arrow-right-left"></i>
                </div>
                <div class="stat-info">
                  <h4>RMIs em Trânsito</h4>
                  <div class="stat-value">\${rmis.filter(r => r.status.includes('Trânsito')).length} RMIs</div>
                  <div class="stat-subtext" style="color: #d97706;"><i data-lucide="clock"></i> Aguardando Despensa</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(5,150,105,0.12); color: #059669; border-color: rgba(5,150,105,0.3);">
                  <i data-lucide="utensils"></i>
                </div>
                <div class="stat-info">
                  <h4>Refeições / Dia</h4>
                  <div class="stat-value">4.000</div>
                  <div class="stat-subtext"><i data-lucide="heart"></i> 1.240 Acolhidos Atendidos</div>
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon-wrapper" style="background: rgba(37,99,235,0.12); color: #2563eb; border-color: rgba(37,99,235,0.3);">
                  <i data-lucide="truck"></i>
                </div>
                <div class="stat-info">
                  <h4>Frota em Operação</h4>
                  <div class="stat-value">\${frota.filter(f => f.status === 'Em Viagem').length} / \${frota.length}</div>
                  <div class="stat-subtext"><i data-lucide="navigation"></i> Transporte SUS / Carga</div>
                </div>
              </div>
            </div>

            <!-- Tab Content -->
            \${this.renderTabContent(almoxarifado, rmis, despensa, frota, cadastros, logs, acolhidos)}
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
      case 'almoxarifado': return 'Módulo 5: Almoxarifado Central & Emissão de RMI';
      case 'despensa': return 'Módulo 6: Despensa, Nutrição & Cozinha Central (4.000 Refeições/Dia)';
      case 'frota': return 'Módulo 7: Frota, Abastecimentos & Transporte SUS';
      case 'cadastros': return 'Central de Cadastros Administrativos MROSC (2.1 a 2.5)';
      case 'acolhidos': return 'Macromódulo 1: Gestão dos Acolhidos RDC 29';
      case 'logs': return 'Módulo 13: TI & Logs de Auditoria';
      default: return 'Macromódulo 2: Gestão Administrativa & Suprimentos';
    }
  }

  renderTabContent(almoxarifado, rmis, despensa, frota, cadastros, logs, acolhidos) {
    // MÓDULO 5: ALMOXARIFADO CENTRAL & RMI
    if (this.currentTab === 'almoxarifado') {
      return `
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
            <h3><i data-lucide="boxes" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 5: Almoxarifado Central (Galpões A, B & Tombamento MROSC)</h3>
            <button class="btn btn-primary" onclick="window.ui.abrirModalEmitirRMI()">
              <i data-lucide="arrow-right-left"></i> + Emitir RMI para Despensa
            </button>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código NFe</th>
                  <th>Item / Descrição Catálogo</th>
                  <th>Saldo Atual</th>
                  <th>Endereço no Galpão</th>
                  <th>Fornecedor Homologado MROSC</th>
                  <th>Valor Total NFe</th>
                  <th>Ações RMI</th>
                </tr>
              </thead>
              <tbody>
                \${almoxarifado.map(a => `
                  <tr>
                    <td><strong>\${a.nfe}</strong></td>
                    <td><strong>\${a.item}</strong></td>
                    <td><strong style="font-size: 1.05rem;">\${a.quantidade} \${a.unidade}</strong></td>
                    <td><span class="badge badge-info">\${a.endereco}</span></td>
                    <td>\${a.fornecedor}</td>
                    <td>\${a.valorTotal}</td>
                    <td>
                      <button class="btn btn-outline btn-sm" onclick="window.ui.emitirRMIItem('\${a.id}')">
                        <i data-lucide="send"></i> Transferir RMI
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- RMIs EM TRÂNSITO -->
        <div class="card">
          <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 1rem; color: var(--primary);">
            <i data-lucide="clock" style="vertical-align: middle;"></i> Ordens de Transferência / RMIs Emitidas para a Despensa
          </h4>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código RMI</th>
                  <th>Insumo Transferido</th>
                  <th>Quantidade</th>
                  <th>Origem no Galpão</th>
                  <th>Destino</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                \${rmis.map(r => `
                  <tr>
                    <td><strong>#\${r.id}</strong></td>
                    <td>\${r.item}</td>
                    <td><strong>\${r.quantidade} \${r.unidade}</strong></td>
                    <td>\${r.origem}</td>
                    <td>\${r.destino}</td>
                    <td>
                      <span class="badge \${r.status.includes('Concluído') ? 'badge-success' : 'badge-warning'}">
                        \${r.status}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // MÓDULO 6: DESPENSA & NUTRIÇÃO (4.000 REF/DIA + HORTA)
    if (this.currentTab === 'despensa') {
      return `
        <div class="card" style="margin-bottom: 1.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="utensils" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 6: Despensa & Nutrição Comunitária (4.000 Refeições/Dia)</h3>
            <span class="badge badge-success">Chefe Valdeci (Cozinha Central)</span>
          </div>

          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
            Gestão dos gêneros alimentícios transferidos do Almoxarifado Central (RMIs), insumos da Horta Orgânica FDJ e baixas diárias para o preparo das 4.000 refeições (Café, Almoço, Jantar e Ceia) dos 1.240 acolhidos.
          </p>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Alimento / Insumo</th>
                  <th>Estoque Factual</th>
                  <th>Regra Sanitária FEFO</th>
                  <th>RMI Origem / Lote</th>
                  <th>Ações para Cozinha Central</th>
                </tr>
              </thead>
              <tbody>
                \${despensa.map(d => `
                  <tr>
                    <td><strong>\${d.id}</strong></td>
                    <td><strong>\${d.item}</strong></td>
                    <td><strong style="font-size: 1.1rem; color: #059669;">\${d.quantidade} \${d.unidade}</strong></td>
                    <td><span class="badge badge-info">Validade \${d.validade}</span></td>
                    <td>\${d.rmiOrigem} (\${d.lote})</td>
                    <td>
                      <button class="btn btn-primary btn-sm" onclick="window.ui.darBaixaCozinha('\${d.id}')">
                        <i data-lucide="minus-circle"></i> Baixa p/ Cozinha Central
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- ACEITE DE RMI PENDENTES -->
        <div class="card">
          <h4 style="font-size: 1.05rem; font-weight: 800; margin-bottom: 1rem; color: #d97706;">
            <i data-lucide="download" style="vertical-align: middle;"></i> Aceite de RMIs Vindas do Almoxarifado Central
          </h4>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Código RMI</th>
                  <th>Item / Alimento</th>
                  <th>Qtd Enviada</th>
                  <th>Ação de Aceite</th>
                </tr>
              </thead>
              <tbody>
                \${rmis.filter(r => r.status.includes('Trânsito')).map(r => `
                  <tr>
                    <td><strong>#\${r.id}</strong></td>
                    <td>\${r.item}</td>
                    <td>\${r.quantidade} \${r.unidade}</td>
                    <td>
                      <button class="btn btn-success btn-sm" onclick="window.ui.aceitarRMI('\${r.id}')">
                        <i data-lucide="check-circle-2"></i> Receber & Integrar à Despensa
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

    // MÓDULO 7: FROTA & TRANSPORTE SUS
    if (this.currentTab === 'frota') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="truck" style="vertical-align: middle; margin-right: 0.5rem;"></i> Módulo 7: Gestão Integrada de Frota & Transporte SUS</h3>
            <span class="badge badge-primary">Coordenador Marcos Santana</span>
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
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Placa:</strong> <span class="badge badge-primary">\${v.placa}</span> | <strong>Manutenção OS:</strong> \${v.os}</p>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Motorista Responsável:</strong> \${v.motorista}</p>
                <p style="font-size: 0.85rem; margin-bottom: 0.3rem;"><strong>Tipo:</strong> \${v.tipo}</p>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;"><strong>Destino Atual:</strong> \${v.destino} (\${v.acolhidosCount} Acolhidos a bordo)</p>

                <div style="display: flex; gap: 0.5rem;">
                  \${v.status === 'Em Viagem' ? `
                    <button class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center;" onclick="window.ui.retornoFrota('\${v.id}')">
                      <i data-lucide="home"></i> Registrar Retorno à Base
                    </button>
                  ` : `
                    <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center;" onclick="window.ui.lancarViagemFrota('\${v.id}')">
                      <i data-lucide="navigation"></i> Lançar Viagem Transporte SUS
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // CADASTROS MROSC (2.1 a 2.5)
    if (this.currentTab === 'cadastros') {
      return `
        <div class="card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
            <h3><i data-lucide="clipboard-list" style="vertical-align: middle; margin-right: 0.5rem;"></i> Central de Cadastros Administrativos MROSC (2.1 a 2.5)</h3>
            <span class="badge badge-primary">Homologado MROSC</span>
          </div>

          <div class="grid-2">
            <!-- 2.1. FORNECEDORES -->
            <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
              <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary);">2.1. Fornecedores MROSC Homologados</h4>
              <ul style="font-size: 0.85rem; padding-left: 1rem;">
                \${cadastros.fornecedores.map(f => `<li><strong>\${f.razaoSocial}</strong> (CNPJ: \${f.cnpj}) — \${f.rubrica}</li>`).join('')}
              </ul>
            </div>

            <!-- 2.3. ENDEREÇAMENTO -->
            <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
              <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary);">2.3. Endereçamento Físico do Galpão</h4>
              <ul style="font-size: 0.85rem; padding-left: 1rem;">
                \${cadastros.enderecamento.map(e => `<li>\${e}</li>`).join('')}
              </ul>
            </div>

            <!-- 2.4. SETORES DESTINO -->
            <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
              <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary);">2.4. Setores Solicitantes Homologados</h4>
              <ul style="font-size: 0.85rem; padding-left: 1rem;">
                \${cadastros.setoresDestino.map(s => `<li>\${s}</li>`).join('')}
              </ul>
            </div>

            <!-- 2.5. RESPONSÁVEIS -->
            <div class="card" style="background: var(--bg-main); border: 1px solid var(--border-color);">
              <h4 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--primary);">2.5. Responsáveis Autorizados</h4>
              <ul style="font-size: 0.85rem; padding-left: 1rem;">
                \${cadastros.responsaveis.map(r => `<li><strong>\${r.nome}</strong> (\${r.setor})</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    // SEGUIMENTO DA ABA ACOLHIDOS (SE NAVEGADO)
    if (this.currentTab === 'acolhidos') {
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

  // --- MÉTODOS DE AÇÃO DO MACROMÓDULO 2 ---
  emitirRMIItem(id) {
    const qtd = Number(prompt("Quantidade a transferir via RMI para a Despensa:", "10")) || 10;
    window.store.emitirRMI(id, qtd);
    this.renderApp();
  }

  abrirModalEmitirRMI() {
    const item = prompt("ID do item no Almoxarifado (ex: ALM-01):", "ALM-01");
    if (item) this.emitirRMIItem(item);
  }

  aceitarRMI(rmiId) {
    window.store.aceitarRMIDespensa(rmiId);
    this.renderApp();
  }

  darBaixaCozinha(despensaId) {
    window.store.darBaixaCozinha(despensaId);
    this.renderApp();
  }

  lancarViagemFrota(veiculoId) {
    const destino = prompt("Destino do Transporte SUS / Carga:", "Salvador / Hosp. Geral do Estado");
    const motorista = prompt("Motorista responsável:", "Carlos Eduardo Santos");
    const acolhidos = prompt("Nomes dos Acolhidos a bordo (separados por vírgula):", "Lucas Silva, Mateus Santos");
    if (destino) {
      window.store.lancarViagemFrota(veiculoId, destino, motorista, acolhidos);
      this.renderApp();
    }
  }

  retornoFrota(veiculoId) {
    window.store.retornoFrota(veiculoId);
    this.renderApp();
  }

  fecharModal() {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = '';
  }
}

window.ui = new UI();
