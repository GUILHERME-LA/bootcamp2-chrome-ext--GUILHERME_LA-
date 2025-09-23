// Ping do Background (Teste Antigo)
document.addEventListener('DOMContentLoaded', () => {
  const pingBtn = document.getElementById('pingBtn');
  const pingStatus = document.getElementById('pingStatus');

  pingBtn.addEventListener('click', async () => {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'PING' });
      pingStatus.textContent = `Background OK! Hora: ${response.time}`;
    } catch (error) {
      pingStatus.textContent = `Erro: ${error.message}`;
    }
  });

  // Timer de Hidratação
  const intervaloSelect = document.getElementById('intervalo');
  const iniciarBtn = document.getElementById('iniciarTimer');
  const pararBtn = document.getElementById('pararTimer');
  const timerStatus = document.getElementById('timerStatus');

  // Carrega configurações salvas
  chrome.storage.local.get(['intervaloMinutos', 'timerAtivo'], (data) => {
    if (data.intervaloMinutos) {
      intervaloSelect.value = data.intervaloMinutos;
    }
    if (data.timerAtivo) {
      timerStatus.textContent = `Timer: Ativo (${data.intervaloMinutos} min).`;
      iniciarBtn.disabled = true;
      pararBtn.disabled = false;
    }
  });

  // Iniciar Timer
  iniciarBtn.addEventListener('click', () => {
    const minutos = parseInt(intervaloSelect.value);
    chrome.storage.local.set({ intervaloMinutos: minutos, timerAtivo: true }, () => {
      chrome.runtime.sendMessage({ type: 'INICIAR_TIMER', intervalo: minutos * 60 * 1000 }); // ms
      timerStatus.textContent = `Timer iniciado! Lembrete a cada ${minutos} min.`;
      iniciarBtn.disabled = true;
      pararBtn.disabled = false;
    });
  });

  // Parar Timer
  pararBtn.addEventListener('click', () => {
    chrome.storage.local.set({ timerAtivo: false }, () => {
      chrome.runtime.sendMessage({ type: 'PARAR_TIMER' });
      timerStatus.textContent = 'Timer: Parado.';
      iniciarBtn.disabled = false;
      pararBtn.disabled = true;
    });
  });
});