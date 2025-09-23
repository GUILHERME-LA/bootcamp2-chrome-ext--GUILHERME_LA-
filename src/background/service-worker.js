console.log('Bootcamp Helper Background carregado!');

// Ping (Teste Antigo)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'PING') {
    console.log('Ping recebido do popup!');
    sendResponse({ ok: true, time: new Date().toISOString() });
    return true; // Resposta assíncrona
  }
});

// Inicialização
chrome.runtime.onInstalled.addListener(() => {
  console.log('Bootcamp Helper instalado!');
  chrome.storage.local.set({ timerAtivo: false }); // Default: Timer parado
});

// Gerenciamento do Timer de Hidratação
let timerId = null; // ID do timeout atual

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'INICIAR_TIMER') {
    const intervaloMs = msg.intervalo; // Em milissegundos
    console.log(`Iniciando timer de ${intervaloMs / 60000} minutos.`);
    
    // Para timer anterior se existir
    if (timerId) {
      clearTimeout(timerId);
    }
    
    // Agenda o primeiro lembrete
    timerId = setTimeout(() => {
      enviarLembreteAgua();
      // Reagendar para o próximo intervalo
      timerId = setInterval(enviarLembreteAgua, intervaloMs);
    }, intervaloMs);
    
    sendResponse({ ok: true });
    return true;
  }
  
  if (msg.type === 'PARAR_TIMER') {
    if (timerId) {
      clearTimeout(timerId);
      clearInterval(timerId);
      timerId = null;
      console.log('Timer parado.');
    }
    sendResponse({ ok: true });
    return true;
  }
});

// Função para Enviar Notificação de Água
function enviarLembreteAgua() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png', // Use o ícone da extensão
    title: 'Lembrete: Beba Água! 💧',
    message: 'Mantenha-se hidratado durante o Bootcamp. Tome um copo d\'água agora!'
  }, (notificationId) => {
    console.log('Notificação de água enviada!');
  });
}

// Verifica se timer estava ativo ao reiniciar o background (ex: Chrome reiniciado)
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get(['timerAtivo', 'intervaloMinutos'], (data) => {
    if (data.timerAtivo && data.intervaloMinutos) {
      chrome.runtime.sendMessage({ type: 'INICIAR_TIMER', intervalo: data.intervaloMinutos * 60 * 1000 });
    }
  });
});