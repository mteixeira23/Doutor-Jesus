/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Store Manager - Gerenciamento de Estado Reativo para Macromódulos 1 & 2
 */

const STORAGE_KEY_ACOLHIDOS = 'sgi_fdj_acolhidos_v1';
const STORAGE_KEY_ESTOQUE = 'sgi_fdj_estoque_v1';
const STORAGE_KEY_REFEICOES = 'sgi_fdj_refeicoes_v1';
const STORAGE_KEY_OFICINAS = 'sgi_fdj_oficinas_v1';
const STORAGE_KEY_USUARIOS = 'sgi_fdj_usuarios_v1';
const STORAGE_KEY_LOGS = 'sgi_fdj_logs_v1';

// Dados Iniciais do Estoque FEFO (Almoxarifado & Despensa)
const initialEstoque = [
  { id: "EST-01", item: "Arroz Tipo 1 (Saco 50kg)", quantidade: 85, estoqueMinimo: 20, validade: "2026-12-10", setor: "Despensa Geral", unidade: "sacos" },
  { id: "EST-02", item: "Feijão Carioca (Saco 30kg)", quantidade: 14, estoqueMinimo: 25, validade: "2026-09-15", setor: "Despensa Geral", unidade: "sacos" },
  { id: "EST-03", item: "Óleo de Soja (Caixa 24u)", quantidade: 40, estoqueMinimo: 10, validade: "2027-02-28", setor: "Cozinha Industrial", unidade: "caixas" },
  { id: "EST-04", item: "Kits de Admissão de Acolhidos", quantidade: 120, estoqueMinimo: 30, validade: "Indefinida", setor: "Triagem / Recepção", unidade: "kits" },
  { id: "EST-05", item: "Açúcar Refinado (Saco 50kg)", quantidade: 18, estoqueMinimo: 15, validade: "2026-10-30", setor: "Despensa Geral", unidade: "sacos" },
  { id: "EST-06", item: "Café Torrado e Moído (Pacote 500g)", quantidade: 60, estoqueMinimo: 20, validade: "2026-11-20", setor: "Cozinha Industrial", unidade: "pacotes" }
];

const initialOficinas = [
  { id: "OFI-01", nome: "Cozinha Industrial", responsavel: "Nutricionista Rita / Chefe João", vagas: 25, ocupadas: 18, atividade: "Preparo do Café e Almoço dos 1.240 Acolhidos" },
  { id: "OFI-02", nome: "Horta Orgânica / Agro", responsavel: "Técnico Agrícola Marcos", vagas: 30, ocupadas: 22, atividade: "Cultivo de hortaliças, adubação e irrigação" },
  { id: "OFI-03", nome: "Oficina de Elétrica", responsavel: "Eng. Roberto Carlos", vagas: 15, ocupadas: 12, atividade: "Manutenção da rede elétrica dos alojamentos" },
  { id: "OFI-04", nome: "Manutenção Geral & Pintura", responsavel: "Mestre de Obras Pedro", vagas: 20, ocupadas: 14, atividade: "Reparos estruturais, pintura e serralheria" }
];

const initialRefeicoes = [
  { id: 1, data: new Date().toISOString().split('T')[0], refeicao: "Café da Manhã", quantidade: 1240, status: "Servido", cardapio: "Café com leite, pão com manteiga e cuscuz" },
  { id: 2, data: new Date().toISOString().split('T')[0], refeicao: "Almoço Comunitário", quantidade: 1240, status: "Em Preparo", cardapio: "Arroz, feijão carioca, frango ensopado e salada orgânica" }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEY_ESTOQUE)) {
      localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(initialEstoque));
    }
    if (!localStorage.getItem(STORAGE_KEY_OFICINAS)) {
      localStorage.setItem(STORAGE_KEY_OFICINAS, JSON.stringify(initialOficinas));
    }
    if (!localStorage.getItem(STORAGE_KEY_REFEICOES)) {
      localStorage.setItem(STORAGE_KEY_REFEICOES, JSON.stringify(initialRefeicoes));
    }
    if (!localStorage.getItem(STORAGE_KEY_LOGS)) {
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([]));
    }
  }

  getEstoque() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_ESTOQUE)) || [];
  }

  getEstoqueById(id) {
    return this.getEstoque().find(e => e.id === id);
  }

  addEstoqueItem(item) {
    const estoque = this.getEstoque();
    const newItem = {
      id: `EST-${String(estoque.length + 1).padStart(2, '0')}`,
      ...item
    };
    estoque.unshift(newItem);
    localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(estoque));
    this.addLog(`Novo item adicionado ao Almoxarifado: ${newItem.item} (${newItem.quantidade} ${newItem.unidade}).`);
    return newItem;
  }

  adicionarQuantidadeEstoque(id, quantidade) {
    const estoque = this.getEstoque();
    const index = estoque.findIndex(e => e.id === id);
    if (index !== -1) {
      estoque[index].quantidade += Number(quantidade);
      localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(estoque));
      this.addLog(`Entrada de Estoque (+${quantidade}): ${estoque[index].item}. Novo saldo: ${estoque[index].quantidade} u.`);
      return estoque[index];
    }
    return null;
  }

  deduzirItemEstoque(itemId, quantidade = 1) {
    const estoque = this.getEstoque();
    const index = estoque.findIndex(e => e.id === itemId);
    if (index !== -1 && estoque[index].quantidade >= quantidade) {
      estoque[index].quantidade -= Number(quantidade);
      localStorage.setItem(STORAGE_KEY_ESTOQUE, JSON.stringify(estoque));
      this.addLog(`Saída de Estoque (-${quantidade}): ${estoque[index].item}. Saldo restante: ${estoque[index].quantidade} u.`);
      return estoque[index];
    }
    return null;
  }

  getOficinas() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_OFICINAS)) || [];
  }

  getRefeicoes() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_REFEICOES)) || [];
  }

  registrarRefeicaoServida(refeicaoId) {
    const refeicoes = this.getRefeicoes();
    const index = refeicoes.findIndex(r => r.id === Number(refeicaoId));
    if (index !== -1) {
      refeicoes[index].status = "Servido";
      localStorage.setItem(STORAGE_KEY_REFEICOES, JSON.stringify(refeicoes));
      this.addLog(`Refeição ${refeicoes[index].refeicao} registrada como SERVIDA para os 1.240 acolhidos.`);
      
      // Reação no Estoque: Deduzir sacos de arroz e feijão do almoço
      this.deduzirItemEstoque("EST-01", 2); // -2 sacos arroz
      this.deduzirItemEstoque("EST-02", 1); // -1 saco feijão
      return refeicoes[index];
    }
    return null;
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

    // Deduzir Kit de Admissão
    this.deduzirItemEstoque("EST-04", 1);
    this.addLog(`Novo Acolhido cadastrado na Triagem: ${newAcolhido.nome} (${newAcolhido.id}). Kit de Admissão deduzido do estoque.`);

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

  getUsuarios() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USUARIOS)) || [];
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
    const estoque = this.getEstoque();

    const totalAtivos = acolhidos.filter(a => a.status === 'ativo').length;
    const totalTriagem = acolhidos.filter(a => a.status === 'triagem').length;
    const totalPTI34 = acolhidos.filter(a => a.fasePTI >= 3).length;
    const estoqueCritico = estoque.filter(e => e.quantidade <= e.estoqueMinimo).length;
    const totalDietasEspeciais = acolhidos.filter(a => a.dieta && a.dieta !== 'Normal').length;
    const kitsAdmissaoDisponiveis = (estoque.find(e => e.id === 'EST-04') || {}).quantidade || 0;

    return {
      totalAtivos,
      totalTriagem,
      totalPTI34,
      estoqueCritico,
      totalDietasEspeciais,
      kitsAdmissaoDisponiveis,
      totalRefeicoes: 1240
    };
  }
}

window.store = new Store();
