/**
 * TaskFlow / SGI - FundaÃ§Ã£o Doutor Jesus
 * Store Manager - Estado Global & PersistÃªncia Nativa (LocalStorage)
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_LABORTERAPIA = 'sgi_fdj_laborterapia_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Lucas Silva Santos",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    status: "ativo",
    leito: "Leito A-101 (Terreo PCD)",
    bloco: "Bloco A (Restauracao)",
    oficina: "Oficina de Eletrica",
    dieta: "Normal",
    fasePTI: "Fase 3 PTI (Reestruturacao Social)",
    laborterapia: {
      setor: "Oficina de Eletrica & Manutencao",
      horasConcluidas: 240,
      certificadoEmitido: true,
      dataConclusao: "15/08/2026"
    },
    prontuario: {
      alergias: "Nenhuma",
      tipoSanguineo: "O+",
      historicoClinico: "Tratamento regular RDC 29 ANVISA",
      sinaisVitais: { pa: "120x80 mmHg", fc: "76 bpm", glicemia: "94 mg/dL", temp: "36.5 C" }
    }
  },
  {
    id: "FDJ-2026-002",
    nome: "Mateus Santos Oliveira",
    cpf: "987.654.321-11",
    rg: "12.365.478-99",
    status: "triagem",
    leito: "Leito B-205",
    bloco: "Bloco B (Renovacao)",
    oficina: "Horta Organica FDJ",
    dieta: "Hipossodica (Pressao Alta)",
    fasePTI: "Fase 1 PTI (Acolhimento & Triagem)",
    laborterapia: {
      setor: "Horta Organica & Agroecologia",
      horasConcluidas: 120,
      certificadoEmitido: false,
      dataConclusao: "Em Andamento (120h/240h)"
    },
    prontuario: {
      alergias: "Hipertensao arterial sistemica",
      tipoSanguineo: "A+",
      historicoClinico: "Monitoramento de pressao arterial e dieta hipossodica",
      sinaisVitais: { pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 C" }
    }
  }
];

const initialLaborterapia = [
  { id: "LAB-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", setor: "Oficina de Eletrica", cargaHoraria: 240, status: "Concluido (Certificado 240h)", dataEmissao: "15/08/2026" },
  { id: "LAB-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", setor: "Horta Organica FDJ", cargaHoraria: 120, status: "Em Andamento (120h/240h)", dataEmissao: "Pendente" }
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
      if (!localStorage.getItem(STORAGE_KEY_LABORTERAPIA)) {
        localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(initialLaborterapia));
      }
      if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
        localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
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
      return item;
    }
    return null;
  }

  getLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS)) || [];
    } catch(e) {
      return [];
    }
  }
}

window.store = new Store();