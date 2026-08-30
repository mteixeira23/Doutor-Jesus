/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Macromódulo 3: Gestão da Saúde, Enfermagem & Atendimento Psicossocial (Vercel Official)
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_SINAIS_VITAIS = 'sgi_fdj_sinais_vitais_v1';
const STORAGE_KEY_MEDICAMENTOS = 'sgi_fdj_medicamentos_v1';
const STORAGE_KEY_PRESCRICOES = 'sgi_fdj_prescricoes_v1';
const STORAGE_KEY_ATENDIMENTOS_PSICO = 'sgi_fdj_atendimentos_psico_v1';
const STORAGE_KEY_ODONTO = 'sgi_fdj_odonto_v1';
const STORAGE_KEY_SUBSTANCIAS = 'sgi_fdj_substancias_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Dados Iniciais do Catálogo de Medicamentos da Farmácia (Psicotrópicos Portaria 344)
const initialMedicamentos = [
  { id: "MED-01", nome: "Haloperidol 5mg", dosagem: "5mg", psicotropico: true, portaria344: "Lista C1 (Psicotrópicos)", estoque: 450, unidade: "comprimidos" },
  { id: "MED-02", nome: "Diazepam 10mg", dosagem: "10mg", psicotropico: true, portaria344: "Lista B1 (Ansiolíticos)", estoque: 320, unidade: "comprimidos" },
  { id: "MED-03", nome: "Fluoxetina 20mg", dosagem: "20mg", psicotropico: true, portaria344: "Lista C1 (Antidepressivos)", estoque: 500, unidade: "comprimidos" },
  { id: "MED-04", nome: "Dipirona Sódica 500mg", dosagem: "500mg", psicotropico: false, portaria344: "Isento", estoque: 1200, unidade: "comprimidos" },
  { id: "MED-05", nome: "Complexo B Concentrado", dosagem: "Drágea", psicotropico: false, portaria344: "Isento", estoque: 800, unidade: "drágeas" }
];

// Dados Iniciais de Sinais Vitais & Enfermaria Central (Galpão E)
const initialSinaisVitais = [
  { id: "SV-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", data: new Date().toLocaleDateString('pt-BR'), pa: "120x80 mmHg", fc: "76 bpm", glicemia: "94 mg/dL", temp: "36.5 °C", enfermeiro: "Enfermeira Chefe Juliana Santos (COREN-BA 48192)", observacao: "Sinais vitais estáveis. Dieta sem lactose." },
  { id: "SV-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", data: new Date().toLocaleDateString('pt-BR'), pa: "140x90 mmHg", fc: "82 bpm", glicemia: "110 mg/dL", temp: "36.8 °C", enfermeiro: "Enfermeira Chefe Juliana Santos (COREN-BA 48192)", observacao: "Pressão arterial levemente alterada. Acompanhar dieta hipossódica." }
];

// Dados Iniciais de Prescrições & Aprazamento
const initialPrescricoes = [
  { id: "PRE-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", medicamento: "Fluoxetina 20mg", horario: "08:00h", dosagem: "1 comprimido", prescritor: "Dra. Ana Paula (Medicina / Psiquiatria)", status: "Ministrado" },
  { id: "PRE-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", medicamento: "Haloperidol 5mg", horario: "20:00h", dosagem: "1 comprimido", prescritor: "Dra. Ana Paula (Medicina / Psiquiatria)", status: "Pendente (Aprazado)" }
];

// Dados Iniciais de Atendimentos Psicossociais & Vídeo-chamadas
const initialAtendimentosPsico = [
  { id: "PSI-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", tipo: "Vídeo-chamada com Psicologia", profissional: "Psicologia Clínica FDJ (CRP-BA)", data: new Date().toLocaleDateString('pt-BR'), parecer: "Mãe residente no interior participou de videochamada de apoio familiar. Excelente evolução psicossocial." },
  { id: "PSI-02", acolhidoId: "FDJ-2026-002", acolhidoNome: "Mateus Santos Oliveira", tipo: "Atendimento Individual Psicologia", profissional: "Serviço Social & Psicologia FDJ", data: new Date().toLocaleDateString('pt-BR'), parecer: "Escuta terapêutica de acolhimento inicial efetuada. Boa adesão às regras do tratamento." }
];

// Dados Iniciais de Atendimentos Odontológicos (Autoestima)
const initialOdonto = [
  { id: "ODO-01", acolhidoId: "FDJ-2026-001", acolhidoNome: "Lucas Silva Santos", procedimento: "Avaliação Odontológica de Admissão & Restauração", data: new Date().toLocaleDateString('pt-BR'), dentista: "Dr. Marcos Dentista FDJ", status: "Concluído" }
];

// Catálogo de Substâncias Psicoativas
const initialSubstancias = [
  { id: "SUB-01", nome: "Álcool", categoria: "Depressor do SNC" },
  { id: "SUB-02", nome: "Crack / Cocaína", categoria: "Estimulante do Central" },
  { id: "SUB-03", nome: "Cannabis Sativa", categoria: "Perturbador do SNC" },
  { id: "SUB-04", nome: "Múltiplas Substâncias (Poliusuário)", categoria: "Misto" }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_MEDICAMENTOS)) {
      localStorage.setItem(STORAGE_KEY_MEDICAMENTOS, JSON.stringify(initialMedicamentos));
    }
    if (!localStorage.getItem(STORAGE_KEY_SINAIS_VITAIS)) {
      localStorage.setItem(STORAGE_KEY_SINAIS_VITAIS, JSON.stringify(initialSinaisVitais));
    }
    if (!localStorage.getItem(STORAGE_KEY_PRESCRICOES)) {
      localStorage.setItem(STORAGE_KEY_PRESCRICOES, JSON.stringify(initialPrescricoes));
    }
    if (!localStorage.getItem(STORAGE_KEY_ATENDIMENTOS_PSICO)) {
      localStorage.setItem(STORAGE_KEY_ATENDIMENTOS_PSICO, JSON.stringify(initialAtendimentosPsico));
    }
    if (!localStorage.getItem(STORAGE_KEY_ODONTO)) {
      localStorage.setItem(STORAGE_KEY_ODONTO, JSON.stringify(initialOdonto));
    }
    if (!localStorage.getItem(STORAGE_KEY_SUBSTANCIAS)) {
      localStorage.setItem(STORAGE_KEY_SUBSTANCIAS, JSON.stringify(initialSubstancias));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  getMedicamentos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_MEDICAMENTOS)) || [];
  }

  getSinaisVitais() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SINAIS_VITAIS)) || [];
  }

  getPrescricoes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_PRESCRICOES)) || [];
  }

  getAtendimentosPsico() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ATENDIMENTOS_PSICO)) || [];
  }

  getOdonto() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ODONTO)) || [];
  }

  getSubstancias() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_SUBSTANCIAS)) || [];
  }

  registrarSinaisVitais(data) {
    const sv = this.getSinaisVitais();
    const newSV = {
      id: `SV-${String(sv.length + 1).padStart(2, '0')}`,
      data: new Date().toLocaleDateString('pt-BR'),
      enfermeiro: "Enfermeira Chefe Juliana Santos (COREN-BA 48192)",
      ...data
    };
    sv.unshift(newSV);
    localStorage.setItem(STORAGE_KEY_SINAIS_VITAIS, JSON.stringify(sv));
    this.addLog(`Sinais Vitais registrados na Enfermaria (Galpão E) para ${newSV.acolhidoNome}: PA ${newSV.pa}, Glicemia ${newSV.glicemia}.`);
    return newSV;
  }

  novaPrescricao(data) {
    const pres = this.getPrescricoes();
    const newPres = {
      id: `PRE-${String(pres.length + 1).padStart(2, '0')}`,
      status: "Pendente (Aprazado)",
      prescritor: "Dra. Ana Paula (Medicina / Psiquiatria)",
      ...data
    };
    pres.unshift(newPres);
    localStorage.setItem(STORAGE_KEY_PRESCRICOES, JSON.stringify(pres));
    this.addLog(`Prescrição médica/aprazamento cadastrado para ${newPres.acolhidoNome}: ${newPres.medicamento} (${newPres.horario}).`);
    return newPres;
  }

  registrarAtendimentoPsico(data) {
    const psico = this.getAtendimentosPsico();
    const newPsico = {
      id: `PSI-${String(psico.length + 1).padStart(2, '0')}`,
      data: new Date().toLocaleDateString('pt-BR'),
      profissional: "Psicologia Clínica & Serviço Social FDJ",
      ...data
    };
    psico.unshift(newPsico);
    localStorage.setItem(STORAGE_KEY_ATENDIMENTOS_PSICO, JSON.stringify(psico));
    this.addLog(`Atendimento Psicossocial registrado para ${newPsico.acolhidoNome} (${newPsico.tipo}).`);
    return newPsico;
  }

  agendarOdonto(data) {
    const odo = this.getOdonto();
    const newOdo = {
      id: `ODO-${String(odo.length + 1).padStart(2, '0')}`,
      data: new Date().toLocaleDateString('pt-BR'),
      dentista: "Gabinete Odontológico FDJ",
      status: "Agendado",
      ...data
    };
    odo.unshift(newOdo);
    localStorage.setItem(STORAGE_KEY_ODONTO, JSON.stringify(odo));
    this.addLog(`Agendamento Odontológico realizado para ${newOdo.acolhidoNome}: ${newOdo.procedimento}.`);
    return newOdo;
  }

  getAcolhidos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) || [];
  }

  getAcolhidoById(id) {
    return this.getAcolhidos().find(a => a.id === id);
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
    const sv = this.getSinaisVitais();
    const pres = this.getPrescricoes();
    const psico = this.getAtendimentosPsico();

    return {
      totalAtivos: acolhidos.filter(a => a.status === 'ativo').length,
      totalTriagem: acolhidos.filter(a => a.status === 'triagem').length,
      totalSinaisVitais: sv.length,
      totalPrescricoes: pres.length,
      totalAtendimentosPsico: psico.length,
      totalRefeicoes: 1240
    };
  }
}

window.store = new Store();
