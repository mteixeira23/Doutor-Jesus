---
name: gerenciar-tarefas
description: >-
  Instruções passo a passo para gerenciar, testar e expandir as funcionalidades de tarefas no TaskFlow.
---

# Skill: Gerenciamento de Tarefas no TaskFlow

Esta skill define a rotina para inclusão de novos recursos ou testes no sistema de tarefas do TaskFlow.

## Passos para Adicionar Novos Recursos de Tarefa

1. **Atualizar Modelo de Dados (`js/store.js`)**:
   - Garanta que qualquer novo atributo na tarefa tenha um valor padrão no objeto mock.
   - Atualize os métodos `save()`, `add()`, ou `toggle()`.

2. **Atualizar Renderização Visual (`js/ui.js`)**:
   - Adicione o novo elemento no template HTML em `createTaskElement(task)`.
   - Lembre-se de re-executar `lucide.createIcons()` após atualizar o DOM.

3. **Atualizar Estilos (`css/styles.css`)**:
   - Utilize as variáveis CSS já definidas (`--bg-primary`, `--accent-color`, etc.).
   - Mantenha transições suaves (`transition: var(--transition)`).

4. **Validação Manual**:
   - Abra o `index.html` no navegador.
   - Teste a inclusão, edição, alteração de status e remoção de tarefas.
