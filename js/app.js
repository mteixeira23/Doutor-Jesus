/**
 * TaskFlow / SGI - Fundação Doutor Jesus
 * Main Application Initializer (Opção A - Pure Static Engine)
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('SGI Fundação Doutor Jesus — Sistema Inicializado.');
  if (window.ui && typeof window.ui.renderApp === 'function') {
    window.ui.renderApp();
  }
});
