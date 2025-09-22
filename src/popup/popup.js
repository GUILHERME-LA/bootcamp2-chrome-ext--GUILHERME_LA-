// Event listener para o botão de ping
const btn = document.getElementById('ping');
const statusEl = document.getElementById('status');

btn.addEventListener('click', async () => {
  try {
    btn.textContent = 'Enviando...';
    const res = await chrome.runtime.sendMessage({ type: 'PING' });
    statusEl.textContent = `Background está vivo: ${res.time}`;
    btn.textContent = 'Ping background';
  } catch (error) {
    statusEl.textContent = `Erro: ${error.message}`;
    btn.textContent = 'Ping background';
  }
});

// Carrega status inicial do storage (exemplo de uso de storage)
chrome.storage.local.get(['installs'], (result) => {
  if (result.installs) {
    statusEl.textContent += ` | Instalado em: ${new Date(result.installs).toLocaleString()}`;
  }
});