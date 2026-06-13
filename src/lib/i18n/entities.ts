import type { Locale } from "@/types/locale";

type ForeignLocales = Record<"en" | "ja" | "zh" | "th", string>;

const ENTITY_TRANSLATIONS: Record<string, ForeignLocales> = {
  성형외과: {
    en: "Plastic Surgery",
    ja: "美容外科",
    zh: "整形外科",
    th: "ศัลยกรรมตกแต่ง",
  },
  피부과: {
    en: "Dermatology",
    ja: "皮膚科",
    zh: "皮肤科",
    th: "แผนกผิวหนัง",
  },
  "안면 윤곽": {
    en: "Facial Contouring",
    ja: "輪郭整形",
    zh: "面部轮廓",
    th: "ศัลยกรรมหน้าเรียว",
  },
  안티에이징: {
    en: "Anti-Aging",
    ja: "アンチエイジング",
    zh: "抗衰老",
    th: "ชะลอวัย",
  },
  "가슴 성형": {
    en: "Breast Surgery",
    ja: "豊胸・乳房整形",
    zh: "胸部整形",
    th: "ศัลยกรรมหน้าอก",
  },
  "체형 성형": {
    en: "Body Contouring",
    ja: "体型整形",
    zh: "体型整形",
    th: "ศัลยกรรมรูปร่าง",
  },
  "눈 성형": {
    en: "Eye Surgery",
    ja: "目元整形",
    zh: "眼部整形",
    th: "ศัลยกรรมตา",
  },
  "코 성형": {
    en: "Rhinoplasty",
    ja: "鼻整形",
    zh: "鼻部整形",
    th: "ศัลยกรรมจมูก",
  },
  리프팅: {
    en: "Lifting",
    ja: "リフティング",
    zh: "提升",
    th: "ยกกระชับ",
  },
  스킨부스터: {
    en: "Skin Booster",
    ja: "スキンブースター",
    zh: "皮肤助推",
    th: "สกินบูสเตอร์",
  },
  "쁘띠(보톡스/필러)": {
    en: "Petit (Botox/Filler)",
    ja: "プチ（ボトックス/フィラー）",
    zh: "微整（肉毒/填充）",
    th: "เสริมจุดเล็ก (โบท็อกซ์/ฟิลเลอร์)",
  },
  "메디컬 스킨케어": {
    en: "Medical Skincare",
    ja: "メディカルスキンケア",
    zh: "医学护肤",
    th: "สกินแคร์ทางการแพทย์",
  },
  제모: {
    en: "Hair Removal",
    ja: "脱毛",
    zh: "脱毛",
    th: "กำจัดขน",
  },
  "광대축소 (양측)": {
    en: "Cheekbone Reduction (Bilateral)",
    ja: "頬骨縮小（両側）",
    zh: "颧骨缩小（双侧）",
    th: "ลดโหนกแก้ม (สองข้าง)",
  },
  "사각턱수술 (양측)": {
    en: "Square Jaw Surgery (Bilateral)",
    ja: "エラ削り（両側）",
    zh: "下颌角手术（双侧）",
    th: "ศัลยกรรมกรามเหลี่ยม (สองข้าง)",
  },
  "앞턱 축소 (T존)": {
    en: "Chin Reduction (T-zone)",
    ja: "顎先縮小（Tゾーン）",
    zh: "下巴缩小（T区）",
    th: "ลดคาง (โซน T)",
  },
  "V라인 지방흡입": {
    en: "V-line Liposuction",
    ja: "Vライン脂肪吸引",
    zh: "V线吸脂",
    th: "ดูดไขมันหน้าเรียว V-line",
  },
  "이중턱 지방흡입": {
    en: "Double Chin Liposuction",
    ja: "二重あご脂肪吸引",
    zh: "双下巴吸脂",
    th: "ดูดไขมันคางสองชั้น",
  },
  "안면 거상술 (스마스 거상)": {
    en: "Facelift (SMAS)",
    ja: "フェイスリフト（SMAS）",
    zh: "面部拉皮（SMAS）",
    th: "ดึงหน้า (SMAS)",
  },
  이마거상술: {
    en: "Forehead Lift",
    ja: "額リフト",
    zh: "额头提升",
    th: "ยกกระชับหน้าผาก",
  },
  목거상술: {
    en: "Neck Lift",
    ja: "ネックリフト",
    zh: "颈部提升",
    th: "ยกกระชับคอ",
  },
  "실리프팅 (풀페이스)": {
    en: "Thread Lift (Full Face)",
    ja: "糸リフト（全顔）",
    zh: "线雕（全脸）",
    th: "ร้อยไหมยกกระชับ (ทั้งหน้า)",
  },
  "눈썹 거상술": {
    en: "Brow Lift",
    ja: "眉下切開",
    zh: "眉部提升",
    th: "ยกกระชับคิ้ว",
  },
  "가슴 확대 (물방울 보형물)": {
    en: "Breast Augmentation (Motiva)",
    ja: "豊胸（モティバ）",
    zh: "隆胸（水滴假体）",
    th: "เสริมหน้าอก (โมติวา)",
  },
  "가슴 확대 (벨벳 보형물)": {
    en: "Breast Augmentation (Mentor)",
    ja: "豊胸（メンター）",
    zh: "隆胸（曼托假体）",
    th: "เสริมหน้าอก (เมนเทอร์)",
  },
  "가슴 축소": {
    en: "Breast Reduction",
    ja: "乳房縮小",
    zh: "乳房缩小",
    th: "ลดขนาดหน้าอก",
  },
  "가슴 거상술": {
    en: "Breast Lift",
    ja: "乳房吊上術",
    zh: "乳房提升",
    th: "ยกกระชับหน้าอก",
  },
  "유두/유륜 성형": {
    en: "Nipple/Areola Surgery",
    ja: "乳首・乳輪整形",
    zh: "乳头/乳晕整形",
    th: "ศัลยกรรมหัวนม/ลานนม",
  },
  "복부 지방흡입": {
    en: "Abdominal Liposuction",
    ja: "腹部脂肪吸引",
    zh: "腹部吸脂",
    th: "ดูดไขมันหน้าท้อง",
  },
  "팔뚝 지방흡입 (양측)": {
    en: "Arm Liposuction (Bilateral)",
    ja: "二の腕脂肪吸引（両側）",
    zh: "手臂吸脂（双侧）",
    th: "ดูดไขมันต้นแขน (สองข้าง)",
  },
  "허벅지 지방흡입 (양측)": {
    en: "Thigh Liposuction (Bilateral)",
    ja: "太もも脂肪吸引（両側）",
    zh: "大腿吸脂（双侧）",
    th: "ดูดไขมันต้นขา (สองข้าง)",
  },
  "복부 성형술 (티ummy tuck)": {
    en: "Tummy Tuck",
    ja: "腹部タック",
    zh: "腹壁整形",
    th: "ศัลยกรรมกระชับหน้าท้อง",
  },
  "엉덩이 지방이식": {
    en: "Buttock Fat Grafting",
    ja: "お尻脂肪移植",
    zh: "臀部脂肪移植",
    th: "ถ่ายไขมันสะโพก",
  },
  "쌍꺼풀 수술 (매몰법)": {
    en: "Double Eyelid (Non-incision)",
    ja: "二重（埋没法）",
    zh: "双眼皮（埋线）",
    th: "ทำตาสองชั้น (ฝังเส้น)",
  },
  "쌍꺼풀 수술 (절개법)": {
    en: "Double Eyelid (Incision)",
    ja: "二重（切開法）",
    zh: "双眼皮（切开）",
    th: "ทำตาสองชั้น (กรีด)",
  },
  눈밑지방재배치: {
    en: "Under-eye Fat Repositioning",
    ja: "目の下脂肪再配置",
    zh: "眼底脂肪重置",
    th: "จัดเรียงไขมันใต้ตา",
  },
  앞트임: {
    en: "Epicanthoplasty",
    ja: "目頭切開",
    zh: "开内眼角",
    th: "เปิดหัวตา",
  },
  뒤트임: {
    en: "Lateral Canthoplasty",
    ja: "目尻切開",
    zh: "开外眼角",
    th: "เปิดหางตา",
  },
  "눈매교정 (안검하수)": {
    en: "Ptosis Correction",
    ja: "眼瞼下垂矯正",
    zh: "上睑下垂矫正",
    th: "แก้ไขหนังตาตก",
  },
  "코끝 성형 (자가연골)": {
    en: "Tip Plasty (Autologous Cartilage)",
    ja: "鼻先整形（自家軟骨）",
    zh: "鼻尖整形（自体软骨）",
    th: "เสริมปลายจมูก (กระดูกอ่อนตนเอง)",
  },
  "비중격 교정": {
    en: "Septoplasty",
    ja: "鼻中隔矯正",
    zh: "鼻中隔矫正",
    th: "แก้ไขผนังกั้นจมูก",
  },
  "융비술 (실리콘)": {
    en: "Rhinoplasty (Silicone)",
    ja: "隆鼻術（シリコン）",
    zh: "隆鼻（硅胶）",
    th: "เสริมจมูก (ซิลิโคน)",
  },
  "매부리코 교정": {
    en: "Hump Nose Correction",
    ja: "ワシ鼻矯正",
    zh: "驼峰鼻矫正",
    th: "แก้ไขจมูกโด่ง",
  },
  "콧볼 축소": {
    en: "Alar Reduction",
    ja: "小鼻縮小",
    zh: "鼻翼缩小",
    th: "ลดขนาดปีกจมูก",
  },
  "인모드 FX (풀페이스)": {
    en: "InMode FX (Full Face)",
    ja: "インモードFX（全顔）",
    zh: "InMode FX（全脸）",
    th: "InMode FX (ทั้งหน้า)",
  },
  "슈링크 유니버스 300샷": {
    en: "Shurink Universe 300 Shots",
    ja: "シュリンクユニバース300ショット",
    zh: "舒丽可宇宙300发",
    th: "Shurink Universe 300 ช็อต",
  },
  "울쎄라 300샷": {
    en: "Ultherapy 300 Shots",
    ja: "ウルセラ300ショット",
    zh: "超声刀300发",
    th: "Ultherapy 300 ช็อต",
  },
  "울쎄라 600샷": {
    en: "Ultherapy 600 Shots",
    ja: "ウルセラ600ショット",
    zh: "超声刀600发",
    th: "Ultherapy 600 ช็อต",
  },
  "써마지 FLX 600샷": {
    en: "Thermage FLX 600 Shots",
    ja: "サーマクールFLX600ショット",
    zh: "热玛吉FLX 600发",
    th: "Thermage FLX 600 ช็อต",
  },
  "올리지오 600샷": {
    en: "Oligio 600 Shots",
    ja: "オリジオ600ショット",
    zh: "Oligio 600发",
    th: "Oligio 600 ช็อต",
  },
  "리쥬란 힐러 2cc": {
    en: "Rejuran Healer 2cc",
    ja: "リジュラン2cc",
    zh: "丽珠兰2cc",
    th: "Rejuran Healer 2cc",
  },
  "리쥬란 아이 1cc": {
    en: "Rejuran I 1cc",
    ja: "リジュランアイ1cc",
    zh: "丽珠兰眼部1cc",
    th: "Rejuran I 1cc",
  },
  "쥬베룩 2cc": {
    en: "Juvelook 2cc",
    ja: "ジュベルック2cc",
    zh: "Juvelook 2cc",
    th: "Juvelook 2cc",
  },
  "스킨보틀러 2cc": {
    en: "Skin Botox 2cc",
    ja: "スキンボトックス2cc",
    zh: "皮肤肉毒2cc",
    th: "Skin Botox 2cc",
  },
  "엑소좀 5cc": {
    en: "Exosome 5cc",
    ja: "エクソソーム5cc",
    zh: "外泌体5cc",
    th: "Exosome 5cc",
  },
  "사각턱 보톡스 (국산 50U)": {
    en: "Masseter Botox (Domestic 50U)",
    ja: "エラボトックス（国産50U）",
    zh: "咬肌肉毒（国产50U）",
    th: "โบท็อกซ์กราม (ในประเทศ 50U)",
  },
  "이마 보톡스 (국산 20U)": {
    en: "Forehead Botox (Domestic 20U)",
    ja: "額ボトックス（国産20U）",
    zh: "额头肉毒（国产20U）",
    th: "โบท็อกซ์หน้าผาก (ในประเทศ 20U)",
  },
  "필러 (국산 1cc)": {
    en: "Filler (Domestic 1cc)",
    ja: "フィラー（国産1cc）",
    zh: "填充（国产1cc）",
    th: "ฟิลเลอร์ (ในประเทศ 1cc)",
  },
  "필러 (수입 1cc - 쥬비덤/레스틸렌)": {
    en: "Filler (Imported 1cc)",
    ja: "フィラー（輸入1cc）",
    zh: "填充（进口1cc）",
    th: "ฟิลเลอร์ (นำเข้า 1cc)",
  },
  "입술/입꼬리 필러 1cc": {
    en: "Lip/Corner Filler 1cc",
    ja: "唇・口角フィラー1cc",
    zh: "唇部/嘴角填充1cc",
    th: "ฟิลเลอร์ริมฝีปาก/มุมปาก 1cc",
  },
  "팔자주름 필러 1cc": {
    en: "Nasolabial Filler 1cc",
    ja: "ほうれい線フィラー1cc",
    zh: "法令纹填充1cc",
    th: "ฟิลเลอร์ร่องแก้ม 1cc",
  },
  "LDM 물방울리프팅": {
    en: "LDM Water Drop Lifting",
    ja: "LDM水滴リフティング",
    zh: "LDM水滴提升",
    th: "LDM ยกกระชับน้ำหยด",
  },
  "레이저 토닝 1회": {
    en: "Laser Toning (1 session)",
    ja: "レーザートーニング1回",
    zh: "激光嫩肤1次",
    th: "เลเซอร์โทนนิ่ง (1 ครั้ง)",
  },
  "피코 토닝 1회": {
    en: "Pico Toning (1 session)",
    ja: "ピコトーニング1回",
    zh: "皮秒嫩肤1次",
    th: "พิโคโทนนิ่ง (1 ครั้ง)",
  },
  "피코토닝 1회": {
    en: "Pico Toning (1 session)",
    ja: "ピコトーニング1回",
    zh: "皮秒嫩肤1次",
    th: "พิโคโทนนิ่ง (1 ครั้ง)",
  },
  "프락셀 레이저": {
    en: "Fraxel Laser",
    ja: "フラクセルレーザー",
    zh: "飞梭激光",
    th: "เลเซอร์ Fraxel",
  },
  아쿠아필링: {
    en: "Aqua Peeling",
    ja: "アクアピーリング",
    zh: "水氧焕肤",
    th: "อะควา พีลลิ่ง",
  },
  "겨드랑이 제모 (5회 패키지)": {
    en: "Underarm Hair Removal (5 sessions)",
    ja: "ワキ脱毛（5回）",
    zh: "腋下脱毛（5次）",
    th: "กำจัดขนรักแร้ (5 ครั้ง)",
  },
  "다리 전체 제모 (1회)": {
    en: "Full Leg Hair Removal (1 session)",
    ja: "脚全体脱毛（1回）",
    zh: "全腿脱毛（1次）",
    th: "กำจัดขนขาทั้งขา (1 ครั้ง)",
  },
  "인중 제모 (5회 패키지)": {
    en: "Upper Lip Hair Removal (5 sessions)",
    ja: "人中脱毛（5回）",
    zh: "上唇脱毛（5次）",
    th: "กำจัดขนเหนือริมฝีปาก (5 ครั้ง)",
  },
  "브라질리언 제모 (5회 패키지)": {
    en: "Brazilian Hair Removal (5 sessions)",
    ja: "VIO脱毛（5回）",
    zh: "比基尼脱毛（5次）",
    th: "กำจัดขนบราซิลเลียน (5 ครั้ง)",
  },
  "V-라인 완벽 정복 패키지": {
    en: "V-line Complete Package",
    ja: "Vライン完璧パッケージ",
    zh: "V线完美套餐",
    th: "แพ็กเกจหน้าเรียว V-line สมบูรณ์แบบ",
  },
  "물광 재생 패키지": {
    en: "Glass Skin Regeneration Package",
    ja: "水光再生パッケージ",
    zh: "水光再生套餐",
    th: "แพ็กเกจผิวฉ่ำฟู",
  },
  "여배우 눈가 패키지": {
    en: "Actress Eye Area Package",
    ja: "女優目元パッケージ",
    zh: "女星眼周套餐",
    th: "แพ็กเกจรอบดวงตาสไตล์ดารา",
  },
  "풀페이스 안티에이징 패키지": {
    en: "Full-face Anti-aging Package",
    ja: "フルフェイスアンチエイジングパッケージ",
    zh: "全脸抗衰老套餐",
    th: "แพ็กเกจชะลอวัยทั้งหน้า",
  },
  검사: {
    en: "Medical Examination",
    ja: "検査",
    zh: "检查",
    th: "การตรวจร่างกาย",
  },
  통역: {
    en: "Interpretation Service",
    ja: "通訳",
    zh: "翻译服务",
    th: "บริการล่าม",
  },
  "공항 픽업": {
    en: "Airport Pickup",
    ja: "空港ピックアップ",
    zh: "机场接送",
    th: "รับที่สนามบิน",
  },
  "비타민 주사": {
    en: "Vitamin Injection",
    ja: "ビタミン注射",
    zh: "维生素注射",
    th: "ฉีดวิตามิน",
  },
};

export function translateEntity(koreanKey: string, locale: Locale): string {
  if (locale === "ko") return koreanKey;
  return ENTITY_TRANSLATIONS[koreanKey]?.[locale] ?? koreanKey;
}

export function translateDepartment(
  dept: "성형외과" | "피부과",
  locale: Locale
): string {
  if (locale === "ko") return dept;
  return dept === "성형외과"
    ? translateEntity("성형외과", locale)
    : translateEntity("피부과", locale);
}
