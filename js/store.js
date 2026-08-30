/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Macromódulo 3: Saúde & Equipe Multidisciplinar (Screenshot Factual & Laborterapia)
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_LABORTERAPIA = 'sgi_fdj_laborterapia_v1';
const STORAGE_KEY_SINAIS_VITAIS = 'sgi_fdj_sinais_vitais_v1';
const STORAGE_KEY_PRESCRICOES = 'sgi_fdj_prescricoes_v1';
const STORAGE_KEY_EVOLUCOES = 'sgi_fdj_evolucoes_v1';
const STORAGE_KEY_ODONTO = 'sgi_fdj_odonto_v1';
const STORAGE_KEY_CADASTROS_SAUDE = 'sgi_fdj_cadastros_saude_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Dados Iniciais de Acolhidos (Garantia de Não Nulo para Evitar TypeError)
const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Lucas Silva Santos",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    status: "ativo",
    leito: "Leito A-101 (Térreo PCD)",
    oficina: "Oficina de Elétrica",
    dieta: "Normal",
    laborterapia: {
      setor: "Oficina de Elétrica & Manutenção",
      horasConcluidas: 240,
      certificadoEmitido: true,
      dataConclusao: "2026-08-15"
    },
    prontuario: {
      alergias: "Nenhuma",
      tipoSanguineo: "O+",
      historicoClinico: "Tratamento regular RDC 29",
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
    oficina: "Horta Orgânica FDJ",
    dieta: "Hipossódica (Pressão Alta)",
    laborterapia: {
      setor: "Horta Orgânica & Agro",
      horasConcluidas: 120,
      certificadoEmitido: false,
      dataConclusao: "Em Andamento"
    },
    prontuario: {
      alergias: "Hipertensão leve",
      tipoSanguineo: "A+",
      historicoClinico: "Acompanhamento de pressão arterial",
      sinaisVitais: { pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 °C" }
    }
  }
];

// Módulo 9: Laborterapia (Rotina e Certificado 240h)
const initialLaborterapia = [
  { id: "LAB-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", setor: "Oficina de Elétrica", cargaHoraria: 240, status: "Concluído (Certificado 240h)", dataEmissao: "2026-08-15" },
  { id: "LAB-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", setor: "Horta Orgânica FDJ", cargaHoraria: 120, status: "Em Andamento (120h/240h)", dataEmissao: "Pendente" }
];

// Cadastros Saúde & Multidisciplinar (Equipe CRM/CRP e Farmácia)
const initialCadastrosSaude = {
  profissionais: [
    { id: "PRO-01", nome: "Enfermeira Chefe Juliana Santos", registro: "COREN-BA 48192", especialidade: "Enfermagem Chefe & Sinais Vitais" },
    { id: "PRO-02", nome: "Dra. Ana Paula", registro: "CRM-BA 14589 / Psiquiatria", especialidade: "Medicina & Psiquiatria" },
    { id: "PRO-03", nome: "Dr. Marcos Dentista", registro: "CRO-BA 8874", especialidade: "Odontologia Terapêutica & Autoestima" }
  ],
  medicamentos: [
    { id: "MED-01", nome: "Haloperidol 5mg", dosagem: "5mg", psicotropico: true, portaria344: "Lista C1 (Psicotrópicos)", estoque: 450 },
    { id: "MED-02", nome: "Diazepam 10mg", dosagem: "10mg", psicotropico: true, portaria344: "Lista B1 (Ansiolíticos)", estoque: 320 }
  ]
};

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
    if (!localStorage.getItem(STORAGE_KEY_CADASTROS_SAUDE)) {
      localStorage.setItem(STORAGE_KEY_CADASTROS_SAUDE, JSON.stringify(initialCadastrosSaude));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  getAcolhidos() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY_ACOLHIDOS));
    if (!data || !Array.isArray(data) || data.length === 0) {
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
      return initialAcolhidos;
    }
    return data;
  }

  getAcolhidoById(id) {
    const list = this.getAcolhidos();
    return list.find(a => a.id === id) || list[0] || initialAcolhidos[0];
  }

  getLaborterapia() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LABORTERAPIA)) || initialLaborterapia;
  }

  getCadastrosSaude() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_CADASTROS_SAUDE)) || initialCadastrosSaude;
  }

  emitirCertificadoLaborterapia(acolhidoId) {
    const labor = this.getLaborterapia();
    const item = labor.find(l => l.acolhidoId === acolhidoId);
    if (item) {
      item.cargaHoraria = 240;
      item.status = "Concluído (Certificado 240h)";
      item.dataEmissao = new Date().toLocaleDateString('pt-BR');
      localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(labor));
      this.addLog(`Certificado Oficial de Laborterapia (240h) emitido com sucesso para ${item.acolhidoNome}.`);
      return item;
    }
    return null;
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
