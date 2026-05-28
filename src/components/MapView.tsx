import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { Church, typeColors, typeLabels, typeIcons } from '../data/churches';

interface MapViewProps {
  churches: Church[];
  selectedChurch: Church | null;
  userLocation: { lat: number; lng: number } | null;
  onChurchSelect: (church: Church) => void;
  onNavigate: (church: Church) => void;
}

function createIcon(type: string, isSelected: boolean) {
  const color = typeColors[type] || '#3B82F6';
  const size = isSelected ? 40 : 30;
  const icon = typeIcons[type] || '⛪';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${isSelected ? 20 : 14}px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
      transition: all 0.2s;
      ${isSelected ? 'transform: scale(1.2); z-index: 9999;' : ''}
    ">${icon}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}

const userIcon = L.divIcon({
  className: 'user-marker',
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #22C55E;
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(34,197,94,0.6);
    animation: pulse 2s infinite;
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

export default function MapView({ churches, selectedChurch, userLocation, onChurchSelect, onNavigate }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [27.0, 31.0],
      zoom: 6,
      zoomControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    mapRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    churches.forEach(church => {
      const isSelected = selectedChurch?.id === church.id;
      const marker = L.marker([church.lat, church.lng], {
        icon: createIcon(church.type, isSelected)
      });

      const popupContent = `
        <div style="direction: rtl; text-align: right; min-width: 200px; font-family: 'Segoe UI', Tahoma, sans-serif;">
          <h3 style="margin: 0 0 6px; font-size: 14px; color: ${typeColors[church.type]}; font-weight: bold;">
            ${typeIcons[church.type]} ${church.name}
          </h3>
          <p style="margin: 2px 0; font-size: 12px; color: #666;">
            📍 ${church.city} - ${church.governorate}
          </p>
          <p style="margin: 2px 0; font-size: 11px; color: #888;">
            ${typeLabels[church.type]}
          </p>
          ${church.description ? `<p style="margin: 4px 0; font-size: 11px; color: #555; border-top: 1px solid #eee; padding-top: 4px;">${church.description}</p>` : ''}
          <button onclick="window.dispatchEvent(new CustomEvent('navigate-church', {detail: ${church.id}}))" 
            style="margin-top: 8px; width: 100%; padding: 6px; background: ${typeColors[church.type]}; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: bold;">
            🧭 اتجاهات الوصول
          </button>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280 });
      marker.on('click', () => {
        onChurchSelect(church);
      });

      markersRef.current!.addLayer(marker);
    });
  }, [churches, selectedChurch, onChurchSelect]);

  // Handle navigate event from popup
  useEffect(() => {
    const handler = (e: any) => {
      const churchId = e.detail;
      const church = churches.find(c => c.id === churchId);
      if (church) {
        onNavigate(church);
      }
    };
    window.addEventListener('navigate-church', handler);
    return () => window.removeEventListener('navigate-church', handler);
  }, [churches, onNavigate]);

  // Update user location marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      } else {
        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .addTo(mapRef.current)
          .bindPopup('<div style="direction:rtl; text-align:center; font-weight:bold;">📍 موقعك الحالي</div>');
      }
    }
  }, [userLocation]);

  // Focus on selected church
  useEffect(() => {
    if (!mapRef.current || !selectedChurch) return;
    mapRef.current.flyTo([selectedChurch.lat, selectedChurch.lng], 15, { duration: 1.5 });
  }, [selectedChurch]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          70% { box-shadow: 0 0 0 15px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
        }
      `}</style>
    </div>
  );
}
