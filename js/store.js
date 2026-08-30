/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Macromódulo 2: Almoxarifado RMI, Despensa 4.000 ref/dia, Frota SUS & Cadastros MROSC
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_ALMOXARIFADO = 'sgi_fdj_almoxarifado_v1';
const STORAGE_KEY_RMI = 'sgi_fdj_rmi_v1';
const STORAGE_KEY_DESPENSA = 'sgi_fdj_despensa_v1';
const STORAGE_KEY_FROTA = 'sgi_fdj_frota_v1';
const STORAGE_KEY_CADASTROS_ADM = 'sgi_fdj_cadastros_adm_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Initial Almoxarifado Central Data (Módulo 5)
const initialAlmoxarifado = [
  { id: "ALM-01", nfe: "RMI-2026-093", item: "Farinha de Trigo Especial (Saco 50kg)", quantidade: 120, unidade: "kg", estoqueMinimo: 30, endereco: "Almoxarifado Galpão B (Padaria)", fornecedor: "Moinho Dias Branco MROSC", valorTotal: "R$ 540,00" },
  { id: "ALM-02", nfe: "RMI-2026-089", item: "Feijão Carioca Tipo 1 (Saco 40kg)", quantidade: 80, unidade: "kg", estoqueMinimo: 25, endereco: "Almoxarifado Galpão A (Alimentos)", fornecedor: "Cerealista Bahia MROSC", valorTotal: "R$ 576,00" },
  { id: "ALM-03", nfe: "RMI-2026-045", item: "Gás de Cozinha Industrial GLP 45kg", quantidade: 15, unidade: "botijões", estoqueMinimo: 5, endereco: "Depósito Externo GLP", fornecedor: "Ultragaz MROSC", valorTotal: "R$ 6.300,00" },
  { id: "ALM-04", nfe: "RMI-2026-012", item: "Kits de Admissão de Novos Acolhidos", quantidade: 150, unidade: "kits", estoqueMinimo: 40, endereco: "Almoxarifado Central (Triagem)", fornecedor: "Confecções FDJ MROSC", valorTotal: "R$ 4.500,00" }
];

// Initial RMI Transfer List (Almoxarifado -> Despensa)
const initialRMI = [
  { id: "RMI-093", item: "Farinha de Trigo Especial", quantidade: 53, unidade: "kg", origem: "Almoxarifado Galpão B (Padaria)", destino: "Despensa & Padaria FDJ", valor: "R$ 238,50", status: "Em Trânsito (RMI Despensa)" },
  { id: "RMI-089", item: "Feijão Carioca Tipo 1", quantidade: 40, unidade: "kg", origem: "Almoxarifado Galpão A (Alimentos)", destino: "Despensa Cozinha Central", valor: "R$ 288,00", status: "Concluído (Integrado)" }
];

// Initial Despensa & Nutrição Data (Módulo 6 - 4.000 ref/dia)
const initialDespensa = [
  { id: "DES-01", item: "Arroz Tipo 1 Beneficiado", quantidade: 450, unidade: "kg", estoqueMinimo: 100, validade: "2026-12-10", rmiOrigem: "RMI-085", lote: "LOT-8874" },
  { id: "DES-02", item: "Feijão Carioca Tipo 1", quantidade: 280, unidade: "kg", estoqueMinimo: 80, validade: "2026-09-15", rmiOrigem: "RMI-089", lote: "LOT-9921" },
  { id: "DES-03", item: "Mandioca / Aipim Orgânico", quantidade: 210, unidade: "kg", estoqueMinimo: 50, validade: "Fresca", rmiOrigem: "HORTA-004", lote: "Produção Própria Horta FDJ" },
  { id: "DES-04", item: "Óleo de Soja (Caixas 24u)", quantidade: 35, unidade: "caixas", estoqueMinimo: 10, validade: "2027-02-28", rmiOrigem: "RMI-074", lote: "LOT-1102" }
];

// Initial Frota & Transporte SUS Data (Módulo 7)
const initialFrota = [
  { id: "VEI-01", modelo: "Van Mercedes Sprinter (16 Lugares)", placa: "OUV-4589", tipo: "Transporte SUS / Acolhidos", motorista: "Carlos Eduardo Santos", status: "Em Viagem", destino: "Salvador / Hosp. Geral do Estado", acolhidosCount: 8, os: "OS-2026-04" },
  { id: "VEI-02", modelo: "Ônibus Agrale (44 Lugares)", placa: "PKJ-8821", tipo: "Transporte Coletivo / Eventos", motorista: "Joaquim Souza", status: "Disponível", destino: "Base Fundação Doutor Jesus", acolhidosCount: 0, os: "Nenhuma" },
  { id: "VEI-03", modelo: "Ambulância Renault Master UTI", placa: "QWE-1234", tipo: "Emergência Médica 24h", motorista: "Marcos Santana", status: "Prontidão", destino: "Posto de Saúde FDJ", acolhidosCount: 0, os: "Nenhuma" },
  { id: "VEI-04", modelo: "Caminhão Baú Hyundai HR", placa: "RTY-5678", tipo: "Carga / Despensa & Donativos MROSC", motorista: "Irmão Roberto Silva", status: "Disponível", destino: "Base Fundação", acolhidosCount: 0, os: "Nenhuma" }
];

// Initial Cadastros Administrativos (2.1 a 2.5)
const initialCadastrosAdm = {
  fornecedores: [
    { id: "FOR-01", razaoSocial: "Moinho Dias Branco SA", cnpj: "04.587.963/0001-88", homologado: true, rubrica: "2.2.01 Alimentação & Cozinha" },
    { id: "FOR-02", razaoSocial: "Cerealista Bahia Distribuidora", cnpj: "12.365.478/0001-99", homologado: true, rubrica: "2.2.01 Alimentação & Cozinha" }
  ],
  enderecamento: [
    "Almoxarifado Galpão A (Alimentos)",
    "Almoxarifado Galpão B (Padaria)",
    "Almoxarifado Central (Triagem)",
    "Depósito Externo GLP"
  ],
  setoresDestino: [
    "Cozinha Central - Preparo de Refeições (4.000/dia)",
    "Enfermaria & Posto de Saúde FDJ",
    "Padaria FDJ",
    "Horta & Produção Agrícola Orgânica"
  ],
  responsaveis: [
    { nome: "Chef de Cozinha Industrial - Irmão Roberto Silva", setor: "Cozinha Central" },
    { nome: "Coordenador de Almoxarifado - Carlos Eduardo Santos", setor: "Almoxarifado Central" },
    { nome: "Coordenador de Logística & Frota - Marcos Santana", setor: "Frota & Transportes" },
    { nome: "Coordenador de Despensa - Irmão Valdeci", setor: "Despensa & Nutrição" }
  ]
};

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_ALMOXARIFADO)) {
      localStorage.setItem(STORAGE_KEY_ALMOXARIFADO, JSON.stringify(initialAlmoxarifado));
    }
    if (!localStorage.getItem(STORAGE_KEY_RMI)) {
      localStorage.setItem(STORAGE_KEY_RMI, JSON.stringify(initialRMI));
    }
    if (!localStorage.getItem(STORAGE_KEY_DESPENSA)) {
      localStorage.setItem(STORAGE_KEY_DESPENSA, JSON.stringify(initialDespensa));
    }
    if (!localStorage.getItem(STORAGE_KEY_FROTA)) {
      localStorage.setItem(STORAGE_KEY_FROTA, JSON.stringify(initialFrota));
    }
    if (!localStorage.getItem(STORAGE_KEY_CADASTROS_ADM)) {
      localStorage.setItem(STORAGE_KEY_CADASTROS_ADM, JSON.stringify(initialCadastrosAdm));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  // ALMOXARIFADO & RMI (MÓDULO 5)
  getAlmoxarifado() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ALMOXARIFADO)) || [];
  }

  getRMI() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_RMI)) || [];
  }

  emitirRMI(itemAlmoxarifadoId, quantidade, destino) {
    const almoxarifado = this.getAlmoxarifado();
    const item = almoxarifado.find(a => a.id === itemAlmoxarifadoId);
    if (item && item.quantidade >= quantidade) {
      item.quantidade -= quantidade;
      localStorage.setItem(STORAGE_KEY_ALMOXARIFADO, JSON.stringify(almoxarifado));

      const rmis = this.getRMI();
      const newRMI = {
        id: `RMI-${String(rmis.length + 94).padStart(3, '0')}`,
        item: item.item,
        quantidade: Number(quantidade),
        unidade: item.unidade,
        origem: item.endereco,
        destino: destino || "Despensa Cozinha Central",
        valor: item.valorTotal,
        status: "Em Trânsito (RMI Despensa)"
      };
      rmis.unshift(newRMI);
      localStorage.setItem(STORAGE_KEY_RMI, JSON.stringify(rmis));
      this.addLog(`RMI #${newRMI.id} emitida! Transferência de ${quantidade} ${item.unidade} de ${item.item} para a Despensa.`);
      return newRMI;
    }
    return null;
  }

  // DESPENSA & REFEIÇÕES 4.000/DIA (MÓDULO 6)
  getDespensa() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_DESPENSA)) || [];
  }

  aceitarRMIDespensa(rmiId) {
    const rmis = this.getRMI();
    const rmi = rmis.find(r => r.id === rmiId);
    if (rmi) {
      rmi.status = "Concluído (Integrado)";
      localStorage.setItem(STORAGE_KEY_RMI, JSON.stringify(rmis));

      const despensa = this.getDespensa();
      const index = despensa.findIndex(d => d.item === rmi.item);
      if (index !== -1) {
        despensa[index].quantidade += rmi.quantidade;
      } else {
        despensa.unshift({
          id: `DES-${String(despensa.length + 1).padStart(2, '0')}`,
          item: rmi.item,
          quantidade: rmi.quantidade,
          unidade: rmi.unidade,
          estoqueMinimo: 20,
          validade: "2026-12-31",
          rmiOrigem: rmi.id,
          lote: "LOT-RMI-OK"
        });
      }
      localStorage.setItem(STORAGE_KEY_DESPENSA, JSON.stringify(despensa));
      this.addLog(`RMI #${rmi.id} integrada com sucesso na Despensa! Saldo atualizado.`);
      return rmi;
    }
    return null;
  }

  darBaixaCozinha(despensaId, quantidadeGramasPessoa = 350) {
    const despensa = this.getDespensa();
    const item = despensa.find(d => d.id === despensaId);
    if (item && item.quantidade > 0) {
      const baixaKg = Math.min(item.quantidade, 40);
      item.quantidade -= baixaKg;
      localStorage.setItem(STORAGE_KEY_DESPENSA, JSON.stringify(despensa));
      this.addLog(`Baixa para Cozinha Central: ${baixaKg} ${item.unidade} de ${item.item} entregues para o preparo das 4.000 refeições diárias.`);
      return item;
    }
    return null;
  }

  // FROTA & TRANSPORTE SUS (MÓDULO 7)
  getFrota() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_FROTA)) || [];
  }

  lancarViagemFrota(veiculoId, destino, motorista, acolhidosNomes) {
    const frota = this.getFrota();
    const v = frota.find(f => f.id === veiculoId);
    if (v) {
      v.status = "Em Viagem";
      v.destino = destino;
      if (motorista) v.motorista = motorista;
      if (acolhidosNomes) v.acolhidosCount = acolhidosNomes.split(',').length;
      localStorage.setItem(STORAGE_KEY_FROTA, JSON.stringify(frota));
      this.addLog(`Transporte SUS/Frota iniciado: ${v.modelo} (${v.placa}) em viagem para ${destino}.`);
      return v;
    }
    return null;
  }

  retornoFrota(veiculoId) {
    const frota = this.getFrota();
    const v = frota.find(f => f.id === veiculoId);
    if (v) {
      v.status = "Disponível";
      v.destino = "Base Fundação Doutor Jesus";
      v.acolhidosCount = 0;
      localStorage.setItem(STORAGE_KEY_FROTA, JSON.stringify(frota));
      this.addLog(`Retorno à base registrado para o veículo ${v.modelo} (${v.placa}).`);
      return v;
    }
    return null;
  }

  getCadastrosAdm() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_CADASTROS_ADM)) || initialCadastrosAdm;
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
}

window.store = new Store();
