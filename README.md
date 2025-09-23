# Bootcamp Helper — Extensão Chrome MV3

Extensão simples para praticar Manifest V3 no Bootcamp II. Inclui popup para comunicação com background service worker, uso de storage e um content script opcional para manipular DOM em páginas específicas (ex: docs do Chrome).

## 📦 Download
[Versão 1.0.0](https://github.com/<seu-usuario>/bootcamp2-chrome-ext-<seu-usuario>/releases/tag/v1.0.0)

## 📋 Instalação

1. Baixe o repositório: Clone ou faça download do ZIP.
2. Abra `chrome://extensions/` no Chrome (versão 114+).
3. Ative "Developer mode" no canto superior direito.
4. Clique em "Load unpacked" e selecione a pasta raiz do projeto (`bootcamp2-chrome-ext-<GUILHERME_LA>`).
5. O ícone aparecerá na toolbar. Clique para abrir o popup.

**Modo de Produção:** Crie uma Release no GitHub e instale via `.crx` (futuro), mas para dev, use unpacked.

## 🚀 Uso

- **Popup:** Clique no botão "Ping background" para enviar uma mensagem ao service worker e ver o timestamp de resposta. O status mostra data de instalação via storage.
- **Background:** Registra instalação e alarms periódicos (ver console em `chrome://extensions/` > Inspect views: service worker).
- **Content Script:** Visite [developer.chrome.com](https://developer.chrome.com/docs/extensions/) — links terão outline roxo. Inspecione (F12) para ver logs.
- **Opções:** O popup também serve como options page (clique direito no ícone > Options).

Teste eventos: Abra DevTools no popup/background para logs.

## 🗂️ Estrutura do Projeto

- `src/popup/`: UI do popup (HTML, CSS, JS).
- `src/background/`: Service worker para eventos runtime.
- `src/content/`: Script injetado em matches específicos.
- `src/assets/`: Recursos como logo.
- `src/styles/`: CSS global.
- `icons/`: Ícones em tamanhos padrão (PNG placeholders — gere reais).
- `docs/`: Landing page para GitHub Pages.
- `manifest.json`: Config MV3 com permissões mínimas.

Sem dependências externas. Todos scripts locais, sem `eval()`.

## 🔧 Requisitos Técnicos

- Chrome 114+.
- Manifest V3: Service worker em vez de persistent background.
- Permissões: `storage` (salvar installs), `tabs` (acesso básico), `host_permissions` limitado a `https://developer.chrome.com/*`.
- CSP: Scripts inline/locais apenas.

## 📁 GitHub Pages

Acesse: https://<seu-usuario>.github.io/bootcamp2-chrome-ext-<seu-usuario>/  
(Ativado via /docs folder). Inclui explicação, instalação e link para download.

## 📦 Empacotamento

- ZIP: Compacte a pasta raiz para `.zip` (exclua `node_modules` se adicionar bundler futuramente).
- Release: Crie tag `v1.0.0` no GitHub com o ZIP anexado.

## 📝 Licenças

- Licença do Projeto: MIT (veja LICENSE).
- Ícones/Assets: Free/public domain (gere seus próprios).
- Chrome APIs: © Google (uso sob termos do Chrome Web Store).

## 🤝 Contribuições

Use branches e PRs. Commits: Descritivos e frequentes.

## 📨 Contato

Projeto para Bootcamp II. Repo: https://github.com/<seu-usuario>/bootcamp2-chrome-ext-<seu-usuario>

---
Desenvolvido com ❤️ pelo Bootcamp II. Mantenha permissões enxutas!
