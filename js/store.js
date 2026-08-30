/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Macromódulo 1: Gestão dos Acolhidos (Padrão RDC 29 ANVISA & Vercel)
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_LEITOS = 'sgi_fdj_leitos_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Blocos de Alojamento Oficiais
const initialBlocos = [
  { id: "BLOCO-A", nome: "Bloco A — Restauração", capacidade: 25, ocupados: 18, pcd: 5 },
  { id: "BLOCO-B", nome: "Bloco B — Renovação", capacidade: 25, ocupados: 20, pcd: 5 },
  { id: "BLOCO-C", nome: "Bloco C — Esperança", capacidade: 25, ocupados: 15, pcd: 4 },
  { id: "BLOCO-D", nome: "Bloco D — Graça", capacidade: 25, ocupados: 12, pcd: 4 }
];

// Dados Iniciais de Acolhidos (RDC 29 ANVISA)
const initialAcolhidos = [
  {
    id: "FDJ-2026-001",
    nome: "Lucas Silva Santos",
    cpf: "123.456.789-00",
    rg: "14.587.963-00",
    status: "ativo",
    bloco: "Bloco A — Restauração",
    leito: "Leito A-101 (Térreo PCD)",
    oficina: "Oficina de Elétrica",
    origem: "Salvador / BA",
    dataAdmissao: "2026-01-15",
    dieta: "Normal",
    familiarNome: "Maria das Graças Silva (Mãe)",
    familiarTel: "5571988421044",
    checklist: {
      kitHigiene: true,
      enxovalLeito: true,
      vestuarioPadrao: true,
      crachaIdentificacao: true,
      pendenciaDocumental: false
    },
    pti: {
      faseAtual: 3,
      progresso: 75,
      meta1: "Adesão total às atividades do grupo de acolhimento",
      meta2: "Capacitação profissional na Oficina de Elétrica",
      meta3: "Fortalecimento do vínculo familiar e espiritualidade",
      parecerTecnico: "Acolhido apresenta excelente evolução comportamental e participação ativa nas atividades de laborterapia."
    }
  },
  {
    id: "FDJ-2026-002",
    nome: "Mateus Santos Oliveira",
    cpf: "987.654.321-11",
    rg: "12.365.478-99",
    status: "triagem",
    bloco: "Bloco B — Renovação",
    leito: "Leito B-205",
    oficina: "Horta Orgânica FDJ",
    origem: "Feira de Santana / BA",
    dataAdmissao: "2026-08-20",
    dieta: "Hipossódica (Pressão Alta)",
    familiarNome: "Ana Oliveira (Irmã)",
    familiarTel: "5575991234567",
    checklist: {
      kitHigiene: true,
      enxovalLeito: true,
      vestuarioPadrao: false,
      crachaIdentificacao: true,
      pendenciaDocumental: true
    },
    pti: {
      faseAtual: 1,
      progresso: 25,
      meta1: "Adaptação à rotina da triagem e exames médicos iniciais",
      meta2: "Participação nas reuniões de escuta psicossocial",
      meta3: "Organização do alojamento e higiene pessoal",
      parecerTecnico: "Acolhido em fase de adaptação inicial. Apresenta boa receptividade às orientações da equipe de triagem."
    }
  },
  {
    id: "FDJ-2026-003",
    nome: "Roberto Ferreira",
    cpf: "456.789.123-22",
    rg: "09.874.521-33",
    status: "ativo",
    bloco: "Bloco C — Esperança",
    leito: "Leito C-301",
    oficina: "Cozinha Central",
    origem: "Camaçari / BA",
    dataAdmissao: "2025-11-10",
    dieta: "Normal",
    familiarNome: "Carlos Ferreira (Pai)",
    familiarTel: "5571987654321",
    checklist: {
      kitHigiene: true,
      enxovalLeito: true,
      vestuarioPadrao: true,
      crachaIdentificacao: true,
      pendenciaDocumental: false
    },
    pti: {
      faseAtual: 4,
      progresso: 100,
      meta1: "Conclusão das 4 fases do tratamento terapêutico",
      meta2: "Mentoria de padrinhos para reinserção social",
      meta3: "Encaminhamento para vaga de emprego homologada",
      parecerTecnico: "Pronto para a alta terapêutica plena com quitação geral emitida."
    }
  }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) {
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
    }
    if (!localStorage.getItem(STORAGE_KEY_LEITOS)) {
      localStorage.setItem(STORAGE_KEY_LEITOS, JSON.stringify(initialBlocos));
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

  getBlocos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LEITOS)) || initialBlocos;
  }

  addAcolhido(data) {
    const acolhidos = this.getAcolhidos();
    const newAcolhido = {
      id: `FDJ-2026-${String(acolhidos.length + 1).padStart(3, '0')}`,
      dataAdmissao: new Date().toISOString().split('T')[0],
      status: 'triagem',
      checklist: {
        kitHigiene: true,
        enxovalLeito: true,
        vestuarioPadrao: true,
        crachaIdentificacao: true,
        pendenciaDocumental: false,
        ...data.checklist
      },
      pti: {
        faseAtual: 1,
        progresso: 25,
        meta1: "Adaptação inicial RDC 29 e acolhimento",
        meta2: "Integração à laborterapia e convivência",
        meta3: "Desenvolvimento da autonomia e espiritualidade",
        parecerTecnico: "Admissão efetuada pela Direção de Triagem."
      },
      ...data
    };

    acolhidos.unshift(newAcolhido);
    localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));
    this.addLog(`Admissão RDC 29 realizada: ${newAcolhido.nome} (${newAcolhido.id}) no ${newAcolhido.leito}.`);
    return newAcolhido;
  }

  avancarPTI(id, parecerNovo) {
    const acolhidos = this.getAcolhidos();
    const index = acolhidos.findIndex(a => a.id === id);
    if (index !== -1 && acolhidos[index].pti.faseAtual < 4) {
      acolhidos[index].pti.faseAtual += 1;
      acolhidos[index].pti.progresso = acolhidos[index].pti.faseAtual * 25;
      if (parecerNovo) acolhidos[index].pti.parecerTecnico = parecerNovo;
      if (acolhidos[index].pti.faseAtual >= 2) acolhidos[index].status = 'ativo';

      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));
      this.addLog(`PTI de ${acolhidos[index].nome} avançou para a Fase ${acolhidos[index].pti.faseAtual} (RDC 29).`);
      return acolhidos[index];
    }
    return null;
  }

  trocarLeito(id, novoBloco, novoLeito) {
    const acolhidos = this.getAcolhidos();
    const index = acolhidos.findIndex(a => a.id === id);
    if (index !== -1) {
      const leitoAntigo = acolhidos[index].leito;
      acolhidos[index].bloco = novoBloco;
      acolhidos[index].leito = novoLeito;
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));
      this.addLog(`Transferência de Leito realizada para ${acolhidos[index].nome}: De ${leitoAntigo} para ${novoLeito}.`);
      return acolhidos[index];
    }
    return null;
  }

  concluirAlta(id, motivo) {
    const acolhidos = this.getAcolhidos();
    const index = acolhidos.findIndex(a => a.id === id);
    if (index !== -1) {
      acolhidos[index].status = 'alta';
      acolhidos[index].motivoAlta = motivo || "Alta Terapêutica Concluída (RDC 29)";
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(acolhidos));
      this.addLog(`Alta Terapêutica/Quitação concedida a ${acolhidos[index].nome} (${id}). Leito ${acolhidos[index].leito} liberado.`);
      return acolhidos[index];
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
    const totalAtivos = acolhidos.filter(a => a.status === 'ativo').length;
    const totalTriagem = acolhidos.filter(a => a.status === 'triagem').length;
    const totalAltas = acolhidos.filter(a => a.status === 'alta').length;
    const totalPTI34 = acolhidos.filter(a => a.pti && a.pti.faseAtual >= 3).length;

    return {
      totalAtivos,
      totalTriagem,
      totalAltas,
      totalPTI34,
      totalLeitosTotais: 100,
      totalLeitosOcupados: totalAtivos + totalTriagem
    };
  }
}

window.store = new Store();
