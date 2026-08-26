"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // می‌توانید ارور را در کنسول یا سرویس‌های مانیتورینگ ثبت کنید
    console.error("خطای رخ داده در سامانه:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FDFBF7] border border-[#D5C3A5]/60 p-10 sm:p-16 rounded-[2.5rem] text-center shadow-sm max-w-lg w-full flex flex-col items-center justify-center space-y-6">
        
        {/* آیکون هشدار زیبا */}
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-4xl shadow-inner border border-rose-200">
          ⚠️
        </div>

        <div className="space-y-2">
          <span className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
            خطای سیستمی
          </span>
          <h2 className="text-2xl font-extrabold text-[#3D2C1E]">
            اوه! مشکلی پیش آمده است
          </h2>
          <p className="text-sm text-[#8C6D4F] leading-relaxed">
            متأسفانه در پردازش درخواست شما خطایی رخ داد. نگران نباشید، اطلاعات شما محفوظ است. می‌توانید مجدداً تلاش کنید یا به صفحه اصلی برگردید.
          </p>
        </div>

        {/* دکمه‌های اکشن برای کاربر */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] font-bold text-xs py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            تلاش مجدد 🔄
          </button>
          
          <Link
            href="/"
            className="flex-1 bg-[#F0EBE1] hover:bg-[#D5C3A5]/40 text-[#3D2C1E] border border-[#D5C3A5] font-bold text-xs py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center"
          >
            صفحه اصلی 🏠
          </Link>
        </div>

      </div>
    </div>
  );
}