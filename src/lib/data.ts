import type { Department, Treatment, Bundle } from "@/types";

export const DEPARTMENT_CATEGORIES: Record<Department, string[]> = {
  성형외과: [
    "안면 윤곽",
    "안티에이징",
    "가슴 성형",
    "체형 성형",
    "눈 성형",
    "코 성형",
  ],
  피부과: [
    "리프팅",
    "스킨부스터",
    "쁘띠(보톡스/필러)",
    "메디컬 스킨케어",
    "제모",
  ],
};

export const treatmentsDB: Treatment[] = [
  // ── 성형외과 · 안면 윤곽 ──
  {
    department: "성형외과",
    category: "안면 윤곽",
    name: "광대축소 (양측)",
    base_price: 6600000,
  },
  {
    department: "성형외과",
    category: "안면 윤곽",
    name: "사각턱수술 (양측)",
    base_price: 4400000,
  },
  {
    department: "성형외과",
    category: "안면 윤곽",
    name: "앞턱 축소 (T존)",
    base_price: 3300000,
  },
  {
    department: "성형외과",
    category: "안면 윤곽",
    name: "V라인 지방흡입",
    base_price: 1980000,
  },
  {
    department: "성형외과",
    category: "안면 윤곽",
    name: "이중턱 지방흡입",
    base_price: 1650000,
  },

  // ── 성형외과 · 안티에이징 ──
  {
    department: "성형외과",
    category: "안티에이징",
    name: "안면 거상술 (스마스 거상)",
    base_price: 8800000,
  },
  {
    department: "성형외과",
    category: "안티에이징",
    name: "이마거상술",
    base_price: 4400000,
  },
  {
    department: "성형외과",
    category: "안티에이징",
    name: "목거상술",
    base_price: 5500000,
  },
  {
    department: "성형외과",
    category: "안티에이징",
    name: "실리프팅 (풀페이스)",
    base_price: 3300000,
  },
  {
    department: "성형외과",
    category: "안티에이징",
    name: "눈썹 거상술",
    base_price: 2750000,
  },

  // ── 성형외과 · 가슴 성형 ──
  {
    department: "성형외과",
    category: "가슴 성형",
    name: "가슴 확대 (물방울 보형물)",
    base_price: 7700000,
  },
  {
    department: "성형외과",
    category: "가슴 성형",
    name: "가슴 확대 (벨벳 보형물)",
    base_price: 8800000,
  },
  {
    department: "성형외과",
    category: "가슴 성형",
    name: "가슴 축소",
    base_price: 6600000,
  },
  {
    department: "성형외과",
    category: "가슴 성형",
    name: "가슴 거상술",
    base_price: 8250000,
  },
  {
    department: "성형외과",
    category: "가슴 성형",
    name: "유두/유륜 성형",
    base_price: 2200000,
  },

  // ── 성형외과 · 체형 성형 ──
  {
    department: "성형외과",
    category: "체형 성형",
    name: "복부 지방흡입",
    base_price: 3300000,
  },
  {
    department: "성형외과",
    category: "체형 성형",
    name: "팔뚝 지방흡입 (양측)",
    base_price: 1980000,
  },
  {
    department: "성형외과",
    category: "체형 성형",
    name: "허벅지 지방흡입 (양측)",
    base_price: 2420000,
  },
  {
    department: "성형외과",
    category: "체형 성형",
    name: "복부 성형술 (티ummy tuck)",
    base_price: 6600000,
  },
  {
    department: "성형외과",
    category: "체형 성형",
    name: "엉덩이 지방이식",
    base_price: 4400000,
  },

  // ── 성형외과 · 눈 성형 ──
  {
    department: "성형외과",
    category: "눈 성형",
    name: "쌍꺼풀 수술 (매몰법)",
    base_price: 990000,
  },
  {
    department: "성형외과",
    category: "눈 성형",
    name: "쌍꺼풀 수술 (절개법)",
    base_price: 1650000,
  },
  {
    department: "성형외과",
    category: "눈 성형",
    name: "눈밑지방재배치",
    base_price: 990000,
  },
  {
    department: "성형외과",
    category: "눈 성형",
    name: "앞트임",
    base_price: 650000,
  },
  {
    department: "성형외과",
    category: "눈 성형",
    name: "뒤트임",
    base_price: 850000,
  },
  {
    department: "성형외과",
    category: "눈 성형",
    name: "눈매교정 (안검하수)",
    base_price: 2200000,
  },

  // ── 성형외과 · 코 성형 ──
  {
    department: "성형외과",
    category: "코 성형",
    name: "코끝 성형 (자가연골)",
    base_price: 1650000,
  },
  {
    department: "성형외과",
    category: "코 성형",
    name: "비중격 교정",
    base_price: 880000,
  },
  {
    department: "성형외과",
    category: "코 성형",
    name: "융비술 (실리콘)",
    base_price: 2750000,
  },
  {
    department: "성형외과",
    category: "코 성형",
    name: "매부리코 교정",
    base_price: 1320000,
  },
  {
    department: "성형외과",
    category: "코 성형",
    name: "콧볼 축소",
    base_price: 1100000,
  },

  // ── 피부과 · 리프팅 ──
  {
    department: "피부과",
    category: "리프팅",
    name: "인모드 FX (풀페이스)",
    base_price: 180000,
  },
  {
    department: "피부과",
    category: "리프팅",
    name: "슈링크 유니버스 300샷",
    base_price: 165000,
  },
  {
    department: "피부과",
    category: "리프팅",
    name: "울쎄라 300샷",
    base_price: 990000,
  },
  {
    department: "피부과",
    category: "리프팅",
    name: "울쎄라 600샷",
    base_price: 1650000,
  },
  {
    department: "피부과",
    category: "리프팅",
    name: "써마지 FLX 600샷",
    base_price: 1650000,
  },
  {
    department: "피부과",
    category: "리프팅",
    name: "올리지오 600샷",
    base_price: 1320000,
  },

  // ── 피부과 · 스킨부스터 ──
  {
    department: "피부과",
    category: "스킨부스터",
    name: "리쥬란 힐러 2cc",
    base_price: 320000,
  },
  {
    department: "피부과",
    category: "스킨부스터",
    name: "리쥬란 아이 1cc",
    base_price: 198000,
  },
  {
    department: "피부과",
    category: "스킨부스터",
    name: "쥬베룩 2cc",
    base_price: 385000,
  },
  {
    department: "피부과",
    category: "스킨부스터",
    name: "스킨보틀러 2cc",
    base_price: 275000,
  },
  {
    department: "피부과",
    category: "스킨부스터",
    name: "엑소좀 5cc",
    base_price: 440000,
  },

  // ── 피부과 · 쁘띠(보톡스/필러) ──
  {
    department: "피부과",
    category: "쁘띠(보톡스/필러)",
    name: "사각턱 보톡스 (국산 50U)",
    base_price: 45000,
  },
  {
    department: "피부과",
    category: "쁘띠(보톡스/필러)",
    name: "이마 보톡스 (국산 20U)",
    base_price: 28000,
  },
  {
    department: "피부과",
    category: "쁘띠(보톡스/필러)",
    name: "필러 (국산 1cc)",
    base_price: 198000,
  },
  {
    department: "피부과",
    category: "쁘띠(보톡스/필러)",
    name: "필러 (수입 1cc - 쥬비덤/레스틸렌)",
    base_price: 495000,
  },
  {
    department: "피부과",
    category: "쁘띠(보톡스/필러)",
    name: "입술/입꼬리 필러 1cc",
    base_price: 385000,
  },
  {
    department: "피부과",
    category: "쁘띠(보톡스/필러)",
    name: "팔자주름 필러 1cc",
    base_price: 330000,
  },

  // ── 피부과 · 메디컬 스킨케어 ──
  {
    department: "피부과",
    category: "메디컬 스킨케어",
    name: "LDM 물방울리프팅",
    base_price: 90000,
  },
  {
    department: "피부과",
    category: "메디컬 스킨케어",
    name: "레이저 토닝 1회",
    base_price: 60000,
  },
  {
    department: "피부과",
    category: "메디컬 스킨케어",
    name: "피코 토닝 1회",
    base_price: 110000,
  },
  {
    department: "피부과",
    category: "메디컬 스킨케어",
    name: "피코토닝 1회",
    base_price: 88000,
  },
  {
    department: "피부과",
    category: "메디컬 스킨케어",
    name: "프락셀 레이저",
    base_price: 165000,
  },
  {
    department: "피부과",
    category: "메디컬 스킨케어",
    name: "아쿠아필링",
    base_price: 77000,
  },

  // ── 피부과 · 제모 ──
  {
    department: "피부과",
    category: "제모",
    name: "겨드랑이 제모 (5회 패키지)",
    base_price: 88000,
  },
  {
    department: "피부과",
    category: "제모",
    name: "다리 전체 제모 (1회)",
    base_price: 132000,
  },
  {
    department: "피부과",
    category: "제모",
    name: "인중 제모 (5회 패키지)",
    base_price: 55000,
  },
  {
    department: "피부과",
    category: "제모",
    name: "브라질리언 제모 (5회 패키지)",
    base_price: 165000,
  },
];

export const bundlesDB: Bundle[] = [
  {
    name: "V-라인 완벽 정복 패키지",
    required: [
      "인모드 FX (풀페이스)",
      "슈링크 유니버스 300샷",
      "사각턱 보톡스 (국산 50U)",
    ],
    price: 390000,
  },
  {
    name: "물광 재생 패키지",
    required: ["리쥬란 힐러 2cc", "피코 토닝 1회"],
    price: 290000,
  },
  {
    name: "여배우 눈가 패키지",
    required: ["눈밑지방재배치", "입술/입꼬리 필러 1cc"],
    price: 1300000,
  },
  {
    name: "풀페이스 안티에이징 패키지",
    required: ["안면 거상술 (스마스 거상)", "울쎄라 600샷"],
    price: 9500000,
  },
];

export function getCategoriesByDepartment(department: Department): string[] {
  return DEPARTMENT_CATEGORIES[department];
}

export function getTreatmentsByCategory(
  department: Department,
  category: string
): Treatment[] {
  return treatmentsDB.filter(
    (t) => t.department === department && t.category === category
  );
}

export function getTreatmentByName(name: string): Treatment | undefined {
  return treatmentsDB.find((t) => t.name === name);
}
