import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches, governorates, typeConfig } from '../data/churchesData';
import ChurchCard from '../components/ui/ChurchCard';

export default function SearchPage() {
  const { isDarkMode, language } = useStore();
  const [query, setQuery] = useState('');
  const [selectedGov, setSelectedGov] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'reviews'>('rating');
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    let res = [...churches];

    if (query) {
      const q = query.toLowerCase();
      res = res.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.governorate.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.patron && c.patron.toLowerCase().includes(q)) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
      );
    }
    if (selectedGov) res = res.filter(c => c.governorate === selectedGov);
    if (selectedType) res = res.filter(c => c.type === selectedType);

    res.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name, 'ar');
    });

    return res;
  }, [query, selectedGov, selectedType, sortBy]);

  const hasFilters = query || selectedGov || selectedType;

  return (
    <div className={`min-h-screen pb-24 pt-16 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Search Header */}
      <div
        className={`sticky top-16 z-50 px-4 py-4 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}
      >
        {/* Search Input */}
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl mb-3 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <span className="text-xl shrink-0">🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث عن كنيسة، دير، مدينة...' : 'Search churches, monasteries...'}
            className={`flex-1 bg-transparent outline-none text-sm font-medium ${
              isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'
            }`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 text-lg shrink-0">✕</button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold border transition-all ${
              showFilters
                ? 'text-white border-purple-600'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 border-gray-700'
                  : 'bg-white text-gray-600 border-gray-200'
            }`}
            style={showFilters ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
          >
            ⚙️ {language === 'ar' ? 'تصفية' : 'Filters'}
            {hasFilters && <span className="w-2 h-2 bg-red-500 rounded-full" />}
          </button>

          {/* Sort */}
          {(['rating', 'reviews', 'name'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`shrink-0 px-3 py-2 rounded-full text-xs font-bold border transition-all ${
                sortBy === s
                  ? 'text-white border-purple-600'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 border-gray-700'
                    : 'bg-white text-gray-600 border-gray-200'
              }`}
              style={sortBy === s ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
            >
              {s === 'rating' ? '⭐ ' + (language === 'ar' ? 'الأعلى تقييماً' : 'Top Rated') :
               s === 'reviews' ? '💬 ' + (language === 'ar' ? 'الأكثر تقييماً' : 'Most Reviewed') :
               '🔤 ' + (language === 'ar' ? 'الاسم' : 'Name')}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`mt-3 rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <div className="p-4 space-y-4">
                {/* Governorate */}
                <div>
                  <p className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    📍 {language === 'ar' ? 'المحافظة' : 'Governorate'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedGov('')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                        !selectedGov ? 'text-white border-purple-600' : isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                      style={!selectedGov ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
                    >
                      {language === 'ar' ? 'الكل' : 'All'}
                    </button>
                    {governorates.map(g => (
                      <button
                        key={g}
                        onClick={() => setSelectedGov(selectedGov === g ? '' : g)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                          selectedGov === g ? 'text-white border-purple-600' : isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                        style={selectedGov === g ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type */}
                <div>
                  <p className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    🏷️ {language === 'ar' ? 'النوع' : 'Type'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedType('')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                        !selectedType ? 'text-white border-purple-600' : isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                      style={!selectedType ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
                    >
                      🌍 {language === 'ar' ? 'الكل' : 'All'}
                    </button>
                    {Object.entries(typeConfig).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedType(selectedType === key ? '' : key)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                          selectedType === key ? 'text-white' : isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                        }`}
                        style={selectedType === key ? { background: cfg.color } : { borderColor: isDarkMode ? undefined : cfg.color + '40' }}
                      >
                        {cfg.icon} {language === 'ar' ? cfg.label : cfg.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                {hasFilters && (
                  <button
                    onClick={() => { setQuery(''); setSelectedGov(''); setSelectedType(''); }}
                    className="w-full py-2 rounded-xl text-sm font-bold text-red-500 bg-red-50 dark:bg-red-900/20"
                  >
                    🗑️ {language === 'ar' ? 'مسح جميع الفلاتر' : 'Clear All Filters'}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <p className={`text-xs font-bold mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {language === 'ar' ? `${results.length} نتيجة` : `${results.length} results`}
        </p>
      </div>

      {/* Results */}
      <div className="px-4 space-y-4 mt-2">
        <AnimatePresence>
          {results.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <span className="text-6xl mb-4">🔍</span>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {language === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
              </h3>
              <p className="text-gray-500 text-sm">
                {language === 'ar' ? 'جرب كلمات بحث مختلفة' : 'Try different search terms'}
              </p>
            </motion.div>
          ) : (
            results.map((church, i) => (
              <motion.div
                key={church.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.03 }}
              >
                <ChurchCard church={church} index={i} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
