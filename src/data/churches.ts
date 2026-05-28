export interface Church {
  id: number;
  name: string;
  type: 'church' | 'monastery' | 'cathedral' | 'bishopric';
  governorate: string;
  city: string;
  lat: number;
  lng: number;
  description?: string;
  patron?: string;
}

export const churches: Church[] = [
  // ===== القاهرة =====
  { id: 1, name: "الكاتدرائية المرقسية بالعباسية", type: "cathedral", governorate: "القاهرة", city: "العباسية", lat: 30.0780, lng: 31.2750, description: "المقر البابوي الرئيسي", patron: "مارمرقس" },
  { id: 2, name: "كنيسة العذراء المعلقة", type: "church", governorate: "القاهرة", city: "مصر القديمة", lat: 30.0058, lng: 31.2305, description: "من أقدم كنائس مصر", patron: "العذراء مريم" },
  { id: 3, name: "كنيسة أبي سرجة (سرجيوس وواخس)", type: "church", governorate: "القاهرة", city: "مصر القديمة", lat: 30.0055, lng: 31.2303, description: "بُنيت فوق المغارة التي أقامت فيها العائلة المقدسة", patron: "سرجيوس وواخس" },
  { id: 4, name: "كنيسة القديسة بربارة", type: "church", governorate: "القاهرة", city: "مصر القديمة", lat: 30.0052, lng: 31.2308, patron: "القديسة بربارة" },
  { id: 5, name: "كنيسة مارجرجس (مصر القديمة)", type: "church", governorate: "القاهرة", city: "مصر القديمة", lat: 30.0060, lng: 31.2298, patron: "مارجرجس" },
  { id: 6, name: "كنيسة العذراء (حارة زويلة)", type: "church", governorate: "القاهرة", city: "حارة زويلة", lat: 30.0460, lng: 31.2580, patron: "العذراء مريم" },
  { id: 7, name: "كنيسة العذراء (الزيتون)", type: "church", governorate: "القاهرة", city: "الزيتون", lat: 30.1190, lng: 31.3135, description: "ظهرت فيها العذراء مريم عام 1968", patron: "العذراء مريم" },
  { id: 8, name: "كنيسة مارمرقس (مصر الجديدة)", type: "church", governorate: "القاهرة", city: "مصر الجديدة", lat: 30.0910, lng: 31.3230, patron: "مارمرقس" },
  { id: 9, name: "كنيسة مارمرقس (كلوت بك)", type: "church", governorate: "القاهرة", city: "وسط البلد", lat: 30.0560, lng: 31.2470, patron: "مارمرقس" },
  { id: 10, name: "كنيسة العذراء (المعادي)", type: "church", governorate: "القاهرة", city: "المعادي", lat: 29.9580, lng: 31.2490, description: "وجد فيها الكتاب المقدس طافياً على النيل", patron: "العذراء مريم" },
  { id: 11, name: "كنيسة مارجرجس (مصر الجديدة)", type: "church", governorate: "القاهرة", city: "مصر الجديدة", lat: 30.0870, lng: 31.3400, patron: "مارجرجس" },
  { id: 12, name: "كنيسة الأنبا رويس", type: "church", governorate: "القاهرة", city: "العباسية", lat: 30.0785, lng: 31.2745, patron: "الأنبا رويس" },
  { id: 13, name: "كنيسة الأنبا أنطونيوس (شبرا)", type: "church", governorate: "القاهرة", city: "شبرا", lat: 30.0760, lng: 31.2440, patron: "الأنبا أنطونيوس" },
  { id: 14, name: "كنيسة العذراء والأنبا بيشوي (عين شمس)", type: "church", governorate: "القاهرة", city: "عين شمس", lat: 30.1310, lng: 31.3220, patron: "العذراء والأنبا بيشوي" },
  { id: 15, name: "كنيسة الشهيد مارمينا (شبرا)", type: "church", governorate: "القاهرة", city: "شبرا", lat: 30.0810, lng: 31.2450, patron: "مارمينا" },
  { id: 16, name: "كنيسة السيدة العذراء (روض الفرج)", type: "church", governorate: "القاهرة", city: "روض الفرج", lat: 30.0880, lng: 31.2390, patron: "العذراء مريم" },
  { id: 17, name: "كنيسة مارجرجس (حلوان)", type: "church", governorate: "القاهرة", city: "حلوان", lat: 29.8420, lng: 31.3340, patron: "مارجرجس" },
  { id: 18, name: "كنيسة العذراء مريم والملاك ميخائيل (حدائق القبة)", type: "church", governorate: "القاهرة", city: "حدائق القبة", lat: 30.0900, lng: 31.2850, patron: "العذراء وميخائيل" },
  { id: 19, name: "كنيسة الأنبا تكلاهيمانوت", type: "church", governorate: "القاهرة", city: "الإبراهيمية", lat: 30.0640, lng: 31.2610, patron: "الأنبا تكلا" },
  { id: 20, name: "كنيسة مارمينا (فم الخليج)", type: "church", governorate: "القاهرة", city: "فم الخليج", lat: 30.0150, lng: 31.2290, patron: "مارمينا" },
  { id: 21, name: "كنيسة القديس يوسف (وسط البلد)", type: "church", governorate: "القاهرة", city: "وسط البلد", lat: 30.0450, lng: 31.2400, patron: "القديس يوسف" },
  { id: 22, name: "كنيسة مارمرقس (المقطم)", type: "church", governorate: "القاهرة", city: "المقطم", lat: 30.0200, lng: 31.2830, patron: "مارمرقس" },
  { id: 23, name: "كنيسة السيدة العذراء (الفجالة)", type: "church", governorate: "القاهرة", city: "الفجالة", lat: 30.0560, lng: 31.2550, patron: "العذراء مريم" },
  { id: 24, name: "كنيسة القديس سمعان الخراز (المقطم)", type: "church", governorate: "القاهرة", city: "المقطم - الزبالين", lat: 30.0174, lng: 31.2780, description: "كنيسة الكهف - أكبر كنيسة في الشرق الأوسط", patron: "سمعان الخراز" },
  { id: 25, name: "كنيسة العذراء (الزاوية الحمراء)", type: "church", governorate: "القاهرة", city: "الزاوية الحمراء", lat: 30.0990, lng: 31.2600, patron: "العذراء مريم" },
  { id: 26, name: "كنيسة مارجرجس (منشية الصدر)", type: "church", governorate: "القاهرة", city: "منشية الصدر", lat: 30.0700, lng: 31.2830, patron: "مارجرجس" },
  { id: 27, name: "كنيسة مارجرجس (الجيوشي)", type: "church", governorate: "القاهرة", city: "الجيوشي", lat: 30.0680, lng: 31.2400, patron: "مارجرجس" },
  { id: 28, name: "كنيسة الملاك ميخائيل (الظاهر)", type: "church", governorate: "القاهرة", city: "الظاهر", lat: 30.0620, lng: 31.2530, patron: "الملاك ميخائيل" },
  { id: 29, name: "كنيسة العذراء والأنبا بلامون (المطرية)", type: "church", governorate: "القاهرة", city: "المطرية", lat: 30.1210, lng: 31.3130, description: "مسار العائلة المقدسة - شجرة مريم", patron: "العذراء مريم" },
  { id: 30, name: "كنيسة العذراء (المسترشدة)", type: "church", governorate: "القاهرة", city: "المسترشدة", lat: 30.0540, lng: 31.2490, patron: "العذراء مريم" },

  // ===== الجيزة =====
  { id: 31, name: "كنيسة مارجرجس (الجيزة)", type: "church", governorate: "الجيزة", city: "الجيزة", lat: 30.0130, lng: 31.2050, patron: "مارجرجس" },
  { id: 32, name: "كنيسة العذراء مريم (الحوامدية)", type: "church", governorate: "الجيزة", city: "الحوامدية", lat: 29.8920, lng: 31.2450, patron: "العذراء مريم" },
  { id: 33, name: "كنيسة مارمينا (فيصل)", type: "church", governorate: "الجيزة", city: "فيصل", lat: 30.0050, lng: 31.1950, patron: "مارمينا" },
  { id: 34, name: "كنيسة الأنبا شنودة (6 أكتوبر)", type: "church", governorate: "الجيزة", city: "6 أكتوبر", lat: 29.9680, lng: 31.0120, patron: "الأنبا شنودة" },
  { id: 35, name: "كنيسة العذراء مريم (إمبابة)", type: "church", governorate: "الجيزة", city: "إمبابة", lat: 30.0760, lng: 31.2080, patron: "العذراء مريم" },
  { id: 36, name: "كنيسة مارجرجس (العجوزة)", type: "church", governorate: "الجيزة", city: "العجوزة", lat: 30.0580, lng: 31.2040, patron: "مارجرجس" },
  { id: 37, name: "كنيسة الملاك ميخائيل (الدقي)", type: "church", governorate: "الجيزة", city: "الدقي", lat: 30.0370, lng: 31.2110, patron: "الملاك ميخائيل" },
  { id: 38, name: "كنيسة الأنبا أنطونيوس (الشيخ زايد)", type: "church", governorate: "الجيزة", city: "الشيخ زايد", lat: 30.0400, lng: 31.0010, patron: "الأنبا أنطونيوس" },
  { id: 39, name: "كنيسة العذراء والأنبا موسى (البدرشين)", type: "church", governorate: "الجيزة", city: "البدرشين", lat: 29.8480, lng: 31.2780, patron: "العذراء والأنبا موسى" },
  { id: 40, name: "كنيسة مارجرجس (العياط)", type: "church", governorate: "الجيزة", city: "العياط", lat: 29.7180, lng: 31.2530, patron: "مارجرجس" },

  // ===== الإسكندرية =====
  { id: 41, name: "الكاتدرائية المرقسية بالإسكندرية", type: "cathedral", governorate: "الإسكندرية", city: "محطة الرمل", lat: 31.2010, lng: 29.9060, description: "أقدم كاتدرائية في أفريقيا", patron: "مارمرقس" },
  { id: 42, name: "كنيسة القديس أثناسيوس الرسولي", type: "church", governorate: "الإسكندرية", city: "محرم بك", lat: 31.1990, lng: 29.9200, patron: "القديس أثناسيوس" },
  { id: 43, name: "كنيسة مارجرجس (سبورتنج)", type: "church", governorate: "الإسكندرية", city: "سبورتنج", lat: 31.2130, lng: 29.9530, patron: "مارجرجس" },
  { id: 44, name: "كنيسة العذراء مريم (محرم بك)", type: "church", governorate: "الإسكندرية", city: "محرم بك", lat: 31.1960, lng: 29.9180, patron: "العذراء مريم" },
  { id: 45, name: "كنيسة الأنبا تكلاهيمانوت (إبراهيمية)", type: "church", governorate: "الإسكندرية", city: "الإبراهيمية", lat: 31.2180, lng: 29.9410, patron: "الأنبا تكلا" },
  { id: 46, name: "كنيسة مارمينا (فلمنج)", type: "church", governorate: "الإسكندرية", city: "فلمنج", lat: 31.2120, lng: 29.9500, patron: "مارمينا" },
  { id: 47, name: "كنيسة مارجرجس (جليم)", type: "church", governorate: "الإسكندرية", city: "جليم", lat: 31.2220, lng: 29.9680, patron: "مارجرجس" },
  { id: 48, name: "كنيسة العذراء والأنبا بيشوي (سيدي بشر)", type: "church", governorate: "الإسكندرية", city: "سيدي بشر", lat: 31.2430, lng: 29.9960, patron: "العذراء والأنبا بيشوي" },
  { id: 49, name: "كنيسة مارمرقس (سابا باشا)", type: "church", governorate: "الإسكندرية", city: "سابا باشا", lat: 31.2110, lng: 29.9420, patron: "مارمرقس" },
  { id: 50, name: "كنيسة الشهيد أبانوب (محرم بك)", type: "church", governorate: "الإسكندرية", city: "محرم بك", lat: 31.1980, lng: 29.9150, patron: "أبانوب" },
  { id: 51, name: "كنيسة مارجرجس (العصافرة)", type: "church", governorate: "الإسكندرية", city: "العصافرة", lat: 31.2580, lng: 30.0180, patron: "مارجرجس" },
  { id: 52, name: "كنيسة العذراء والملاك (المنتزه)", type: "church", governorate: "الإسكندرية", city: "المنتزه", lat: 31.2700, lng: 30.0200, patron: "العذراء والملاك" },
  { id: 53, name: "كنيسة مارجرجس (بولكلي)", type: "church", governorate: "الإسكندرية", city: "بولكلي", lat: 31.2260, lng: 29.9600, patron: "مارجرجس" },
  { id: 54, name: "كنيسة العذراء (كليوباترا)", type: "church", governorate: "الإسكندرية", city: "كليوباترا", lat: 31.2290, lng: 29.9650, patron: "العذراء مريم" },

  // ===== أسيوط =====
  { id: 55, name: "كاتدرائية رئيس الملائكة ميخائيل (أسيوط)", type: "cathedral", governorate: "أسيوط", city: "أسيوط", lat: 27.1810, lng: 31.1840, patron: "الملاك ميخائيل" },
  { id: 56, name: "كنيسة العذراء مريم (أسيوط)", type: "church", governorate: "أسيوط", city: "أسيوط", lat: 27.1780, lng: 31.1810, patron: "العذراء مريم" },
  { id: 57, name: "كنيسة مارمرقس (أسيوط)", type: "church", governorate: "أسيوط", city: "أسيوط", lat: 27.1830, lng: 31.1860, patron: "مارمرقس" },
  { id: 58, name: "كنيسة الأنبا أنطونيوس (أسيوط)", type: "church", governorate: "أسيوط", city: "أسيوط", lat: 27.1760, lng: 31.1790, patron: "الأنبا أنطونيوس" },
  { id: 59, name: "كنيسة العذراء (القوصية)", type: "church", governorate: "أسيوط", city: "القوصية", lat: 27.4400, lng: 30.8350, description: "مسار العائلة المقدسة", patron: "العذراء مريم" },
  { id: 60, name: "كنيسة مارجرجس (أبنوب)", type: "church", governorate: "أسيوط", city: "أبنوب", lat: 27.2670, lng: 31.1520, patron: "مارجرجس" },
  { id: 61, name: "كنيسة العذراء (ديروط)", type: "church", governorate: "أسيوط", city: "ديروط", lat: 27.5450, lng: 30.8130, patron: "العذراء مريم" },
  { id: 62, name: "كنيسة العذراء (منفلوط)", type: "church", governorate: "أسيوط", city: "منفلوط", lat: 27.3110, lng: 30.9720, patron: "العذراء مريم" },

  // ===== المنيا =====
  { id: 63, name: "كنيسة العذراء مريم (المنيا)", type: "church", governorate: "المنيا", city: "المنيا", lat: 28.0870, lng: 30.7510, patron: "العذراء مريم" },
  { id: 64, name: "كنيسة مارجرجس (المنيا)", type: "church", governorate: "المنيا", city: "المنيا", lat: 28.0840, lng: 30.7540, patron: "مارجرجس" },
  { id: 65, name: "كنيسة مارمرقس (المنيا)", type: "church", governorate: "المنيا", city: "المنيا", lat: 28.0820, lng: 30.7570, patron: "مارمرقس" },
  { id: 66, name: "كنيسة الأنبا موسى الأسود (المنيا)", type: "church", governorate: "المنيا", city: "المنيا", lat: 28.0890, lng: 30.7530, patron: "الأنبا موسى" },
  { id: 67, name: "كنيسة العذراء (سمالوط)", type: "church", governorate: "المنيا", city: "سمالوط", lat: 28.3100, lng: 30.7100, patron: "العذراء مريم" },
  { id: 68, name: "كنيسة العذراء (ملوي)", type: "church", governorate: "المنيا", city: "ملوي", lat: 27.7310, lng: 30.8410, patron: "العذراء مريم" },
  { id: 69, name: "كنيسة مارجرجس (بني مزار)", type: "church", governorate: "المنيا", city: "بني مزار", lat: 28.4990, lng: 30.8000, patron: "مارجرجس" },
  { id: 70, name: "كنيسة الشهيد أبانوب (سمالوط)", type: "church", governorate: "المنيا", city: "سمالوط", lat: 28.3050, lng: 30.7120, patron: "أبانوب" },
  { id: 71, name: "كنيسة العذراء (مغاغة)", type: "church", governorate: "المنيا", city: "مغاغة", lat: 28.6450, lng: 30.8350, patron: "العذراء مريم" },

  // ===== سوهاج =====
  { id: 72, name: "المطرانية - كاتدرائية الأنبا شنودة (سوهاج)", type: "bishopric", governorate: "سوهاج", city: "سوهاج", lat: 26.5570, lng: 31.6940, description: "مطرانية سوهاج والمنشاة", patron: "الأنبا شنودة" },
  { id: 73, name: "كنيسة العذراء مريم (سوهاج)", type: "church", governorate: "سوهاج", city: "سوهاج", lat: 26.5590, lng: 31.6960, patron: "العذراء مريم" },
  { id: 74, name: "كنيسة مارجرجس (سوهاج)", type: "church", governorate: "سوهاج", city: "سوهاج", lat: 26.5550, lng: 31.6920, patron: "مارجرجس" },
  { id: 75, name: "كنيسة مارمينا (سوهاج)", type: "church", governorate: "سوهاج", city: "سوهاج", lat: 26.5530, lng: 31.6900, patron: "مارمينا" },
  { id: 76, name: "كنيسة الأنبا بيشوي (سوهاج)", type: "church", governorate: "سوهاج", city: "سوهاج", lat: 26.5610, lng: 31.6980, patron: "الأنبا بيشوي" },
  { id: 77, name: "كنيسة مارجرجس (أخميم)", type: "church", governorate: "سوهاج", city: "أخميم", lat: 26.5670, lng: 31.7440, patron: "مارجرجس" },
  { id: 78, name: "كنيسة العذراء (طهطا)", type: "church", governorate: "سوهاج", city: "طهطا", lat: 26.7690, lng: 31.5010, patron: "العذراء مريم" },
  { id: 79, name: "كنيسة مارجرجس (جرجا)", type: "church", governorate: "سوهاج", city: "جرجا", lat: 26.3380, lng: 31.8930, patron: "مارجرجس" },
  { id: 80, name: "كنيسة العذراء (المنشاة)", type: "church", governorate: "سوهاج", city: "المنشاة", lat: 26.4780, lng: 31.7920, patron: "العذراء مريم" },
  { id: 81, name: "كنيسة مارمرقس (البلينا)", type: "church", governorate: "سوهاج", city: "البلينا", lat: 26.2300, lng: 31.9980, patron: "مارمرقس" },
  { id: 82, name: "كنيسة العذراء (المراغة)", type: "church", governorate: "سوهاج", city: "المراغة", lat: 26.7210, lng: 31.5420, patron: "العذراء مريم" },
  { id: 83, name: "كنيسة الأنبا شنودة (طما)", type: "church", governorate: "سوهاج", city: "طما", lat: 26.8160, lng: 31.4920, patron: "الأنبا شنودة" },

  // ===== قنا =====
  { id: 84, name: "كنيسة العذراء مريم (قنا)", type: "church", governorate: "قنا", city: "قنا", lat: 26.1650, lng: 32.7260, patron: "العذراء مريم" },
  { id: 85, name: "كنيسة مارجرجس (قنا)", type: "church", governorate: "قنا", city: "قنا", lat: 26.1630, lng: 32.7240, patron: "مارجرجس" },
  { id: 86, name: "كنيسة الملاك ميخائيل (نجع حمادي)", type: "church", governorate: "قنا", city: "نجع حمادي", lat: 26.0510, lng: 32.1550, patron: "الملاك ميخائيل" },
  { id: 87, name: "كنيسة العذراء (دشنا)", type: "church", governorate: "قنا", city: "دشنا", lat: 26.1210, lng: 32.4640, patron: "العذراء مريم" },
  { id: 88, name: "كنيسة مارجرجس (أبوتشت)", type: "church", governorate: "قنا", city: "أبوتشت", lat: 26.0350, lng: 32.0510, patron: "مارجرجس" },
  { id: 89, name: "كنيسة العذراء (فرشوط)", type: "church", governorate: "قنا", city: "فرشوط", lat: 26.0570, lng: 32.1630, patron: "العذراء مريم" },

  // ===== الأقصر =====
  { id: 90, name: "كنيسة مارجرجس (الأقصر)", type: "church", governorate: "الأقصر", city: "الأقصر", lat: 25.6990, lng: 32.6420, patron: "مارجرجس" },
  { id: 91, name: "كنيسة العذراء مريم (الأقصر)", type: "church", governorate: "الأقصر", city: "الأقصر", lat: 25.6970, lng: 32.6400, patron: "العذراء مريم" },
  { id: 92, name: "كنيسة مارمرقس (الأقصر)", type: "church", governorate: "الأقصر", city: "الأقصر", lat: 25.6950, lng: 32.6440, patron: "مارمرقس" },
  { id: 93, name: "كنيسة مارجرجس (إسنا)", type: "church", governorate: "الأقصر", city: "إسنا", lat: 25.2930, lng: 32.5530, patron: "مارجرجس" },

  // ===== أسوان =====
  { id: 94, name: "كنيسة رئيس الملائكة ميخائيل (أسوان)", type: "church", governorate: "أسوان", city: "أسوان", lat: 24.0930, lng: 32.8990, patron: "الملاك ميخائيل" },
  { id: 95, name: "كنيسة العذراء مريم (أسوان)", type: "church", governorate: "أسوان", city: "أسوان", lat: 24.0910, lng: 32.8970, patron: "العذراء مريم" },
  { id: 96, name: "كنيسة مارجرجس (كوم أمبو)", type: "church", governorate: "أسوان", city: "كوم أمبو", lat: 24.4760, lng: 32.9490, patron: "مارجرجس" },
  { id: 97, name: "كنيسة العذراء (إدفو)", type: "church", governorate: "أسوان", city: "إدفو", lat: 24.9810, lng: 32.8730, patron: "العذراء مريم" },

  // ===== البحيرة =====
  { id: 98, name: "كنيسة مارجرجس (دمنهور)", type: "church", governorate: "البحيرة", city: "دمنهور", lat: 31.0440, lng: 30.4670, patron: "مارجرجس" },
  { id: 99, name: "كنيسة العذراء مريم (دمنهور)", type: "church", governorate: "البحيرة", city: "دمنهور", lat: 31.0420, lng: 30.4690, patron: "العذراء مريم" },

  // ===== الغربية =====
  { id: 100, name: "كنيسة مارجرجس (طنطا)", type: "church", governorate: "الغربية", city: "طنطا", lat: 30.7880, lng: 31.0000, patron: "مارجرجس" },
  { id: 101, name: "كنيسة العذراء مريم (طنطا)", type: "church", governorate: "الغربية", city: "طنطا", lat: 30.7860, lng: 31.0020, patron: "العذراء مريم" },
  { id: 102, name: "كنيسة مارمينا (المحلة الكبرى)", type: "church", governorate: "الغربية", city: "المحلة الكبرى", lat: 30.9710, lng: 31.1660, patron: "مارمينا" },
  { id: 103, name: "كنيسة مارجرجس (المحلة الكبرى)", type: "church", governorate: "الغربية", city: "المحلة الكبرى", lat: 30.9690, lng: 31.1680, patron: "مارجرجس" },

  // ===== الدقهلية =====
  { id: 104, name: "كنيسة العذراء مريم (المنصورة)", type: "church", governorate: "الدقهلية", city: "المنصورة", lat: 31.0420, lng: 31.3810, patron: "العذراء مريم" },
  { id: 105, name: "كنيسة مارجرجس (المنصورة)", type: "church", governorate: "الدقهلية", city: "المنصورة", lat: 31.0400, lng: 31.3830, patron: "مارجرجس" },
  { id: 106, name: "كنيسة الأنبا بيشوي (المنصورة)", type: "church", governorate: "الدقهلية", city: "المنصورة", lat: 31.0380, lng: 31.3790, patron: "الأنبا بيشوي" },

  // ===== الشرقية =====
  { id: 107, name: "كنيسة العذراء مريم (الزقازيق)", type: "church", governorate: "الشرقية", city: "الزقازيق", lat: 30.5880, lng: 31.5020, patron: "العذراء مريم" },
  { id: 108, name: "كنيسة مارجرجس (الزقازيق)", type: "church", governorate: "الشرقية", city: "الزقازيق", lat: 30.5860, lng: 31.5000, patron: "مارجرجس" },
  { id: 109, name: "كنيسة العذراء (بلبيس)", type: "church", governorate: "الشرقية", city: "بلبيس", lat: 30.4210, lng: 31.5620, description: "مسار العائلة المقدسة", patron: "العذراء مريم" },
  { id: 110, name: "كنيسة العذراء (مسطرد/المحمة)", type: "church", governorate: "القليوبية", city: "مسطرد", lat: 30.1590, lng: 31.2800, description: "مسار العائلة المقدسة - استحمت العذراء الطفل يسوع هنا", patron: "العذراء مريم" },

  // ===== القليوبية =====
  { id: 111, name: "كنيسة العذراء مريم (بنها)", type: "church", governorate: "القليوبية", city: "بنها", lat: 30.4660, lng: 31.1790, patron: "العذراء مريم" },
  { id: 112, name: "كنيسة مارجرجس (بنها)", type: "church", governorate: "القليوبية", city: "بنها", lat: 30.4640, lng: 31.1810, patron: "مارجرجس" },
  { id: 113, name: "كنيسة مارجرجس (شبرا الخيمة)", type: "church", governorate: "القليوبية", city: "شبرا الخيمة", lat: 30.1260, lng: 31.2450, patron: "مارجرجس" },
  { id: 114, name: "كنيسة العذراء (شبرا الخيمة)", type: "church", governorate: "القليوبية", city: "شبرا الخيمة", lat: 30.1240, lng: 31.2430, patron: "العذراء مريم" },

  // ===== بني سويف =====
  { id: 115, name: "كنيسة العذراء مريم (بني سويف)", type: "church", governorate: "بني سويف", city: "بني سويف", lat: 29.0740, lng: 31.0930, patron: "العذراء مريم" },
  { id: 116, name: "كنيسة مارجرجس (بني سويف)", type: "church", governorate: "بني سويف", city: "بني سويف", lat: 29.0720, lng: 31.0950, patron: "مارجرجس" },
  { id: 117, name: "كنيسة الأنبا أنطونيوس (بني سويف)", type: "church", governorate: "بني سويف", city: "بني سويف", lat: 29.0700, lng: 31.0910, patron: "الأنبا أنطونيوس" },
  { id: 118, name: "كنيسة العذراء (ببا)", type: "church", governorate: "بني سويف", city: "ببا", lat: 28.9470, lng: 30.9980, patron: "العذراء مريم" },

  // ===== الفيوم =====
  { id: 119, name: "كنيسة العذراء مريم (الفيوم)", type: "church", governorate: "الفيوم", city: "الفيوم", lat: 29.3090, lng: 30.8440, patron: "العذراء مريم" },
  { id: 120, name: "كنيسة مارجرجس (الفيوم)", type: "church", governorate: "الفيوم", city: "الفيوم", lat: 29.3070, lng: 30.8420, patron: "مارجرجس" },

  // ===== المنوفية =====
  { id: 121, name: "كنيسة العذراء مريم (شبين الكوم)", type: "church", governorate: "المنوفية", city: "شبين الكوم", lat: 30.5580, lng: 31.0130, patron: "العذراء مريم" },
  { id: 122, name: "كنيسة مارجرجس (شبين الكوم)", type: "church", governorate: "المنوفية", city: "شبين الكوم", lat: 30.5560, lng: 31.0150, patron: "مارجرجس" },
  { id: 123, name: "كنيسة مارجرجس (منوف)", type: "church", governorate: "المنوفية", city: "منوف", lat: 30.4650, lng: 30.9290, patron: "مارجرجس" },

  // ===== كفر الشيخ =====
  { id: 124, name: "كنيسة العذراء مريم (كفر الشيخ)", type: "church", governorate: "كفر الشيخ", city: "كفر الشيخ", lat: 31.1120, lng: 30.9370, patron: "العذراء مريم" },
  { id: 125, name: "كنيسة مارجرجس (دسوق)", type: "church", governorate: "كفر الشيخ", city: "دسوق", lat: 31.1310, lng: 30.6460, patron: "مارجرجس" },

  // ===== دمياط =====
  { id: 126, name: "كنيسة العذراء مريم (دمياط)", type: "church", governorate: "دمياط", city: "دمياط", lat: 31.4180, lng: 31.8120, patron: "العذراء مريم" },
  { id: 127, name: "كنيسة مارجرجس (دمياط)", type: "church", governorate: "دمياط", city: "دمياط", lat: 31.4160, lng: 31.8140, patron: "مارجرجس" },

  // ===== بورسعيد =====
  { id: 128, name: "كنيسة العذراء مريم (بورسعيد)", type: "church", governorate: "بورسعيد", city: "بورسعيد", lat: 31.2640, lng: 32.3060, patron: "العذراء مريم" },
  { id: 129, name: "كنيسة مارجرجس (بورسعيد)", type: "church", governorate: "بورسعيد", city: "بورسعيد", lat: 31.2620, lng: 32.3080, patron: "مارجرجس" },

  // ===== الإسماعيلية =====
  { id: 130, name: "كنيسة العذراء مريم (الإسماعيلية)", type: "church", governorate: "الإسماعيلية", city: "الإسماعيلية", lat: 30.5960, lng: 32.2650, patron: "العذراء مريم" },
  { id: 131, name: "كنيسة مارجرجس (الإسماعيلية)", type: "church", governorate: "الإسماعيلية", city: "الإسماعيلية", lat: 30.5940, lng: 32.2670, patron: "مارجرجس" },

  // ===== السويس =====
  { id: 132, name: "كنيسة العذراء مريم (السويس)", type: "church", governorate: "السويس", city: "السويس", lat: 29.9740, lng: 32.5390, patron: "العذراء مريم" },
  { id: 133, name: "كنيسة مارجرجس (السويس)", type: "church", governorate: "السويس", city: "السويس", lat: 29.9720, lng: 32.5370, patron: "مارجرجس" },

  // ===== البحر الأحمر =====
  { id: 134, name: "كنيسة العذراء مريم (الغردقة)", type: "church", governorate: "البحر الأحمر", city: "الغردقة", lat: 27.2580, lng: 33.8120, patron: "العذراء مريم" },
  { id: 135, name: "كنيسة مارمرقس (الغردقة)", type: "church", governorate: "البحر الأحمر", city: "الغردقة", lat: 27.1900, lng: 33.8300, patron: "مارمرقس" },

  // ===== جنوب سيناء =====
  { id: 136, name: "كنيسة التجلي (دير سانت كاترين)", type: "church", governorate: "جنوب سيناء", city: "سانت كاترين", lat: 28.5562, lng: 33.9757, description: "داخل دير سانت كاترين الشهير", patron: "التجلي" },

  // ===== الأديرة =====
  // أديرة وادي النطرون
  { id: 137, name: "دير الأنبا بيشوي", type: "monastery", governorate: "البحيرة", city: "وادي النطرون", lat: 30.3190, lng: 30.3460, description: "أحد أقدم الأديرة في العالم - يضم جسد الأنبا بيشوي والبابا شنودة الثالث", patron: "الأنبا بيشوي" },
  { id: 138, name: "دير السريان (العذراء)", type: "monastery", governorate: "البحيرة", city: "وادي النطرون", lat: 30.3210, lng: 30.3420, description: "يضم أيقونات وجداريات أثرية فريدة", patron: "العذراء مريم" },
  { id: 139, name: "دير البراموس", type: "monastery", governorate: "البحيرة", city: "وادي النطرون", lat: 30.3480, lng: 30.2720, description: "أقدم أديرة وادي النطرون", patron: "العذراء مريم" },
  { id: 140, name: "دير أبو مقار (القديس مقاريوس)", type: "monastery", governorate: "البحيرة", city: "وادي النطرون", lat: 30.3640, lng: 30.4590, description: "أكبر أديرة وادي النطرون - يضم رفات يوحنا المعمدان وإليشع النبي", patron: "القديس مقاريوس" },

  // أديرة البحر الأحمر
  { id: 141, name: "دير الأنبا أنطونيوس", type: "monastery", governorate: "البحر الأحمر", city: "الزعفرانة", lat: 28.9220, lng: 32.3390, description: "أقدم دير مسيحي في العالم - أسسه القديس أنطونيوس أب الرهبنة", patron: "الأنبا أنطونيوس" },
  { id: 142, name: "دير الأنبا بولا", type: "monastery", governorate: "البحر الأحمر", city: "الزعفرانة", lat: 28.8680, lng: 32.3490, description: "على اسم أول سائح في العالم القديس بولا", patron: "الأنبا بولا" },

  // دير سانت كاترين
  { id: 143, name: "دير سانت كاترين", type: "monastery", governorate: "جنوب سيناء", city: "سانت كاترين", lat: 28.5562, lng: 33.9757, description: "أقدم دير مأهول في العالم - موقع تراث عالمي لليونسكو - عند جبل موسى", patron: "القديسة كاترين" },

  // أديرة الصعيد
  { id: 144, name: "دير المحرق (العذراء)", type: "monastery", governorate: "أسيوط", city: "القوصية", lat: 27.4540, lng: 30.8320, description: "نهاية رحلة العائلة المقدسة في مصر - أقامت فيه العائلة 6 أشهر و10 أيام", patron: "العذراء مريم" },
  { id: 145, name: "دير الأنبا شنودة (الدير الأبيض)", type: "monastery", governorate: "سوهاج", city: "سوهاج", lat: 26.5590, lng: 31.6250, description: "من القرن الرابع الميلادي - معمار فريد", patron: "الأنبا شنودة" },
  { id: 146, name: "دير الأنبا بيشوي (الدير الأحمر)", type: "monastery", governorate: "سوهاج", city: "سوهاج", lat: 26.5470, lng: 31.6300, description: "يتميز بجدرانه الحمراء - جداريات أثرية فريدة", patron: "الأنبا بيشوي" },
  { id: 147, name: "دير الأنبا بخوم (بالصوامعة)", type: "monastery", governorate: "سوهاج", city: "الصوامعة شرق", lat: 26.5850, lng: 31.7680, description: "أسسه الأنبا بخوم أب الشركة", patron: "الأنبا بخوم" },
  { id: 148, name: "دير مارمينا العجائبي", type: "monastery", governorate: "الإسكندرية", city: "مريوط", lat: 30.8510, lng: 29.6640, description: "بناه البابا كيرلس السادس - يضم جسده الطاهر", patron: "مارمينا" },
  { id: 149, name: "دير الأنبا صموئيل المعترف", type: "monastery", governorate: "المنيا", city: "المنيا", lat: 28.1540, lng: 30.4460, description: "في الصحراء الغربية", patron: "الأنبا صموئيل" },
  { id: 150, name: "دير العذراء (جبل الطير)", type: "monastery", governorate: "المنيا", city: "سمالوط", lat: 28.2510, lng: 30.7480, description: "مسار العائلة المقدسة - على قمة جبل يطل على النيل", patron: "العذراء مريم" },
  { id: 151, name: "دير الأنبا بيشوي (البياضية)", type: "monastery", governorate: "المنيا", city: "ملوي", lat: 27.7540, lng: 30.8210, patron: "الأنبا بيشوي" },
  { id: 152, name: "دير أبوفانا", type: "monastery", governorate: "المنيا", city: "ملوي", lat: 27.8200, lng: 30.7500, description: "من أقدم الأديرة في الصعيد", patron: "أبوفانا" },
  { id: 153, name: "دير العذراء (درنكة)", type: "monastery", governorate: "أسيوط", city: "أسيوط", lat: 27.1400, lng: 31.1450, description: "مسار العائلة المقدسة - يقام به مولد العذراء أغسطس كل عام", patron: "العذراء مريم" },
  { id: 154, name: "دير الأنبا تواضروس المشرقي", type: "monastery", governorate: "الأقصر", city: "الأقصر", lat: 25.7400, lng: 32.5800, patron: "الأنبا تواضروس" },
  { id: 155, name: "دير مارجرجس (الرزيقات)", type: "monastery", governorate: "الأقصر", city: "الأقصر", lat: 25.7100, lng: 32.6200, patron: "مارجرجس" },
  { id: 156, name: "دير الأنبا باخوميوس (إدفو)", type: "monastery", governorate: "أسوان", city: "إدفو", lat: 24.9750, lng: 32.8680, patron: "الأنبا باخوميوس" },
  { id: 157, name: "دير القديس سمعان (أسوان)", type: "monastery", governorate: "أسوان", city: "أسوان", lat: 24.0830, lng: 32.8820, description: "دير أثري على الضفة الغربية للنيل", patron: "القديس سمعان" },
  { id: 158, name: "دير الشهيدة دميانة", type: "monastery", governorate: "الدقهلية", city: "بلقاس", lat: 31.2090, lng: 31.5410, description: "يضم جسد الشهيدة دميانة والأربعين عذراء", patron: "الشهيدة دميانة" },
  { id: 159, name: "دير مارجرجس (الخطاطبة)", type: "monastery", governorate: "المنوفية", city: "الخطاطبة", lat: 30.3100, lng: 30.8230, patron: "مارجرجس" },
  { id: 160, name: "دير العذراء مريم (جبل قسقام)", type: "monastery", governorate: "أسيوط", city: "القوصية", lat: 27.4550, lng: 30.8310, description: "الكنيسة الأثرية على اسم العذراء مريم", patron: "العذراء مريم" },
  { id: 161, name: "دير الأنبا بضابا (قمولا)", type: "monastery", governorate: "قنا", city: "نقادة", lat: 25.9010, lng: 32.6940, patron: "الأنبا بضابا" },
  { id: 162, name: "دير مارجرجس (الجبل - ​الأقصر)", type: "monastery", governorate: "الأقصر", city: "أرمنت", lat: 25.6150, lng: 32.5320, patron: "مارجرجس" },
  { id: 163, name: "دير الملاك غبريال (الفيوم)", type: "monastery", governorate: "الفيوم", city: "الفيوم", lat: 29.4470, lng: 30.6580, description: "دير أثري في الفيوم", patron: "الملاك غبريال" },
  { id: 164, name: "دير العزب (الأنبا بيشوي)", type: "monastery", governorate: "الفيوم", city: "الفيوم", lat: 29.3940, lng: 30.7290, patron: "الأنبا بيشوي" },
  { id: 165, name: "دير الأنبا أبرام (الفيوم)", type: "monastery", governorate: "الفيوم", city: "الفيوم", lat: 29.3100, lng: 30.8380, description: "على اسم الأنبا أبرام أسقف الفيوم", patron: "الأنبا أبرام" },

  // ===== المزيد من كنائس القاهرة الكبرى =====
  { id: 166, name: "كنيسة مارجرجس (الجولف - مصر الجديدة)", type: "church", governorate: "القاهرة", city: "مصر الجديدة", lat: 30.0940, lng: 31.3490, patron: "مارجرجس" },
  { id: 167, name: "كنيسة العذراء (عزبة النخل)", type: "church", governorate: "القاهرة", city: "عزبة النخل", lat: 30.1370, lng: 31.3350, patron: "العذراء مريم" },
  { id: 168, name: "كنيسة الأنبا بيشوي (حدائق الأهرام)", type: "church", governorate: "الجيزة", city: "حدائق الأهرام", lat: 29.9880, lng: 31.1280, patron: "الأنبا بيشوي" },
  { id: 169, name: "كنيسة مارمينا (التجمع الخامس)", type: "church", governorate: "القاهرة", city: "التجمع الخامس", lat: 30.0080, lng: 31.4280, patron: "مارمينا" },
  { id: 170, name: "كنيسة العذراء مريم (المعصرة)", type: "church", governorate: "القاهرة", city: "المعصرة", lat: 29.8790, lng: 31.2950, patron: "العذراء مريم" },
  { id: 171, name: "كنيسة العذراء والأنبا رويس (العباسية)", type: "church", governorate: "القاهرة", city: "العباسية", lat: 30.0790, lng: 31.2760, patron: "العذراء والأنبا رويس" },
  { id: 172, name: "كنيسة الملاك ميخائيل (الدمرداش)", type: "church", governorate: "القاهرة", city: "الدمرداش", lat: 30.0660, lng: 31.2770, patron: "الملاك ميخائيل" },
  { id: 173, name: "كنيسة مارجرجس (عين شمس)", type: "church", governorate: "القاهرة", city: "عين شمس", lat: 30.1340, lng: 31.3250, patron: "مارجرجس" },
  { id: 174, name: "كنيسة العذراء (مدينة نصر)", type: "church", governorate: "القاهرة", city: "مدينة نصر", lat: 30.0550, lng: 31.3450, patron: "العذراء مريم" },
  { id: 175, name: "كنيسة مارمينا (مدينة نصر)", type: "church", governorate: "القاهرة", city: "مدينة نصر", lat: 30.0520, lng: 31.3380, patron: "مارمينا" },
  { id: 176, name: "كنيسة مارجرجس (المعادي)", type: "church", governorate: "القاهرة", city: "المعادي", lat: 29.9600, lng: 31.2510, patron: "مارجرجس" },

  // ===== العاصمة الإدارية الجديدة =====
  { id: 177, name: "كاتدرائية ميلاد المسيح", type: "cathedral", governorate: "القاهرة", city: "العاصمة الإدارية الجديدة", lat: 30.0196, lng: 31.7630, description: "أكبر كاتدرائية في الشرق الأوسط وأفريقيا - افتتحت 2019", patron: "ميلاد المسيح" },

  // ===== مطرانيات وأسقفيات =====
  { id: 178, name: "مطرانية المنيا وأبوقرقاص", type: "bishopric", governorate: "المنيا", city: "المنيا", lat: 28.0860, lng: 30.7500, description: "مقر المطرانية", patron: "الأنبا مكاريوس" },
  { id: 179, name: "مطرانية أسيوط", type: "bishopric", governorate: "أسيوط", city: "أسيوط", lat: 27.1800, lng: 31.1830, description: "مقر المطرانية" },
  { id: 180, name: "مطرانية ملوي والأشمونين", type: "bishopric", governorate: "المنيا", city: "ملوي", lat: 27.7300, lng: 30.8400, description: "مقر المطرانية" },
  { id: 181, name: "مطرانية الإسكندرية", type: "bishopric", governorate: "الإسكندرية", city: "الإسكندرية", lat: 31.2000, lng: 29.9050, description: "مقر المطرانية" },
  { id: 182, name: "مطرانية بني سويف والبهنسا", type: "bishopric", governorate: "بني سويف", city: "بني سويف", lat: 29.0730, lng: 31.0920, description: "مقر المطرانية" },
  { id: 183, name: "مطرانية الفيوم", type: "bishopric", governorate: "الفيوم", city: "الفيوم", lat: 29.3080, lng: 30.8430, description: "مقر المطرانية" },
  { id: 184, name: "مطرانية الأقصر وإسنا وأرمنت", type: "bishopric", governorate: "الأقصر", city: "الأقصر", lat: 25.6980, lng: 32.6430, description: "مقر المطرانية" },
  { id: 185, name: "مطرانية قنا ونقادة وقوص", type: "bishopric", governorate: "قنا", city: "قنا", lat: 26.1640, lng: 32.7250, description: "مقر المطرانية" },

  // ===== المزيد من الأديرة =====
  { id: 186, name: "دير العذراء الشاروبيم (أبو صير)", type: "monastery", governorate: "الجيزة", city: "أبو صير", lat: 29.8500, lng: 31.2100, patron: "العذراء مريم" },
  { id: 187, name: "دير القديسة دميانة (البراري)", type: "monastery", governorate: "الدقهلية", city: "بلقاس", lat: 31.2100, lng: 31.5420, description: "للراهبات", patron: "القديسة دميانة" },
  { id: 188, name: "دير مارجرجس (مصر القديمة)", type: "monastery", governorate: "القاهرة", city: "مصر القديمة", lat: 30.0063, lng: 31.2300, description: "دير للراهبات في مجمع الأديان", patron: "مارجرجس" },
  { id: 189, name: "دير العذراء (سخا - بيخا إيسوس)", type: "monastery", governorate: "كفر الشيخ", city: "سخا", lat: 31.0870, lng: 30.9480, description: "مسار العائلة المقدسة - أثر قدم الطفل يسوع على حجر", patron: "العذراء مريم" },
  { id: 190, name: "دير مارمينا (الملك - الإسكندرية)", type: "monastery", governorate: "الإسكندرية", city: "كينج مريوط", lat: 30.8520, lng: 29.6650, description: "مدينة أثرية كاملة - مارمينا العجائبي", patron: "مارمينا" },
  { id: 191, name: "دير الأنبا مقار (أبو مقار)", type: "monastery", governorate: "البحيرة", city: "وادي النطرون", lat: 30.3650, lng: 30.4600, description: "تم إختيار منه أكثر باباوات الكنيسة", patron: "أبو مقار" },

  // ===== المزيد من كنائس الصعيد =====
  { id: 192, name: "كنيسة العذراء (ساقلتة - سوهاج)", type: "church", governorate: "سوهاج", city: "ساقلتة", lat: 26.6510, lng: 31.5680, patron: "العذراء مريم" },
  { id: 193, name: "كنيسة مارجرجس (دار السلام - سوهاج)", type: "church", governorate: "سوهاج", city: "دار السلام", lat: 26.4130, lng: 31.8680, patron: "مارجرجس" },
  { id: 194, name: "كنيسة العذراء (قوص - قنا)", type: "church", governorate: "قنا", city: "قوص", lat: 25.9210, lng: 32.7640, patron: "العذراء مريم" },
  { id: 195, name: "كنيسة مارجرجس (نقادة)", type: "church", governorate: "قنا", city: "نقادة", lat: 25.9040, lng: 32.7000, patron: "مارجرجس" },
  { id: 196, name: "كنيسة العذراء (أرمنت)", type: "church", governorate: "الأقصر", city: "أرمنت", lat: 25.6200, lng: 32.5340, patron: "العذراء مريم" },

  // ===== كنائس من محافظات أخرى =====
  { id: 197, name: "كنيسة مارجرجس (السنبلاوين)", type: "church", governorate: "الدقهلية", city: "السنبلاوين", lat: 30.8790, lng: 31.4120, patron: "مارجرجس" },
  { id: 198, name: "كنيسة العذراء (ميت غمر)", type: "church", governorate: "الدقهلية", city: "ميت غمر", lat: 30.7180, lng: 31.2600, patron: "العذراء مريم" },
  { id: 199, name: "كنيسة مارمينا (أبو المطامير)", type: "church", governorate: "البحيرة", city: "أبو المطامير", lat: 30.8960, lng: 30.3620, patron: "مارمينا" },
  { id: 200, name: "كنيسة العذراء مريم (مصر الجديدة - سانتا تريزا)", type: "church", governorate: "القاهرة", city: "مصر الجديدة", lat: 30.0920, lng: 31.3280, patron: "العذراء مريم" },
];

export const governorates = [...new Set(churches.map(c => c.governorate))].sort();

export const typeLabels: Record<string, string> = {
  church: "كنيسة",
  monastery: "دير",
  cathedral: "كاتدرائية",
  bishopric: "مطرانية / أسقفية"
};

export const typeIcons: Record<string, string> = {
  church: "⛪",
  monastery: "🏛️",
  cathedral: "⛪",
  bishopric: "✝️"
};

export const typeColors: Record<string, string> = {
  church: "#3B82F6",
  monastery: "#8B5CF6",
  cathedral: "#EF4444",
  bishopric: "#F59E0B"
};
