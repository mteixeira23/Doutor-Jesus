/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Gerenciamento de Estado Reativo & Integração Transversal entre Macromódulos
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_ESTOQUE = 'sgi_fdj_estoque_v1';
const STORAGE_KEY_USUARIOS = 'sgi_fdj_usuarios_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Dados Iniciais Mockados da Fundação Doutor Jesus
const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Roberto Carlos Silva",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    status: "ativo",
    fasePTI: 3,
    leito: "Bloco A - Leito 12",
    oficina: "Oficina de Elétrica",
    origem: "Salvador / BA",
    dataAdmissao: "2026-01-15",
    dieta: "Normal",
    acompanhamentoMedico: "Exame Cardiológico em dia",
    contatoEmergencia: "(71) 98877-6655 - Esposa (Maria)"
  },
  {
    id: "FDJ-2026-002",
    nome: "Marcos Vinicius Santos",
    cpf: "987.654.321-11",
    rg: "12.365.478-99",
    status: "triagem",
    fasePTI: 1,
    leito: "Triagem - Leito 04",
    oficina: "Horta Orgânica",
    origem: "Feira de Santana / BA",
    dataAdmissao: "2026-08-20",
    dieta: "Hipossódica (Pressão Alta)",
    acompanhamentoMedico: "Atendimento Psicológico Semanal",
    contatoEmergencia: "(75) 99123-4567 - Mãe (Ana)"
  },
  {
    id: "FDJ-2026-003",
    nome: "João Pedro Oliveira",
    cpf: "456.789.123-22",
    rg: "09.874.521-33",
    status: "ativo",
    fasePTI: 4,
    leito: "Bloco C - Leito 08",
    oficina: "Cozinha Industrial",
    origem: "Camaçari / BA",
    dataAdmissao: "2025-11-10",
    dieta: "Normal",
    acompanhamentoMedico: "Liberado / Acompanhamento MROSC",
    contatoEmergencia: "(71) 98765-4321 - Irmão (Carlos)"
  }
];

const initialEstoque = [
  { id: "EST-01", item: "Arroz Tipo 1 (Saco 50kg)", quantidade: 85, estoqueMinimo: 20, validade: "2026-12-10", setor: "Despensa Geral" },
  { id: "EST-02", item: "Feijão Carioca (Saco 30kg)", quantidade: 14, estoqueMinimo: 25, validade: "2026-09-15", setor: "Despensa Geral" },
  { id: "EST-03", item: "Óleo de Soja (Caixa 24u)", quantidade: 40, estoqueMinimo: 10, validade: "2027-02-28", setor: "Cozinha Industrial" },
  { id: "EST-04", item: "Kits de Admissão de Acolhidos", quantidade: 120, estoqueMinimo: 30, validade: "Indefinida", setor: "Triagem / Recepção" }
];

const initialUsuarios = [
  { id: "USR-01", nome: "Administrador SGI", email: "admin@fundacaodrjesus.org.br", perfil: "SuperAdmin" },
  { id: "USR-02", nome: "Triagem & Recepção", email: "triagem@fundacaodrjesus.org.br", perfil: "Recepção/Triagem" }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) {
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
    }
    if (!localStorage.getItem(STORAGE_KEY_ESTOQUE)) {
      localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(initialEstoque));
    }
    if (!localStorage.getItem(STORAGE_KEY_USUARIOS)) {
      localStorage.setItem(STORAGE_KEY_USUARIOS, JSON.stringify(initialUsuarios));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  getAcolhidos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) || [];
  }

  getAcolhidoById(id) {
    return this.getAcolhidos().find(a => a.id === id);
  }

  /**
   * REAÇÃO TRANSVERSAL:
   * Ao cadastrar um novo Acolhido na Triagem (Macromódulo 1):
   * 1. Adiciona o Acolhido na lista principal.
   * 2. Baixa AUTOMATICAMENTE 1 "Kit de Admissão de Acolhidos" no Almoxarifado (Macromódulo 2).
   * 3. Registra o Acolhido para acompanhamento médico/dieta na Saúde.
   * 4. Gera um Log de Auditoria do Sistema.
   */
  addAcolhido(acolhido) {
    const acolhidos = this.getAcolhidos();
    const newAcolhido = {
      id: `FDJ-2026-${String(acolhidos.length + 1).padStart(3, '0')}`,
      dataAdmissao: new Date().toISOString().split('T')[0],
      status: 'triagem',
      fasePTI: 1,
      ...acolhido
    };

    acolhidos.unshift(newAcolhido);
    localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));

    // REAÇÃO 1: Baixar Kit de Admissão no Almoxarifado (Macromódulo 2)
    this.deduzirItemEstoque("EST-04", 1);

    // REAÇÃO 2: Registrar Log de Auditoria
    this.addLog(`Novo Acolhido cadastrado na Triagem: ${newAcolhido.nome} (${newAcolhido.id}). Kit de Admissão deduzido do estoque.`);

    return newAcolhido;
  }

  deduzirItemEstoque(itemId, quantidade = 1) {
    const estoque = this.getEstoque();
    const index = estoque.findIndex(e => e.id === itemId);
    if (index !== -1 && estoque[index].quantidade >= quantidade) {
      estoque[index].quantidade -= quantidade;
      localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(estoque));
    }
  }

  getEstoque() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ESTOQUE)) || [];
  }

  updateAcolhido(id, data) {
    const acolhidos = this.getAcolhidos();
    const index = acolhidos.findIndex(a => a.id === id);
    if (index !== -1) {
      acolhidos[index] = { ...acolhidos[index], ...data };
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));
      this.addLog(`Dados do Acolhido ${id} atualizados.`);
      return acolhidos[index];
    }
    return null;
  }

  avancarPTI(id) {
    const acolhido = this.getAcolhidoById(id);
    if (acolhido && acolhido.fasePTI < 4) {
      const novaFase = acolhido.fasePTI + 1;
      const novoStatus = novaFase >= 2 ? 'ativo' : 'triagem';
      const updated = this.updateAcolhido(id, { fasePTI: novaFase, status: novoStatus });
      this.addLog(`Acolhido ${acolhido.nome} avançou para a Fase ${novaFase} do PTI.`);
      return updated;
    }
    return acolhido;
  }

  getUsuarios() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USUARIOS)) || [];
  }

  getLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS)) || [];
  }

  addLog(mensagem) {
    const logs = this.getLogs();
    logs.unshift({
      timestamp: new Date().toLocaleString('pt-BR'),
      mensagem
    });
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 50)));
  }

  getEstatisticas() {
    const acolhidos = this.getAcolhidos();
    const estoque = this.getEstoque();

    const totalAtivos = acolhidos.filter(a => a.status === 'ativo').length;
    const totalTriagem = acolhidos.filter(a => a.status === 'triagem').length;
    const totalPTI34 = acolhidos.filter(a => a.fasePTI >= 3).length;
    const estoqueCritico = estoque.filter(e => e.quantidade <= e.estoqueMinimo).length;
    const totalDietasEspeciais = acolhidos.filter(a => a.dieta && a.dieta !== 'Normal').length;

    return {
      totalAtivos,
      totalTriagem,
      totalPTI34,
      estoqueCritico,
      totalDietasEspeciais,
      totalRefeicoes: 1240
    };
  }
}

window.store = new Store();
