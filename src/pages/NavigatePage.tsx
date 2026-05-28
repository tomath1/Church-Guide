import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { churches, typeConfig } from '../data/churchesData';

export default function NavigatePage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const { isDarkMode, language, selectedChurchId, navigatingToId, setCurrentPage, userLocation, setUserLocation } = useStore();

  const churchId = navigatingToId || selectedChurchId;
  const church = churches.find(c => c.id === churchId);

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [steps, setSteps] = useState<Array<{ icon: string; text: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [travelMode, setTravelMode] = useState<'driving' | 'walking'>('driving');
  const [locLoading, setLocLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(pos => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      setLocLoading(false);
    }, () => setLocLoading(false), { enableHighAccuracy: true });
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    const center: [number, number] = church ? [church.lat, church.lng] : [27, 30.5];
    const map = L.map(mapRef.current, { center, zoom: 13, zoomControl: false });
    L.tileLayer(
      isDarkMode
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: '© OpenStreetMap' }
    ).addTo(map);
    L.control.zoom({ position: 'topright' }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    if (!userLocation) getLocation();

    return () => { map.remove(); mapInstanceRef.current = null; };
  }, []);

  // Add destination marker
  useEffect(() => {
    if (!church || !layerRef.current) return;
    const cfg = typeConfig[church.type];
    const destIcon = L.divIcon({
      className: '',
      html: `<div style="width:48px;height:48px;background:${cfg.color};border:4px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 20px rgba(0,0,0,0.3);">${cfg.icon}</div>`,
      iconSize: [48, 48], iconAnchor: [24, 24],
    });
    L.marker([church.lat, church.lng], { icon: destIcon })
      .addTo(layerRef.current)
      .bindPopup(`<div style="direction:rtl;font-family:Cairo;font-weight:900;font-size:13px;text-align:center;">${church.name}</div>`)
      .openPopup();
  }, [church]);

  // Route calculation
  const calcRoute = async (from: { lat: number; lng: number }, to: { lat: number; lng: number }) => {
    setLoading(true); setError(''); setSteps([]);
    const profile = travelMode === 'walking' ? 'foot' : 'car';
    const url = `https://router.project-osrm.org/route/v1/${profile}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&steps=true`;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.code !== 'Ok' || !data.routes?.length) throw new Error('no route');

      const route = data.routes[0];
      const coords = route.geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);

      layerRef.current?.eachLayer(l => {
        if ((l as any)._isRoute) layerRef.current?.removeLayer(l);
      });

      const line = L.polyline(coords, {
        color: '#6d28d9', weight: 6, opacity: 0.85,
        dashArray: undefined,
      });
      (line as any)._isRoute = true;
      line.addTo(layerRef.current!);
      mapInstanceRef.current?.fitBounds(line.getBounds(), { padding: [60, 60] });

      const distKm = (route.distance / 1000).toFixed(1);
      const durMin = Math.round(route.duration / 60);
      const h = Math.floor(durMin / 60);
      const m = durMin % 60;
      setDistance(`${distKm} كم`);
      setDuration(h > 0 ? `${h}س ${m}د` : `${m} دقيقة`);

      const parsedSteps: Array<{ icon: string; text: string }> = [];
      route.legs[0].steps.forEach((s: any) => {
        const d = s.distance > 1000 ? `${(s.distance / 1000).toFixed(1)}كم` : `${Math.round(s.distance)}م`;
        const road = s.name || 'الطريق';
        const mod = s.maneuver?.modifier;
        let icon = '⬆️'; let text = '';
        switch (s.maneuver?.type) {
          case 'depart': icon = '🚗'; text = `انطلق على ${road} (${d})`; break;
          case 'arrive': icon = '🏁'; text = 'وصلت إلى الوجهة'; break;
          case 'turn':
            if (mod === 'left') { icon = '⬅️'; text = `انعطف يساراً إلى ${road} (${d})`; }
            else if (mod === 'right') { icon = '➡️'; text = `انعطف يميناً إلى ${road} (${d})`; }
            else if (mod === 'uturn') { icon = '🔄'; text = `استدر على ${road}`; }
            else { icon = '↪️'; text = `اتجه إلى ${road} (${d})`; }
            break;
          case 'continue': icon = '⬆️'; text = `استمر على ${road} (${d})`; break;
          case 'roundabout': icon = '🔄'; text = `ادخل الدوار ثم ${road} (${d})`; break;
          case 'merge': icon = '🔀'; text = `اندمج في ${road} (${d})`; break;
          case 'fork':
            icon = mod === 'left' ? '↙️' : '↘️';
            text = `خذ المسار إلى ${road} (${d})`;
            break;
          default: icon = '📍'; text = `اتجه إلى ${road} (${d})`; break;
        }
        if (text) parsedSteps.push({ icon, text });
      });
      setSteps(parsedSteps);
    } catch {
      setError('لم يتم العثور على مسار. يرجى المحاولة مرة أخرى.');
    }
    setLoading(false);
  };

  // Add user marker and calc route
  useEffect(() => {
    if (!mapInstanceRef.current || !layerRef.current) return;
    if (userLocation) {
      const userIcon = L.divIcon({
        className: '',
        html: `<div style="width:22px;height:22px;background:#22c55e;border:4px solid white;border-radius:50%;box-shadow:0 0 0 5px rgba(34,197,94,0.3),0 4px 10px rgba(0,0,0,0.3);"></div>`,
        iconSize: [22, 22], iconAnchor: [11, 11],
      });

      layerRef.current.eachLayer(l => {
        if ((l as any)._isUser) layerRef.current?.removeLayer(l);
      });
      const m = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon });
      (m as any)._isUser = true;
      m.addTo(layerRef.current).bindPopup('<div style="direction:rtl;font-family:Cairo;font-weight:bold;text-align:center;">📍 موقعك</div>');

      if (church) calcRoute(userLocation, { lat: church.lat, lng: church.lng });
    }
  }, [userLocation, church, travelMode]);

  if (!church) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <span className="text-5xl">🗺️</span>
        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
          {language === 'ar' ? 'اختر كنيسة أولاً' : 'Select a church first'}
        </p>
        <button onClick={() => setCurrentPage('search')}
          className="px-6 py-3 rounded-2xl text-white font-bold"
          style={{ background: 'linear-gradient(135deg, #6d28d9, #4f46e5)' }}>
          {language === 'ar' ? 'البحث عن كنيسة' : 'Search Churches'}
        </button>
      </div>
    );
  }

  const cfg = typeConfig[church.type];

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Header */}
      <div
        className="shrink-0 pt-16 pb-3 px-4 z-10"
        style={{ background: `linear-gradient(135deg, ${cfg.color}, #4f46e5)` }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage('details')}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-xl shrink-0"
          >←</button>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-black text-sm truncate">
              {cfg.icon} {language === 'ar' ? church.name : church.nameEn}
            </h2>
            <p className="text-white/80 text-xs">
              📍 {language === 'ar' ? church.city : church.cityEn}، {language === 'ar' ? church.governorate : church.governorateEn}
            </p>
          </div>
          {distance && (
            <div className="text-right shrink-0 bg-white/20 rounded-xl px-3 py-2">
              <div className="text-white font-black text-sm">{distance}</div>
              <div className="text-white/80 text-xs">{duration}</div>
            </div>
          )}
        </div>

        {/* Travel Mode + Get Location */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setTravelMode('driving')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              travelMode === 'driving' ? 'bg-white text-purple-700' : 'bg-white/20 text-white'
            }`}
          >
            🚗 {language === 'ar' ? 'سيارة' : 'Driving'}
          </button>
          <button
            onClick={() => setTravelMode('walking')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              travelMode === 'walking' ? 'bg-white text-purple-700' : 'bg-white/20 text-white'
            }`}
          >
            🚶 {language === 'ar' ? 'مشي' : 'Walking'}
          </button>
          <button
            onClick={getLocation}
            disabled={locLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-green-500/80 text-white transition-all"
          >
            {locLoading ? '⏳' : '📍'} {language === 'ar' ? 'موقعي' : 'My Location'}
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 text-center shadow-2xl">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                {language === 'ar' ? 'جاري حساب المسار...' : 'Calculating route...'}
              </p>
            </div>
          </div>
        )}

        {!userLocation && !loading && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              ⚠️ {language === 'ar' ? 'فعّل الموقع الجغرافي للاتجاهات' : 'Enable location for directions'}
            </div>
          </div>
        )}

        {error && (
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-red-500 text-white text-xs font-bold p-3 rounded-2xl shadow-lg text-center">
              ⚠️ {error}
            </div>
          </div>
        )}
      </div>

      {/* Steps Panel */}
      {steps.length > 0 && (
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          className={`shrink-0 max-h-52 overflow-y-auto border-t ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="p-4">
            <h3 className={`text-sm font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              📋 {language === 'ar' ? `خطوات الرحلة (${distance} - ${duration})` : `Route Steps (${distance} - ${duration})`}
            </h3>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className={`flex items-start gap-3 p-2 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <span className="text-base shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 text-sm font-bold">
                    {step.icon}
                  </span>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        .leaflet-popup-content-wrapper { border-radius: 16px !important; }
        .leaflet-popup-content { margin: 12px !important; }
      `}</style>
    </div>
  );
}
