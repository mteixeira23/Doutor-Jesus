/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * UI Manager - Layout Completo com Sidebar de Todos os 6 Macromódulos
 */

class UI {
  constructor() {
    this.root = document.getElementById('root');
    this.currentMacro = 'macro3'; // 'macro1', 'macro2', 'macro3', 'macro4', 'macro5', 'macro6'
    this.currentView = 'macro3_home'; // 'macro3_home', 'mod8_prontuario', 'mod9_laborterapia', 'cadastros_saude'
    this.activeMod8Tab = 'mod8_resumo';
    this.selectedAcolhidoId = "FDJ-2026-001";
  }

  renderApp() {
    this.root = document.getElementById('root');
    if (!this.root) return;

    let acolhidos = [];
    try {
      acolhidos = window.store ? window.store.getAcolhidos() : [];
    } catch(e){}

    if (!Array.isArray(acolhidos) || acolhidos.length === 0) {
      acolhidos = [
        { id: "FDJ-2026-001", nome: "Lucas Silva Santos", cpf: "123.456.789-00", status: "ativo", leito: "Leito A-101 (Térreo PCD)", oficina: "Oficina de Elétrica", dieta: "Normal" },
        { id: "FDJ-2026-002", nome: "Mateus Santos Oliveira", cpf: "987.654.321-11", status: "triagem", leito: "Leito B-205", oficina: "Horta Orgânica FDJ", dieta: "Hipossódica (Pressão Alta)" }
      ];
    }

    const acolhidoAtual = (acolhidos.find(a => a.id === this.selectedAcolhidoId) || acolhidos[0]);
    let laborterapia = [];
    try {
      laborterapia = window.store ? window.store.getLaborterapia() : [];
    } catch(e){}

    try {
      this.root.innerHTML = `
        <div class="app-container" style="font-family: 'Inter', sans-serif; background: #f8fafc; min-height: 100vh; color: #0f172a; width: 100%; display: flex; flex-direction: column;">
          
          <!-- Top Header Bar -->
          <header style="width: 100%; box-sizing: border-box; padding: 0.75rem 1.5rem; background: #ffffff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; gap: 1.25rem;">
              <div style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 1.4rem; color: #dc2626; letter-spacing: -0.03em; display: flex; align-items: center; gap: 0.4rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                Funda&ccedil;&atilde;o Dr. <span style="background: #dc2626; color: #fff; padding: 2px 8px; border-radius: 6px; font-size: 1.05rem;">JESUS</span>
              </div>
              <span style="color: #cbd5e1;">|</span>
              <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">Sistema de Gest&atilde;o Integrada (SGI)</span>
            </div>

            <div style="display: flex; align-items: center; gap: 1rem; font-size: 0.85rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem; background: #ecfdf5; color: #047857; padding: 4px 12px; border-radius: 20px; font-weight: 700; border: 1px solid #a7f3d0;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
                SGI Online
              </div>
              <span style="font-weight: 700; color: #2563eb; background: #eff6ff; padding: 4px 12px; border-radius: 6px; border: 1px solid #bfdbfe;">marcos.vinicius2323@...</span>
              <button class="btn btn-outline btn-sm" onclick="window.ui.renderApp()" style="padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; font-weight: 600;">Atualizar</button>
            </div>
          </header>

          <!-- Main Layout: Sidebar Left + Content Right -->
          <div style="display: flex; flex: 1; width: 100%;">
            
            <!-- Left Navigation Sidebar for all 6 Macromodules -->
            <aside style="width: 280px; background: #ffffff; border-right: 1px solid #e2e8f0; padding: 1.25rem 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; flex-shrink: 0;">
              
              <div style="font-size: 0.65rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; padding: 0 0.75rem 0.5rem 0.75rem; letter-spacing: 0.05em;">
                MACROM&Oacute;DULOS DO SISTEMA
              </div>

              <!-- Item 1 -->
              <button class="btn" onclick="window.ui.setMacro('macro1')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro1' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro1' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro1' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                1. Gest&atilde;o dos Acolhidos
              </button>

              <!-- Item 2 -->
              <button class="btn" onclick="window.ui.setMacro('macro2')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro2' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro2' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro2' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                2. Almoxarifado & Oficinas
              </button>

              <!-- Item 3 (Active) -->
              <button class="btn" onclick="window.ui.setMacro('macro3')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro3' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro3' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro3' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                3. Sa&uacute;de & Multidisciplinar
              </button>

              <!-- Item 4 -->
              <button class="btn" onclick="window.ui.setMacro('macro4')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro4' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro4' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro4' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                4. Finan&ccedil;as & MROSC
              </button>

              <!-- Item 5 -->
              <button class="btn" onclick="window.ui.setMacro('macro5')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro5' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro5' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro5' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                5. Doa&ccedil;&otilde;es & Voluntariado
              </button>

              <!-- Item 6 -->
              <button class="btn" onclick="window.ui.setMacro('macro6')" style="width: 100%; justify-content: flex-start; text-align: left; padding: 10px 12px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; border: 1px solid ${this.currentMacro === 'macro6' ? '#bfdbfe' : 'transparent'}; background: ${this.currentMacro === 'macro6' ? '#eff6ff' : 'transparent'}; color: ${this.currentMacro === 'macro6' ? '#1d4ed8' : '#334155'}; cursor: pointer;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                6. Sistema & Organograma
              </button>

              <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                <div style="background: #f8fafc; padding: 0.75rem; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b;">
                  <strong>Funda&ccedil;&atilde;o Dr. Jesus</strong><br>
                  Capacidade: 1.240 Acolhidos<br>
                  Vers&atilde;o: 2026.1 (Oficial)
                </div>
              </div>
            </aside>

            <!-- Main Content Container -->
            <main style="flex: 1; padding: 2rem; background: #f8fafc; overflow-y: auto;">
              ${this.renderMainAreaContent(acolhidos, acolhidoAtual, laborterapia)}
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

  renderMainAreaContent(acolhidos, acolhidoAtual, laborterapia) {
    // MACROMÓDULO 1: GESTÃO DOS ACOLHIDOS
    if (this.currentMacro === 'macro1') {
      return `
        <div style="max-width: 1000px; margin: 0 auto;">
          <div class="card" style="background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top: 4px solid #2563eb;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">1. Gest&atilde;o dos Acolhidos (Triagem, Leitos e Admiss&atilde;o)</h2>
            <p style="color: #64748b; margin-bottom: 1.5rem;">Controle de acolhimento RDC 29 ANVISA, leitos e emiss&atilde;o de crach&aacute;s.</p>

            <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
              <div class="card" style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #1d4ed8; margin: 0 0 0.25rem 0;">M&oacute;dulo 1: Triagem & Alojamentos</h4>
                <p style="font-size: 0.85rem; color: #2563eb; margin: 0;">25 Acolhidos em Triagem | 1.215 Leitos Ocupados</p>
              </div>
              <div class="card" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #15803d; margin: 0 0 0.25rem 0;">M&oacute;dulo 3: Emiss&atilde;o de Crach&aacute;s & Quita&ccedil;&atilde;o</h4>
                <p style="font-size: 0.85rem; color: #16a34a; margin: 0;">Emiss&atilde;o A4 com Foto e C&oacute;digo QR</p>
              </div>
            </div>

            <div class="table-container" style="border: 1px solid #e2e8f0; border-radius: 8px; background: #fff;">
              <table class="data-table" style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background: #f1f5f9; text-align: left;">
                    <th style="padding: 10px;">C&oacute;digo</th>
                    <th style="padding: 10px;">Acolhido</th>
                    <th style="padding: 10px;">CPF</th>
                    <th style="padding: 10px;">Leito</th>
                    <th style="padding: 10px;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${acolhidos.map(a => `
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                      <td style="padding: 10px;"><strong>${a.id}</strong></td>
                      <td style="padding: 10px;"><strong>${a.nome}</strong></td>
                      <td style="padding: 10px;">${a.cpf}</td>
                      <td style="padding: 10px;">${a.leito}</td>
                      <td style="padding: 10px;"><span class="badge badge-success" style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${a.status}</span></td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 2: ALMOXARIFADO & REFEIÇÕES
    if (this.currentMacro === 'macro2') {
      return `
        <div style="max-width: 1000px; margin: 0 auto;">
          <div class="card" style="background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top: 4px solid #d97706;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">2. Gest&atilde;o Administrativa, Almoxarifado & Refei&ccedil;&otilde;es</h2>
            <p style="color: #64748b; margin-bottom: 1.5rem;">Controle de Estoque FEFO e 4.000 refei&ccedil;&otilde;es di&aacute;rias para 1.240 acolhidos.</p>

            <div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
              <div class="card" style="background: #fff8f1; border: 1px solid #ffedd5; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #c2410c; margin: 0 0 0.25rem 0;">M&oacute;dulo 5: Estoque FEFO</h4>
                <p style="font-size: 0.85rem; color: #ea580c; margin: 0;">18 Itens em Alerta Cr&iacute;tico</p>
              </div>
              <div class="card" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #15803d; margin: 0 0 0.25rem 0;">M&oacute;dulo 6: Refei&ccedil;&otilde;es (1.240)</h4>
                <p style="font-size: 0.85rem; color: #16a34a; margin: 0;">Caf&eacute;, Almo&ccedil;o e Janta</p>
              </div>
              <div class="card" style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #1d4ed8; margin: 0 0 0.25rem 0;">M&oacute;dulo 7: Oficinas FDJ</h4>
                <p style="font-size: 0.85rem; color: #2563eb; margin: 0;">Escala Cozinha & Horta</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 4: FINANCEIRO & MROSC
    if (this.currentMacro === 'macro4') {
      return `
        <div style="max-width: 1000px; margin: 0 auto;">
          <div class="card" style="background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top: 4px solid #16a34a;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">4. Presta&ccedil;&atilde;o de Contas MROSC & Financeiro Segregado</h2>
            <p style="color: #64748b; margin-bottom: 1.5rem;">Segrega&ccedil;&atilde;o banc&aacute;ria estrita: Banco do Brasil Conta MROSC 14.502-1 x Caixa Geral.</p>

            <div class="grid-2" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div class="card" style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #15803d; margin: 0 0 0.25rem 0;">M&oacute;dulo 10: Banco do Brasil (Conta 14.502-1)</h4>
                <p style="font-size: 0.85rem; color: #16a34a; margin: 0;">Recursos Segregados SJDH-BA (MROSC)</p>
              </div>
              <div class="card" style="background: #fefce8; border: 1px solid #fef08a; padding: 1.25rem; border-radius: 8px;">
                <h4 style="color: #a16207; margin: 0 0 0.25rem 0;">M&oacute;dulo 11: DRE & Concilia&ccedil;&atilde;o SJDH-BA</h4>
                <p style="font-size: 0.85rem; color: #ca8a04; margin: 0;">Relat&oacute;rios de Auditoria P&uacute;blica A4</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 5: DOAÇÕES
    if (this.currentMacro === 'macro5') {
      return `
        <div style="max-width: 1000px; margin: 0 auto;">
          <div class="card" style="background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top: 4px solid #9333ea;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">5. Gest&atilde;o de Doa&ccedil;&otilde;es & Voluntariado</h2>
            <p style="color: #64748b;">Cadastro de doadores, pessoas focais e acompanhamento de parceiros da institui&ccedil;&atilde;o.</p>
          </div>
        </div>
      `;
    }

    // MACROMÓDULO 6: TI & ORGANOGRAMA
    if (this.currentMacro === 'macro6') {
      return `
        <div style="max-width: 1000px; margin: 0 auto;">
          <div class="card" style="background: #fff; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; border-top: 4px solid #475569;">
            <h2 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">6. Administra&ccedil;&atilde;o do Sistema, TI & Organograma</h2>
            <p style="color: #64748b;">Gest&atilde;o de perfis (SuperAdmin, Recep&ccedil;&atilde;o, TI), logs de auditoria e estrutura organizacional.</p>
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
              <!-- Option 1: Dashboard -->
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

              <!-- Option 2: Módulo 8 Prontuário -->
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

              <!-- Option 3: Módulo 9 Laborterapia -->
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

              <!-- Option 4: Cadastros Saúde -->
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
