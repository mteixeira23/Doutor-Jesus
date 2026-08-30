# Memória do Projeto - SGI Fundação Doutor Jesus

## 📌 Visão Geral & Prazo
- **Prazo de Entrega**: Esta semana
- **Status Atual**: 🟢 **Macromódulos 1 e 2 Concluídos, Integrados e Revisados com Sucesso!**
- **Repositório GitHub**: `https://github.com/mteixeira23/Doutor-Jesus`
- **Deploy Vercel**: `https://sgi-fundacao-dr-jesus-d53gane6s.vercel.app`

---

## 🎯 Checklist da Semana para a Entrega

### 🟢 Segunda-feira: Macromódulo 1 (Acolhidos & Triagem) — CONCLUÍDO!
- [x] Conectar base de dados de Acolhidos no `store.js`.
- [x] Tabela interativa com busca em tempo real por Nome, CPF e Código FDJ.
- [x] Filtros por status (Ativos vs Em Triagem).
- [x] Modal de Cadastro Completo do Acolhido (Dados Pessoais, CPF, RG, Origem, Leito, Dieta, Emergência).
- [x] Prontuário Eletrônico com avanço das 4 Fases do PTI (Plano Terapêutico Individual).
- [x] Gerador de Crachá de Identificação do Acolhido pronto para Impressão A4 (`@media print`).

### 🟢 Terça-feira: Macromódulo 2 (Almoxarifado FEFO & Refeições 1.240 Acolhidos) — CONCLUÍDO!
- [x] Módulo 5: Tabela de Estoque FEFO com filtros por setor (Despensa, Cozinha, Triagem).
- [x] Botões para Reposição/Entrada (+) e Consumo/Saída (-) de insumos com logs de auditoria.
- [x] Módulo 6: Painel do Almoço Comunitário e Café da Manhã (1.240 Acolhidos) com confirmação de refeição servida e baixa automática no estoque de arroz e feijão.
- [x] Módulo 7: Quadro de Oficinas de Capacitação (Cozinha Industrial, Horta Orgânica, Elétrica, Manutenção).
- [x] Módulo 8: Controle de Kits de Admissão em tempo real.

### 🟡 Quarta-feira: Módulo da Saúde & MROSC
- [x] Campo de Acompanhamento Médico e Dietas Especiais no Prontuário.
- [x] Painel de Saúde & Dietas Especiais integrado com a Cozinha Industrial.
- [ ] Tela de relatórios para prestação de contas MROSC.

### ⚪ Quinta-feira: Testes, Impressão A4 & Refinamento de UX
- [x] CSS de Impressão `@media print` para A4.
- [x] Navegação reativa entre todas as abas dos Macromódulos 1 e 2.
- [ ] Validar compatibilidade em telas de celulares e tablets.

### ⚪ Sexta-feira: Auditoria Final & Apresentação
- [x] Validação zero erros de console.
- [x] `git push` contínuo para a Vercel.

---

## 💡 Histórico de Decisões Técnicas
1. **Macromódulo 2 Concluído**: Implementada regra FEFO (*First Expired, First Out*), controle de refeições comunitárias com baixa de insumos e quadro de oficinas de capacitação.
2. **Reatividade Transversal**: Ações na Triagem (M1) baixam Kits de Admissão no Almoxarifado (M2) e atualizam as Dietas Especiais na Saúde.
3. **Gerenciamento em `.agents/`**: Arquitetura desacoplada mantida em `.agents/AGENTS.md`, `.agents/memoria.md` e `.agents/skills/`.
