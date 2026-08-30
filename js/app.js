/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Main Initializer - Invocação Síncrona Implacável
 */

function runSGIApp() {
  if (window.ui && typeof window.ui.renderApp === 'function') {
    window.ui.renderApp();
  }
}

// 1. Execução Imediata no carregamento do arquivo
runSGIApp();

// 2. Execução no DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runSGIApp);
} else {
  runSGIApp();
}

// 3. Execução no evento load completo
window.addEventListener('load', runSGIApp);
