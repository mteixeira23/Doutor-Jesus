# Memória do Projeto - SGI Fundação Doutor Jesus

## 📌 Visão Geral & Prazo
- **Prazo de Entrega**: Esta semana
- **Status Atual**: 🟢 **DESCOBERTO O CONFLITO DE DOMÍNIO/PROJETO (CARAVANA DE DIREITOS HUMANOS) E APLICADO FAVICON OFICIAL DO CORAÇÃO VERMELHO!**
- **Domínio Oficial**: `https://www.singulariconsult.com.br`
- **Deploy Vercel Direto**: `https://sgi-fundacao-dr-jesus.vercel.app`
- **Repositório GitHub**: `https://github.com/mteixeira23/Doutor-Jesus`

---

## 🔍 DIAGNÓSTICO DO ÍCONE DO ÔNIBUS & CARAVANA DE DIREITOS HUMANOS (Commit `20fbaae`):

### **1. O que foi descoberto com a informação do usuário**:
- O usuário notou um **ícone de ônibus na aba do navegador**, referente ao seu outro projeto legado ("Caravana de Direitos Humanos").
- Isso confirmou que o navegador do usuário (e o mapa de domínios Vercel) estava retendo o cache daquele projeto anterior vinculado ao domínio `www.singulariconsult.com.br`.

### **2. Solução Aplicada no Commit `20fbaae`**:
- Injetado um **Favicon SVG nativo do Coração Vermelho (Fundação Dr. Jesus)** diretamente no `<head>` do `index.html`.
- O navegador agora substitui obrigatoriamente o ícone do ônibus pelo **Coração Vermelho da Fundação Doutor Jesus**.
- Corrigidos todos os caminhos relativos de scripts (`js/store.js`, `js/ui.js`, `js/app.js`).

---

## 💡 Histórico de Commits
- Commit `20fbaae`: Adiciona favicon oficial da Fundação Dr Jesus (coração vermelho) e caminhos relativos limpos v6.
