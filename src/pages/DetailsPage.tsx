import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches, typeConfig } from '../data/churchesData';

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-lg' : 'text-sm';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`${sz} ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );
}

const fakeReviews = [
  { name: 'مارينا جرجس', text: 'مكان رائع وروحاني جداً، شعرت بالسلام الداخلي', rating: 5, date: 'منذ 3 أيام', avatar: '👩' },
  { name: 'بيتر ميلاد', text: 'من أجمل الكنائس التي زرتها، تاريخ عميق ورائع', rating: 5, date: 'منذ أسبوع', avatar: '👨' },
  { name: 'ريم مجدي', text: 'جميل جداً وهادئ، أنصح الجميع بالزيارة', rating: 4, date: 'منذ أسبوعين', avatar: '👩' },
];

export default function DetailsPage() {
  const { isDarkMode, language, selectedChurchId, setCurrentPage, setNavigatingToId, toggleFavorite, favorites } = useStore();
  const church = churches.find(c => c.id === selectedChurchId);

  if (!church) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-4xl mb-4">⛪</p>
          <p className={isDarkMode ? 'text-white' : 'text-gray-700'}>لا توجد كنيسة محددة</p>
          <button onClick={() => setCurrentPage('home')} className="mt-4 text-purple-600 font-bold">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const config = typeConfig[church.type];
  const isFav = favorites.includes(church.id);

  const images = ['/hanging-church.jpg', '/monastery-anthony.jpg', '/hero-bg.jpg', '/saint-catherine.jpg'];

  const handleNavigate = () => {
    setNavigatingToId(church.id);
    setCurrentPage('navigate');
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: church.name,
        text: church.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${church.name}\n${church.address}\n${church.description}`);
    }
  };

  return (
    <div className={`min-h-screen pb-32 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Hero Image */}
      <div className="relative h-80">
        <img
          src={images[church.id % 4]}
          alt={church.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="absolute top-20 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white text-xl"
        >
          ←
        </button>

        {/* Actions */}
        <div className="absolute top-20 left-4 flex gap-2">
          <button
            onClick={() => toggleFavorite(church.id)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-xl"
          >
            {isFav ? '❤️' : '🤍'}
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-xl"
          >
            🔗
          </button>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-xs font-bold mb-2"
            style={{ background: config.color }}
          >
            {config.icon} {language === 'ar' ? config.label : config.labelEn}
          </div>
          <h1 className="text-2xl font-black text-white leading-tight">
            {language === 'ar' ? church.name : church.nameEn}
          </h1>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-10 space-y-4">
        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-5 shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          {/* Rating */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <StarRating rating={church.rating} size="lg" />
              <p className="text-gray-500 text-xs mt-1">
                {church.reviewCount.toLocaleString()} {language === 'ar' ? 'تقييم' : 'reviews'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black" style={{ color: config.color }}>{church.rating}</div>
              {church.isFeatured && (
                <div className="text-xs font-bold" style={{ color: '#c9a227' }}>⭐ مميز</div>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-500 mb-1">📍 {language === 'ar' ? 'الموقع' : 'Location'}</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? church.city : church.cityEn}
              </p>
              <p className="text-xs text-gray-500">{language === 'ar' ? church.governorate : church.governorateEn}</p>
            </div>
            <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className="text-xs text-gray-500 mb-1">✝️ {language === 'ar' ? 'الطائفة' : 'Denomination'}</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'ar' ? church.denomination : church.denominationEn}
              </p>
            </div>
            {church.patron && (
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="text-xs text-gray-500 mb-1">🙏 {language === 'ar' ? 'الشفيع' : 'Patron'}</p>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {language === 'ar' ? church.patron : church.patronEn}
                </p>
              </div>
            )}
            {church.founded && (
              <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="text-xs text-gray-500 mb-1">📅 {language === 'ar' ? 'التأسيس' : 'Founded'}</p>
                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {church.founded}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-3xl p-5 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className={`font-black text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            📖 {language === 'ar' ? 'نبذة عن الكنيسة' : 'About'}
          </h2>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'ar' ? church.description : church.descriptionEn}
          </p>
          {church.historicalInfo && (
            <div className={`mt-4 p-3 rounded-2xl border-r-4 ${isDarkMode ? 'bg-gray-700' : 'bg-amber-50'}`}
              style={{ borderColor: '#c9a227' }}>
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-amber-800'}`}>
                🏺 {church.historicalInfo}
              </p>
            </div>
          )}
        </motion.div>

        {/* Schedule */}
        {church.schedule && church.schedule.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`rounded-3xl p-5 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className={`font-black text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              🕐 {language === 'ar' ? 'مواعيد القداسات' : 'Mass Schedule'}
            </h2>
            <div className="space-y-3">
              {church.schedule.map((s, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{s.day}</span>
                  <div className="flex gap-2">
                    {s.times.map(t => (
                      <span key={t}
                        className="text-xs px-2 py-1 rounded-full text-white font-bold"
                        style={{ background: config.color }}
                      >{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        {church.tags && church.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`rounded-3xl p-5 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className={`font-black text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              🏷️ {language === 'ar' ? 'مميزات المكان' : 'Features'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {church.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: config.color + '15', color: config.color }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact */}
        {church.phone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className={`rounded-3xl p-5 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <h2 className={`font-black text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              📞 {language === 'ar' ? 'التواصل' : 'Contact'}
            </h2>
            <a
              href={`tel:${church.phone}`}
              className="flex items-center gap-3 p-3 rounded-2xl text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
            >
              <span className="text-2xl">📞</span>
              <span className="font-bold">{church.phone}</span>
            </a>
          </motion.div>
        )}

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-3xl p-5 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className={`font-black text-base mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            💬 {language === 'ar' ? 'آراء الزوار' : 'Visitor Reviews'}
          </h2>
          <div className="space-y-3">
            {fakeReviews.map((r, i) => (
              <div key={i} className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-lg">{r.avatar}</div>
                  <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{r.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-xs ${s <= r.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400">{r.date}</span>
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{r.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Actions */}
      <div
        className={`fixed bottom-16 left-0 right-0 z-[700] p-4 ${isDarkMode ? 'bg-gray-950' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}
      >
        <div className="flex gap-3">
          {church.phone && (
            <a
              href={`tel:${church.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold shadow-lg"
              style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
            >
              📞 {language === 'ar' ? 'اتصال' : 'Call'}
            </a>
          )}
          <button
            onClick={handleNavigate}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold shadow-lg text-base"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
          >
            🧭 {language === 'ar' ? 'ابدأ الملاحة' : 'Navigate'}
          </button>
        </div>
      </div>
    </div>
  );
}
