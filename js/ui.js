/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Dashboard Executivo Global Institucional & Navegação Completa dos 13 Módulos
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentMacro = 'home'; // 'home', 'macro1', 'macro2', 'macro3', 'macro4', 'macro5', 'macro6'
    this.currentView = 'macro3_home';
    this.activeMod8Tab = 'mod8_resumo';
    this.selectedAcolhidoId = "FDJ-2026-001";
  }

  renderApp() {
    this.root = document.getElementById('root');
    if (!this.root) return;

    let acolhidos = [];
    let estoque = [];
    let refeicoes = {};
    let financeiro = {};
    let doacoes = [];
    let laborterapia = [];
    let logs = [];

    try {
      acolhidos = window.store ? window.store.getAcolhidos() : [];
      estoque = window.store ? window.store.getEstoque() : [];
      refeicoes = window.store ? window.store.getRefeicoes() : {};
      financeiro = window.store ? window.store.getFinanceiro() : {};
      doacoes = window.store ? window.store.getDoacoes() : [];
      laborterapia = window.store ? window.store.getLaborterapia() : [];
      logs = window.store ? window.store.getLogs() : [];
    } catch(e){}

    const acolhidoAtual = (acolhidos.find(a => a.id === this.selectedAcolhidoId) || acolhidos[0]);

    try {
      this.root.innerHTML = `
        <div class="app-container" style="font-family: 'Inter', sans-serif; background: #f8fafc; min-height: 100vh; color: #0f172a; width: 100%; display: flex; flex-direction: column;">
          
          <!-- Top Header Bar -->
          <header style="width: 100%; box-sizing: border-box; padding: 0.75rem 1.5rem; background: #ffffff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
            
            <!-- Logo & Brand -->
            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.4rem; color: #dc2626; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.4rem; cursor: pointer;" onclick="window.ui.setMacro('home')">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Funda&ccedil;&atilde;o Dr. <span style="background: #dc2626; color: #fff; padding: 2px 8px; border-radius: 6px; font-size: 1.05rem;">JESUS</span>
              </div>
            </div>

            <!-- Horizontal Navigation Tabs for the 6 Macromodules -->
            <nav style="display: flex; align-items: center; gap: 0.35rem; background: #f1f5f9; padding: 4px; border-radius: 10px; border: 1px solid #e2e8f0;">
              <button class="btn" onclick="window.ui.setMacro('home')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'home' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'home' ? '#dc2626' : '#475569'}; box-shadow: ${this.currentMacro === 'home' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                🏠 Vis&atilde;o Geral
              </button>
              <button class="btn" onclick="window.ui.setMacro('macro1')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'macro1' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'macro1' ? '#2563eb' : '#475569'}; box-shadow: ${this.currentMacro === 'macro1' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                1. Acolhidos
              </button>
              <button class="btn" onclick="window.ui.setMacro('macro2')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'macro2' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'macro2' ? '#d97706' : '#475569'}; box-shadow: ${this.currentMacro === 'macro2' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                2. Almoxarifado
              </button>
              <button class="btn" onclick="window.ui.setMacro('macro3')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'macro3' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'macro3' ? '#0284c7' : '#475569'}; box-shadow: ${this.currentMacro === 'macro3' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                3. Sa&uacute;de
              </button>
              <button class="btn" onclick="window.ui.setMacro('macro4')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'macro4' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'macro4' ? '#16a34a' : '#475569'}; box-shadow: ${this.currentMacro === 'macro4' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                4. MROSC & Finan&ccedil;as
              </button>
              <button class="btn" onclick="window.ui.setMacro('macro5')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'macro5' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'macro5' ? '#9333ea' : '#475569'}; box-shadow: ${this.currentMacro === 'macro5' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                5. Doa&ccedil;&otilde;es
              </button>
              <button class="btn" onclick="window.ui.setMacro('macro6')" style="padding: 6px 12px; border-radius: 7px; font-size: 0.8rem; font-weight: 700; border: none; cursor: pointer; background: ${this.currentMacro === 'macro6' ? '#ffffff' : 'transparent'}; color: ${this.currentMacro === 'macro6' ? '#475569' : '#475569'}; box-shadow: ${this.currentMacro === 'macro6' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};">
                6. TI & Sistema
              </button>
            </nav>

            <!-- User Info -->
            <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; background: #ecfdf5; color: #047857; padding: 4px 12px; border-radius: 20px; font-weight: 700; border: 1px solid #a7f3d0;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
                SGI Online
              </div>
              <span style="font-weight: 700; color: #2563eb; background: #eff6ff; padding: 4px 12px; border-radius: 6px; border: 1px solid #bfdbfe;">marcos.vinicius2323@...</span>
            </div>
          </header>

          <!-- Main Layout Body -->
          <div style="display: flex; flex: 1; width: 100%;">
            
            <!-- Left Sidebar Navigation -->
            <aside style="width: 260px; background: #ffffff; border-right: 1px solid #e2e8f0; padding: 1.25rem 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0;">
              
              <div style="font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; padding: 0 0.75rem 0.5rem 0.75rem; letter-spacing: 0.05em;">
                MENU DOS MACROM&Oacute;DULOS
              </div>

              <button class="btn" onclick="window.ui.setMacro('home')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'home' ? '#fca5a5' : 'transparent'}; background: ${this.currentMacro === 'home' ? '#fef2f2' : 'transparent'}; color: ${this.currentMacro === 'home' ? '#dc2626' : '#334155'}; cursor: pointer;">
                🏠 Painel Executivo (Home)
              </button>

              <button class="btn" onclick="window.ui.setMacro('macro1')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro1' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro1' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro1' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                1. Gest&atilde;o dos Acolhidos
              </button>

              <button class="btn" onclick="window.ui.setMacro('macro2')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro2' ? '#fde68a' : 'transparent'}; background: ${this.currentMacro === 'macro2' ? '#fffbeb' : 'transparent'}; color: ${this.currentMacro === 'macro2' ? '#b45309' : '#334155'}; cursor: pointer;">
                2. Almoxarifado & Refei&ccedil;&otilde;es
              </button>

              <button class="btn" onclick="window.ui.setMacro('macro3')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro3' ? '#bae6fd' : 'transparent'}; background: ${this.currentMacro === 'macro3' ? '#f0f9ff' : 'transparent'}; color: ${this.currentMacro === 'macro3' ? '#0369a1' : '#334155'}; cursor: pointer;">
                3. Sa&uacute;de & Multidisciplinar
              </button>

              <button class="btn" onclick="window.ui.setMacro('macro4')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro4' ? '#bbf7d0' : 'transparent'}; background: ${this.currentMacro === 'macro4' ? '#f0fdf4' : 'transparent'}; color: ${this.currentMacro === 'macro4' ? '#15803d' : '#334155'}; cursor: pointer;">
                4. Finan&ccedil;as & MROSC
              </button>

              <button class="btn" onclick="window.ui.setMacro('macro5')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro5' ? '#e9d5ff' : 'transparent'}; background: ${this.currentMacro === 'macro5' ? '#faf5ff' : 'transparent'}; color: ${this.currentMacro === 'macro5' ? '#7e22ce' : '#334155'}; cursor: pointer;">
                5. Doa&ccedil;&otilde;es & Voluntariado
              </button>

              <button class="btn" onclick="window.ui.setMacro('macro6')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro6' ? '#cbd5e1' : 'transparent'}; background: ${this.currentMacro === 'macro6' ? '#f8fafc' : 'transparent'}; color: ${this.currentMacro === 'macro6' ? '#334155' : '#334155'}; cursor: pointer;">
                6. TI & Organograma
              </button>

              <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                <div style="background: #f8fafc; padding: 0.75rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b;">
                  <strong>Funda&ccedil;&atilde;o Dr. Jesus</strong><br>
                  Capacidade: 1.240 Acolhidos<br>
                  Status: 100% Homologado
                </div>
              </div>
            </aside>

            <!-- Main Content Panel -->
            <main style="flex: 1; padding: 2rem; background: #f8fafc; overflow-y: auto;">
              ${this.renderMainAreaContent(acolhidos, acolhidoAtual, estoque, refeicoes, financeiro, doacoes, laborterapia, logs)}
            </main>
          </div>
        </div>
      `;
    } catch(err) {
      console.error("HTML render exception:", err);
    }
  }

  setMacro(macro) {
    this.currentMacro = macro;
    if (macro === 'macro3') {
      this.currentView = 'macro3_home';
    }
    this.renderApp();
  }

  setView(view) {
    this.currentView = view;
    this.renderApp();
  }

  setMod8Tab(tab) {
    this.activeMod8Tab = tab;
    this.renderApp();
  }

  renderMainAreaContent(acolhidos, acolhidoAtual, estoque, refeicoes, financeiro, doacoes, laborterapia, logs) {
    
    // HOME LANDING DASHBOARD EXECATIVO
    if (this.currentMacro === 'home') {
      return `
        <div style="max-width: 1080px; margin: 0 auto;">
          
          <!-- Banner Principal -->
          <div class="card" style="background: linear-gradient(135deg, #1e293b, #0f172a); color: #fff; padding: 2.25rem; border-radius: 14px; margin-bottom: 2rem; box-shadow: 0 12px 30px rgba(0,0,0,0.15);">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <span class="badge" style="background: rgba(220,38,38,0.2); color: #fca5a5; border: 1px solid rgba(220,38,38,0.4); margin-bottom: 0.5rem; padding: 4px 12px;">PAINEL EXECUTIVO GLOBAL SGI</span>
                <h1 style="font-size: 1.85rem; font-weight: 900; margin: 0.25rem 0 0.5rem 0; letter-spacing: -0.02em;">SGI — Funda&ccedil;&atilde;o Doutor Jesus</h1>
                <p style="color: #94a3b8; font-size: 0.95rem; margin: 0; max-width: 650px;">Sistema de Gest&atilde;o Integrada cobrindo 1.240 acolhidos, 4.000 refei&ccedil;&otilde;es di&aacute;rias, Prontu&aacute;rio ANVISA, Laborterapia 240h e Recursos MROSC SJDH-BA.</p>
              </div>
              <button class="btn btn-primary" onclick="window.ui.setMacro('macro1')" style="padding: 12px 24px; font-size: 0.95rem; font-weight: 800; background: #dc2626; color: #fff; border: none; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(220,38,38,0.4);">
                Iniciar Atendimento &raquo;
              </button>
            </div>
          </div>

          <!-- 4 Cards Indicadores Executivos -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; margin-bottom: 2rem;">
            
            <div class="card" style="background: #fff; padding: 1.35rem; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;" onclick="window.ui.setMacro('macro1')">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #2563eb;">1. ACOLHIDOS ATIVOS</span>
                <span style="font-size: 1.2rem;">👥</span>
              </div>
              <h2 style="font-size: 1.8rem; font-weight: 900; color: #0f172a; margin: 0;">1.240</h2>
              <span style="font-size: 0.75rem; color: #10b981; font-weight: 600;">25 em Triagem | Leitos 100%</span>
            </div>

            <div class="card" style="background: #fff; padding: 1.35rem; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;" onclick="window.ui.setMacro('macro2')">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #d97706;">2. REFEI&Ccedil;&Otilde;ES / DIA</span>
                <span style="font-size: 1.2rem;">🍲</span>
              </div>
              <h2 style="font-size: 1.8rem; font-weight: 900; color: #0f172a; margin: 0;">3.720</h2>
              <span style="font-size: 0.75rem; color: #ea580c; font-weight: 600;">Caf&eacute;, Almo&ccedil;o & Janta</span>
            </div>

            <div class="card" style="background: #fff; padding: 1.35rem; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;" onclick="window.ui.setMacro('macro3')">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #0284c7;">3. PRONTU&Aacute;RIO SA&Uacute;DE</span>
                <span style="font-size: 1.2rem;">🩺</span>
              </div>
              <h2 style="font-size: 1.8rem; font-weight: 900; color: #0f172a; margin: 0;">RDC 29</h2>
              <span style="font-size: 0.75rem; color: #0284c7; font-weight: 600;">ANVISA & Laborterapia 240h</span>
            </div>

            <div class="card" style="background: #fff; padding: 1.35rem; border-radius: 12px; border: 1px solid #e2e8f0; cursor: pointer;" onclick="window.ui.setMacro('macro4')">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #16a34a;">4. SALDO MROSC (BB)</span>
                <span style="font-size: 1.2rem;">🏦</span>
              </div>
              <h2 style="font-size: 1.5rem; font-weight: 900; color: #16a34a; margin: 0;">R$ 485.2k</h2>
              <span style="font-size: 0.75rem; color: #15803d; font-weight: 600;">Conta BB 14.502-1 Segregada</span>
            </div>

          </div>

          <!-- Grid dos 6 Macromódulos -->
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">Selecione o Macrom&oacute;dulo para Operar:</h3>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;">
            
            <div class="card" style="background: #fff; border-top: 4px solid #2563eb; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px; cursor: pointer;" onclick="window.ui.setMacro('macro1')">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: #1d4ed8; margin: 0 0 0.4rem 0;">1. Gest&atilde;o dos Acolhidos</h4>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 1rem 0;">Triagem, Leitos Bloco A/B/C, Admiss&atilde;o RDC 29, Crach&aacute;s A4 com QR Code e Quita&ccedil;&atilde;o.</p>
              <span style="font-size: 0.8rem; font-weight: 700; color: #2563eb;">Acessar M&oacute;dulos 1, 2, 3 e 4 &raquo;</span>
            </div>

            <div class="card" style="background: #fff; border-top: 4px solid #d97706; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px; cursor: pointer;" onclick="window.ui.setMacro('macro2')">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: #b45309; margin: 0 0 0.4rem 0;">2. Almoxarifado & Refei&ccedil;&otilde;es</h4>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 1rem 0;">Estoque FEFO (Alertas Cr&iacute;ticos), 3.720 Refei&ccedil;&otilde;es/dia para 1.240 Acolhidos e Oficinas FDJ.</p>
              <span style="font-size: 0.8rem; font-weight: 700; color: #d97706;">Acessar M&oacute;dulos 5, 6, 7 e 8 &raquo;</span>
            </div>

            <div class="card" style="background: #fff; border-top: 4px solid #0284c7; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px; cursor: pointer;" onclick="window.ui.setMacro('macro3')">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: #0369a1; margin: 0 0 0.4rem 0;">3. Sa&uacute;de & Multidisciplinar</h4>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 1rem 0;">Prontu&aacute;rio 6 sub-abas, Sinais Vitais, Aprazamento Medicamentoso e Laborterapia 240h.</p>
              <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;">Acessar M&oacute;dulos 8, 9 & Sa&uacute;de &raquo;</span>
            </div>

            <div class="card" style="background: #fff; border-top: 4px solid #16a34a; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px; cursor: pointer;" onclick="window.ui.setMacro('macro4')">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: #15803d; margin: 0 0 0.4rem 0;">4. Presta&ccedil;&atilde;o de Contas MROSC</h4>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 1rem 0;">Segrega&ccedil;&atilde;o Banco do Brasil Conta MROSC 14.502-1 SJDH-BA x Caixa Geral Doa&ccedil;&otilde;es e DRE A4.</p>
              <span style="font-size: 0.8rem; font-weight: 700; color: #16a34a;">Acessar M&oacute;dulos 10 e 11 &raquo;</span>
            </div>

            <div class="card" style="background: #fff; border-top: 4px solid #9333ea; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px; cursor: pointer;" onclick="window.ui.setMacro('macro5')">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: #7e22ce; margin: 0 0 0.4rem 0;">5. Doa&ccedil;&otilde;es & Voluntariado</h4>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 1rem 0;">Registro de doadores, insumos recebidos, destina&ccedil;&atilde;o interna e pessoas focais FDJ.</p>
              <span style="font-size: 0.8rem; font-weight: 700; color: #9333ea;">Acessar M&oacute;dulo 12 &raquo;</span>
            </div>

            <div class="card" style="background: #fff; border-top: 4px solid #475569; padding: 1.5rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px; cursor: pointer;" onclick="window.ui.setMacro('macro6')">
              <h4 style="font-size: 1.1rem; font-weight: 800; color: #334155; margin: 0 0 0.4rem 0;">6. TI & Organograma</h4>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0 0 1rem 0;">Administra&ccedil;&atilde;o do sistema, perfis de acesso, logs de auditoria e organograma.</p>
              <span style="font-size: 0.8rem; font-weight: 700; color: #475569;">Acessar M&oacute;dulo 13 &raquo;</span>
            </div>

          </div>
        </div>
      `;
    }

    // MACROMÓDULO 1: GESTÃO DOS ACOLHIDOS (Módulos 1, 2, 3, 4)
    if (this.currentMacro === 'macro1') {
      return `
        <div style="max-width: 1060px; margin: 0 auto;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">1. Gest&atilde;o dos Acolhidos</h2>
              <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">Triagem, Leitos, Admiss&atilde;o RDC 29 ANVISA, Crach&aacute;s e Declara&ccedil;&otilde;es de Quita&ccedil;&atilde;o</p>
            </div>
            <button class="btn btn-primary" onclick="alert('Formulário de Novo Acolhimento RDC 29 ANVISA Aberto!')" style="padding: 8px 16px; background: #2563eb; color: #fff; border-radius: 6px; font-weight: 700; border: none; cursor: pointer;">
              + Novo Acolhido (RDC 29)
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="card" style="background: #fff; padding: 1.25rem; border-radius: 10px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #64748b;">TOTAL ACOLHIDOS</span>
              <h3 style="font-size: 1.6rem; font-weight: 900; color: #2563eb; margin: 4px 0;">1.240</h3>
              <span style="font-size: 0.75rem; color: #10b981;">Capacidade 100% Ativa</span>
            </div>
            <div class="card" style="background: #fff; padding: 1.25rem; border-radius: 10px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #64748b;">EM TRIAGEM</span>
              <h3 style="font-size: 1.6rem; font-weight: 900; color: #d97706; margin: 4px 0;">25</h3>
              <span style="font-size: 0.75rem; color: #d97706;">Acolhimento Inicial</span>
            </div>
            <div class="card" style="background: #fff; padding: 1.25rem; border-radius: 10px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #64748b;">LEITOS BLOCO A</span>
              <h3 style="font-size: 1.6rem; font-weight: 900; color: #0284c7; margin: 4px 0;">412</h3>
              <span style="font-size: 0.75rem; color: #0284c7;">Restaura&ccedil;&atilde;o</span>
            </div>
            <div class="card" style="background: #fff; padding: 1.25rem; border-radius: 10px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #64748b;">LEITOS BLOCO B</span>
              <h3 style="font-size: 1.6rem; font-weight: 900; color: #059669; margin: 4px 0;">403</h3>
              <span style="font-size: 0.75rem; color: #059669;">Renova&ccedil;&atilde;o</span>
            </div>
          </div>

          <!-- Tabela Acolhidos -->
          <div class="table-container card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0;">M&oacute;dulo 1 & 3: Lista Geral de Acolhidos & Emiss&atilde;o de Crach&aacute;s</h3>
              <input type="text" placeholder="Buscar por Nome ou CPF..." style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; width: 260px; font-size: 0.85rem;" />
            </div>

            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 10px;">C&oacute;digo</th>
                  <th style="padding: 10px;">Acolhido</th>
                  <th style="padding: 10px;">CPF / RG</th>
                  <th style="padding: 10px;">Leito / Bloco</th>
                  <th style="padding: 10px;">Status</th>
                  <th style="padding: 10px;">A&ccedil;&otilde;es de Emiss&atilde;o</th>
                </tr>
              </thead>
              <tbody>
                ${acolhidos.map(a => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px;"><strong>${a.id}</strong></td>
                    <td style="padding: 10px;"><strong>${a.nome}</strong></td>
                    <td style="padding: 10px;">${a.cpf}<br><span style="font-size: 0.75rem; color: #64748b;">RG: ${a.rg}</span></td>
                    <td style="padding: 10px;">${a.leito}<br><span style="font-size: 0.75rem; color: #2563eb;">${a.bloco}</span></td>
                    <td style="padding: 10px;"><span class="badge badge-success" style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 6px; font-weight: bold;">${a.status}</span></td>
                    <td style="padding: 10px;">
                      <button class="btn btn-outline btn-sm" onclick="alert('Imprimindo Crachá Oficial A4 com QR Code de ${a.nome}...')" style="padding: 4px 8px; font-size: 0.75rem; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; border-radius: 4px; margin-right: 4px;">
                        🪪 Crach&aacute; A4
                      </button>
                      <button class="btn btn-outline btn-sm" onclick="alert('Imprimindo Declaração de Quitação A4 de ${a.nome}...')" style="padding: 4px 8px; font-size: 0.75rem; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; border-radius: 4px;">
                        📄 Quita&ccedil;&atilde;o A4
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

    // MACROMÓDULO 2: ALMOXARIFADO & REFEIÇÕES (Módulos 5, 6, 7, 8)
    if (this.currentMacro === 'macro2') {
      return `
        <div style="max-width: 1060px; margin: 0 auto;">
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">2. Gest&atilde;o Administrativa, Almoxarifado & Refei&ccedil;&otilde;es</h2>
            <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">Controle de Estoque FEFO, Alertas Cr&iacute;ticos, 3.720 Refei&ccedil;&otilde;es Di&aacute;rias e Oficinas FDJ</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="card" style="background: #fff8f1; border: 1px solid #ffedd5; padding: 1.25rem; border-radius: 10px;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #c2410c;">M&Oacute;DULO 5: ESTOQUE FEFO</span>
              <h3 style="font-size: 1.5rem; font-weight: 900; color: #ea580c; margin: 4px 0;">18 Itens em Alerta</h3>
              <span style="font-size: 0.75rem; color: #c2410c;">Controle First Expired, First Out</span>
            </div>
            <div class="card" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.25rem; border-radius: 10px;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #15803d;">M&Oacute;DULO 6: REFEI&Ccedil;&Otilde;ES DI&Aacute;RIAS</span>
              <h3 style="font-size: 1.5rem; font-weight: 900; color: #16a34a; margin: 4px 0;">3.720 Refei&ccedil;&otilde;es</h3>
              <span style="font-size: 0.75rem; color: #15803d;">Caf&eacute;, Almo&ccedil;o e Janta (1.240 Acolhidos)</span>
            </div>
            <div class="card" style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.25rem; border-radius: 10px;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #1d4ed8;">M&Oacute;DULO 7: OFICINAS FDJ</span>
              <h3 style="font-size: 1.5rem; font-weight: 900; color: #2563eb; margin: 4px 0;">4 Setores Ativos</h3>
              <span style="font-size: 0.75rem; color: #1d4ed8;">Cozinha, Horta, El&eacute;trica & Manuten&ccedil;&atilde;o</span>
            </div>
          </div>

          <div class="table-container card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">M&oacute;dulo 5: Tabela de Controle de Estoque FEFO</h3>
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 10px;">C&oacute;digo</th>
                  <th style="padding: 10px;">Item / Insumo</th>
                  <th style="padding: 10px;">Categoria</th>
                  <th style="padding: 10px;">Quantidade</th>
                  <th style="padding: 10px;">Validade (FEFO)</th>
                  <th style="padding: 10px;">Status Alerta</th>
                </tr>
              </thead>
              <tbody>
                ${estoque.map(e => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px;"><strong>${e.id}</strong></td>
                    <td style="padding: 10px;"><strong>${e.item}</strong><br><span style="font-size: 0.75rem; color: #64748b;">Lote: ${e.lote}</span></td>
                    <td style="padding: 10px;"><span class="badge badge-info" style="background: #eff6ff; color: #2563eb; padding: 2px 8px; border-radius: 4px;">${e.categoria}</span></td>
                    <td style="padding: 10px;"><strong>${e.quantidade} ${e.unidade}</strong></td>
                    <td style="padding: 10px;"><strong>${e.validade}</strong></td>
                    <td style="padding: 10px;">
                      <span class="badge ${e.status === 'ok' ? 'badge-success' : (e.status === 'alerta' ? 'badge-warning' : 'badge-danger')}" style="padding: 4px 8px; border-radius: 6px; font-weight: bold;">
                        ${e.status === 'ok' ? 'Estoque Ok' : (e.status === 'alerta' ? 'Atenção Validade' : 'Crítico FEFO')}
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

    // MACROMÓDULO 4: FINANÇAS & MROSC (Módulos 10, 11)
    if (this.currentMacro === 'macro4') {
      return `
        <div style="max-width: 1060px; margin: 0 auto;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <div>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">4. Presta&ccedil;&atilde;o de Contas MROSC & Financeiro Segregado</h2>
              <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">Gest&atilde;o Segregada: Banco do Brasil (Conta MROSC 14.502-1 SJDH-BA) x Caixa Geral Doa&ccedil;&otilde;es</p>
            </div>
            <button class="btn btn-primary" onclick="alert('Imprimindo Relatório DRE & Conciliação MROSC SJDH-BA A4...')" style="padding: 8px 16px; background: #16a34a; color: #fff; border-radius: 6px; font-weight: 700; border: none; cursor: pointer;">
              📄 Imprimir DRE MROSC A4
            </button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div class="card" style="background: #f0fdf4; border: 2px solid #bbf7d0; padding: 1.5rem; border-radius: 12px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #15803d; text-transform: uppercase;">RECURSOS P&Uacute;BLICOS MROSC (SJDH-BA)</span>
                <span class="badge badge-success" style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px;">CONTA SEGREGADA</span>
              </div>
              <h3 style="font-size: 1.8rem; font-weight: 900; color: #16a34a; margin: 0 0 0.5rem 0;">${financeiro.contaMROSC ? financeiro.contaMROSC.saldo : 'R$ 485.200,00'}</h3>
              <p style="font-size: 0.85rem; color: #15803d; margin: 0;"><strong>Banco do Brasil</strong> | Ag: 3421-5 | Conta: 14.502-1</p>
            </div>

            <div class="card" style="background: #fefce8; border: 2px solid #fef08a; padding: 1.5rem; border-radius: 12px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #a16207; text-transform: uppercase;">RECURSOS PR&Oacute;PRIOS & DOA&Ccedil;&Otilde;ES GERAL</span>
                <span class="badge badge-warning" style="background: #fef3c7; color: #d97706; padding: 2px 8px; border-radius: 4px;">CONTA DOA&Ccedil;&Otilde;ES</span>
              </div>
              <h3 style="font-size: 1.8rem; font-weight: 900; color: #ca8a04; margin: 0 0 0.5rem 0;">${financeiro.contaDoacoes ? financeiro.contaDoacoes.saldo : 'R$ 62.450,00'}</h3>
              <p style="font-size: 0.85rem; color: #a16207; margin: 0;"><strong>Caixa Econ&ocirc;mica</strong> | Ag: 0045-1 | Conta: 9982-3</p>
            </div>
          </div>

          <div class="table-container card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">M&oacute;dulo 10 & 11: Extrato de Lan&ccedil;amentos & Concilia&ccedil;&atilde;o MROSC</h3>
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 10px;">C&oacute;digo</th>
                  <th style="padding: 10px;">Data</th>
                  <th style="padding: 10px;">Descri&ccedil;&atilde;o do Lan&ccedil;amento</th>
                  <th style="padding: 10px;">Tipo de Conta</th>
                  <th style="padding: 10px;">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                ${financeiro.lancamentos ? financeiro.lancamentos.map(l => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px;"><strong>${l.id}</strong></td>
                    <td style="padding: 10px;">${l.data}</td>
                    <td style="padding: 10px;"><strong>${l.descricao}</strong></td>
                    <td style="padding: 10px;"><span class="badge badge-info" style="background: #eff6ff; color: #2563eb; padding: 2px 8px; border-radius: 4px;">${l.conta}</span></td>
                    <td style="padding: 10px;"><strong style="color: ${l.tipo.includes('Entrada') ? '#16a34a' : '#dc2626'}; font-size: 1.05rem;">${l.valor}</strong></td>
                  </tr>
                `).join('') : ''}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 5: DOAÇÕES & VOLUNTARIADO (Módulo 12)
    if (this.currentMacro === 'macro5') {
      return `
        <div style="max-width: 1060px; margin: 0 auto;">
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">5. Gest&atilde;o de Doa&ccedil;&otilde;es & Voluntariado</h2>
            <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">M&oacute;dulo 12: Registro de Doadores, Insumos Recebidos e Matriz de Pessoas Focais</p>
          </div>

          <div class="table-container card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">M&oacute;dulo 12: Doa&ccedil;&otilde;es Recebidas & Destina&ccedil;&atilde;o Interna</h3>
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 10px;">C&oacute;digo</th>
                  <th style="padding: 10px;">Doador / Parceiro</th>
                  <th style="padding: 10px;">Insumo / Doa&ccedil;&atilde;o</th>
                  <th style="padding: 10px;">Data</th>
                  <th style="padding: 10px;">Destino Interno FDJ</th>
                </tr>
              </thead>
              <tbody>
                ${doacoes.map(d => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px;"><strong>${d.id}</strong></td>
                    <td style="padding: 10px;"><strong>${d.doador}</strong></td>
                    <td style="padding: 10px;">${d.item}</td>
                    <td style="padding: 10px;">${d.data}</td>
                    <td style="padding: 10px;"><span class="badge badge-success" style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${d.destino}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 6: TI & ORGANOGRAMA (Módulo 13)
    if (this.currentMacro === 'macro6') {
      return `
        <div style="max-width: 1060px; margin: 0 auto;">
          <div style="margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 0;">6. Administra&ccedil;&atilde;o do Sistema, TI & Organograma</h2>
            <p style="color: #64748b; font-size: 0.85rem; margin: 4px 0 0 0;">M&oacute;dulo 13: Perfis de Acesso, Logs de Auditoria do Sistema e Estrutura Organizacional FDJ</p>
          </div>

          <div class="card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 1.5rem;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">Organograma Institucional - Funda&ccedil;&atilde;o Doutor Jesus</h3>
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
              <div style="display: inline-block; background: #dc2626; color: #fff; padding: 8px 16px; border-radius: 6px; font-weight: 900; margin-bottom: 1rem;">PRESID&Ecirc;NCIA EXECUTIVA</div>
              <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 0.5rem;">
                <div style="background: #2563eb; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 700;">Diretoria de Acolhimento</div>
                <div style="background: #0284c7; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 700;">Diretoria de Sa&uacute;de</div>
                <div style="background: #16a34a; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 700;">Diretoria MROSC & Finan&ccedil;as</div>
              </div>
            </div>
          </div>

          <div class="table-container card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">Logs de Auditoria em Tempo Real</h3>
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 10px;">Data / Hora</th>
                  <th style="padding: 10px;">Mensagem de Auditoria</th>
                </tr>
              </thead>
              <tbody>
                ${logs.map(l => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 10px;"><strong>${l.timestamp}</strong></td>
                    <td style="padding: 10px;">${l.mensagem}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 3: SAÚDE & MULTIDISCIPLINAR (VISÃO HOME OU SUB-VISÕES)
    if (this.currentView === 'macro3_home') {
      return `
        <div style="max-width: 960px; margin: 0 auto;">
          <div class="card" style="border-top: 4px solid #0284c7; margin-bottom: 2rem; box-shadow: 0 10px 25px rgba(0,0,0,0.05); background: #ffffff; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top-width: 4px;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem;">
              <div style="width: 54px; height: 54px; border-radius: 14px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div>
                <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin-bottom: 2px;">3. Sa&uacute;de & Equipe Multidisciplinar</h2>
                <p style="font-size: 0.9rem; color: #64748b; margin: 0;">Prontu&aacute;rios (RDC 29) e laborterapia</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd; cursor: pointer; padding: 1.25rem; border-radius: 10px;" onclick="alert('Visualizando Gráficos do Corpo Clínico & SUS...')">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <div style="width: 42px; height: 42px; border-radius: 10px; background: #bae6fd; display: flex; align-items: center; justify-content: center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0369a1" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    </div>
                    <div>
                      <h4 style="font-size: 1.05rem; font-weight: 700; color: #0369a1; margin: 0;">Dashboard & Indicadores</h4>
                      <p style="font-size: 0.825rem; color: #0284c7; margin: 2px 0 0 0;">Gr&aacute;ficos do Corpo Cl&iacute;nico & SUS</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div class="card" style="background: #ffffff; border: 1px solid #e2e8f0; cursor: pointer; padding: 1.25rem; border-radius: 10px;" onclick="window.ui.setView('mod8_prontuario')">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <div style="width: 42px; height: 42px; border-radius: 10px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                    </div>
                    <div>
                      <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0;">M&oacute;dulo 8: Prontu&aacute;rio</h4>
                      <p style="font-size: 0.825rem; color: #64748b; margin: 2px 0 0 0;">PTI e RDC 29 ANVISA</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div class="card" style="background: #ffffff; border: 1px solid #e2e8f0; cursor: pointer; padding: 1.25rem; border-radius: 10px;" onclick="window.ui.setView('mod9_laborterapia')">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <div style="width: 42px; height: 42px; border-radius: 10px; background: #f1f5f9; display: flex; align-items: center; justify-content: center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 3.09-8.48 8.48"/></svg>
                    </div>
                    <div>
                      <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0;">M&oacute;dulo 9: Laborterapia</h4>
                      <p style="font-size: 0.825rem; color: #64748b; margin: 2px 0 0 0;">Rotina e certificado 240h</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>

              <div class="card" style="background: #ffffff; border: 1px solid #cbd5e1; border-style: dashed; cursor: pointer; padding: 1.25rem; border-radius: 10px;" onclick="window.ui.setView('cadastros_saude')">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="display: flex; align-items: center; gap: 1.25rem;">
                    <div style="width: 42px; height: 42px; border-radius: 10px; background: #f8fafc; display: flex; align-items: center; justify-content: center;">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <div>
                      <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin: 0;">Cadastros Sa&uacute;de & Multidisciplinar</h4>
                      <p style="font-size: 0.825rem; color: #64748b; margin: 2px 0 0 0;">Equipe CRM/CRP e farm&aacute;cia</p>
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (this.currentView === 'mod8_prontuario') {
      return `
        <div style="display: flex; gap: 1.5rem; width: 100%;">
          <aside style="width: 270px; background: #ffffff; border: 1px solid #e2e8f0; padding: 1.25rem; border-radius: 10px; display: flex; flex-direction: column; flex-shrink: 0;">
            <button class="btn btn-outline btn-sm" style="width: 100%; justify-content: space-between; font-size: 0.75rem; margin-bottom: 1rem; background: #fff;" onclick="window.ui.setView('macro3_home')">
              <span>Recolher Sidebar</span> <span>&laquo;</span>
            </button>
            
            <div style="font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.6rem;">
              SUB-ABAS DO PRONTU&Aacute;RIO
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.45rem;">
              <button class="btn ${this.activeMod8Tab === 'mod8_resumo' ? 'btn-primary' : 'btn-outline'}" onclick="window.ui.setMod8Tab('mod8_resumo')" style="justify-content: flex-start; text-align: left; font-size: 0.8rem; width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer;">
                1. 👤 Resumo & Ficha Cl&iacute;nica
              </button>
              <button class="btn ${this.activeMod8Tab === 'mod8_pti' ? 'btn-primary' : 'btn-outline'}" onclick="window.ui.setMod8Tab('mod8_pti')" style="justify-content: flex-start; text-align: left; font-size: 0.8rem; width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer;">
                2. 🎯 Plano Terap&ecirc;utico (PTI)
              </button>
              <button class="btn ${this.activeMod8Tab === 'mod8_aprazamento' ? 'btn-primary' : 'btn-outline'}" onclick="window.ui.setMod8Tab('mod8_aprazamento')" style="justify-content: flex-start; text-align: left; font-size: 0.8rem; width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer;">
                3. 💊 Aprazamento Medicamentos
              </button>
              <button class="btn ${this.activeMod8Tab === 'mod8_evolucoes' ? 'btn-primary' : 'btn-outline'}" onclick="window.ui.setMod8Tab('mod8_evolucoes')" style="justify-content: flex-start; text-align: left; font-size: 0.8rem; width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer;">
                4. 📈 Feed de Evolu&ccedil;&otilde;es Cl&iacute;nicas
              </button>
              <button class="btn ${this.activeMod8Tab === 'mod8_odonto' ? 'btn-primary' : 'btn-outline'}" onclick="window.ui.setMod8Tab('mod8_odonto')" style="justify-content: flex-start; text-align: left; font-size: 0.8rem; width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer;">
                5. 🦷 Odontologia & Autoestima
              </button>
              <button class="btn ${this.activeMod8Tab === 'mod8_samu' ? 'btn-primary' : 'btn-outline'}" onclick="window.ui.setMod8Tab('mod8_samu')" style="justify-content: flex-start; text-align: left; font-size: 0.8rem; width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer;">
                6. 🚑 Regulacao SAMU 192
              </button>
            </div>
          </aside>

          <main style="flex: 1;">
            <div class="card" style="margin-bottom: 1.5rem; background: #fff; padding: 1.25rem; border-radius: 10px; border: 1px solid #e2e8f0;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div>
                  <label style="font-size: 0.75rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 0.35rem;">SELECIONAR ACOLHIDO PARA O PRONTU&Aacute;RIO:</label>
                  <select class="form-select" style="width: 340px; font-weight: 700; padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff;" onchange="window.ui.selecionarAcolhidoProntuario(this.value)">
                    ${acolhidos.map(a => `
                      <option value="${a.id}" ${a.id === acolhidoAtual.id ? 'selected' : ''}>${a.nome} (${a.id} - ${a.leito})</option>
                    `).join('')}
                  </select>
                </div>

                <div>
                  <span class="badge badge-success" style="font-size: 0.85rem; background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 999px; font-weight: 700;">Prontu&aacute;rio Ativo: ${acolhidoAtual.nome}</span>
                </div>
              </div>
            </div>

            ${this.renderMod8TabContent(acolhidoAtual)}
          </main>
        </div>
      `;
    }

    if (this.currentView === 'mod9_laborterapia') {
      return `
        <div style="max-width: 1000px; margin: 0 auto;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
            <div>
              <button class="btn btn-outline btn-sm" onclick="window.ui.setView('macro3_home')" style="margin-bottom: 0.5rem; padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer; background: #fff;">&laquo; Voltar &agrave; Central</button>
              <h2 style="font-size: 1.4rem; font-weight: 800; color: #0f172a; margin: 4px 0;">M&oacute;dulo 9: Laborterapia & Oficinas Produtivas</h2>
              <p style="font-size: 0.85rem; color: #64748b; margin: 0;">Rotina di&aacute;ria de trabalho terap&ecirc;utico e emiss&atilde;o de certificado oficial de 240 horas</p>
            </div>
            <span class="badge badge-primary" style="background: #e0f2fe; color: #0284c7; padding: 6px 14px; border-radius: 999px; font-weight: 700;">Supervis&atilde;o FDJ</span>
          </div>

          <div class="table-container card" style="background: #fff; padding: 1.5rem; border-radius: 10px; border: 1px solid #e2e8f0;">
            <table class="data-table" style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 12px 14px; border-bottom: 2px solid #e2e8f0;">C&oacute;digo</th>
                  <th style="padding: 12px 14px; border-bottom: 2px solid #e2e8f0;">Acolhido</th>
                  <th style="padding: 12px 14px; border-bottom: 2px solid #e2e8f0;">Setor de Laborterapia</th>
                  <th style="padding: 12px 14px; border-bottom: 2px solid #e2e8f0;">Carga Hor&aacute;ria</th>
                  <th style="padding: 12px 14px; border-bottom: 2px solid #e2e8f0;">Status Certificado</th>
                  <th style="padding: 12px 14px; border-bottom: 2px solid #e2e8f0;">A&ccedil;&atilde;o</th>
                </tr>
              </thead>
              <tbody>
                ${laborterapia.map(l => `
                  <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 12px 14px;"><strong>${l.id}</strong></td>
                    <td style="padding: 12px 14px;"><strong>${l.acolhidoNome}</strong></td>
                    <td style="padding: 12px 14px;"><span class="badge badge-info" style="background: #eff6ff; color: #2563eb; padding: 4px 10px; border-radius: 6px; border: 1px solid #bfdbfe;">${l.setor}</span></td>
                    <td style="padding: 12px 14px;"><strong style="font-size: 1.05rem; color: #0f172a;">${l.cargaHoraria}h / 240h</strong></td>
                    <td style="padding: 12px 14px;">
                      <span class="badge ${l.cargaHoraria >= 240 ? 'badge-success' : 'badge-warning'}" style="padding: 4px 10px; border-radius: 6px; font-weight: 700;">
                        ${l.status}
                      </span>
                    </td>
                    <td style="padding: 12px 14px;">
                      ${l.cargaHoraria >= 240 ? `
                        <button class="btn btn-primary btn-sm" onclick="alert('Imprimindo Certificado Oficial de Laborterapia (240h) de ${l.acolhidoNome}...')" style="padding: 6px 14px; background: #2563eb; color: #fff; border-radius: 6px; border: none; cursor: pointer; font-weight: 600;">
                          Imprimir Certificado 240h
                        </button>
                      ` : `
                        <button class="btn btn-secondary btn-sm" onclick="window.ui.emitirCertificadoLaborterapia('${l.acolhidoId}')" style="padding: 6px 14px; background: #fff; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-weight: 600;">
                          Concluir 240h
                        </button>
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

    return `
      <div style="max-width: 1000px; margin: 0 auto;">
        <button class="btn btn-outline btn-sm" onclick="window.ui.setView('macro3_home')" style="margin-bottom: 1rem; padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; cursor: pointer; background: #fff;">&laquo; Voltar &agrave; Central</button>
        <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">Cadastros Sa&uacute;de & Multidisciplinar (CRM/CRP/COREN)</h3>
          <ul style="line-height: 2; color: #334155; font-size: 0.95rem;">
            <li><strong>Enfermeira Chefe Juliana Santos</strong> (COREN-BA 48192) - Apoio Sa&uacute;de & Enfermaria Central</li>
            <li><strong>Dra. Ana Paula</strong> (CRM-BA 14589 / Psiquiatria) - Medicina & Aprazamento Psiqui&aacute;trico</li>
            <li><strong>Dr. Marcos Dentista</strong> (CRO-BA 8874) - Odontologia Terap&ecirc;utica & Autoestima</li>
          </ul>
        </div>
      </div>
    `;
  }

  renderMod8TabContent(acolhido) {
    if (this.activeMod8Tab === 'mod8_resumo') {
      return `
        <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1.25rem;">
            1. Resumo do Prontu&aacute;rio & Ficha Cl&iacute;nica - ${acolhido.nome}
          </h3>

          <div style="margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div style="background: #f8fafc; padding: 1.25rem; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem;"><strong>C&oacute;digo FDJ:</strong> ${acolhido.id}</p>
              <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem;"><strong>CPF:</strong> ${acolhido.cpf}</p>
              <p style="margin: 0; font-size: 0.9rem;"><strong>Alojamento / Leito:</strong> ${acolhido.leito}</p>
            </div>
            <div style="background: #f8fafc; padding: 1.25rem; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem;"><strong>Tipo Sangu&iacute;neo:</strong> ${acolhido.prontuario ? acolhido.prontuario.tipoSanguineo : 'O+'}</p>
              <p style="margin: 0 0 0.5rem 0; font-size: 0.9rem;"><strong>Alergias Registradas:</strong> ${acolhido.prontuario ? acolhido.prontuario.alergias : 'Nenhuma'}</p>
              <p style="margin: 0; font-size: 0.9rem;"><strong>Dieta Prescrita:</strong> <span class="badge badge-warning" style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 6px; font-weight: 700;">${acolhido.dieta}</span></p>
            </div>
          </div>

          <div class="card" style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 1.25rem; border-radius: 10px;">
            <h4 style="color: #0369a1; margin: 0 0 0.75rem 0; font-size: 1rem; font-weight: 700;">&Uacute;ltima Medi&ccedil;&atilde;o de Sinais Vitais (Enfermaria FDJ Galp&atilde;o E)</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              <div><span style="font-size: 0.75rem; color: #0284c7; display: block;">PRESS&Atilde;O ARTERIAL</span><strong style="font-size: 1.1rem; color: #0369a1;">${acolhido.prontuario && acolhido.prontuario.sinaisVitais ? acolhido.prontuario.sinaisVitais.pa : '120x80 mmHg'}</strong></div>
              <div><span style="font-size: 0.75rem; color: #0284c7; display: block;">FREQU&Ecirc;NCIA CARD&Iacute;ACA</span><strong style="font-size: 1.1rem; color: #0369a1;">${acolhido.prontuario && acolhido.prontuario.sinaisVitais ? acolhido.prontuario.sinaisVitais.fc : '76 bpm'}</strong></div>
              <div><span style="font-size: 0.75rem; color: #0284c7; display: block;">GLICEMIA CAPILAR</span><strong style="font-size: 1.1rem; color: #0369a1;">${acolhido.prontuario && acolhido.prontuario.sinaisVitais ? acolhido.prontuario.sinaisVitais.glicemia : '94 mg/dL'}</strong></div>
            </div>
          </div>
        </div>
      `;
    }

    if (this.activeMod8Tab === 'mod8_pti') {
      return `
        <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
            2. Plano Terap&ecirc;utico Individual (PTI RDC 29 ANVISA)
          </h3>
          <p style="font-size: 0.95rem; color: #475569;">Evolu&ccedil;&atilde;o cont&iacute;nua das 4 fases da ANVISA para o acolhido <strong>${acolhido.nome}</strong>.</p>
          <div class="card" style="background: #f8fafc; border: 1px solid #e2e8f0; margin-top: 1.25rem; padding: 1.25rem; border-radius: 8px;">
            <span class="badge badge-success" style="background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 6px; font-weight: 700;">Fase Atual: ${acolhido.fasePTI || 'Fase 3 PTI'}</span>
          </div>
        </div>
      `;
    }

    if (this.activeMod8Tab === 'mod8_aprazamento') {
      return `
        <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
            3. Aprazamento de Medicamentos (Dra. Ana Paula)
          </h3>
          <p style="font-size: 0.95rem; color: #475569;">Hor&aacute;rios de administra&ccedil;&atilde;o medicamentosa para <strong>${acolhido.nome}</strong>.</p>
        </div>
      `;
    }

    if (this.activeMod8Tab === 'mod8_evolucoes') {
      return `
        <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
            4. Feed de Evolu&ccedil;&otilde;es Cl&iacute;nicas
          </h3>
          <p style="font-size: 0.95rem; color: #475569;">Historico de pareceres da Psicologia, Enfermagem e Servico Social.</p>
        </div>
      `;
    }

    if (this.activeMod8Tab === 'mod8_odonto') {
      return `
        <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
            5. Odontologia & Autoestima
          </h3>
          <p style="font-size: 0.95rem; color: #475569;">Avalia&ccedil;&atilde;o odontol&oacute;gica de admiss&atilde;o para <strong>${acolhido.nome}</strong>.</p>
        </div>
      `;
    }

    return `
      <div class="card" style="background: #fff; padding: 1.75rem; border-radius: 10px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem;">
          6. Regula&ccedil;&atilde;o SAMU 192 & Primeiro Socorros
        </h3>
        <p style="font-size: 0.95rem; color: #475569;">Protocolo de emerg&ecirc;ncia da Enfermaria FDJ (Galp&atilde;o E).</p>
      </div>
    `;
  }

  selecionarAcolhidoProntuario(id) {
    this.selectedAcolhidoId = id;
    this.renderApp();
  }

  emitirCertificadoLaborterapia(id) {
    if (window.store) {
      window.store.emitirCertificadoLaborterapia(id);
    }
    this.renderApp();
  }
}

window.ui = new UI();
