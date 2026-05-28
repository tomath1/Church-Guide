import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Church, typeConfig } from '../../data/churchesData';

interface ChurchCardProps {
  church: Church;
  index?: number;
  compact?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xs ${i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </span>
      ))}
      <span className="text-xs text-gray-500 mr-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ChurchCard({ church, index = 0, compact = false }: ChurchCardProps) {
  const { isDarkMode, language, setSelectedChurchId, setCurrentPage, toggleFavorite, favorites, addToRecent } = useStore();
  const config = typeConfig[church.type];
  const isFav = favorites.includes(church.id);

  const handleClick = () => {
    setSelectedChurchId(church.id);
    addToRecent(church.id);
    setCurrentPage('details');
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedChurchId(church.id);
    addToRecent(church.id);
    setCurrentPage('navigate');
  };

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(church.id);
  };

  const placeImages = [
    '/hanging-church.jpg',
    '/monastery-anthony.jpg',
    '/hero-bg.jpg',
    '/saint-catherine.jpg',
  ];
  const img = placeImages[church.id % 4];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={handleClick}
        className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:scale-[1.01] ${
          isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
        } shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
      >
        <div
          className="w-14 h-14 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-2xl"
          style={{ background: config.color + '20' }}
        >
          <span>{config.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'ar' ? church.name : church.nameEn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            📍 {language === 'ar' ? church.city : church.cityEn}، {language === 'ar' ? church.governorate : church.governorateEn}
          </p>
          <StarRating rating={church.rating} />
        </div>
        <button
          onClick={handleNavigate}
          className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
        >
          🧭
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 100 }}
      onClick={handleClick}
      className={`rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      }`}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={img}
          alt={church.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Type Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg"
          style={{ background: config.color }}
        >
          {config.icon} {language === 'ar' ? config.label : config.labelEn}
        </div>

        {/* Featured Badge */}
        {church.isFeatured && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold shadow-lg"
            style={{ background: 'linear-gradient(90deg, #e8c97a, #c9a227)', color: '#1a1a00' }}>
            ⭐ مميز
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFav}
          className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl transition-all hover:scale-110"
        >
          {isFav ? '❤️' : '🤍'}
        </button>

        {/* Navigate Button */}
        <button
          onClick={handleNavigate}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-lg transition-all hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
        >
          🧭
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`font-black text-base leading-snug mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {language === 'ar' ? church.name : church.nameEn}
        </h3>
        <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
          📍 {language === 'ar' ? church.city : church.cityEn}، {language === 'ar' ? church.governorate : church.governorateEn}
        </p>

        <div className="flex items-center justify-between">
          <StarRating rating={church.rating} />
          <span className="text-xs text-gray-400">({church.reviewCount.toLocaleString()})</span>
        </div>

        {church.description && (
          <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {language === 'ar' ? church.description : church.descriptionEn}
          </p>
        )}

        {church.tags && church.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {church.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{ background: config.color + '15', color: config.color }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
