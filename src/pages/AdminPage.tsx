import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches, typeConfig } from '../data/churchesData';
import { useEffect } from 'react';
const ADMIN_PASSWORD = 'TOMAS2005@';

export default function AdminPage() {
  const { isDarkMode, isAdmin, setIsAdmin } = useStore();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'dashboard' | 'churches' | 'add'>('dashboard');

  const [formData, setFormData] = useState({
    name: '', nameEn: '', type: 'orthodox', governorate: '', city: '', address: '',
    lat: '', lng: '', phone: '', description: '', patron: '', founded: '',
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const stats = {
    total: churches.length,
    orthodox: churches.filter(c => c.type === 'orthodox').length,
    catholic: churches.filter(c => c.type === 'catholic').length,
    evangelical: churches.filter(c => c.type === 'evangelical').length,
    monastery: churches.filter(c => c.type === 'monastery').length,
    cathedral: churches.filter(c => c.type === 'cathedral').length,
    historical: churches.filter(c => c.type === 'historical').length,
    bishopric: churches.filter(c => c.type === 'bishopric').length,
    govs: [...new Set(churches.map(c => c.governorate))].length,
    avgRating: (churches.reduce((s, c) => s + c.rating, 0) / churches.length).toFixed(1),
    totalReviews: churches.reduce((s, c) => s + c.reviewCount, 0).toLocaleString(),
  };

  useEffect(() => {
    setIsAdmin(false);
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const handleLogin = () => {};

  const handleAddChurch = () => {};

  // 👇 شرط كامل + return جواه
if (!isAdmin) 
  
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 pt-16 pb-24 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`w-full max-w-md rounded-3xl p-8 shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto mb-4 shadow-xl"
              style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
            >
              ⚙️
            </div>
            <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              لوحة التحكم
            </h2>
            <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="كلمة المرور"
              className={`w-full px-4 py-4 rounded-2xl border-2 outline-none text-center font-bold text-lg tracking-widest ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'
              } focus:border-purple-500`}
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center font-bold">
                ❌ {error}
              </motion.p>
            )}
            <button
              onClick={handleLogin}
              className="w-full py-4 rounded-2xl text-white font-black text-lg shadow-xl"
              style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
            >
              دخول
            </button>
            <p className="text-center text-xs text-gray-400">
             ادمن فقط   <span className="font-bold text-purple-500">01288452212</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
<div className={`min-h-screen pb-24 pt-16 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
  
  {/* Admin Header */}
  <div className="px-4 py-4">
    
    <div className="flex items-center justify-between">

      {/* Title */}
      <div>
        <h1 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          ⚙️ لوحة التحكم
        </h1>
        <p className="text-gray-500 text-sm">Egypt Christian Guide Admin</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          setIsAdmin(false);
          localStorage.clear();
          sessionStorage.clear();
        }}
        className="px-3 py-2 rounded-xl text-red-500 bg-red-50 text-sm font-bold"
      >
        {language === 'ar' ? '' : 'Logout'}
      
      </button>

    </div>

  </div>
      {/* Tabs */}
      <div className={`flex gap-1 mx-4 p-1 rounded-2xl mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        {[
          { id: 'dashboard', icon: '📊', label: 'الإحصائيات' },
          { id: 'churches', icon: '⛪', label: 'الكنائس' },
          { id: 'add', icon: '➕', label: 'إضافة جديد' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'text-white shadow-md'
                : isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            style={activeTab === tab.id ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Total */}
            <div
              className="rounded-3xl p-6 text-white shadow-xl"
              style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-purple-200 text-sm">إجمالي المواقع</p>
                  <p className="text-5xl font-black">{stats.total}</p>
                </div>
                <span className="text-5xl opacity-50">⛪</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white/10 rounded-xl p-2">
                  <div className="text-xl font-black">{stats.govs}</div>
                  <div className="text-[10px] text-purple-200">محافظة</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2">
                  <div className="text-xl font-black">⭐{stats.avgRating}</div>
                  <div className="text-[10px] text-purple-200">متوسط التقييم</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2">
                  <div className="text-xl font-black">{stats.totalReviews}</div>
                  <div className="text-[10px] text-purple-200">تقييم</div>
                </div>
              </div>
            </div>

            {/* Type Stats */}
            <div className={`rounded-3xl p-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h3 className={`font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                📊 التصنيف حسب النوع
              </h3>
              <div className="space-y-3">
                {Object.entries(typeConfig).map(([key, cfg]) => {
                  const count = churches.filter(c => c.type === key).length;
                  const pct = Math.round((count / churches.length) * 100);
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {cfg.icon} {cfg.label}
                        </span>
                        <span className="font-bold" style={{ color: cfg.color }}>{count}</span>
                      </div>
                      <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: cfg.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📥', label: 'تصدير البيانات', color: '#059669' },
                { icon: '🔄', label: 'تحديث البيانات', color: '#6d28d9' },
                { icon: '👥', label: 'إدارة المستخدمين', color: '#2563eb' },
                { icon: '📝', label: 'مراجعة التقييمات', color: '#d97706' },
              ].map(action => (
                <button
                  key={action.label}
                  className={`p-4 rounded-2xl flex flex-col items-center gap-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-bold" style={{ color: action.color }}>{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Churches Tab */}
        {activeTab === 'churches' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className={`text-sm text-gray-500 mb-2`}>
              {churches.length} كنيسة ودير مسجلة
            </p>
            {churches.slice(0, 15).map((church) => (
              <div key={church.id}
                className={`p-4 rounded-2xl flex items-center gap-3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: typeConfig[church.type].color + '20', color: typeConfig[church.type].color }}
                >
                  {typeConfig[church.type].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{church.name}</p>
                  <p className="text-xs text-gray-500">{church.city}، {church.governorate}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm">✏️</button>
                  <button className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">🗑️</button>
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-gray-400 pt-2">
              + {churches.length - 15} موقع آخر...
            </p>
          </motion.div>
        )}

        {/* Add Church Tab */}
        {activeTab === 'add' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnimatePresence>
              {addSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4 p-4 rounded-2xl bg-green-500 text-white text-center font-bold"
                >
                  ✅ تمت إضافة الكنيسة بنجاح!
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleAddChurch} className="space-y-4">
              <div className={`rounded-3xl p-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  📝 معلومات أساسية
                </h3>
                <div className="space-y-3">
                  {[
                    { key: 'name', label: 'الاسم بالعربية', placeholder: 'كنيسة العذراء...' },
                    { key: 'nameEn', label: 'الاسم بالإنجليزية', placeholder: 'Virgin Mary Church...' },
                    { key: 'governorate', label: 'المحافظة', placeholder: 'القاهرة' },
                    { key: 'city', label: 'المدينة / المنطقة', placeholder: 'مصر الجديدة' },
                    { key: 'address', label: 'العنوان الكامل', placeholder: 'شارع...' },
                    { key: 'phone', label: 'رقم الهاتف', placeholder: '+20 2 ...' },
                    { key: 'patron', label: 'الشفيع', placeholder: 'العذراء مريم' },
                    { key: 'founded', label: 'سنة التأسيس', placeholder: '1900' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className={`text-xs font-bold mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={(formData as any)[field.key]}
                        onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${
                          isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-800'
                        } focus:border-purple-500`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-3xl p-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  🗺️ الموقع الجغرافي
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={`text-xs font-bold mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>خط العرض (Lat)</label>
                    <input type="number" step="any" value={formData.lat}
                      onChange={e => setFormData(p => ({ ...p, lat: e.target.value }))}
                      placeholder="30.0780"
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:border-purple-500`}
                    />
                  </div>
                  <div>
                    <label className={`text-xs font-bold mb-1 block ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>خط الطول (Lng)</label>
                    <input type="number" step="any" value={formData.lng}
                      onChange={e => setFormData(p => ({ ...p, lng: e.target.value }))}
                      placeholder="31.2750"
                      className={`w-full px-4 py-3 rounded-xl border outline-none text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:border-purple-500`}
                    />
                  </div>
                </div>
              </div>

              <div className={`rounded-3xl p-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>🏷️ التصنيف</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(typeConfig).map(([key, cfg]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFormData(p => ({ ...p, type: key }))}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                        formData.type === key ? 'text-white' : isDarkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                      style={formData.type === key ? { background: cfg.color } : {}}
                    >
                      {cfg.icon} {cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`rounded-3xl p-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <h3 className={`font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>📝 الوصف</h3>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="وصف مفصل عن الكنيسة أو الدير..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border outline-none text-sm resize-none ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-200'
                  } focus:border-purple-500`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl"
                style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
              >
                ➕ إضافة الكنيسة
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}
