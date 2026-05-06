import gamesData from './games.json';

// State management
let state = {
  selectedGame: null,
  searchQuery: '',
  activeCategory: 'All',
};

// Selectors
const app = document.getElementById('app');

// Initialization
function init() {
  render();
}

// Rendering Logic
function render() {
  if (state.selectedGame) {
    renderViewer();
  } else {
    renderHome();
  }
  // Initialize Lucide icons after rendering
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderHome() {
  const categories = ['All', ...new Set(gamesData.map(g => g.category))];
  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                        game.category.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesCategory = state.activeCategory === 'All' || game.category === state.activeCategory;
    return matchesSearch && matchesCategory;
  });

  app.innerHTML = `
    <div class="relative z-10 px-6 py-10 max-w-7xl mx-auto">
      <!-- Background Atmosphere -->
      <div class="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]"></div>
        <div class="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-900/10 blur-[100px]"></div>
      </div>

      <header class="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <i data-lucide="gamepad-2" class="text-white"></i>
          </div>
          <h1 class="text-xl font-bold tracking-tight uppercase">MR.WEBS<span class="text-indigo-500">GAMES</span></h1>
        </div>

        <div class="flex items-center gap-4 flex-1 max-w-md w-full">
          <div class="relative w-full group">
            <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" style="width: 18px; height: 18px;"></i>
            <input 
              type="text" 
              id="search-input"
              placeholder="Search unblocked titles..." 
              value="${state.searchQuery}"
              class="w-full bg-[#16161a] border border-slate-800 rounded-full py-2.5 px-12 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
            />
            <div class="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-700 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">⌘K</div>
          </div>
        </div>

        <nav class="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
          <a href="#" class="text-indigo-400">Hub</a>
          <a href="#" class="hover:text-white transition-colors">Proxy</a>
          <a href="#" class="hover:text-white transition-colors">Docs</a>
        </nav>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Featured Large (Hero) -->
        <div 
          class="md:col-span-2 md:row-span-2 bg-[#16161a] border border-slate-800 rounded-3xl relative overflow-hidden group min-h-[360px] cursor-pointer"
          id="featured-game"
        >
          <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <img 
            src="${gamesData[0].thumbnail}" 
            alt="Featured" 
            class="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
          />
          <div class="absolute bottom-8 left-8 z-20">
            <div class="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-2">Featured Title</div>
            <h2 class="text-4xl font-black mb-6 uppercase italic tracking-tighter">${gamesData[0].title}</h2>
            <button class="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20">
              <i data-lucide="flame" style="width: 18px; height: 18px;"></i>
              INITIALIZE GAME
            </button>
          </div>
        </div>

        <div class="bg-[#16161a] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between group">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Status</span>
            </div>
            <i data-lucide="layout-grid" class="text-slate-700" style="width: 16px; height: 16px;"></i>
          </div>
          <div>
            <h3 class="text-2xl font-bold tracking-tight">STABLE</h3>
            <p class="text-xs text-slate-500 mt-1 italic opacity-70 leading-relaxed font-mono">Iframes served via proxy nodes_</p>
          </div>
        </div>

        <div class="bg-[#16161a] border border-slate-800 rounded-3xl p-6 overflow-hidden">
          <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Database_Nodes</h3>
          <div class="flex flex-wrap gap-2" id="category-filters">
            ${categories.map(cat => `
              <button 
                data-category="${cat}"
                class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                  state.activeCategory === cat 
                    ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-400" 
                    : "bg-slate-800/30 border-slate-800 text-slate-500 hover:border-slate-700"
                }"
              >
                ${cat}
              </button>
            `).join('')}
          </div>
        </div>

        <div 
          class="bg-[#16161a] border border-slate-800 rounded-3xl p-6 flex items-center gap-4 cursor-pointer hover:border-indigo-500/30 transition-colors overflow-hidden"
          id="trending-game"
        >
          <div class="w-12 h-12 bg-indigo-900/30 border border-indigo-500/20 rounded-2xl flex items-center justify-center font-bold text-lg text-indigo-400 shrink-0">
            <i data-lucide="flame" style="width: 20px; height: 20px;"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold uppercase tracking-tight">${gamesData[1].title}</h3>
            <p class="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Trending Next_</p>
          </div>
        </div>

        <div class="bg-[#16161a] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div class="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Session_Live</div>
          <div class="text-2xl font-mono tracking-tighter text-slate-300">00:24:51</div>
        </div>

        <div class="md:col-span-4 mt-8">
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px flex-1 bg-slate-800"></div>
            <h4 class="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600">Archive_Explorer</h4>
            <div class="h-px flex-1 bg-slate-800"></div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="games-grid">
            ${filteredGames.map(game => `
              <div 
                data-game-id="${game.id}"
                class="game-card group cursor-pointer bg-[#16161a] border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/50 transition-all"
              >
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                    <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <span class="text-[9px] font-bold uppercase tracking-widest text-indigo-500/70">${game.category}</span>
                      <i data-lucide="clock" class="text-slate-700" style="width: 12px; height: 12px;"></i>
                    </div>
                    <h3 class="text-sm font-bold tracking-tight uppercase group-hover:text-indigo-400 transition-colors mt-1">${game.title}</h3>
                    <p class="text-[10px] text-slate-500 line-clamp-1 mt-0.5">${game.description}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>

      <footer class="mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 font-mono text-[9px] uppercase tracking-[0.3em]">
        <div class="flex gap-8">
          <span>© 2026 NEBULA_ARCADE</span>
          <span class="opacity-50">V4.2.0_STABLE</span>
        </div>
        <div class="flex gap-8">
          <a href="#" class="hover:text-indigo-400 transition-colors">Privacy</a>
          <a href="#" class="hover:text-indigo-400 transition-colors">Terms</a>
          <a href="#" class="hover:text-indigo-400 transition-colors">Terminal_Exit</a>
        </div>
      </footer>
    </div>
  `;

  // Attach events
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    render();
    // Keep focus on input after re-render
    const input = document.getElementById('search-input');
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  });

  document.getElementById('category-filters').addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (btn) {
      state.activeCategory = btn.dataset.category;
      render();
    }
  });

  document.getElementById('games-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.game-card');
    if (card) {
      const gameId = card.dataset.gameId;
      state.selectedGame = gamesData.find(g => g.id === gameId);
      render();
    }
  });

  document.getElementById('featured-game').addEventListener('click', () => {
    state.selectedGame = gamesData[0];
    render();
  });

  document.getElementById('trending-game').addEventListener('click', () => {
    state.selectedGame = gamesData[1];
    render();
  });
}

function renderViewer() {
  app.innerHTML = `
    <div class="fixed inset-0 z-50 bg-[#050505] flex flex-col">
      <div class="bg-[#111114] border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button 
            id="close-viewer"
            class="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
          >
            <i data-lucide="chevron-left" style="width: 18px; height: 18px;"></i>
          </button>
          <div class="h-6 w-px bg-slate-800"></div>
          <div>
            <h2 class="text-sm font-bold tracking-tight uppercase">${state.selectedGame.title}</h2>
            <div class="flex items-center gap-2">
              <span class="text-[8px] text-indigo-500 font-bold uppercase tracking-widest">Active Session</span>
              <span class="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button 
            id="open-new-tab"
            class="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 hover:text-indigo-400 flex items-center justify-center transition-all"
          >
            <i data-lucide="external-link" style="width: 16px; height: 16px;"></i>
          </button>
          <button 
            id="close-viewer-alt"
            class="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20"
          >
            <i data-lucide="x" style="width: 18px; height: 18px;"></i>
          </button>
        </div>
      </div>

      <div class="flex-1 bg-black relative">
        <iframe 
          src="${state.selectedGame.iframeUrl}"
          class="w-full h-full border-none"
          title="${state.selectedGame.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      <div class="bg-[#111114] border-t border-slate-800 px-6 py-2 flex items-center justify-between text-slate-600 font-mono text-[8px] uppercase tracking-[0.4em]">
        <div class="flex items-center gap-8">
          <span>Node: ${state.selectedGame.id}.prox</span>
          <span>Enc: AES-256</span>
        </div>
        <div class="hidden sm:block">
          Streaming from Nebula_Mainframe // Link_Stable
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-viewer').addEventListener('click', () => {
    state.selectedGame = null;
    render();
  });

  document.getElementById('close-viewer-alt').addEventListener('click', () => {
    state.selectedGame = null;
    render();
  });

  document.getElementById('open-new-tab').addEventListener('click', () => {
    window.open(state.selectedGame.iframeUrl, '_blank');
  });
}

// Start the app
init();
