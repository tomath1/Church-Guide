import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Language
  language: 'ar' | 'en';
  toggleLanguage: () => void;

  // Auth
  user: { name: string; email: string; avatar?: string } | null;
  isGuest: boolean;
  login: (user: { name: string; email: string; avatar?: string }) => void;
  loginAsGuest: () => void;
  logout: () => void;

  // Favorites
  favorites: number[];
  toggleFavorite: (id: number) => void;

  // Recently Visited
  recentlyVisited: number[];
  addToRecent: (id: number) => void;

  // Navigation
  currentPage: 'home' | 'map' | 'search' | 'favorites' | 'admin' | 'details' | 'navigate';
  setCurrentPage: (page: AppState['currentPage']) => void;

  // Selected church
  selectedChurchId: number | null;
  setSelectedChurchId: (id: number | null) => void;

  // User location
  userLocation: { lat: number; lng: number } | null;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterType: string;
  setFilterType: (t: string) => void;
  filterGov: string;
  setFilterGov: (g: string) => void;

  // Navigation active
  navigatingToId: number | null;
  setNavigatingToId: (id: number | null) => void;

  // Admin
  isAdmin: boolean;
  setIsAdmin: (v: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set(s => ({ isDarkMode: !s.isDarkMode })),

      language: 'ar',
      toggleLanguage: () => set(s => ({ language: s.language === 'ar' ? 'en' : 'ar' })),

      user: null,
      isGuest: false,
      login: (user) => set({ user, isGuest: false }),
      loginAsGuest: () => set({ isGuest: true, user: null }),
      logout: () => set({ user: null, isGuest: false }),

      favorites: [],
      toggleFavorite: (id) => set(s => ({
        favorites: s.favorites.includes(id)
          ? s.favorites.filter(f => f !== id)
          : [...s.favorites, id]
      })),

      recentlyVisited: [],
      addToRecent: (id) => set(s => ({
        recentlyVisited: [id, ...s.recentlyVisited.filter(r => r !== id)].slice(0, 10)
      })),

      currentPage: 'home',
      setCurrentPage: (page) => set({ currentPage: page }),

      selectedChurchId: null,
      setSelectedChurchId: (id) => set({ selectedChurchId: id }),

      userLocation: null,
      setUserLocation: (loc) => set({ userLocation: loc }),

      searchQuery: '',
      setSearchQuery: (q) => set({ searchQuery: q }),
      filterType: '',
      setFilterType: (t) => set({ filterType: t }),
      filterGov: '',
      setFilterGov: (g) => set({ filterGov: g }),

      navigatingToId: null,
      setNavigatingToId: (id) => set({ navigatingToId: id }),

      isAdmin: false,
      setIsAdmin: (v) => set({ isAdmin: v }),
    }),
    {
      name: 'egypt-christian-guide',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        language: state.language,
        favorites: state.favorites,
        recentlyVisited: state.recentlyVisited,
        user: state.user,
        isGuest: state.isGuest,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
