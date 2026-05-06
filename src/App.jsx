/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  ChevronLeft, 
  ExternalLink,
  Flame,
  LayoutGrid,
  Clock,
  Navigation
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gamesData from "./games.json";

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = ["All", ...new Set(gamesData.map(g => g.category))];
    return cats;
  }, []);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-900/10 blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative z-10 px-6 py-10 max-w-7xl mx-auto"
          >
            {/* Header */}
            <header className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Gamepad2 className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold tracking-tight uppercase">NEBULA<span className="text-indigo-500">GAMES</span></h1>
              </div>

              <div className="flex items-center gap-4 flex-1 max-w-md w-full">
                <div className="relative w-full group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search unblocked titles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#16161a] border border-slate-800 rounded-full py-2.5 px-12 text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-700 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">⌘K</div>
                </div>
              </div>

              <nav className="hidden lg:flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
                <a href="#" className="text-indigo-400">Hub</a>
                <a href="#" className="hover:text-white transition-colors">Proxy</a>
                <a href="#" className="hover:text-white transition-colors">Docs</a>
              </nav>
            </header>

            {/* Bento Grid Main Layout */}
            <main className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Featured Large (Hero) */}
              <motion.div 
                whileHover={{ scale: 1.005 }}
                className="md:col-span-2 md:row-span-2 bg-[#16161a] border border-slate-800 rounded-3xl relative overflow-hidden group min-h-[360px]"
                onClick={() => setSelectedGame(gamesData[0])}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <img 
                  src={gamesData[0].thumbnail} 
                  alt="Featured" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                />
                
                <div className="absolute bottom-8 left-8 z-20">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-2">Featured Title</div>
                  <h2 className="text-4xl font-black mb-6 uppercase italic tracking-tighter">
                    {gamesData[0].title}
                  </h2>
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-xl shadow-indigo-600/20">
                    <Flame size={18} />
                    INITIALIZE GAME
                  </button>
                </div>
              </motion.div>

              {/* Stats/Status Card */}
              <div className="bg-[#16161a] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between group">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Status</span>
                  </div>
                  <LayoutGrid size={16} className="text-slate-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">STABLE</h3>
                  <p className="text-xs text-slate-500 mt-1 italic opacity-70 leading-relaxed font-mono">Iframes encrypted via proxy nodes_</p>
                </div>
              </div>

              {/* Categories/Genres Card */}
              <div className="bg-[#16161a] border border-slate-800 rounded-3xl p-6 overflow-hidden">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Database_Nodes</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                        activeCategory === cat 
                          ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-400" 
                          : "bg-slate-800/30 border-slate-800 text-slate-500 hover:border-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Miniature */}
              <div 
                className="bg-[#16161a] border border-slate-800 rounded-3xl p-6 flex items-center gap-4 cursor-pointer hover:border-indigo-500/30 transition-colors overflow-hidden"
                onClick={() => setSelectedGame(gamesData[1])}
              >
                <div className="w-12 h-12 bg-indigo-900/30 border border-indigo-500/20 rounded-2xl flex items-center justify-center font-bold text-lg text-indigo-400 shrink-0">
                  <Flame size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-tight">{gamesData[1].title}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Trending Next_</p>
                </div>
              </div>

              {/* Active Users/Session Miniature */}
              <div className="bg-[#16161a] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Session_Live</div>
                <div className="text-2xl font-mono tracking-tighter text-slate-300">00:24:51</div>
              </div>

              {/* Full Game Directory Section */}
              <div className="md:col-span-4 mt-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-slate-800" />
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-600">Archive_Explorer</h4>
                  <div className="h-px flex-1 bg-slate-800" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredGames.map((game, idx) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedGame(game)}
                      className="group cursor-pointer bg-[#16161a] border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800">
                          <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-500/70">{game.category}</span>
                            <Clock size={12} className="text-slate-700" />
                          </div>
                          <h3 className="text-sm font-bold tracking-tight uppercase group-hover:text-indigo-400 transition-colors mt-1">{game.title}</h3>
                          <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{game.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </main>

            {/* Footer */}
            <footer className="mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 font-mono text-[9px] uppercase tracking-[0.3em]">
              <div className="flex gap-8">
                <span>© 2026 NEBULA_ARCADE</span>
                <span className="opacity-50">V4.2.0_STABLE</span>
              </div>
              <div className="flex gap-8">
                <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Terminal_Exit</a>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div 
            key="viewer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col"
          >
            {/* Viewer Header */}
            <div className="bg-[#111114] border-b border-slate-800 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="h-6 w-px bg-slate-800" />
                <div>
                  <h2 className="text-sm font-bold tracking-tight uppercase">{selectedGame.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] text-indigo-500 font-bold uppercase tracking-widest">Active Session</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 hover:text-indigo-400 flex items-center justify-center transition-all"
                  onClick={() => window.open(selectedGame.iframeUrl, '_blank')}
                >
                  <ExternalLink size={16} />
                </button>
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Iframe Viewport */}
            <div className="flex-1 bg-black relative">
              <iframe 
                src={selectedGame.iframeUrl}
                className="w-full h-full border-none"
                title={selectedGame.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Viewer Footer */}
            <div className="bg-[#111114] border-t border-slate-800 px-6 py-2 flex items-center justify-between text-slate-600 font-mono text-[8px] uppercase tracking-[0.4em]">
              <div className="flex items-center gap-8">
                <span>Node: {selectedGame.id}.prox</span>
                <span>Enc: AES-256</span>
              </div>
              <div className="hidden sm:block">
                Streaming from Nebula_Mainframe // Link_Stable
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
}
