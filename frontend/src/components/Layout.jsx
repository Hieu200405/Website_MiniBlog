import { useState, useEffect, useContext } from 'react';
import { motion as Motion } from 'framer-motion';
import { Sun, Moon, LogOut, Terminal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextObject';
import StatusWidget from './StatusWidget';

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1120] transition-colors duration-500">
      {/* Sidebar/Navbar */}
      <nav className="fixed top-0 w-full z-40 glass dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/posts')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <Terminal size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block dark:text-white">
              MiniBlog <span className="text-blue-500">DevOps</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <StatusWidget />
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {token && (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors text-sm font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-[calc(100-24)]">
        <Motion.div
           key={location.pathname}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          {children}
        </Motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            © 2026 MiniBlog <span className="text-blue-500 font-bold">DevOps</span> Edition
          </div>
          <div className="flex items-center gap-3">
             <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-500">v1.2.0-stable</span>
             <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-mono">PROD ENVIRONMENT</span>
          </div>
        </div>
      </footer>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </div>
  );
};

export default Layout;
