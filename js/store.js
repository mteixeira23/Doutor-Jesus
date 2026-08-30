/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Estado Global & Persistência Nativa (LocalStorage)
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_LABORTERAPIA = 'sgi_fdj_laborterapia_v1';
const STORAGE_KEY_SINAIS_VITAIS = 'sgi_fdj_sinais_vitais_v1';
const STORAGE_KEY_PRESCRICOES = 'sgi_fdj_prescricoes_v1';
const STORAGE_KEY_ATENDIMENTOS_PSICO = 'sgi_fdj_atendimentos_psico_v1';
const STORAGE_KEY_ODONTO = 'sgi_fdj_odonto_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Lucas Silva Santos",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    status: "ativo",
    leito: "Leito A-101 (Térreo PCD)",
    bloco: "Bloco A (Restauração)",
    oficina: "Oficina de Elétrica",
    dieta: "Normal",
    fasePTI: "Fase 3 PTI (Reestruturação Social)",
    laborterapia: {
      setor: "Oficina de Elétrica & Manutenção",
      horasConcluidas: 240,
      certificadoEmitido: true,
      dataConclusao: "15/08/2026"
    },
    prontuario: {
      alergias: "Nenhuma",
      tipoSanguineo: "O+",
      historicoClinico: "Tratamento regular RDC 29 ANVISA",
      sinaisVitais: { pa: "120x80 mmHg", fc: "76 bpm", glicemia: "94 mg/dL", temp: "36.5 °C" }
    }
  },
  {
    id: "FDJ-2026-002",
    nome: "Mateus Santos Oliveira",
    cpf: "987.654.321-11",
    rg: "12.365.478-99",
    status: "triagem",
    leito: "Leito B-205",
    bloco: "Bloco B (Renovação)",
    oficina: "Horta Orgânica FDJ",
    dieta: "Hipossódica (Pressão Alta)",
    fasePTI: "Fase 1 PTI (Acolhimento & Triagem)",
    laborterapia: {
      setor: "Horta Orgânica & Agroecologia",
      horasConcluidas: 120,
      certificadoEmitido: false,
      dataConclusao: "Em Andamento (120h/240h)"
    },
    prontuario: {
      alergias: "Hipertensão arterial sistêmica",
      tipoSanguineo: "A+",
      historicoClinico: "Monitoramento de pressão arterial e dieta hipossódica",
      sinaisVitais: { pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 °C" }
    }
  }
];

const initialLaborterapia = [
  { id: "LAB-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", setor: "Oficina de Elétrica", cargaHoraria: 240, status: "Concluído (Certificado 240h)", dataEmissao: "15/08/2026" },
  { id: "LAB-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", setor: "Horta Orgânica FDJ", cargaHoraria: 120, status: "Em Andamento (120h/240h)", dataEmissao: "Pendente" }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) {
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
    }
    if (!localStorage.getItem(STORAGE_KEY_LABORTERAPIA)) {
      localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(initialLaborterapia));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  getAcolhidos() {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY_ACOLHIDOS));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch(e) {}
    localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
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
      item.status = "Concluído (Certificado 240h)";
      item.dataEmissao = new Date().toLocaleDateString('pt-BR');
      localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(labor));
      this.addLog(`Certificado Oficial de Laborterapia (240h) emitido para ${item.acolhidoNome}.`);
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
    const labor = this.getLaborterapia();

    return {
      totalAtivos: acolhidos.filter(a => a.status === 'ativo').length,
      totalTriagem: acolhidos.filter(a => a.status === 'triagem').length,
      totalLaborterapiaCertificados: labor.filter(l => l.cargaHoraria >= 240).length,
      totalRefeicoes: 1240
    };
  }
}

window.store = new Store();
