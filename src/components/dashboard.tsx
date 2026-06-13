"use client";

import { ReceiptDashboard } from "@/components/receipt-dashboard";
import { TreatmentSelector } from "@/components/treatment-selector";

export function Dashboard() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-100 via-white to-blue-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            <span className="text-blue-600">뷰(View)</span>{" "}
            <span className="text-slate-900">성형외과 피부과</span>{" "}
            <span className="text-blue-600">시술비용 시뮬레이션</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            패키지 자동 매칭, 다회차·볼륨·첫방문 할인을 실시간으로 확인하세요.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <TreatmentSelector />
          <ReceiptDashboard />
        </div>
      </div>
    </main>
  );
}
