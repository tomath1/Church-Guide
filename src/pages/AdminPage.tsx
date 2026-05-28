import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches, typeConfig } from '../data/churchesData';

const ADMIN_PASSWORD = 'TOMAS2005@';

export default function AdminPage() {
  const { isDarkMode, isAdmin, setIsAdmin } = useStore();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] =
    useState<'dashboard' | 'churches' | 'add'>('dashboard');

  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    type: 'orthodox',
    governorate: '',
    city: '',
    address: '',
    lat: '',
    lng: '',
    phone: '',
    description: '',
    patron: '',
    founded: '',
  });

  const [addSuccess, setAddSuccess] = useState(false);

  const language = 'ar';

  /* ================= FORCE LOGOUT ON REFRESH ================= */
  useEffect(() => {
    setIsAdmin(false);
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  /* ================= LOGIN ================= */
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setError('');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.clear();
    sessionStorage.clear();
  };

  const handleAddChurch = (e: React.FormEvent) => {
    e.preventDefault();
    setAddSuccess(true);
    setTimeout(() => setAddSuccess(false), 3000);

    setFormData({
      name: '',
      nameEn: '',
      type: 'orthodox',
      governorate: '',
      city: '',
      address: '',
      lat: '',
      lng: '',
      phone: '',
      description: '',
      patron: '',
      founded: '',
    });
  };

  /* ================= STATS ================= */
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
    avgRating: (
      churches.reduce((s, c) => s + c.rating, 0) / churches.length
    ).toFixed(1),
    totalReviews: churches
      .reduce((s, c) => s + c.reviewCount, 0)
      .toLocaleString(),
  };

  /* ================= LOGIN PAGE ================= */
  if (!isAdmin) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-center font-bold mb-4">Admin Login</h2>

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full p-3 border rounded-xl"
            placeholder="Password"
          />

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full mt-4 p-3 bg-purple-600 text-white rounded-xl font-bold"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  /* ================= ADMIN PANEL ================= */
  return (
    <div className={`min-h-screen pt-16 pb-24 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>

      {/* HEADER */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">
            ⚙️ لوحة التحكم
          </h1>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-xl text-red-500 bg-red-50 text-sm font-bold"
        >
          {language === 'ar' ? 'تسجيل خروج' : 'Logout'}
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-1 mx-4 p-1 rounded-2xl bg-gray-800 mb-4">
        {[
          { id: 'dashboard', icon: '📊', label: 'الإحصائيات' },
          { id: 'churches', icon: '⛪', label: 'الكنائس' },
          { id: 'add', icon: '➕', label: 'إضافة' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl ${
              activeTab === tab.id ? 'bg-purple-600 text-white' : 'text-gray-300'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="px-4">

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="text-white space-y-4">
            <div className="bg-purple-600 p-6 rounded-3xl">
              <h2 className="text-3xl font-black">{stats.total}</h2>
              <p>إجمالي الكنائس</p>
            </div>
          </div>
        )}

        {/* CHURCHES */}
        {activeTab === 'churches' && (
          <div className="space-y-2">
            {churches.slice(0, 10).map(church => (
              <div
                key={church.id}
                className="bg-white p-3 rounded-xl flex justify-between"
              >
                <div>
                  <p className="font-bold">{church.name}</p>
                  <p className="text-xs text-gray-500">
                    {church.city} - {church.governorate}
                  </p>
                </div>

                <button className="text-red-500 text-sm">🗑️</button>
              </div>
            ))}
          </div>
        )}

        {/* ADD */}
        {activeTab === 'add' && (
          <form onSubmit={handleAddChurch} className="space-y-3">

            <input
              className="w-full p-3 rounded-xl border"
              placeholder="الاسم"
              value={formData.name}
              onChange={e =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <button className="w-full p-3 bg-green-600 text-white rounded-xl font-bold">
              إضافة
            </button>

          </form>
        )}

      </div>

      {/* SUCCESS */}
      <AnimatePresence>
        {addSuccess && (
          <motion.div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-xl">
            تمت الإضافة
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
