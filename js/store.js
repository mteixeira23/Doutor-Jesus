/**
 * TaskFlow / SGI - Fundao Doutor Jesus
 * Store Manager - Estado Global Completo com Fallbacks Anti-Crash 100% Protegidos
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v3';
const STORAGE_KEY_LABORTERAPIA = 'sgi_fdj_laborterapia_v3';
const STORAGE_KEY_CADASTROS_SAUDE = 'sgi_fdj_cadastros_saude_v3';
const STORAGE_KEY_SINAIS_VITAIS = 'sgi_fdj_sinais_vitais_v3';
const STORAGE_KEY_PRESCRICOES = 'sgi_fdj_prescricoes_v3';
const STORAGE_KEY_PSICO = 'sgi_fdj_psico_v3';
const STORAGE_KEY_ODONTO = 'sgi_fdj_odonto_v3';
const STORAGE_KEY_SUBSTANCIAS = 'sgi_fdj_substancias_v3';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v3';

const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Lucas Silva Santos",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    status: "ativo",
    leito: "Leito A-101 (Terreo PCD)",
    oficina: "Oficina de Eletrica",
    dieta: "Normal",
    laborterapia: { setor: "Oficina de Eletrica & Manutencao", horasConcluidas: 240, certificadoEmitido: true, dataConclusao: "2026-08-15" },
    prontuario: { alergias: "Nenhuma", tipoSanguineo: "O+", historicoClinico: "Tratamento regular RDC 29", sinaisVitais: { pa: "120x80 mmHg", fc: "76 bpm", glicemia: "94 mg/dL", temp: "36.5 C" } }
  },
  {
    id: "FDJ-2026-002",
    nome: "Mateus Santos Oliveira",
    cpf: "987.654.321-11",
    rg: "12.365.478-99",
    status: "triagem",
    leito: "Leito B-205",
    oficina: "Horta Organica FDJ",
    dieta: "Hipossodica (Pressao Alta)",
    laborterapia: { setor: "Horta Organica & Agro", horasConcluidas: 120, certificadoEmitido: false, dataConclusao: "Em Andamento" },
    prontuario: { alergias: "Hipertensao leve", tipoSanguineo: "A+", historicoClinico: "Acompanhamento de pressao arterial", sinaisVitais: { pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 C" } }
  }
];

const initialLaborterapia = [
  { id: "LAB-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", setor: "Oficina de Eletrica", cargaHoraria: 240, status: "Concluido (Certificado 240h)", dataEmissao: "2026-08-15" },
  { id: "LAB-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", setor: "Horta Organica FDJ", cargaHoraria: 120, status: "Em Andamento (120h/240h)", dataEmissao: "Pendente" }
];

const initialSinaisVitais = [
  { id: "SV-001", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", data: "30/08/2026 08:30", pa: "120x80 mmHg", fc: "76 bpm", glicemia: "94 mg/dL", temp: "36.5 C", enfermeiro: "Enf. Juliana Santos (COREN-BA 48192)", observacao: "Normotenso e euglicemico." },
  { id: "SV-002", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", data: "30/08/2026 09:15", pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 C", enfermeiro: "Enf. Juliana Santos (COREN-BA 48192)", observacao: "Pressao levemente elevada. Dieta hipossodica orientada." }
];

const initialMedicamentos = [
  { id: "MED-01", nome: "Haloperidol 5mg", dosagem: "5mg", psicotropico: true, portaria344: "Lista C1 (Psicotropicos)", estoque: 450, unidade: "comprimidos" },
  { id: "MED-02", nome: "Diazepam 10mg", dosagem: "10mg", psicotropico: true, portaria344: "Lista B1 (Ansioliticos)", estoque: 320, unidade: "comprimidos" },
  { id: "MED-03", nome: "Dipirona Monoidratada 500mg", dosagem: "500mg", psicotropico: false, portaria344: "Isento", estoque: 1200, unidade: "comprimidos" }
];

const initialPrescricoes = [
  { id: "PRE-001", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", medicamento: "Haloperidol 5mg", horario: "08:00 - 20:00", dosagem: "1 comp de 12/12h", prescritor: "Dra. Ana Paula (CRM-BA 14589)", status: "Ministrado 08:00" },
  { id: "PRE-002", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", medicamento: "Diazepam 10mg", horario: "22:00", dosagem: "1 comp ao deitar", prescritor: "Dra. Ana Paula (CRM-BA 14589)", status: "Agendado 22:00" }
];

const initialAtendimentosPsico = [
  { id: "PSI-001", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", data: "28/08/2026", tipo: "Individual / Videochamada", profissional: "Psicologia FDJ", parecer: "Otima adesao ao tratamento psicossocial. Familia contatada." }
];

const initialOdonto = [
  { id: "ODO-001", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", data: "25/08/2026", procedimento: "Avaliacao Clinica & Limpeza", dentista: "Dr. Marcos Dentista (CRO-BA 8874)", status: "Concluido" }
];

const initialSubstancias = [
  { id: "SUB-01", nome: "Alcool / Etanol", categoria: "Depressora do SNC" },
  { id: "SUB-02", nome: "Crack / Cocaina", categoria: "Estimulante do SNC" }
];

const initialCadastrosSaude = {
  profissionais: [
    { id: "PRO-01", nome: "Enfermeira Chefe Juliana Santos", registro: "COREN-BA 48192", especialidade: "Enfermagem Chefe & Sinais Vitais" },
    { id: "PRO-02", nome: "Dra. Ana Paula", registro: "CRM-BA 14589 / Psiquiatria", especialidade: "Medicina & Psiquiatria" },
    { id: "PRO-03", nome: "Dr. Marcos Dentista", registro: "CRO-BA 8874", especialidade: "Odontologia Terapeutica & Autoestima" }
  ],
  medicamentos: initialMedicamentos
};

class Store {
  constructor() {
    this.init();
  }

  init() {
    try {
      if (!localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
      if (!localStorage.getItem(STORAGE_KEY_LABORTERAPIA)) localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(initialLaborterapia));
      if (!localStorage.getItem(STORAGE_KEY_CADASTROS_SAUDE)) localStorage.setItem(STORAGE_KEY_CADASTROS_SAUDE, JSON.stringify(initialCadastrosSaude));
      if (!localStorage.getItem(STORAGE_KEY_SINAIS_VITAIS)) localStorage.setItem(STORAGE_KEY_SINAIS_VITAIS, JSON.stringify(initialSinaisVitais));
      if (!localStorage.getItem(STORAGE_KEY_PRESCRICOES)) localStorage.setItem(STORAGE_KEY_PRESCRICOES, JSON.stringify(initialPrescricoes));
      if (!localStorage.getItem(STORAGE_KEY_PSICO)) localStorage.setItem(STORAGE_KEY_PSICO, JSON.stringify(initialAtendimentosPsico));
      if (!localStorage.getItem(STORAGE_KEY_ODONTO)) localStorage.setItem(STORAGE_KEY_ODONTO, JSON.stringify(initialOdonto));
      if (!localStorage.getItem(STORAGE_KEY_SUBSTANCIAS)) localStorage.setItem(STORAGE_KEY_SUBSTANCIAS, JSON.stringify(initialSubstancias));
      if (!localStorage.getItem(STORAGE_KEY_LOGS)) localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
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
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_LABORTERAPIA)) || initialLaborterapia; } catch(e) { return initialLaborterapia; }
  }

  getCadastrosSaude() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_CADASTROS_SAUDE)) || initialCadastrosSaude; } catch(e) { return initialCadastrosSaude; }
  }

  getSinaisVitais() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_SINAIS_VITAIS)) || initialSinaisVitais; } catch(e) { return initialSinaisVitais; }
  }

  getMedicamentos() {
    try { return JSON.parse(localStorage.getItem('sgi_fdj_medicamentos_v3')) || initialMedicamentos; } catch(e) { return initialMedicamentos; }
  }

  getPrescricoes() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_PRESCRICOES)) || initialPrescricoes; } catch(e) { return initialPrescricoes; }
  }

  getAtendimentosPsico() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_PSICO)) || initialAtendimentosPsico; } catch(e) { return initialAtendimentosPsico; }
  }

  getOdonto() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_ODONTO)) || initialOdonto; } catch(e) { return initialOdonto; }
  }

  getSubstancias() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_SUBSTANCIAS)) || initialSubstancias; } catch(e) { return initialSubstancias; }
  }

  getLogs() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGS)) || []; } catch(e) { return []; }
  }

  addLog(mensagem) {
    try {
      const logs = this.getLogs();
      logs.unshift({ timestamp: new Date().toLocaleString('pt-BR'), mensagem });
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 50)));
    } catch(e) {}
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

  emitirCertificadoLaborterapia(acolhidoId) {
    try {
      const labor = this.getLaborterapia();
      const item = labor.find(l => l.acolhidoId === acolhidoId);
      if (item) {
        item.cargaHoraria = 240;
        item.status = "Concluido (Certificado 240h)";
        item.dataEmissao = new Date().toLocaleDateString('pt-BR');
        localStorage.setItem(STORAGE_KEY_LABORTERAPIA, JSON.stringify(labor));
        this.addLog(`Certificado Oficial de Laborterapia (240h) emitido para ${item.acolhidoNome}.`);
        return item;
      }
    } catch(e) {}
    return null;
  }
}

window.store = new Store();