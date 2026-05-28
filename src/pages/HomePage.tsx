import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches } from '../data/churchesData';
import ChurchCard from '../components/ui/ChurchCard';

const categories = [
  { id: '', icon: '🌍', label: 'الكل', labelEn: 'All' },
  { id: 'orthodox', icon: '✝️', label: 'أرثوذكسية', labelEn: 'Orthodox' },
  { id: 'catholic', icon: '⛪', label: 'كاثوليكية', labelEn: 'Catholic' },
  { id: 'evangelical', icon: '🕊️', label: 'إنجيلية', labelEn: 'Evangelical' },
  { id: 'monastery', icon: '🏛️', label: 'أديرة', labelEn: 'Monasteries' },
  { id: 'cathedral', icon: '🏰', label: 'كاتدرائيات', labelEn: 'Cathedrals' },
  { id: 'historical', icon: '🏺', label: 'تاريخية', labelEn: 'Historical' },
];

const christianHolidays = [
  { name: 'عيد الميلاد المجيد', nameEn: 'Christmas', date: '7 يناير', icon: '🎄' },
  { name: 'عيد القيامة المجيد', nameEn: 'Easter', date: 'متحرك', icon: '✝️' },
  { name: 'عيد البشارة', nameEn: 'Annunciation', date: '29 مارس', icon: '🕊️' },
  { name: 'دخول المسيح إلى مصر', nameEn: 'Holy Family in Egypt', date: '24 يونيو', icon: '⭐' },
];

export default function HomePage() {
  const { isDarkMode, language, setCurrentPage } = useStore();
  const [activeCategory, setActiveCategory] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(language === 'ar' ? 'صباح النور 🌅' : 'Good Morning 🌅');
    else if (hour < 17) setGreeting(language === 'ar' ? 'نهارك سعيد ☀️' : 'Good Afternoon ☀️');
    else setGreeting(language === 'ar' ? 'مساء الخير 🌙' : 'Good Evening 🌙');
  }, [language]);

  const featuredChurches = churches.filter(c => c.isFeatured);
  const filteredChurches = activeCategory
    ? churches.filter(c => c.type === activeCategory)
    : churches;

  const stats = {
    total: churches.length,
    monasteries: churches.filter(c => c.type === 'monastery').length,
    cathedrals: churches.filter(c => c.type === 'cathedral').length,
    govs: [...new Set(churches.map(c => c.governorate))].length,
  };

  return (
    <div
      className={`min-h-screen pb-24 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      {/* Hero Section */}
      <div className="relative h-72 overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt="Egypt Churches"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(109,40,217,0.7) 0%, rgba(15,52,96,0.85) 60%, rgba(5,5,20,0.95) 100%)'
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-end p-6 pb-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-200 text-sm mb-1"
          >
            {greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black text-white leading-tight mb-3"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            {language === 'ar' ? 'اكتشف الكنائس\nوالأديرة في مصر' : 'Discover Churches\n& Monasteries in Egypt'}
          </motion.h1>

          {/* Quick Search */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setCurrentPage('search')}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-white/80 text-sm hover:bg-white/20 transition-all"
          >
            <span className="text-lg">🔍</span>
            <span>{language === 'ar' ? 'ابحث عن كنيسة أو دير...' : 'Search for a church or monastery...'}</span>
          </motion.button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-3xl p-4 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-2xl font-black" style={{ color: '#6d28d9' }}>{stats.total}</div>
              <div className="text-[10px] text-gray-500 font-medium">{language === 'ar' ? 'موقع' : 'Places'}</div>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: '#D97706' }}>{stats.monasteries}</div>
              <div className="text-[10px] text-gray-500 font-medium">{language === 'ar' ? 'دير' : 'Monasteries'}</div>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: '#DC2626' }}>{stats.cathedrals}</div>
              <div className="text-[10px] text-gray-500 font-medium">{language === 'ar' ? 'كاتدرائية' : 'Cathedrals'}</div>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: '#059669' }}>{stats.govs}</div>
              <div className="text-[10px] text-gray-500 font-medium">{language === 'ar' ? 'محافظة' : 'Governorates'}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('map')}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
          >
            <span className="text-2xl">🗺️</span>
            <span className="text-xs font-bold">{language === 'ar' ? 'الخريطة' : 'Map'}</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('navigate')}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
          >
            <span className="text-2xl">🧭</span>
            <span className="text-xs font-bold">{language === 'ar' ? 'ابدأ الملاحة' : 'Navigate'}</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage('favorites')}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
          >
            <span className="text-2xl">❤️</span>
            <span className="text-xs font-bold">{language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
          </motion.button>
        </div>
      </div>

      {/* Christian Holidays */}
      <div className="px-4 mb-6">
        <h2 className={`text-lg font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          🎉 {language === 'ar' ? 'الأعياد المسيحية' : 'Christian Holidays'}
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {christianHolidays.map((h, i) => (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`shrink-0 p-3 rounded-2xl w-36 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
              } shadow-sm`}
            >
              <div className="text-2xl mb-2">{h.icon}</div>
              <p className={`text-xs font-bold leading-tight mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? h.name : h.nameEn}
              </p>
              <p className="text-[10px] text-gray-500">{h.date}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            ⭐ {language === 'ar' ? 'مواقع مميزة' : 'Featured Places'}
          </h2>
          <button
            onClick={() => setCurrentPage('search')}
            className="text-sm font-bold"
            style={{ color: '#6d28d9' }}
          >
            {language === 'ar' ? 'عرض الكل' : 'See All'}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {featuredChurches.map((church, i) => (
            <div key={church.id} className="w-64 shrink-0">
              <ChurchCard church={church} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <h2 className={`text-lg font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          🏷️ {language === 'ar' ? 'تصفح حسب النوع' : 'Browse by Type'}
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat.id
                  ? 'text-white shadow-md'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-white text-gray-600 border border-gray-200'
              }`}
              style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
            >
              <span>{cat.icon}</span>
              <span>{language === 'ar' ? cat.label : cat.labelEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Church List */}
      <div className="px-4 grid grid-cols-1 gap-4">
        {filteredChurches.map((church, i) => (
          <ChurchCard key={church.id} church={church} index={i} />
        ))}
      </div>
    </div>
  );
}
