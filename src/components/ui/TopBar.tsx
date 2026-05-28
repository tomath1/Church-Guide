import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({ title, showBack, onBack }: TopBarProps) {
  const { isDarkMode, toggleDarkMode, language, toggleLanguage } = useStore();

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-[800] ${
        isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
      } border-b backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left - actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
              isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleLanguage}
            className={`px-3 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
              isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {language === 'ar' ? 'EN' : 'عر'}
          </button>
        </div>

        {/* Center - title or back */}
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={onBack}
              className="text-xl hover:scale-110 transition-transform"
            >
              ←
            </button>
          )}
          {title ? (
            <span className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              {title}
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xl">✝️</span>
              <span
                className="font-black text-base"
                style={{ color: '#6d28d9' }}
              >
                Egypt Christian Guide
              </span>
            </div>
          )}
        </div>

        {/* Right - logo / notification */}
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
          >
            ✝
          </div>
        </div>
      </div>
    </motion.div>
  );
}
