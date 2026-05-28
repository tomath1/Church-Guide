import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

const navItems = [
  { id: 'home', icon: '🏠', label: 'الرئيسية', labelEn: 'Home' },
  { id: 'map', icon: '🗺️', label: 'الخريطة', labelEn: 'Map' },
  { id: 'search', icon: '🔍', label: 'البحث', labelEn: 'Search' },
  { id: 'favorites', icon: '❤️', label: 'المفضلة', labelEn: 'Favorites' },
  { id: 'admin', icon: '⚙️', label: 'الإدارة', labelEn: 'Admin' },
] as const;

export default function BottomNav() {
  const { currentPage, setCurrentPage, isDarkMode, language, favorites } = useStore();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[900] border-t ${
        isDarkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
      } backdrop-blur-xl`}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as any)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl transition-all duration-200"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-bg"
                  className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span className="relative text-xl">
                {item.icon}
                {item.id === 'favorites' && favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </span>
              <span
                className={`relative text-[10px] font-semibold ${
                  isActive ? 'text-white' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {language === 'ar' ? item.label : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area for mobile */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  );
}
