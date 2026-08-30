/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Estado Global Completo para os 13 Módulos dos 6 Macromódulos
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v2';
const STORAGE_KEY_ESTOQUE = 'sgi_fdj_estoque_v2';
const STORAGE_KEY_REFEICOES = 'sgi_fdj_refeicoes_v2';
const STORAGE_KEY_FINANCEIRO = 'sgi_fdj_financeiro_v2';
const STORAGE_KEY_DOACOES = 'sgi_fdj_doacoes_v2';
const STORAGE_KEY_LABORTERAPIA = 'sgi_fdj_laborterapia_v2';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v2';

const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Lucas Silva Santos",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    dataNascimento: "12/04/1992",
    mae: "Maria das Gracas Silva",
    status: "ativo",
    leito: "Leito A-101 (Terreo PCD)",
    bloco: "Bloco A (Restauracao)",
    oficina: "Oficina de Eletrica & Manutencao",
    dieta: "Normal",
    fasePTI: "Fase 3 PTI (Reestruturacao Social)",
    kitAdmissao: "Entregue (Enxoval + Higiene)",
    laborterapia: { setor: "Oficina de Eletrica", horasConcluidas: 240, certificadoEmitido: true, dataConclusao: "15/08/2026" },
    prontuario: { alergias: "Nenhuma", tipoSanguineo: "O+", historicoClinico: "Tratamento RDC 29 ANVISA", sinaisVitais: { pa: "120x80 mmHg", fc: "76 bpm", glicemia: "94 mg/dL", temp: "36.5 C" } }
  },
  {
    id: "FDJ-2026-002",
    nome: "Mateus Santos Oliveira",
    cpf: "987.654.321-11",
    rg: "12.365.478-99",
    dataNascimento: "05/09/1988",
    mae: "Ana Lucia Santos",
    status: "triagem",
    leito: "Leito B-205",
    bloco: "Bloco B (Renovacao)",
    oficina: "Horta Organica FDJ",
    dieta: "Hipossodica (Pressao Alta)",
    fasePTI: "Fase 1 PTI (Acolhimento & Triagem)",
    kitAdmissao: "Pendente",
    laborterapia: { setor: "Horta Organica", horasConcluidas: 120, certificadoEmitido: false, dataConclusao: "Em Andamento (120h/240h)" },
    prontuario: { alergias: "Hipertensao arterial", tipoSanguineo: "A+", historicoClinico: "Monitoramento de pressao arterial", sinaisVitais: { pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 C" } }
  },
  {
    id: "FDJ-2026-003",
    nome: "Gabriel Ferreira Lima",
    cpf: "456.789.123-22",
    rg: "18.963.254-11",
    dataNascimento: "22/11/1995",
    mae: "Tania Ferreira Lima",
    status: "ativo",
    leito: "Leito C-302",
    bloco: "Bloco C (Transformacao)",
    oficina: "Cozinha Industrial FDJ",
    dieta: "Normal",
    fasePTI: "Fase 2 PTI (Fortalecimento)",
    kitAdmissao: "Entregue",
    laborterapia: { setor: "Cozinha Industrial", horasConcluidas: 180, certificadoEmitido: false, dataConclusao: "Em Andamento (180h/240h)" },
    prontuario: { alergias: "Dipirona", tipoSanguineo: "B+", historicoClinico: "Acompanhamento psicossocial semanal", sinaisVitais: { pa: "118x78 mmHg", fc: "72 bpm", glicemia: "88 mg/dL", temp: "36.4 C" } }
  }
];

const initialEstoque = [
  { id: "EST-001", item: "Arroz Agulhinha 5kg", categoria: "Alimentos", quantidade: 350, unidade: "Fardos", validade: "15/11/2026", lote: "LOT-8841", status: "ok" },
  { id: "EST-002", item: "Feijao Carioca 1kg", categoria: "Alimentos", quantidade: 120, unidade: "Fardos", validade: "10/09/2026", lote: "LOT-9920", status: "alerta" },
  { id: "EST-003", item: "Sabonete Antisseptico 90g", categoria: "Higiene Kit Admissao", quantidade: 15, unidade: "Caixas", validade: "05/08/2026", lote: "LOT-1102", status: "critico" },
  { id: "EST-004", item: "Dipirona 500mg (Portaria 344)", categoria: "Farmacia / Saude", quantidade: 50, unidade: "Caixas", validade: "20/12/2027", lote: "FAR-3321", status: "ok" }
];

const initialRefeicoes = {
  data: new Date().toLocaleDateString('pt-BR'),
  acolhidosTotais: 1240,
  refeicoesDia: 3720,
  cardapio: {
    cafe: "Cafe com Leite, Pao Frances com Manteiga e Banana Cozida",
    almoco: "Arroz, Feijao Carioca, Frango Assado ao Molho e Salada Verde",
    janta: "Sopa Nutritiva de Legumes com Carne Desfiada e Pao"
  },
  dietasEspeciais: [
    { acolhido: "Mateus Santos Oliveira", dieta: "Hipossodica (Pressao Alta)", observacao: "Sem sal adicionado" }
  ]
};

const initialFinanceiro = {
  contaMROSC: { banco: "Banco do Brasil", agencia: "3421-5", conta: "14.502-1 (SJDH-BA Segregada)", saldo: "R$ 485.200,00" },
  contaDoacoes: { banco: "Caixa Economica", agencia: "0045-1", conta: "9982-3 (Doacoes Geral)", saldo: "R$ 62.450,00" },
  lancamentos: [
    { id: "LAN-001", data: "28/08/2026", descricao: "Repasse Termo de Fomento SJDH-BA", tipo: "Entrada MROSC", valor: "R$ 150.000,00", conta: "BB 14.502-1" },
    { id: "LAN-002", data: "29/08/2026", descricao: "Aquisicao Insumos Alimenticios (Almoxarifado)", tipo: "Saida MROSC", valor: "R$ 32.400,00", conta: "BB 14.502-1" },
    { id: "LAN-003", data: "30/08/2026", descricao: "Doacao Espontanea Comercio Local", tipo: "Entrada Doacao", valor: "R$ 5.000,00", conta: "Caixa 9982-3" }
  ]
};

const initialDoacoes = [
  { id: "DOC-001", doador: "Atacadao dos Alimentos LTDA", item: "50 Fardos de Macarrao", data: "25/08/2026", destino: "Almoxarifado / Cozinha Industrial" },
  { id: "DOC-002", doador: "Comunidade Igreja Matriz", item: "200 Kits de Vestuario", data: "27/08/2026", destino: "Kits de Admissao de Novos Acolhidos" }
];

const initialLaborterapia = [
  { id: "LAB-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", setor: "Oficina de Eletrica", cargaHoraria: 240, status: "Concluido (Certificado 240h)", dataEmissao: "15/08/2026" },
  { id: "LAB-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", setor: "Horta Organica FDJ", cargaHoraria: 120, status: "Em Andamento (120h/240h)", dataEmissao: "Pendente" },
  { id: "LAB-03", acolhidoId: "FDJ-2026-003", acolhidoNome: "Gabriel Ferreira Lima", setor: "Cozinha Industrial FDJ", cargaHoraria: 180, status: "Em Andamento (180h/240h)", dataEmissao: "Pendente" }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    try {
      if (!localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) {
        localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
      }
      if (!localStorage.getItem(STORAGE_KEY_ESTOQUE)) {
        localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(initialEstoque));
      }
      if (!localStorage.getItem(STORAGE_KEY_REFEICOES)) {
        localStorage.setItem(STORAGE_KEY_REFEICOES, JSON.stringify(initialRefeicoes));
      }
      if (!localStorage.getItem(STORAGE_KEY_FINANCEIRO)) {
        localStorage.setItem(STORAGE_KEY_FINANCEIRO, JSON.stringify(initialFinanceiro));
      }
      if (!localStorage.getItem(STORAGE_KEY_DOACOES)) {
        localStorage.setItem(STORAGE_KEY_DOACOES, JSON.stringify(initialDoacoes));
      }
      if (!localStorage.getItem(STORAGE_KEY_LABORTERAPIA)) {
        localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(initialLaborterapia));
      }
    } catch(e) {}
  }

  getAcolhidos() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_ACOLHIDOS));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch(e) {}
    return initialAcolhidos;
  }

  getAcolhidoById(id) {
    const list = this.getAcolhidos();
    return list.find(a => a.id === id) || list[0] || initialAcolhidos[0];
  }

  addAcolhido(acolhido) {
    const list = this.getAcolhidos();
    list.unshift(acolhido);
    try { localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(list)); } catch(e){}
    this.addLog(`Novo Acolhido cadastrado: ${acolhido.nome} (${acolhido.id})`);
    return acolhido;
  }

  getEstoque() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_ESTOQUE));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch(e) {}
    return initialEstoque;
  }

  getRefeicoes() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_REFEICOES));
      if (data && data.acolhidosTotais) return data;
    } catch(e) {}
    return initialRefeicoes;
  }

  getFinanceiro() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_FINANCEIRO));
      if (data && data.contaMROSC) return data;
    } catch(e) {}
    return initialFinanceiro;
  }

  getDoacoes() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_DOACOES));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch(e) {}
    return initialDoacoes;
  }

  getLaborterapia() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_LABORTERAPIA));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch(e) {}
    return initialLaborterapia;
  }

  emitirCertificadoLaborterapia(acolhidoId) {
    const labor = this.getLaborterapia();
    const item = labor.find(l => l.acolhidoId === acolhidoId);
    if (item) {
      item.cargaHoraria = 240;
      item.status = "Concluido (Certificado 240h)";
      item.dataEmissao = new Date().toLocaleDateString('pt-BR');
      try { localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(labor)); } catch(e){}
      this.addLog(`Certificado Oficial de Laborterapia (240h) emitido para ${item.acolhidoNome}.`);
      return item;
    }
    return null;
  }

  getLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS)) || [
        { timestamp: new Date().toLocaleString('pt-BR'), mensagem: "Sistema SGI inicializado com sucesso." }
      ];
    } catch(e) {
      return [];
    }
  }

  addLog(mensagem) {
    const logs = this.getLogs();
    logs.unshift({ timestamp: new Date().toLocaleString('pt-BR'), mensagem });
    try { localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 50))); } catch(e){}
  }
}

window.store = new Store();