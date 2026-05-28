import { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import LoadingScreen from './components/ui/LoadingScreen';
import TopBar from './components/ui/TopBar';
import BottomNav from './components/ui/BottomNav';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import NavigatePage from './pages/NavigatePage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const { isDarkMode, currentPage } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(t);
  }, []);

  // Apply dark mode to root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.style.background = isDarkMode ? '#030712' : '#f9fafb';
  }, [isDarkMode]);

  const showTopBar = currentPage !== 'navigate';
  const showBottomNav = currentPage !== 'navigate';

  return (
    <div
      className={`relative min-h-screen ${isDarkMode ? 'dark bg-gray-950' : 'bg-gray-50'}`}
      dir="rtl"
      style={{ fontFamily: 'Cairo, Tajawal, system-ui, sans-serif' }}
    >
      <LoadingScreen show={loading} />

      {showTopBar && (
        <TopBar
          showBack={currentPage === 'details'}
          onBack={() => {
            const { setCurrentPage } = useStore.getState();
            setCurrentPage('home');
          }}
        />
      )}

      <main className={showTopBar ? 'pt-16' : ''}>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'map' && <MapPage />}
        {currentPage === 'search' && <SearchPage />}
        {currentPage === 'details' && <DetailsPage />}
        {currentPage === 'navigate' && <NavigatePage />}
        {currentPage === 'favorites' && <FavoritesPage />}
        {currentPage === 'admin' && <AdminPage />}
      </main>

      {showBottomNav && <BottomNav />}
    </div>
  );
}
