/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Macromódulo 2: Almoxarifado, Despensa & Frota
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_ALMOXARIFADO = 'sgi_fdj_almoxarifado_v1';
const STORAGE_KEY_DESPENSA = 'sgi_fdj_despensa_v1';
const STORAGE_KEY_FROTA = 'sgi_fdj_frota_v1';
const STORAGE_KEY_USUARIOS = 'sgi_fdj_usuarios_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Dados Iniciais de Almoxarifado (Materiais de Limpeza, Ferramentas, Vestuário, Kits)
const initialAlmoxarifado = [
  { id: "ALM-01", item: "Kit de Admissão de Acolhido (Enxoval)", quantidade: 120, estoqueMinimo: 30, categoria: "Vestuário / Recepção", local: "Prateleira A1" },
  { id: "ALM-02", item: "Detergente Multiuso 5L", quantidade: 18, estoqueMinimo: 10, categoria: "Material de Limpeza", local: "Depósito Central" },
  { id: "ALM-03", item: "Sabão em Pó (Caixa 10kg)", quantidade: 25, estoqueMinimo: 15, categoria: "Material de Limpeza", local: "Depósito Central" },
  { id: "ALM-04", item: "Lâmpadas LED 15W", quantidade: 45, estoqueMinimo: 20, categoria: "Manutenção Elétrica", local: "Oficina Elétrica" }
];

// Dados Iniciais da Despensa (Alimentos & Insumos das Refeições)
const initialDespensa = [
  { id: "DES-01", item: "Arroz Tipo 1 (Saco 50kg)", quantidade: 85, estoqueMinimo: 20, validade: "2026-12-10", categoria: "Grãos & Cereais" },
  { id: "DES-02", item: "Feijão Carioca (Saco 30kg)", quantidade: 14, estoqueMinimo: 25, validade: "2026-09-15", categoria: "Grãos & Cereais" },
  { id: "DES-03", item: "Óleo de Soja (Caixa 24u)", quantidade: 40, estoqueMinimo: 10, validade: "2027-02-28", categoria: "Óleos & Condimentos" },
  { id: "DES-04", item: "Açúcar Refinado (Saco 50kg)", quantidade: 18, estoqueMinimo: 15, validade: "2026-10-30", categoria: "Açúcar & Matinais" }
];

// Dados Iniciais da Frota de Veículos
const initialFrota = [
  { id: "VEI-01", modelo: "Van Mercedes Sprinter (16 Lugares)", placa: "OUV-4589", tipo: "Transporte de Acolhidos", motorista: "Carlos Alberto", status: "Em Viagem", destino: "Salvador / Hosp. Geral", quilometragem: "145.800 km" },
  { id: "VEI-02", modelo: "Ônibus Agrale (44 Lugares)", placa: "PKJ-8821", tipo: "Transporte Coletivo / Eventos", motorista: "Joaquim Souza", status: "Disponível", destino: "Base Fundação", quilometragem: "210.450 km" },
  { id: "VEI-03", modelo: "Ambulância Renault Master UTI", placa: "QWE-1234", tipo: "Emergência Médica", motorista: "Marcos Enfermeiro", status: "Prontidão", destino: "Posto de Saúde FDJ", quilometragem: "85.200 km" },
  { id: "VEI-04", modelo: "Caminhão Baú Hyundai HR", placa: "RTY-5678", tipo: "Carga / Despensa & Donativos", motorista: "Roberto Silva", status: "Disponível", destino: "Base Fundação", quilometragem: "112.000 km" }
];

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
  }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_ALMOXARIFADO)) {
      localStorage.setItem(STORAGE_KEY_ALMOXARIFADO, JSON.stringify(initialAlmoxarifado));
    }
    if (!localStorage.getItem(STORAGE_KEY_DESPENSA)) {
      localStorage.setItem(STORAGE_KEY_DESPENSA, JSON.stringify(initialDespensa));
    }
    if (!localStorage.getItem(STORAGE_KEY_FROTA)) {
      localStorage.setItem(STORAGE_KEY_FROTA, JSON.stringify(initialFrota));
    }
    if (!localStorage.getItem(STORAGE_KEY_ACOLHIDOS)) {
      localStorage.setItem(STORAGE_KEY_ACOLHIDOS, JSON.stringify(initialAcolhidos));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  // --- ALMOXARIFADO ---
  getAlmoxarifado() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ALMOXARIFADO)) || [];
  }

  addAlmoxarifadoItem(item) {
    const almoxarifado = this.getAlmoxarifado();
    const newItem = {
      id: `ALM-${String(almoxarifado.length + 1).padStart(2, '0')}`,
      ...item
    };
    almoxarifado.unshift(newItem);
    localStorage.setItem(STORAGE_KEY_ALMOXARIFADO, JSON.stringify(almoxarifado));
    this.addLog(`Novo item cadastrado no Almoxarifado: ${newItem.item}.`);
    return newItem;
  }

  alterarQtdAlmoxarifado(id, delta) {
    const almoxarifado = this.getAlmoxarifado();
    const index = almoxarifado.findIndex(a => a.id === id);
    if (index !== -1) {
      almoxarifado[index].quantidade = Math.max(0, almoxarifado[index].quantidade + delta);
      localStorage.setItem(STORAGE_KEY_ALMOXARIFADO, JSON.stringify(almoxarifado));
      this.addLog(`Almoxarifado (${delta > 0 ? '+' : ''}${delta}): ${almoxarifado[index].item}. Novo saldo: ${almoxarifado[index].quantidade} u.`);
      return almoxarifado[index];
    }
    return null;
  }

  // --- DESPENSA ---
  getDespensa() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_DESPENSA)) || [];
  }

  addDespensaItem(item) {
    const despensa = this.getDespensa();
    const newItem = {
      id: `DES-${String(despensa.length + 1).padStart(2, '0')}`,
      ...item
    };
    despensa.unshift(newItem);
    localStorage.setItem(STORAGE_KEY_DESPENSA, JSON.stringify(despensa));
    this.addLog(`Novo alimento adicionado à Despensa: ${newItem.item}.`);
    return newItem;
  }

  alterarQtdDespensa(id, delta) {
    const despensa = this.getDespensa();
    const index = despensa.findIndex(d => d.id === id);
    if (index !== -1) {
      despensa[index].quantidade = Math.max(0, despensa[index].quantidade + delta);
      localStorage.setItem(STORAGE_KEY_DESPENSA, JSON.stringify(despensa));
      this.addLog(`Despensa (${delta > 0 ? '+' : ''}${delta}): ${despensa[index].item}. Saldo restante: ${despensa[index].quantidade} u.`);
      return despensa[index];
    }
    return null;
  }

  // --- FROTA ---
  getFrota() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_FROTA)) || [];
  }

  addVeiculo(veiculo) {
    const frota = this.getFrota();
    const newVeiculo = {
      id: `VEI-${String(frota.length + 1).padStart(2, '0')}`,
      status: "Disponível",
      ...veiculo
    };
    frota.unshift(newVeiculo);
    localStorage.setItem(STORAGE_KEY_FROTA, JSON.stringify(frota));
    this.addLog(`Novo veículo cadastrado na Frota: ${newVeiculo.modelo} (${newVeiculo.placa}).`);
    return newVeiculo;
  }

  alterarStatusVeiculo(id, novoStatus, destino) {
    const frota = this.getFrota();
    const index = frota.findIndex(f => f.id === id);
    if (index !== -1) {
      frota[index].status = novoStatus;
      if (destino) frota[index].destino = destino;
      localStorage.setItem(STORAGE_KEY_FROTA, JSON.stringify(frota));
      this.addLog(`Status da Frota atualizado: ${frota[index].modelo} agora está '${novoStatus}'.`);
      return frota[index];
    }
    return null;
  }

  // --- ACOLHIDOS ---
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

    // Deduzir Kit de Admissão no Almoxarifado
    this.alterarQtdAlmoxarifado("ALM-01", -1);
    this.addLog(`Novo Acolhido cadastrado na Triagem: ${newAcolhido.nome} (${newAcolhido.id}). Kit de Admissão deduzido do Almoxarifado.`);

    return newAcolhido;
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
    const almoxarifado = this.getAlmoxarifado();
    const despensa = this.getDespensa();
    const frota = this.getFrota();

    const totalAtivos = acolhidos.filter(a => a.status === 'ativo').length;
    const totalTriagem = acolhidos.filter(a => a.status === 'triagem').length;
    const almoxCritico = almoxarifado.filter(a => a.quantidade <= a.estoqueMinimo).length;
    const despensaCritica = despensa.filter(d => d.quantidade <= d.estoqueMinimo).length;
    const veiculosEmViagem = frota.filter(f => f.status === 'Em Viagem').length;

    return {
      totalAtivos,
      totalTriagem,
      almoxCritico,
      despensaCritica,
      veiculosEmViagem,
      totalVeiculos: frota.length,
      totalRefeicoes: 1240
    };
  }
}

window.store = new Store();
