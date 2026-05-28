import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches } from '../data/churchesData';
import ChurchCard from '../components/ui/ChurchCard';

export default function FavoritesPage() {
  const { isDarkMode, language, favorites, recentlyVisited } = useStore();
  const favChurches = churches.filter(c => favorites.includes(c.id));
  const recentChurches = churches.filter(c => recentlyVisited.includes(c.id));

  return (
    <div className={`min-h-screen pb-24 pt-20 px-4 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Favorites */}
      <div className="mb-8">
        <h2 className={`text-xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          ❤️ {language === 'ar' ? 'كنائسي المفضلة' : 'My Favorites'} ({favChurches.length})
        </h2>

        <AnimatePresence>
          {favChurches.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`rounded-3xl p-10 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
            >
              <span className="text-6xl block mb-4">🤍</span>
              <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {language === 'ar' ? 'لا توجد مفضلات بعد' : 'No favorites yet'}
              </h3>
              <p className="text-gray-500 text-sm">
                {language === 'ar' ? 'اضغط على ❤️ في أي كنيسة لإضافتها' : 'Tap ❤️ on any church to add it'}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {favChurches.map((church, i) => (
                <motion.div
                  key={church.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ChurchCard church={church} index={i} />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Recently Visited */}
      {recentChurches.length > 0 && (
        <div>
          <h2 className={`text-xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            🕐 {language === 'ar' ? 'زرتها مؤخراً' : 'Recently Visited'}
          </h2>
          <div className="space-y-3">
            {recentChurches.map((church, i) => (
              <ChurchCard key={church.id} church={church} index={i} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
