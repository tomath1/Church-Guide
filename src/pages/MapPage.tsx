import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches, typeConfig } from '../data/churchesData';
import 'leaflet/dist/leaflet.css';

function createMarkerIcon(type: string, isSelected: boolean) {
  const config = typeConfig[type];
  const size = isSelected ? 48 : 36;
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${config.color};
      border:3px solid white;
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:${isSelected ? 22 : 16}px;
      box-shadow:0 4px 15px rgba(0,0,0,0.3);
      transition:all 0.3s;
      ${isSelected ? 'transform:scale(1.2);z-index:9999;' : ''}
    ">${config.icon}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

const userMarkerIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:22px;height:22px;background:#22c55e;
    border:4px solid white;border-radius:50%;
    box-shadow:0 0 0 4px rgba(34,197,94,0.3),0 4px 10px rgba(0,0,0,0.3);
    animation:pulse-green 2s infinite;
  "></div>
  <style>@keyframes pulse-green{0%,100%{box-shadow:0 0 0 4px rgba(34,197,94,0.3),0 4px 10px rgba(0,0,0,0.3);}50%{box-shadow:0 0 0 10px rgba(34,197,94,0.1),0 4px 10px rgba(0,0,0,0.3);}}</style>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const { isDarkMode, language, userLocation, setUserLocation, setSelectedChurchId, setCurrentPage, addToRecent } = useStore();
  const [activeType, setActiveType] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [hoveredChurch, setHoveredChurch] = useState<number | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const filtered = activeType ? churches.filter(c => c.type === activeType) : churches;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const map = L.map(mapRef.current, {
      center: [27.0, 30.5],
      zoom: 6,
      zoomControl: false,
    });

    L.tileLayer(tileUrl, { attribution: '© OpenStreetMap © CARTO' }).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);

    markersRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!markersRef.current || !mapInstanceRef.current) return;
    markersRef.current.clearLayers();

    filtered.forEach(church => {
      const isSelected = hoveredChurch === church.id;
      const marker = L.marker([church.lat, church.lng], {
        icon: createMarkerIcon(church.type, isSelected),
        zIndexOffset: isSelected ? 1000 : 0,
      });

      const config = typeConfig[church.type];
      marker.bindPopup(`
        <div style="direction:rtl;text-align:right;min-width:200px;font-family:'Cairo',sans-serif;">
          <h3 style="font-size:14px;font-weight:900;color:${config.color};margin:0 0 4px;">${config.icon} ${church.name}</h3>
          <p style="font-size:11px;color:#666;margin:2px 0;">📍 ${church.city}، ${church.governorate}</p>
          <p style="font-size:11px;color:#888;">⭐ ${church.rating} (${church.reviewCount.toLocaleString()} تقييم)</p>
          ${church.description ? `<p style="font-size:11px;color:#555;margin-top:6px;line-height:1.5;">${church.description.slice(0, 80)}...</p>` : ''}
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button onclick="window.dispatchEvent(new CustomEvent('church-details',{detail:${church.id}}))"
              style="flex:1;padding:7px;background:${config.color};color:white;border:none;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;font-family:'Cairo',sans-serif;">
              التفاصيل
            </button>
            <button onclick="window.dispatchEvent(new CustomEvent('church-navigate',{detail:${church.id}}))"
              style="flex:1;padding:7px;background:#059669;color:white;border:none;border-radius:8px;font-size:12px;font-weight:bold;cursor:pointer;font-family:'Cairo',sans-serif;">
              🧭 اتجاهات
            </button>
          </div>
        </div>
      `, { maxWidth: 260, className: 'custom-popup' });

      marker.on('mouseover', () => setHoveredChurch(church.id));
      marker.on('mouseout', () => setHoveredChurch(null));
      markersRef.current?.addLayer(marker);
    });
  }, [filtered, hoveredChurch]);

  // Handle popup events
  useEffect(() => {
    const detailsHandler = (e: any) => {
      const id = e.detail;
      setSelectedChurchId(id);
      addToRecent(id);
      setCurrentPage('details');
    };
    const navHandler = (e: any) => {
      const id = e.detail;
      setSelectedChurchId(id);
      addToRecent(id);
      setCurrentPage('navigate');
    };
    window.addEventListener('church-details', detailsHandler);
    window.addEventListener('church-navigate', navHandler);
    return () => {
      window.removeEventListener('church-details', detailsHandler);
      window.removeEventListener('church-navigate', navHandler);
    };
  }, []);

  // User location marker
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (userLocation) {
      if (!userMarkerRef.current) {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userMarkerIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup('<div style="direction:rtl;font-family:Cairo;font-weight:bold;text-align:center;">📍 موقعك الحالي</div>');
      } else {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      }
    }
  }, [userLocation]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(pos => {
      const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserLocation(loc);
      mapInstanceRef.current?.flyTo([loc.lat, loc.lng], 13, { duration: 1.5 });
      setLocationLoading(false);
    }, () => setLocationLoading(false), { enableHighAccuracy: true });
  };

  const findNearest = () => {
    if (!userLocation) { handleGetLocation(); return; }
    let nearest = churches[0];
    let minDist = Infinity;
    churches.forEach(c => {
      const d = Math.sqrt(Math.pow(c.lat - userLocation.lat, 2) + Math.pow(c.lng - userLocation.lng, 2));
      if (d < minDist) { minDist = d; nearest = c; }
    });
    mapInstanceRef.current?.flyTo([nearest.lat, nearest.lng], 15, { duration: 2 });
    setSelectedChurchId(nearest.id);
  };

  const types = Object.entries(typeConfig);

  return (
    <div className="fixed inset-0 top-16 bottom-16">
      {/* Map */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Filter Panel Toggle */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="absolute top-4 left-4 z-[600] w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-xl text-white"
        style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}
      >
        🔍
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="absolute top-4 left-16 z-[600] w-56 rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: isDarkMode ? '#1f2937' : 'white' }}
          >
            <div className="p-3">
              <p className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'ar' ? 'تصفية حسب النوع' : 'Filter by Type'}
              </p>
              <button
                onClick={() => setActiveType('')}
                className={`w-full text-right px-3 py-2 rounded-xl text-sm font-bold mb-1 ${
                  activeType === '' ? 'text-white' : isDarkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-50'
                }`}
                style={activeType === '' ? { background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' } : {}}
              >
                🌍 {language === 'ar' ? 'الكل' : 'All'} ({churches.length})
              </button>
              {types.map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setActiveType(activeType === key ? '' : key)}
                  className={`w-full text-right px-3 py-2 rounded-xl text-sm font-bold mb-1 ${
                    activeType === key ? 'text-white' : isDarkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-50'
                  }`}
                  style={activeType === key ? { background: cfg.color } : {}}
                >
                  {cfg.icon} {language === 'ar' ? cfg.label : cfg.labelEn} ({churches.filter(c => c.type === key).length})
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Controls */}
      <div className="absolute bottom-6 right-4 z-[600] flex flex-col gap-2">
        <button
          onClick={handleGetLocation}
          disabled={locationLoading}
          className="w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-xl text-white"
          style={{ background: locationLoading ? '#9ca3af' : 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
        >
          {locationLoading ? '⏳' : '📍'}
        </button>
        <button
          onClick={findNearest}
          className="w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-xl text-white"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
        >
          🎯
        </button>
        <button
          onClick={() => mapInstanceRef.current?.setView([27.0, 30.5], 6)}
          className="w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-xl"
          style={{ background: isDarkMode ? '#374151' : 'white', color: '#6d28d9' }}
        >
          🗺️
        </button>
      </div>

      {/* Count Badge */}
      <div
        className="absolute bottom-6 left-4 z-[600] px-4 py-2 rounded-full shadow-xl text-white text-sm font-bold"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
      >
        {language === 'ar' ? `${filtered.length} موقع` : `${filtered.length} places`}
      </div>

      {/* Legend */}
      <div
        className="absolute top-4 right-16 z-[600] rounded-2xl shadow-xl overflow-hidden p-3"
        style={{ background: isDarkMode ? 'rgba(31,41,55,0.9)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
      >
        <div className="space-y-1">
          {types.slice(0, 4).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: cfg.color }} />
              <span className={`text-[10px] font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'ar' ? cfg.label : cfg.labelEn}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className={`text-[10px] font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {language === 'ar' ? 'موقعك' : 'Your location'}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .leaflet-popup-content-wrapper { border-radius: 16px !important; padding: 0 !important; }
        .leaflet-popup-content { margin: 12px !important; }
        .leaflet-routing-container { display: none !important; }
      `}</style>
    </div>
  );
}
