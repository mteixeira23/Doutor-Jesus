/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Gerenciamento de Estado e Persistência (LocalStorage / Supabase)
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_ESTOQUE = 'sgi_fdj_estoque_v1';
const STORAGE_KEY_USUARIOS = 'sgi_fdj_usuarios_v1';

// Dados Iniciais Mockados da Fundação Doutor Jesus
const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Roberto Carlos Silva",
    cpf: "123.456.789-00",
    status: "ativo",
    fasePTI: 3,
    leito: "Bloco A - Leito 12",
    oficina: "Oficina de Elétrica",
    origem: "Salvador / BA",
    dataAdmissao: "2026-01-15",
    dieta: "Normal",
    acompanhamentoMedico: "Exame Cardiológico em dia",
    rg: "14.587.963-00",
    contatoEmergencia: "(71) 98877-6655 - Esposa (Maria)"
  },
  {
    id: "FDJ-2026-002",
    nome: "Marcos Vinicius Santos",
    cpf: "987.654.321-11",
    status: "triagem",
    fasePTI: 1,
    leito: "Triagem - Leito 04",
    oficina: "Horta Orgânica",
    origem: "Feira de Santana / BA",
    dataAdmissao: "2026-08-20",
    dieta: "Hipossódica (Pressão Alta)",
    acompanhamentoMedico: "Atendimento Psicológico Semanal",
    rg: "12.365.478-99",
    contatoEmergencia: "(75) 99123-4567 - Mãe (Ana)"
  },
  {
    id: "FDJ-2026-003",
    nome: "João Pedro Oliveira",
    cpf: "456.789.123-22",
    status: "ativo",
    fasePTI: 4,
    leito: "Bloco C - Leito 08",
    oficina: "Cozinha Industrial",
    origem: "Camaçari / BA",
    dataAdmissao: "2025-11-10",
    dieta: "Normal",
    acompanhamentoMedico: "Liberado / Acompanhamento MROSC",
    rg: "09.874.521-33",
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
  }

  getAcolhidos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) || [];
  }

  getAcolhidoById(id) {
    return this.getAcolhidos().find(a => a.id === id);
  }

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
    return newAcolhido;
  }

  updateAcolhido(id, data) {
    const acolhidos = this.getAcolhidos();
    const index = acolhidos.findIndex(a => a.id === id);
    if (index !== -1) {
      acolhidos[index] = { ...acolhidos[index], ...data };
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));
      return acolhidos[index];
    }
    return null;
  }

  avancarPTI(id) {
    const acolhido = this.getAcolhidoById(id);
    if (acolhido && acolhido.fasePTI < 4) {
      const novaFase = acolhido.fasePTI + 1;
      const novoStatus = novaFase >= 2 ? 'ativo' : 'triagem';
      return this.updateAcolhido(id, { fasePTI: novaFase, status: novoStatus });
    }
    return acolhido;
  }

  getEstoque() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ESTOQUE)) || [];
  }

  getUsuarios() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USUARIOS)) || [];
  }

  getEstatisticas() {
    const acolhidos = this.getAcolhidos();
    const estoque = this.getEstoque();

    const totalAtivos = acolhidos.filter(a => a.status === 'ativo').length;
    const totalTriagem = acolhidos.filter(a => a.status === 'triagem').length;
    const totalPTI34 = acolhidos.filter(a => a.fasePTI >= 3).length;
    const estoqueCritico = estoque.filter(e => e.quantidade <= e.estoqueMinimo).length;

    return {
      totalAtivos,
      totalTriagem,
      totalPTI34,
      estoqueCritico,
      totalRefeicoes: 1240
    };
  }
}

window.store = new Store();
