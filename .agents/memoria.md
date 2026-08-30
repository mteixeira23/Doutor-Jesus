# Memória do Projeto - TaskFlow (Sistema de Produtividade)

## Status do Projeto
- **Fase**: Desenvolvimento e Polimento
- **Última Atualização**: 30/08/2026

## Visão Geral do Sistema
O **TaskFlow** é uma aplicação web de gerenciamento de tarefas e produtividade visualmente impressionante.
Permite aos usuários:
1. Criar, editar, priorizar e concluir tarefas.
2. Filtrar tarefas por categoria (Trabalho, Pessoal, Estudos) e status (Todas, Pendentes, Concluídas).
3. Visualizar estatísticas de produtividade em tempo real (taxa de conclusão, estatísticas visuais).
4. Persistência automática no `localStorage` do navegador.

## Arquitetura de Dados
Objeto `Task`:
```json
{
  "id": "string (uuid/timestamp)",
  "title": "string",
  "category": "trabalho | pessoal | estudos",
  "priority": "alta | media | baixa",
  "completed": boolean,
  "createdAt": "ISO date string"
}
```

## Histórico de Decisões Técnicas
- **Decisão 1**: Arquitetura Vanilla JS modular desacoplada (`store.js`, `ui.js`, `app.js`).
- **Decisão 2**: Sistema de design moderno em `css/styles.css` utilizando variáveis HSL, Glassmorphism e Tema Escuro.
- **Decisão 3**: Ícones via CDN com Lucide Icons (`data-lucide="..."`).
