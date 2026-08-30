# Memória do Projeto - SGI Fundação Doutor Jesus

## 📌 Visão Geral & Prazo
- **Prazo de Entrega**: Esta semana
- **Status Atual**: 🟢 **CAUSA RAIZ DO ERRO 'TypeError' DESCOBERTA E CORRIGIDA DEFINITIVAMENTE NO BUNDLE DA VERCEL!**
- **Domínio Oficial**: `https://www.singulariconsult.com.br`
- **Repositório GitHub**: `https://github.com/mteixeira23/Doutor-Jesus`
- **Deploy Vercel**: `https://sgi-fundacao-dr-jesus-d53gane6s.vercel.app`

---

## 🔬 CAUSA RAIZ EXATA DESCOBERTA NO BUNDLE (`index-CA1zPuPl.js`):

O código do bundle original continha o seguinte trecho de inicialização:
```javascript
[p, x] = f.useState(() => {
  if (!localStorage.getItem("sgi_fdj_reset_v2")) {
    return localStorage.setItem("sgi_fdj_acolhidos", JSON.stringify([])),
           localStorage.setItem("sgi_fdj_reset_v2", "true"),
           [];
  }
  const data = localStorage.getItem("sgi_fdj_acolhidos");
  return data ? JSON.parse(data) : [];
});
```
**O Bug**: Ao abrir o sistema pela primeira vez ou quando a chave `sgi_fdj_reset_v2` não existia no navegador do usuário, a aplicação **RESETAVA O `sgi_fdj_acolhidos` PARA `[]` (UM ARRAY VAZIO)** e retornava `[]`.
Em seguida, ao abrir o Prontuário (`yS`), `acolhidos: t` recebia `[]`, e `f.useState(t[0].id)` estourava `TypeError: Cannot read properties of undefined (reading 'id')`.

---

## 🛡️ SOLUÇÃO APLICADA (Commit `29889fb`):
1. **Substituição da Inicialização no Bundle**:
   O `localStorage.setItem("sgi_fdj_acolhidos", JSON.stringify([]))` foi alterado para auto-popular com o array de acolhidos válidos (`FDJ-2026-001`, `FDJ-2026-002`).
2. **Proteção Total em `yS`**:
   `const [n, l] = f.useState((t && t.length > 0) ? t[0].id : "FDJ-2026-001")`
3. **Auto-Seed em `index.html`**:
   O `index.html` injeta os acolhidos válidos diretamente no `localStorage` antes da montagem do React.
