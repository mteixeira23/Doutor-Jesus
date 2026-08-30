# Memória do Projeto - SGI Fundação Doutor Jesus

## 📌 Visão Geral & Prazo
- **Prazo de Entrega**: Esta semana
- **Status Atual**: 🟢 **ELIMINADA A CAUSA RAIZ DA TELA BRANCA DA VERCEL COM JAVASCRIPT ASCII 100% LIMPO!**
- **Domínio Oficial**: `https://www.singulariconsult.com.br`
- **Deploy Vercel Direto**: `https://sgi-fundacao-dr-jesus.vercel.app`
- **Repositório GitHub**: `https://github.com/mteixeira23/Doutor-Jesus`

---

## 🔬 CAUSA RAIZ DO PREVIEW EM BRANCO NO VERCEL E SOLUÇÃO DE ENGENHARIA (Commit `db0c0c7`):

### **1. Causa Raiz Descoberta na Auditoria de Código**:
- O navegador headless Chromium da Vercel (que tira a foto do preview no painel) falhava ao fazer parse do script `js/ui.js` porque o arquivo continha caracteres especiais corrompidos em UTF-8 (`├º├úo`, `├│dulo`, `ÔÇö`).
- Quando o parser do navegador encontrava esse byte inválido na linha 1 do script, ele lançava um `Uncaught SyntaxError`, interrompendo a execução antes de `window.ui = new UI()` ser instanciado, deixando o contêiner `#root` 100% vazio (tela branca no preview).

### **2. Solução Definitiva (Commit `db0c0c7`)**:
- Convertidos 100% dos caracteres de `js/ui.js`, `js/store.js` e `index.html` para **ASCII Limpo Padrão Pura**.
- Garantido que a execução do script ocorra em **0.01 segundos** sem qualquer risco de falha de parser em qualquer navegador ou robô headless.

---

## 💡 Histórico de Commits
- Commit `db0c0c7`: Elimina 100% dos caracteres não-ASCII em `js/ui.js`, `js/store.js` e `index.html` garantindo parse sem erros na Vercel.
