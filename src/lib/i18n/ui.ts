import type { Locale } from "@/types/locale";

type UiKey =
  | "appTitle"
  | "appTitleBrand"
  | "appTitleDept"
  | "appTitleSuffix"
  | "appSubtitle"
  | "treatmentSelection"
  | "treatmentSelectionDesc"
  | "language"
  | "department"
  | "category"
  | "categoryPlaceholder"
  | "treatment"
  | "treatmentPlaceholder"
  | "sessions"
  | "perSession"
  | "selectedPrice"
  | "sessionsTotal"
  | "firstVisit"
  | "firstVisitDesc"
  | "addToCart"
  | "receipt"
  | "receiptDesc"
  | "emptyCart"
  | "emptyCartDesc"
  | "cartItems"
  | "appliedBundles"
  | "discountDetails"
  | "originalTotal"
  | "totalSavings"
  | "supplyAmount"
  | "vat"
  | "finalTotal"
  | "finalTotalHint"
  | "finalQuote"
  | "finalQuoteDesc"
  | "quoteItems"
  | "quoteSubtotal"
  | "quoteDiscounts"
  | "quoteDiscountCondition"
  | "quoteFinal"
  | "quoteTotalDiscount"
  | "foreignAmount"
  | "exchangeRateTitle"
  | "exchangeRateLive"
  | "exchangeRateNaver"
  | "exchangeRateUpdated"
  | "close"
  | "plasticSurgery"
  | "dermatology"
  | "times"
  | "shareTitle"
  | "shareDesc"
  | "shareEmail"
  | "shareKakao"
  | "shareKakaoCopied"
  | "shareFailed"
  | "emailSubject"
  | "shareDisclaimer"
  | "livePreviewHint"
  | "baseItemsTitle"
  | "baseItemsSubtotal"
  | "baseItemsPolicyNote"
  | "baseItemFree"
  | "treatmentSubtotal"
  | "quoteDate"
  | "quoteValidityNotice";

const UI: Record<Locale, Record<UiKey, string>> = {
  ko: {
    appTitle: "뷰(View) 성형외과 피부과 시술비용 시뮬레이션",
    appTitleBrand: "뷰(View)",
    appTitleDept: "성형외과 피부과",
    appTitleSuffix: "시술비용 시뮬레이션",
    appSubtitle:
      "패키지 자동 매칭, 다회차·볼륨·첫방문 할인을 실시간으로 확인하세요.",
    treatmentSelection: "시술 선택",
    treatmentSelectionDesc:
      "진료과 → 카테고리 → 시술을 선택하면 우측에 바로 반영됩니다.",
    language: "언어",
    department: "진료과",
    category: "카테고리",
    categoryPlaceholder: "카테고리를 선택하세요",
    treatment: "시술",
    treatmentPlaceholder: "시술을 선택하세요",
    sessions: "회차",
    perSession: "/ 1회",
    selectedPrice: "선택 시술 정가",
    sessionsTotal: "회 기준 정가",
    firstVisit: "첫 방문 (First Visit)",
    firstVisitDesc: "미번들 최저가 시술 1회에 50% 추가 할인이 적용됩니다.",
    addToCart: "장바구니 담기",
    receipt: "예상 영수증",
    receiptDesc: "선택·회차·첫방문 변경 시 금액이 실시간으로 반영됩니다.",
    emptyCart: "장바구니가 비어 있습니다.",
    emptyCartDesc: "왼쪽에서 시술을 선택하면 우측에 바로 표시됩니다.",
    cartItems: "담은 시술",
    appliedBundles: "적용된 패키지",
    discountDetails: "할인 내역",
    originalTotal: "정상가 합계",
    totalSavings: "총 절약 금액",
    supplyAmount: "공급가액",
    vat: "부가세 (10%)",
    finalTotal: "최종 결제 예상액",
    finalTotalHint: "클릭하여 최종 견적서 보기",
    finalQuote: "최종 견적서",
    finalQuoteDesc: "선택 항목, 할인 조건, 환율 환산 금액을 확인하세요.",
    quoteItems: "선택 시술 내역",
    quoteSubtotal: "총 견적 (정상가 합계)",
    quoteDiscounts: "할인 항목",
    quoteDiscountCondition: "적용 조건",
    quoteFinal: "최종 결제 예상액",
    quoteTotalDiscount: "할인 합계",
    foreignAmount: "환산 금액",
    exchangeRateTitle: "실시간 환율",
    exchangeRateLive: "네이버 금융 기준 실시간 환율",
    exchangeRateNaver: "네이버 환율 상세 보기",
    exchangeRateUpdated: "갱신 시각",
    close: "닫기",
    plasticSurgery: "성형외과",
    dermatology: "피부과",
    times: "회",
    shareTitle: "견적서 공유",
    shareDesc: "이메일 또는 카카오톡으로 견적 내용을 보낼 수 있습니다.",
    shareEmail: "이메일로 보내기",
    shareKakao: "카카오톡으로 보내기",
    shareKakaoCopied: "견적 내용이 복사되었습니다. 카카오톡 채팅창에 붙여넣기 해주세요.",
    shareFailed: "공유에 실패했습니다. 다시 시도해 주세요.",
    emailSubject: "[뷰(View)] 최종 견적서",
    shareDisclaimer: "본 견적은 시뮬레이션 결과이며 실제 금액과 다를 수 있습니다.",
    livePreviewHint: "선택 즉시 우측 예상 영수증에 반영됩니다.",
    baseItemsTitle: "기본 포함 항목",
    baseItemsSubtotal: "기본항목 합계",
    baseItemsPolicyNote:
      "※ 시술 정상가 합계 500만원~1,000만원: 검사·통역 무료 / 1,000만원 이상: 기본항목 전체 무료",
    baseItemFree: "무료",
    treatmentSubtotal: "시술 공급가액",
    quoteDate: "견적 일자",
    quoteValidityNotice:
      "※ 본 견적은 환율 변동 및 시술 구성 변경에 따라 달라질 수 있습니다.",
  },
  en: {
    appTitle: "View Plastic Surgery & Dermatology Cost Simulation",
    appTitleBrand: "View",
    appTitleDept: "Plastic Surgery & Dermatology",
    appTitleSuffix: "Cost Simulation",
    appSubtitle:
      "See package matching, multi-session, volume, and first-visit discounts in real time.",
    treatmentSelection: "Treatment Selection",
    treatmentSelectionDesc: "Select department → category → treatment to see updates on the right instantly.",
    language: "Language",
    department: "Department",
    category: "Category",
    categoryPlaceholder: "Select a category",
    treatment: "Treatment",
    treatmentPlaceholder: "Select a treatment",
    sessions: "Sessions",
    perSession: "/ session",
    selectedPrice: "List price",
    sessionsTotal: "sessions total",
    firstVisit: "First Visit",
    firstVisitDesc: "50% off one session of the cheapest unbundled treatment.",
    addToCart: "Add to Cart",
    receipt: "Estimated Receipt",
    receiptDesc: "Amounts update in real time as you change selections, sessions, or first visit.",
    emptyCart: "Your cart is empty.",
    emptyCartDesc: "Select a treatment on the left to see it on the right instantly.",
    cartItems: "Cart Items",
    appliedBundles: "Applied Packages",
    discountDetails: "Discounts",
    originalTotal: "Original Total",
    totalSavings: "Total Savings",
    supplyAmount: "Subtotal (excl. VAT)",
    vat: "VAT (10%)",
    finalTotal: "Estimated Final Payment",
    finalTotalHint: "Click to view final quotation",
    finalQuote: "Final Quotation",
    finalQuoteDesc: "Review items, discount conditions, and converted amounts.",
    quoteItems: "Selected Treatments",
    quoteSubtotal: "Total Quote (List Price)",
    quoteDiscounts: "Discount Items",
    quoteDiscountCondition: "Condition",
    quoteFinal: "Estimated Final Payment",
    quoteTotalDiscount: "Total Discounts",
    foreignAmount: "Converted Amount",
    exchangeRateTitle: "Live Exchange Rate",
    exchangeRateLive: "Real-time rates via Naver Finance",
    exchangeRateNaver: "View on Naver Finance",
    exchangeRateUpdated: "Updated at",
    close: "Close",
    plasticSurgery: "Plastic Surgery",
    dermatology: "Dermatology",
    times: "x",
    shareTitle: "Share Quotation",
    shareDesc: "Send the quote via email or KakaoTalk.",
    shareEmail: "Send via Email",
    shareKakao: "Send via KakaoTalk",
    shareKakaoCopied: "Quote copied. Paste it into a KakaoTalk chat.",
    shareFailed: "Sharing failed. Please try again.",
    emailSubject: "[View] Final Quotation",
    shareDisclaimer: "This quote is a simulation and may differ from the actual amount.",
    livePreviewHint: "Updates the receipt on the right instantly.",
    baseItemsTitle: "Included Base Services",
    baseItemsSubtotal: "Base Services Subtotal",
    baseItemsPolicyNote:
      "※ Treatment list price ₩5M–₩10M: exam & interpretation free / ₩10M+: all base services free",
    baseItemFree: "Free",
    treatmentSubtotal: "Treatment Subtotal",
    quoteDate: "Quote Date",
    quoteValidityNotice:
      "※ This quote may change due to exchange rates or treatment changes.",
  },
  ja: {
    appTitle: "View 美容外科・皮膚科 施術費用シミュレーション",
    appTitleBrand: "View",
    appTitleDept: "美容外科・皮膚科",
    appTitleSuffix: "施術費用シミュレーション",
    appSubtitle: "パッケージ・回数・ボリューム・初回割引をリアルタイムで確認。",
    treatmentSelection: "施術選択",
    treatmentSelectionDesc: "診療科 → カテゴリ → 施術を選ぶと右側にすぐ反映されます。",
    language: "言語",
    department: "診療科",
    category: "カテゴリ",
    categoryPlaceholder: "カテゴリを選択",
    treatment: "施術",
    treatmentPlaceholder: "施術を選択",
    sessions: "回数",
    perSession: "/ 1回",
    selectedPrice: "選択施術 定価",
    sessionsTotal: "回 基準定価",
    firstVisit: "初回来院",
    firstVisitDesc: "バンドル外最安施術1回に50%追加割引。",
    addToCart: "カートに追加",
    receipt: "見積レシート",
    receiptDesc: "選択・回数・初回来院の変更がリアルタイムで反映されます。",
    emptyCart: "カートは空です。",
    emptyCartDesc: "左側で施術を選ぶと右側にすぐ表示されます。",
    cartItems: "カート内施術",
    appliedBundles: "適用パッケージ",
    discountDetails: "割引内訳",
    originalTotal: "定価合計",
    totalSavings: "総節約額",
    supplyAmount: "供給価額",
    vat: "消費税 (10%)",
    finalTotal: "最終お支払い予想額",
    finalTotalHint: "クリックして最終見積書を表示",
    finalQuote: "最終見積書",
    finalQuoteDesc: "選択項目・割引条件・換算金額を確認。",
    quoteItems: "選択施術明細",
    quoteSubtotal: "総見積（定価合計）",
    quoteDiscounts: "割引項目",
    quoteDiscountCondition: "適用条件",
    quoteFinal: "最終お支払い予想額",
    quoteTotalDiscount: "割引合計",
    foreignAmount: "換算金額",
    exchangeRateTitle: "リアルタイム為替",
    exchangeRateLive: "ネイバー金融 基準リアルタイム為替",
    exchangeRateNaver: "ネイバー為替詳細",
    exchangeRateUpdated: "更新時刻",
    close: "閉じる",
    plasticSurgery: "美容外科",
    dermatology: "皮膚科",
    times: "回",
    shareTitle: "見積書を共有",
    shareDesc: "メールまたはカカオトークで見積内容を送信できます。",
    shareEmail: "メールで送信",
    shareKakao: "カカオトークで送信",
    shareKakaoCopied: "見積内容をコピーしました。カカオトークのチャットに貼り付けてください。",
    shareFailed: "共有に失敗しました。もう一度お試しください。",
    emailSubject: "[View] 最終見積書",
    shareDisclaimer: "本見積はシミュレーション結果であり、実際の金額と異なる場合があります。",
    livePreviewHint: "選択すると右側の見積にすぐ反映されます。",
    baseItemsTitle: "基本含まれる項目",
    baseItemsSubtotal: "基本項目合計",
    baseItemsPolicyNote:
      "※ 施術定価合計500万〜1,000万ウォン：検査・通訳無料 / 1,000万ウォン以上：基本項目すべて無料",
    baseItemFree: "無料",
    treatmentSubtotal: "施術供給価額",
    quoteDate: "見積日",
    quoteValidityNotice:
      "※ 本見積は為替変動や施術構成の変更により変わる場合があります。",
  },
  zh: {
    appTitle: "View 整形外科·皮肤科 疗程费用模拟",
    appTitleBrand: "View",
    appTitleDept: "整形外科·皮肤科",
    appTitleSuffix: "疗程费用模拟",
    appSubtitle: "实时查看套餐匹配、多次疗程、组合及首次到访折扣。",
    treatmentSelection: "疗程选择",
    treatmentSelectionDesc: "依次选择科室 → 类别 → 疗程，右侧将即时更新。",
    language: "语言",
    department: "科室",
    category: "类别",
    categoryPlaceholder: "请选择类别",
    treatment: "疗程",
    treatmentPlaceholder: "请选择疗程",
    sessions: "次数",
    perSession: "/ 次",
    selectedPrice: "所选疗程原价",
    sessionsTotal: "次 原价合计",
    firstVisit: "首次到访",
    firstVisitDesc: "非套餐最低价项目1次额外50%折扣。",
    addToCart: "加入购物车",
    receipt: "预估收据",
    receiptDesc: "选择、次数、首次到访变更将实时反映在金额中。",
    emptyCart: "购物车为空。",
    emptyCartDesc: "从左侧选择疗程即可在右侧即时显示。",
    cartItems: "已选疗程",
    appliedBundles: "已应用套餐",
    discountDetails: "折扣明细",
    originalTotal: "原价合计",
    totalSavings: "总节省金额",
    supplyAmount: "供应价额",
    vat: "增值税 (10%)",
    finalTotal: "预计最终支付额",
    finalTotalHint: "点击查看最终报价单",
    finalQuote: "最终报价单",
    finalQuoteDesc: "查看项目、折扣条件及换算金额。",
    quoteItems: "所选疗程明细",
    quoteSubtotal: "总报价（原价合计）",
    quoteDiscounts: "折扣项目",
    quoteDiscountCondition: "适用条件",
    quoteFinal: "预计最终支付额",
    quoteTotalDiscount: "折扣合计",
    foreignAmount: "换算金额",
    exchangeRateTitle: "实时汇率",
    exchangeRateLive: "参考 Naver 金融实时汇率",
    exchangeRateNaver: "在 Naver 查看汇率",
    exchangeRateUpdated: "更新时间",
    close: "关闭",
    plasticSurgery: "整形外科",
    dermatology: "皮肤科",
    times: "次",
    shareTitle: "分享报价单",
    shareDesc: "可通过邮件或 KakaoTalk 发送报价内容。",
    shareEmail: "通过邮件发送",
    shareKakao: "通过 KakaoTalk 发送",
    shareKakaoCopied: "报价已复制，请粘贴到 KakaoTalk 聊天窗口。",
    shareFailed: "分享失败，请重试。",
    emailSubject: "[View] 最终报价单",
    shareDisclaimer: "本报价为模拟结果，实际金额可能有所不同。",
    livePreviewHint: "选择后立即反映在右侧收据中。",
    baseItemsTitle: "基本包含项目",
    baseItemsSubtotal: "基本项目合计",
    baseItemsPolicyNote:
      "※ 疗程原价合计500万~1,000万韩元：检查·翻译免费 / 1,000万韩元以上：全部基本项目免费",
    baseItemFree: "免费",
    treatmentSubtotal: "疗程供应价额",
    quoteDate: "报价日期",
    quoteValidityNotice: "※ 本报价可能因汇率变动或疗程构成变化而调整。",
  },
  th: {
    appTitle: "View จำลองค่าใช้จ่ายศัลยกรรมและผิวหนัง",
    appTitleBrand: "View",
    appTitleDept: "ศัลยกรรมตกแต่งและผิวหนัง",
    appTitleSuffix: "จำลองค่าใช้จ่าย",
    appSubtitle:
      "ตรวจสอบแพ็กเกจ ส่วนลดหลายครั้ง ส่วนลดรวมหลายหมวด และส่วนลดครั้งแรกแบบเรียลไทม์",
    treatmentSelection: "เลือกหัตถการ",
    treatmentSelectionDesc:
      "เลือกแผนก → หมวดหมู่ → หัตถการ แล้วดูผลทางขวาทันที",
    language: "ภาษา",
    department: "แผนก",
    category: "หมวดหมู่",
    categoryPlaceholder: "เลือกหมวดหมู่",
    treatment: "หัตถการ",
    treatmentPlaceholder: "เลือกหัตถการ",
    sessions: "จำนวนครั้ง",
    perSession: "/ ครั้ง",
    selectedPrice: "ราคาปกติที่เลือก",
    sessionsTotal: "ครั้ง ราคารวม",
    firstVisit: "มารับบริการครั้งแรก",
    firstVisitDesc:
      "ลด 50% สำหรับ 1 ครั้งของหัตถการนอกแพ็กเกจที่ราคาต่ำสุด",
    addToCart: "เพิ่มลงตะกร้า",
    receipt: "ใบเสร็จโดยประมาณ",
    receiptDesc:
      "ยอดเงินอัปเดตแบบเรียลไทม์เมื่อเปลี่ยนตัวเลือก จำนวนครั้ง หรือครั้งแรก",
    emptyCart: "ตะกร้าว่างเปล่า",
    emptyCartDesc: "เลือกหัตถการทางซ้ายเพื่อแสดงทางขวาทันที",
    cartItems: "รายการในตะกร้า",
    appliedBundles: "แพ็กเกจที่ใช้",
    discountDetails: "รายละเอียดส่วนลด",
    originalTotal: "ราคารวมปกติ",
    totalSavings: "ยอดประหยัดรวม",
    supplyAmount: "มูลค่าจัดหา",
    vat: "ภาษีมูลค่าเพิ่ม (10%)",
    finalTotal: "ยอดชำระโดยประมาณ",
    finalTotalHint: "คลิกเพื่อดูใบเสนอราคาสุดท้าย",
    finalQuote: "ใบเสนอราคาสุดท้าย",
    finalQuoteDesc: "ตรวจสอบรายการ เงื่อนไขส่วนลด และยอดเงินแปลงสกุลเงิน",
    quoteItems: "รายการหัตถการที่เลือก",
    quoteSubtotal: "ยอดเสนอราคารวม (ราคาปกติ)",
    quoteDiscounts: "รายการส่วนลด",
    quoteDiscountCondition: "เงื่อนไข",
    quoteFinal: "ยอดชำระโดยประมาณ",
    quoteTotalDiscount: "ส่วนลดรวม",
    foreignAmount: "ยอดแปลงสกุลเงิน",
    exchangeRateTitle: "อัตราแลกเปลี่ยนแบบเรียลไทม์",
    exchangeRateLive: "อัตราแลกเปลี่ยนอ้างอิงจาก Naver Finance",
    exchangeRateNaver: "ดูอัตราแลกเปลี่ยนบน Naver",
    exchangeRateUpdated: "อัปเดตเมื่อ",
    close: "ปิด",
    plasticSurgery: "ศัลยกรรมตกแต่ง",
    dermatology: "แผนกผิวหนัง",
    times: "ครั้ง",
    shareTitle: "แชร์ใบเสนอราคา",
    shareDesc: "ส่งใบเสนอราคาทางอีเมลหรือ KakaoTalk",
    shareEmail: "ส่งทางอีเมล",
    shareKakao: "ส่งทาง KakaoTalk",
    shareKakaoCopied: "คัดลอกใบเสนอราคาแล้ว วางในแชท KakaoTalk ได้เลย",
    shareFailed: "แชร์ไม่สำเร็จ กรุณาลองอีกครั้ง",
    emailSubject: "[View] ใบเสนอราคาสุดท้าย",
    shareDisclaimer: "ใบเสนอราคานี้เป็นผลจำลอง ยอดจริงอาจแตกต่างได้",
    livePreviewHint: "อัปเดตใบเสร็จทางขวาทันทีเมื่อเลือก",
    baseItemsTitle: "บริการพื้นฐานที่รวม",
    baseItemsSubtotal: "รวมบริการพื้นฐาน",
    baseItemsPolicyNote:
      "※ ราคาปกติหัตถการรวม 5–10 ล้านวอน: ตรวจ·ล่ามฟรี / 10 ล้านวอนขึ้นไป: บริการพื้นฐานทั้งหมดฟรี",
    baseItemFree: "ฟรี",
    treatmentSubtotal: "มูลค่าจัดหาหัตถการ",
    quoteDate: "วันที่เสนอราคา",
    quoteValidityNotice:
      "※ ใบเสนอราคานี้อาจเปลี่ยนแปลงตามอัตราแลกเปลี่ยนหรือการเปลี่ยนหัตถการ",
  },
};

export function t(key: UiKey, locale: Locale): string {
  return UI[locale][key];
}
