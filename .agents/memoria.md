# Memória do Projeto - SGI Fundação Doutor Jesus

## 📌 Visão Geral & Prazo
- **Prazo de Entrega**: Esta semana
- **Status Atual**: Estrutura base online no GitHub e Vercel com os Macromódulos 1, 2, Saúde e TI inicializados.
- **Repositório GitHub**: `https://github.com/mteixeira23/Doutor-Jesus`
- **Deploy Vercel**: `https://sgi-fundacao-dr-jesus-d53gane6s.vercel.app`

---

## 🎯 Checklist da Semana para a Entrega

### Segunda-feira: Módulo 1 (Acolhidos & Triagem)
- [x] Conectar base de dados de Acolhidos no `store.js`.
- [x] Tabela de Acolhidos Ativos / Em Triagem no `ui.js`.
- [ ] Modal de Cadastro Completo do Acolhido (Dados Pessoais, CPF, Origem, Leito).
- [ ] Gerador de Crachá de Identificação pronto para impressão.

### Terça-feira: Módulo 2 (Almoxarifado & Refeições)
- [x] Tabela de Estoque Geral com regra FEFO no `store.js`.
- [x] Indicador de Refeições Diárias (1.240 Acolhidos).
- [ ] Formulário de Entrada/Saída de itens do Estoque.
- [ ] Filtro por itens com estoque abaixo do nível crítico.

### Quarta-feira: Módulo da Saúde & MROSC
- [x] Campo de Acompanhamento Médico e Dietas Especiais no Prontuário.
- [ ] Tela de relatórios para prestação de contas MROSC.

### Quinta-feira: Testes, Impressão A4 & Refinamento de UX
- [x] CSS de Impressão `@media print` para A4.
- [ ] Testar navegação entre todas as abas sem recarregar a página.
- [ ] Validar compatibilidade em telas de celulares e tablets.

### Sexta-feira: Auditoria Final & Apresentação
- [ ] Validação zero erros de console.
- [ ] `git push` final para a Vercel.

---

## 💡 Histórico de Decisões Técnicas
1. **Escolha de Vanilla JS**: Mantido sem frameworks pesados (React/Node no servidor) para garantir carregamento instantâneo no navegador da recepção.
2. **Sistema de Temas**: Suporte a Light Mode e Dark Mode automático via CSS variables.
3. **Gerenciamento em `.agents/`**: Arquitetura desacoplada configurada em `.agents/AGENTS.md` e `.agents/skills/`.
