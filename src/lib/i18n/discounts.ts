import type { DiscountLine } from "@/types";
import type { Locale } from "@/types/locale";
import { translateEntity } from "@/lib/i18n/entities";
import { t } from "@/lib/i18n/ui";

const BUNDLE_CONDITIONS: Record<Locale, string> = {
  ko: "장바구니에 패키지 구성 시술이 모두 포함되어 자동 매칭되었습니다.",
  en: "All required treatments in cart are matched as a package.",
  ja: "カート内の必須施術がすべて揃いパッケージ適用。",
  zh: "购物车中所需疗程全部匹配为套餐。",
  th: "หัตถการที่จำเป็นในตะกร้าครบถ้วน จึงจับคู่เป็นแพ็กเกจโดยอัตโนมัติ",
};

const FIRST_VISIT_CONDITIONS: Record<Locale, string> = {
  ko: "첫 방문: 미번들 최저가 시술 1회 50% 할인.",
  en: "First visit: 50% off one session of the cheapest unbundled item.",
  ja: "初回来院：バンドル外最安施術1回50%割引。",
  zh: "首次到访：非套餐最低价项目1次50%折扣。",
  th: "มารับบริการครั้งแรก: ลด 50% สำหรับ 1 ครั้งของหัตถการนอกแพ็กเกจที่ราคาต่ำสุด",
};

export function translateDiscountLine(
  line: DiscountLine,
  locale: Locale
): { label: string; condition: string } {
  if (locale === "ko") {
    return {
      label: line.label,
      condition: getDiscountConditionKo(line),
    };
  }

  const params = line.params ?? {};

  switch (line.id) {
    case "bundle":
      return {
        label: `✔ ${translateEntity(String(params.name), locale)}`,
        condition: BUNDLE_CONDITIONS[locale],
      };
    case "session":
      return {
        label: `✔ ${getSessionLabel(locale, String(params.tier))}`,
        condition: getSessionCondition(locale, String(params.tier)),
      };
    case "volume":
      return {
        label: `✔ ${getVolumeLabel(locale, Number(params.count))}`,
        condition: getVolumeCondition(locale, Number(params.count)),
      };
    case "first_visit":
      return {
        label: `✔ ${getFirstVisitLabel(locale, String(params.treatment))}`,
        condition: FIRST_VISIT_CONDITIONS[locale],
      };
    case "base_items":
      return {
        label: `✔ ${getBaseItemsLabel(locale, String(params.tier))}`,
        condition: getBaseItemsCondition(locale, String(params.tier)),
      };
    default:
      return { label: line.label, condition: "" };
  }
}

function getDiscountConditionKo(line: DiscountLine): string {
  const params = line.params ?? {};
  switch (line.id) {
    case "bundle":
      return BUNDLE_CONDITIONS.ko;
    case "session":
      return `동일 시술 ${params.tier} 회차 구매 시 다회차 할인이 적용되었습니다.`;
    case "volume":
      return `미번들 시술 ${params.count}종 이상 선택 시 교차 카테고리 볼륨 할인이 적용되었습니다.`;
    case "first_visit":
      return `첫 방문 체크 시 미번들 최저가 시술(${params.treatment}) 1회 50% 할인.`;
    case "base_items":
      return "시술 정상가 합계 500만원 이상 시 검사·통역 무료, 1천만원 이상 시 기본항목 전체 무료.";
    default:
      return "";
  }
}

function getSessionLabel(locale: Locale, tier: string): string {
  const map: Record<Locale, Record<string, string>> = {
    ko: {
      "3-4": "다회차 할인 (3~4회 15%)",
      "5-9": "다회차 할인 (5~9회 20%)",
      "10+": "다회차 할인 (10회 이상 30%)",
    },
    en: {
      "3-4": "Multi-session (3–4: 15%)",
      "5-9": "Multi-session (5–9: 20%)",
      "10+": "Multi-session (10+: 30%)",
    },
    ja: {
      "3-4": "回数割引（3〜4回15%）",
      "5-9": "回数割引（5〜9回20%）",
      "10+": "回数割引（10回以上30%）",
    },
    zh: {
      "3-4": "多次疗程（3–4次15%）",
      "5-9": "多次疗程（5–9次20%）",
      "10+": "多次疗程（10次以上30%）",
    },
    th: {
      "3-4": "ส่วนลดหลายครั้ง (3–4 ครั้ง 15%)",
      "5-9": "ส่วนลดหลายครั้ง (5–9 ครั้ง 20%)",
      "10+": "ส่วนลดหลายครั้ง (10 ครั้งขึ้นไป 30%)",
    },
  };
  return map[locale][tier] ?? tier;
}

function getSessionCondition(locale: Locale, tier: string): string {
  const map: Record<Locale, string> = {
    ko: `동일 시술 ${tier} 회차 구매 시 적용`,
    en: `Applied when purchasing ${tier} sessions of the same treatment.`,
    ja: `同一施術を${tier}回購入時に適用。`,
    zh: `同一疗程购买${tier}次时适用。`,
    th: `ใช้เมื่อซื้อหัตถการเดียวกัน ${tier} ครั้ง`,
  };
  return map[locale];
}

function getVolumeLabel(locale: Locale, count: number): string {
  const rate = count >= 4 ? "15%" : count === 3 ? "10%" : "5%";
  const labels: Record<Locale, string> = {
    ko: `교차 카테고리 볼륨 할인 (${count}종 ${rate})`,
    en: `Cross-category volume (${count} items, ${rate})`,
    ja: `カテゴリ横断ボリューム（${count}種 ${rate}）`,
    zh: `跨类别组合折扣（${count}项 ${rate}）`,
    th: `ส่วนลดรวมหลายหมวด (${count} รายการ ${rate})`,
  };
  return labels[locale];
}

function getVolumeCondition(locale: Locale, count: number): string {
  const map: Record<Locale, string> = {
    ko: `미번들 시술 ${count}종 이상 선택 시 적용`,
    en: `Applied when ${count} or more unbundled treatment types are selected.`,
    ja: `バンドル外の施術が${count}種以上の場合に適用。`,
    zh: `非套餐疗程达${count}种以上时适用。`,
    th: `ใช้เมื่อเลือกหัตถการนอกแพ็กเกจ ${count} รายการขึ้นไป`,
  };
  return map[locale];
}

function getFirstVisitLabel(locale: Locale, treatment: string): string {
  const name = translateEntity(treatment, locale);
  const labels: Record<Locale, string> = {
    ko: `첫 방문 로스리더 (${treatment} 1회 50%)`,
    en: `First visit loss leader (${name}, 1 session 50%)`,
    ja: `初回来院ロスリーダー（${name} 1回50%）`,
    zh: `首次到访引流（${name} 1次50%）`,
    th: `ส่วนลดครั้งแรก (${name} 1 ครั้ง ลด 50%)`,
  };
  return labels[locale];
}

function getBaseItemsLabel(locale: Locale, tier: string): string {
  const labels: Record<Locale, Record<string, string>> = {
    ko: {
      partial: "기본항목 일부 무료 (검사·통역)",
      full: "기본항목 전체 무료",
    },
    en: {
      partial: "Partial base services free (exam & interpretation)",
      full: "All base services free",
    },
    ja: {
      partial: "基本項目一部無料（検査・通訳）",
      full: "基本項目すべて無料",
    },
    zh: {
      partial: "部分基本项目免费（检查·翻译）",
      full: "全部基本项目免费",
    },
    th: {
      partial: "บริการพื้นฐานบางรายการฟรี (ตรวจ·ล่าม)",
      full: "บริการพื้นฐานทั้งหมดฟรี",
    },
  };
  return labels[locale][tier] ?? tier;
}

function getBaseItemsCondition(locale: Locale, tier: string): string {
  const labels: Record<Locale, Record<string, string>> = {
    ko: {
      partial: "시술 정상가 합계 500만원 이상 1,000만원 미만일 때 검사·통역 무료.",
      full: "시술 정상가 합계 1,000만원 이상일 때 기본항목 전체 무료.",
    },
    en: {
      partial: "Exam and interpretation are free when treatment list price is ₩5M–₩10M.",
      full: "All base services are free when treatment list price is ₩10M or more.",
    },
    ja: {
      partial: "施術定価合計が500万ウォン以上1,000万ウォン未満の場合、検査・通訳無料。",
      full: "施術定価合計が1,000万ウォン以上の場合、基本項目すべて無料。",
    },
    zh: {
      partial: "疗程原价合计500万~1,000万韩元时，检查·翻译免费。",
      full: "疗程原价合计达1,000万韩元以上时，全部基本项目免费。",
    },
    th: {
      partial: "ราคาปกติหัตถการรวม 5–10 ล้านวอน ตรวจ·ล่ามฟรี",
      full: "ราคาปกติหัตถการรวมตั้งแต่ 10 ล้านวอน บริการพื้นฐานทั้งหมดฟรี",
    },
  };
  return labels[locale][tier] ?? "";
}

export function getDiscountSectionTitle(locale: Locale): string {
  return t("quoteDiscounts", locale);
}
