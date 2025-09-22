// Listener para instalação da extensão
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Bootcamp Helper instalado.');
  if (details.reason === 'install') {
    chrome.storage.local.set({ installs: Date.now() });
  }
});

// Listener para mensagens do popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'PING') {
    // Responde com timestamp
    sendResponse({ ok: true, time: new Date().toISOString() });
    return true; // Mantém a mensagem aberta para resposta assíncrona
  }
});

// Exemplo opcional: Alarm para log periódico (ativa após 1min)
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('logAlarm', { delayInMinutes: 1, periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'logAlarm') {
    console.log('Alarm disparado:', new Date().toISOString());
  }
});