# Memória do Projeto - SGI Fundação Doutor Jesus

## 📌 Visão Geral & Prazo
- **Prazo de Entrega**: Esta semana
- **Status Atual**: 🟢 **Macromódulo 1 Concluído e Revisado com Sucesso!**
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

### 🟡 Terça-feira: Macromódulo 2 (Almoxarifado & Refeições 1.240 Acolhidos)
- [x] Tabela de Estoque Geral com regra FEFO no `store.js`.
- [x] Indicador de Refeições Diárias (1.240 Acolhidos).
- [ ] Formulário de Entrada/Saída de itens do Estoque.
- [ ] Filtro por itens com estoque abaixo do nível crítico.

### ⚪ Quarta-feira: Módulo da Saúde & MROSC
- [x] Campo de Acompanhamento Médico e Dietas Especiais no Prontuário.
- [ ] Tela de relatórios para prestação de contas MROSC.

### ⚪ Quinta-feira: Testes, Impressão A4 & Refinamento de UX
- [x] CSS de Impressão `@media print` para A4.
- [ ] Testar navegação entre todas as abas sem recarregar a página.
- [ ] Validar compatibilidade em telas de celulares e tablets.

### ⚪ Sexta-feira: Auditoria Final & Apresentação
- [ ] Validação zero erros de console.
- [ ] `git push` final para a Vercel.

---

## 💡 Histórico de Decisões Técnicas
1. **Macromódulo 1 Expandido**: Adicionada gestão completa de Acolhidos com suporte a leitos, dietas, evolução do PTI Fases 1 a 4 e crachás para impressão A4.
2. **Sistema de Temas**: Suporte a Light Mode e Dark Mode automático via CSS variables.
3. **Gerenciamento em `.agents/`**: Arquitetura desacoplada configurada em `.agents/AGENTS.md` e `.agents/skills/`.
