import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Church, typeColors, typeIcons } from '../data/churches';

interface NavigationPanelProps {
  church: Church;
  userLocation: { lat: number; lng: number } | null;
  onClose: () => void;
  mainMap: L.Map | null;
}

export default function NavigationPanel({ church, userLocation, onClose }: NavigationPanelProps) {
  const navMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navMapRef.current) return;

    // Create navigation map
    const map = L.map(navMapRef.current, {
      center: [church.lat, church.lng],
      zoom: 13,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    mapInstanceRef.current = map;
    routeLayerRef.current = L.layerGroup().addTo(map);

    // Add destination marker
    const destIcon = L.divIcon({
      className: 'dest-marker',
      html: `<div style="
        width: 40px; height: 40px; background: ${typeColors[church.type]};
        border: 3px solid white; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.4);
      ">${typeIcons[church.type]}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    L.marker([church.lat, church.lng], { icon: destIcon })
      .addTo(routeLayerRef.current)
      .bindPopup(`<div style="direction:rtl; text-align:center; font-weight:bold;">${church.name}</div>`)
      .openPopup();

    if (userLocation) {
      // Add user marker
      const userIcon = L.divIcon({
        className: 'user-nav-marker',
        html: `<div style="
          width: 24px; height: 24px; background: #22C55E;
          border: 4px solid white; border-radius: 50%;
          box-shadow: 0 0 12px rgba(34,197,94,0.6);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(routeLayerRef.current)
        .bindPopup('<div style="direction:rtl; text-align:center;">📍 موقعك</div>');

      // Fetch route from OSRM
      fetchRoute(userLocation.lat, userLocation.lng, church.lat, church.lng, map);
    } else {
      setLoading(false);
      setError('يرجى تفعيل الموقع الجغرافي للحصول على الاتجاهات');
      map.setView([church.lat, church.lng], 15);
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [church, userLocation]);

  const fetchRoute = async (fromLat: number, fromLng: number, toLat: number, toLng: number, map: L.Map) => {
    setLoading(true);
    setError('');
    
    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson&steps=true`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
        setError('لم يتم العثور على مسار. قد لا يكون هناك طريق مباشر.');
        setLoading(false);
        return;
      }

      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);

      // Draw route line
      const routeLine = L.polyline(coordinates, {
        color: '#3B82F6',
        weight: 5,
        opacity: 0.8,
        dashArray: undefined
      });

      routeLayerRef.current?.addLayer(routeLine);
      map.fitBounds(routeLine.getBounds(), { padding: [50, 50] });

      // Distance & Duration
      const distKm = (route.distance / 1000).toFixed(1);
      const durMin = Math.round(route.duration / 60);
      const hours = Math.floor(durMin / 60);
      const mins = durMin % 60;

      setDistance(`${distKm} كم`);
      setDuration(hours > 0 ? `${hours} ساعة و ${mins} دقيقة` : `${mins} دقيقة`);

      // Extract step-by-step directions
      const routeSteps: string[] = [];
      route.legs.forEach((leg: any) => {
        leg.steps.forEach((step: any) => {
          if (step.maneuver && step.name) {
            const instruction = translateManeuver(step.maneuver.type, step.maneuver.modifier, step.name, step.distance);
            if (instruction) routeSteps.push(instruction);
          }
        });
      });

      setSteps(routeSteps);
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ في تحميل المسار. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  const translateManeuver = (type: string, modifier: string, name: string, distance: number): string => {
    const dist = distance > 1000 ? `${(distance / 1000).toFixed(1)} كم` : `${Math.round(distance)} متر`;
    const roadName = name || 'الطريق';

    switch (type) {
      case 'depart': return `🚗 انطلق على ${roadName} لمسافة ${dist}`;
      case 'arrive': return `🏁 وصلت إلى الوجهة`;
      case 'turn':
        if (modifier === 'left') return `⬅️ انعطف يساراً إلى ${roadName} لمسافة ${dist}`;
        if (modifier === 'right') return `➡️ انعطف يميناً إلى ${roadName} لمسافة ${dist}`;
        if (modifier === 'slight left') return `↙️ انحرف قليلاً لليسار إلى ${roadName} لمسافة ${dist}`;
        if (modifier === 'slight right') return `↘️ انحرف قليلاً لليمين إلى ${roadName} لمسافة ${dist}`;
        if (modifier === 'sharp left') return `⬅️ انعطف بحدة لليسار إلى ${roadName} لمسافة ${dist}`;
        if (modifier === 'sharp right') return `➡️ انعطف بحدة لليمين إلى ${roadName} لمسافة ${dist}`;
        if (modifier === 'uturn') return `🔄 قم بالدوران إلى ${roadName}`;
        return `↪️ انعطف إلى ${roadName} لمسافة ${dist}`;
      case 'continue': return `⬆️ استمر على ${roadName} لمسافة ${dist}`;
      case 'merge': return `🔀 اندمج في ${roadName} لمسافة ${dist}`;
      case 'fork':
        if (modifier === 'left') return `↙️ خذ المسار الأيسر على ${roadName}`;
        return `↘️ خذ المسار الأيمن على ${roadName}`;
      case 'roundabout': return `🔄 ادخل الدوار ثم اتجه إلى ${roadName}`;
      case 'rotary': return `🔄 ادخل الدوار ثم اتجه إلى ${roadName}`;
      case 'new name': return `⬆️ استمر على ${roadName} لمسافة ${dist}`;
      case 'end of road':
        if (modifier === 'left') return `⬅️ في نهاية الطريق انعطف يساراً إلى ${roadName}`;
        return `➡️ في نهاية الطريق انعطف يميناً إلى ${roadName}`;
      default: return `📍 اتجه إلى ${roadName} لمسافة ${dist}`;
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-l from-green-600 to-blue-600 text-white p-4 flex items-center gap-3 shrink-0">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl hover:bg-white/30 transition-colors"
        >
          ✕
        </button>
        <div className="flex-1 min-w-0 text-right">
          <h2 className="font-bold text-sm truncate">{typeIcons[church.type]} {church.name}</h2>
          <p className="text-xs text-green-100">📍 {church.city} - {church.governorate}</p>
        </div>
        {distance && (
          <div className="text-left shrink-0">
            <div className="text-sm font-bold">{distance}</div>
            <div className="text-xs text-green-100">{duration}</div>
          </div>
        )}
      </div>

      {/* Navigation Map */}
      <div className="flex-1 relative">
        <div ref={navMapRef} className="w-full h-full" />
        
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-600 font-bold">جاري تحميل المسار...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="absolute top-4 left-4 right-4 bg-amber-50 border border-amber-300 text-amber-800 p-3 rounded-xl text-sm text-center z-10">
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="max-h-48 overflow-y-auto border-t border-gray-200 bg-gray-50 shrink-0">
          <div className="p-3">
            <h3 className="font-bold text-sm text-gray-700 mb-2 text-right">📋 خطوات الرحلة:</h3>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-right">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
