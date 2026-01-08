
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SunIcon, 
  MoonIcon, 
  Bars3Icon, 
  XMarkIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useData } from '../context/DataContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useData();
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Inquiry', path: '/inquiry' },
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <nav ref={menuRef} className="fixed top-0 w-full z-[60] glass border-b border-white/5 dark:border-white/5 light:border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 group"
            >
              {data.logo && (
                <img src={data.logo} alt="" className="h-8 md:h-10 w-auto object-contain rounded" />
              )}
              {!data.logo && (
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg md:rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                  <span className="text-white font-bold text-lg md:text-xl">N</span>
                </div>
              )}
              <span className="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                Nexlify<span className="text-primary-light">.</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path 
                      ? 'text-primary-light' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
                aria-label="Toggle Theme"
              >
                {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
              <Link 
                to="/inquiry" 
                className="px-5 py-2.5 bg-primary hover:bg-primary-light text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-primary/20"
              >
                Hire Us
              </Link>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300"
              >
                {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-300 transition-transform active:scale-90"
              >
                {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass border-t border-white/5 py-6 px-6 space-y-4 animate-in fade-in slide-in-from-top-4 shadow-2xl">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                  location.pathname === link.path 
                    ? 'bg-primary/10 text-primary-light' 
                    : 'text-slate-600 dark:text-slate-400 active:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/inquiry" 
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-4 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl"
            >
              Hire Us
            </Link>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>

      <footer className="bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
            <div className="sm:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                {data.logo && (
                  <img src={data.logo} alt="" className="h-8 md:h-10 w-auto object-contain rounded" />
                )}
                {!data.logo && (
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">N</span>
                  </div>
                )}
                <span className="text-xl font-display font-bold text-slate-900 dark:text-white">Nexlify</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                Empowering businesses with premium digital services that drive growth and visibility.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-primary-light transition-colors">About Us</Link></li>
                <li><Link to="/inquiry" className="hover:text-primary-light transition-colors">Contact</Link></li>
                <li className="flex items-center text-primary-light/80 hover:text-primary-light transition-colors">
                  <ShieldCheckIcon className="w-4 h-4 mr-2" />
                  <Link to="/admin">Admin Access</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-6">Expertise</h4>
              <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                <li>Web Development</li>
                <li>Graphic Design</li>
                <li>Professional Writing</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-6">
            <p className="text-center md:text-left">© {new Date().getFullYear()} Nexlify. Built for modern brands.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary-light transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary-light transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary-light transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
