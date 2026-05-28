import { useState, useMemo } from 'react';
import { Church, governorates, typeLabels, typeIcons, typeColors } from '../data/churches';

interface SidebarProps {
  churches: Church[];
  selectedChurch: Church | null;
  onChurchSelect: (church: Church) => void;
  onNavigate: (church: Church) => void;
  onFilterChange: (filtered: Church[]) => void;
  allChurches: Church[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ selectedChurch, onChurchSelect, onNavigate, onFilterChange, allChurches, isOpen, onToggle }: SidebarProps) {
  const [search, setSearch] = useState('');
  const [selectedGov, setSelectedGov] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const filtered = useMemo(() => {
    let result = allChurches;
    
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(s) || 
        c.city.toLowerCase().includes(s) ||
        c.governorate.toLowerCase().includes(s) ||
        (c.patron && c.patron.toLowerCase().includes(s)) ||
        (c.description && c.description.toLowerCase().includes(s))
      );
    }
    
    if (selectedGov) {
      result = result.filter(c => c.governorate === selectedGov);
    }
    
    if (selectedType) {
      result = result.filter(c => c.type === selectedType);
    }
    
    return result;
  }, [search, selectedGov, selectedType, allChurches]);

  // Update parent with filtered results
  useMemo(() => {
    onFilterChange(filtered);
  }, [filtered, onFilterChange]);

  const stats = useMemo(() => {
    return {
      total: allChurches.length,
      churches: allChurches.filter(c => c.type === 'church').length,
      monasteries: allChurches.filter(c => c.type === 'monastery').length,
      cathedrals: allChurches.filter(c => c.type === 'cathedral').length,
      bishoprics: allChurches.filter(c => c.type === 'bishopric').length,
    };
  }, [allChurches]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 right-4 z-[1001] lg:hidden bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-2xl border-2 border-blue-500"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full z-[1000] bg-white shadow-2xl transition-transform duration-300 
        w-full sm:w-96 lg:w-[380px] flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="bg-gradient-to-l from-blue-700 via-blue-600 to-purple-700 text-white p-5 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⛪</span>
            <div>
              <h1 className="text-xl font-bold">كنائس وأديرة مصر</h1>
              <p className="text-blue-100 text-xs">دليل شامل لجميع الكنائس والأديرة</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            <div className="bg-white/15 rounded-lg p-2 text-center backdrop-blur-sm">
              <div className="text-lg font-bold">{stats.churches}</div>
              <div className="text-[10px] text-blue-100">كنيسة</div>
            </div>
            <div className="bg-white/15 rounded-lg p-2 text-center backdrop-blur-sm">
              <div className="text-lg font-bold">{stats.monasteries}</div>
              <div className="text-[10px] text-blue-100">دير</div>
            </div>
            <div className="bg-white/15 rounded-lg p-2 text-center backdrop-blur-sm">
              <div className="text-lg font-bold">{stats.cathedrals}</div>
              <div className="text-[10px] text-blue-100">كاتدرائية</div>
            </div>
            <div className="bg-white/15 rounded-lg p-2 text-center backdrop-blur-sm">
              <div className="text-lg font-bold">{stats.bishoprics}</div>
              <div className="text-[10px] text-blue-100">مطرانية</div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50 space-y-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 ابحث عن كنيسة أو دير..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-4 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors text-right"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex gap-2">
            <select
              value={selectedGov}
              onChange={e => setSelectedGov(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-right appearance-none cursor-pointer"
            >
              <option value="">كل المحافظات</option>
              {governorates.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 text-right appearance-none cursor-pointer"
            >
              <option value="">كل الأنواع</option>
              {Object.entries(typeLabels).map(([key, label]) => (
                <option key={key} value={key}>{typeIcons[key]} {label}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-gray-500 text-center">
            عدد النتائج: <span className="font-bold text-blue-600">{filtered.length}</span> من {allChurches.length}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <span className="text-5xl mb-3">🔍</span>
              <p className="text-lg font-bold">لا توجد نتائج</p>
              <p className="text-sm">جرب البحث بكلمات مختلفة</p>
            </div>
          ) : (
            filtered.map(church => (
              <div
                key={church.id}
                onClick={() => {
                  onChurchSelect(church);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer transition-all hover:bg-blue-50 
                  ${selectedChurch?.id === church.id ? 'bg-blue-50 border-r-4 border-r-blue-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 mt-0.5"
                    style={{ backgroundColor: typeColors[church.type] + '20', color: typeColors[church.type] }}
                  >
                    {typeIcons[church.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-gray-800 leading-relaxed">{church.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      📍 {church.city} - {church.governorate}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white"
                        style={{ backgroundColor: typeColors[church.type] }}
                      >
                        {typeLabels[church.type]}
                      </span>
                      {church.patron && (
                        <span className="text-[10px] text-gray-400">
                          شفيع: {church.patron}
                        </span>
                      )}
                    </div>
                    {church.description && (
                      <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{church.description}</p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(church);
                      if (window.innerWidth < 1024) onToggle();
                    }}
                    className="shrink-0 w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center text-base transition-colors shadow-md"
                    title="اتجاهات الوصول"
                  >
                    🧭
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
