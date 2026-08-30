---
name: revisar-sistema
description: >-
  Instruções passo a passo para o agente revisar, testar e auditar os 13 módulos
  do SGI Fundação Doutor Jesus antes da entrega da semana.
---

# Skill: Revisão e Validação do SGI Fundação Doutor Jesus

Use esta skill sempre que o usuário pedir para **revisar**, **testar**, **corrigir bugs** ou **preparar a versão de entrega da semana**.

---

## Passo 1: Validação do Código Front-end
1. Inspecione os arquivos `index.html`, `css/styles.css`, `js/store.js`, `js/ui.js` e `js/app.js`.
2. Certifique-se de que não existem referências nulas, variáveis indefinidas ou exceções não capturadas.
3. Garanta que todas as chamadas de funções usam a assinatura correta dos métodos da classe `Store` e `UI`.

---

## Passo 2: Verificação de Regras de Negócio da Fundação
1. **Triagem & Acolhidos**:
   - Cada acolhido possui `id`, `nome`, `cpf`, `status` (ativo/triagem), `fasePTI` (1 a 4), `leito` e `oficina`.
2. **Estoque FEFO & Refeições**:
   - Os itens com quantidade menor ou igual ao `estoqueMinimo` devem exibir o badge de alerta crítico vermelho (`Repor Urgente`).
   - O contador de refeições deve refletir o atendimento comunitário dos 1.240 acolhidos.
3. **Impressão A4**:
   - Teste se o estilo `@media print` oculta menus, sidebars e botões de ação na hora de imprimir relatórios e crachás.

---

## Passo 3: Sincronização e Deploy
1. Execute `git status` para verificar alterações pendentes.
2. Faça o `git commit` com mensagem descritiva em Português.
3. Realize o `git push origin main` para atualizar automaticamente a Vercel.
4. Atualize a memória do projeto em `.agents/memoria.md`.
