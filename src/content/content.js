// Content script: Destaca links em páginas específicas (ex: docs do Chrome)
console.log('Content script injetado em:', window.location.href);

// Adiciona outline roxo aos links
const links = document.querySelectorAll('a');
links.forEach(link => {
  link.style.outline = '2px solid #ec0089';
  link.title = 'Link destacado pelo Bootcamp Helper';
});

// Opcional: Observa mudanças no DOM (para SPAs)
const observer = new MutationObserver(() => {
  // Re-aplica highlights se necessário
  document.querySelectorAll('a:not([style*="outline"])').forEach(link => {
    link.style.outline = '2px solid #ec0089';
  });
});
observer.observe(document.body, { childList: true, subtree: true });