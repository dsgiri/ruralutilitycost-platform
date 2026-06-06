import { Link, useLocation } from 'react-router-dom';
import { Droplet, LayoutGrid, Shovel, Trees, ArrowDownToDot, PawPrint, Sun, Wifi, Tv, Home as HomeIcon, Flame, Crop, CalendarHeart, Bird, Scissors, TrendingUp, Search, Zap, ShieldCheck, Map, Leaf } from 'lucide-react';
import { cn } from '../lib/utils';
import { ReactNode, useState } from 'react';
import { Logo } from './Logo';
import { A11yControls } from './A11yControls';

import { Building2, Banknote, ShieldPlus } from 'lucide-react';

const navCategories = [
  {
    id: "property",
    shortTitle: "Property",
    categoryIcon: Building2,
    title: "Property & Construction",
    items: [
      { path: '/rural-land', label: 'Rural Land Value', icon: Map },
      { path: '/septic', label: 'Septic Tank Size', icon: LayoutGrid },
      { path: '/fill-dirt', label: 'Fill Dirt Cost', icon: Shovel },
      { path: '/gravel', label: 'Gravel Cost', icon: Trees },
      { path: '/fencing', label: 'Fencing Cost', icon: Crop },
      { path: '/well', label: 'Well Water Drilling', icon: ArrowDownToDot },
    ]
  },
  {
    id: "utilities",
    shortTitle: "Utilities",
    categoryIcon: Zap,
    title: "Energy & Utilities",
    items: [
      { path: '/energy-demand', label: 'Peak Energy Demand', icon: Zap },
      { path: '/water-fill', label: 'Water Fill Charge', icon: Droplet },
      { path: '/propane', label: 'Propane Refill', icon: Flame },
      { path: '/solar', label: 'Off-Grid Solar', icon: Sun },
      { path: '/internet', label: 'Wireless Internet', icon: Wifi },
      { path: '/cable', label: 'Cable TV', icon: Tv },
    ]
  },
  {
    id: "farm",
    shortTitle: "Farm",
    categoryIcon: PawPrint,
    title: "Animal & Farm",
    items: [
      { path: '/habitat-cost', label: 'Habitat Builder', icon: Leaf },
      { path: '/livestock', label: 'Livestock Water', icon: PawPrint },
      { path: '/gestation', label: 'Animal Gestation', icon: CalendarHeart },
      { path: '/incubation', label: 'Egg Incubation', icon: Bird },
    ]
  },
  {
    id: "business",
    shortTitle: "Business",
    categoryIcon: TrendingUp,
    title: "Business & Profit",
    items: [
      { path: '/cut-cost', label: 'Cut Cost', icon: Scissors },
      { path: '/expand-profit', label: 'Expand Profit', icon: TrendingUp },
      { path: '/compliance', label: 'Processing & Compliance', icon: ShieldCheck },
    ]
  },
  {
    id: "grants",
    shortTitle: "Grants",
    categoryIcon: Banknote,
    title: "Government Aid & Grants",
    items: [
      { path: '/grant-finder', label: 'Grant Finder', icon: Search },
    ]
  }
];

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  ...navCategories.flatMap(c => c.items)
];

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = navCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-gray-50 font-sans print:h-auto print:overflow-visible print:bg-white">
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <nav className="w-60 bg-[#1a5f3f] text-white flex-shrink-0 hidden md:flex flex-col print:hidden">
        <div className="border-b border-white/10">
          <Link to="/" onClick={() => setSearchQuery('')} className="p-6 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer">
            <Logo className="w-10 h-10 text-white" />
            <h1 className="text-xl font-bold leading-tight">
              Rural Utility<br/>
              <span className="text-green-300">Cost</span>
              <span className="text-green-400/80 ml-0.5">$</span>
            </h1>
          </Link>
        </div>
        
        <div className="px-4 py-3 border-b border-white/10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/50" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex-grow py-4 overflow-y-auto">
          <ul className="space-y-1">
            {filteredCategories.length === 0 && searchQuery !== '' ? (
              <li className="px-6 py-4 text-sm text-white/60 text-center italic">
                No tools found
              </li>
            ) : (
              filteredCategories.map((category) => (
                <li key={category.title} className="pt-4">
                  <div className="px-6 pb-2 text-xs font-bold text-green-300/70 uppercase tracking-wider">
                    {category.title}
                  </div>
                  <ul className="space-y-1">
                    {category.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={cn(
                              'px-6 py-2.5 flex items-center gap-3 cursor-pointer transition-all',
                              isActive
                                ? 'bg-white/20 border-l-4 border-green-300 opacity-100 font-bold text-white'
                                : 'hover:bg-white/5 opacity-80 hover:opacity-100 border-l-4 border-transparent font-medium text-white/90'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm tracking-wide">{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 max-h-screen overflow-hidden print:max-h-none print:overflow-visible">
        {/* HEADER */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-50 w-full relative print:hidden">
          <div className="md:hidden flex items-center">
            {/* Mobile simplified header/link */}
            <Link to="/" className="font-bold text-lg text-gray-900 flex items-center gap-2">
               <Logo className="h-6 w-6 text-[#1a5f3f]" />
               Rural Costs
            </Link>
          </div>
          
          {/* Quick Categories instead of page title */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
            {navCategories.map(cat => {
              const Icon = cat.categoryIcon;
              return (
                <Link 
                  to={`/#${cat.id}`}
                  key={cat.id} 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-[#1a5f3f]/10 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-700 hover:text-[#1a5f3f] dark:text-gray-200 dark:hover:text-green-300 rounded-full text-sm font-medium transition-colors border border-transparent hover:border-[#1a5f3f]/20 dark:border-gray-700 dark:hover:border-green-500/50"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {cat.shortTitle}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <A11yControls />
            <span className="text-xs text-gray-500 hidden sm:inline-block">Location Context: <span className="font-medium text-gray-800">USA</span></span>
            {location.pathname !== '/' && (
              <button className="px-4 py-1.5 bg-[#1a5f3f] text-white text-sm rounded font-medium shadow-sm hover:bg-[#154d32] transition-colors whitespace-nowrap">
                Share Results
              </button>
            )}
          </div>
        </header>

        {/* Mobile Nav (Scrollable horizontal) */}
        <style>{`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="md:hidden bg-white border-b border-gray-200 overflow-x-auto flex-shrink-0 z-10 relative hide-scroll print:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <nav className="flex px-4 py-2 space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium flex flex-col items-center gap-1 transition-colors min-w-[80px]',
                    isActive
                      ? 'bg-[#1a5f3f]/10 text-[#1a5f3f]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] leading-tight text-center">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="flex-grow overflow-y-auto print:overflow-visible flex flex-col">
          <div className="flex-grow flex flex-col">
            {children}
          </div>
          
          {/* SITEWIDE FOOTER */}
          <footer className="mt-8 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] px-4 sm:px-8 py-8 text-center text-xs text-gray-500 dark:text-gray-400 print:hidden shrink-0">
            <p className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-sm">All calculator results are estimates only.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
              <Link to="/" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Home</Link>
              <span className="opacity-40">|</span>
              <Link to="/about" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">About</Link>
              <span className="opacity-40">|</span>
              <Link to="/privacy-policy" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Privacy Policy</Link>
              <span className="opacity-40">|</span>
              <Link to="/terms-of-use" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Terms of Use</Link>
              <span className="opacity-40">|</span>
              <Link to="/disclaimer" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Disclaimer</Link>
              <span className="opacity-40">|</span>
              <Link to="/cookie-policy" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Cookie Policy</Link>
              <span className="opacity-40">|</span>
              <Link to="/contact" className="hover:text-[#1a5f3f] dark:hover:text-[#6ee7b7] hover:underline font-medium">Contact</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Rural Utility Cost. All rights reserved.</p>
          </footer>
        </div>
        
        {/* AD SPACE (ADSENSE OPTIMIZED) */}
        <div className="h-16 bg-gray-200 flex-shrink-0 flex items-center justify-center border-t border-gray-300 print:hidden">
          <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Advertisement</span>
        </div>
      </main>
    </div>
  );
}
