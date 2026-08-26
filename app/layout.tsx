"use client"; // این خط را حتماً به بالای فایل layout.tsx اضافه کنید تا اجازه استفاده از State و localStorage را داشته باشید

import type { Metadata } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAdmin, setIsAdmin] = useState(false);

  // بررسی وضعیت ادمین بودن هنگام لود سایت
  useEffect(() => {
    const adminStatus = localStorage.getItem("fixera_is_admin") === "true";
    setIsAdmin(adminStatus);
  }, []);

  // تابع تستی برای ورود/خروج سریع به عنوان مدیر (می‌توانید بعداً این را به صفحه لاگین واقعی وصل کنید)
  const toggleAdminMode = () => {
    const newStatus = !isAdmin;
    setIsAdmin(newStatus);
    localStorage.setItem("fixera_is_admin", String(newStatus));
    if (newStatus) {
      alert("حالت مدیریت (ادمین) فعال شد! لینک پنل در هدر ظاهر شد.");
    } else {
      alert("از حالت مدیریت خارج شدید.");
    }
  };

  return (
    <html lang="fa" dir="rtl">
      <body className="bg-[#FDFBF7] text-[#3D2C1E] min-h-screen flex flex-col font-sans antialiased">
        
        {/* ======== هدر سراسری ======== */}
        <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#D5C3A5]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#8C6D4F] text-[#FDFBF7] flex items-center justify-center font-bold text-lg shadow-sm transition-transform group-hover:scale-105">
                ف
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#3D2C1E] tracking-tight">فیکسرا</span>
                <span className="text-xs text-[#8C6D4F]">سامانه هوشمند تعمیرات</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-[#3D2C1E] hover:text-[#8C6D4F] font-medium transition-colors">خانه</Link>
              <Link href="/services" className="text-[#3D2C1E] hover:text-[#8C6D4F] font-medium transition-colors">خدمات ما</Link>
              <Link href="/track" className="text-[#3D2C1E] hover:text-[#8C6D4F] font-medium transition-colors">پیگیری درخواست</Link>
              
              {/* شرط نمایش: فقط اگر کاربر ادمین باشد این لینک چاپ می‌شود */}
              {isAdmin && (
                <Link href="/dashboard" className="text-[#8C6D4F] hover:text-[#3D2C1E] font-medium transition-colors text-sm bg-[#F0EBE1] px-3 py-1.5 rounded-lg border border-[#D5C3A5]/40 animate-fade-in">
                  پنل مدیریت ⚙️
                </Link>
              )}
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/request" className="bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all hover:-translate-y-0.5 text-sm">ثبت درخواست جدید</Link>
            </div>
          </div>
        </header>

        {/* ======== محتوای صفحات ======== */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ======== فوتر سراسری ======== */}
        <footer className="bg-[#F0EBE1] border-t border-[#D5C3A5]/40 mt-auto text-[#3D2C1E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#8C6D4F] text-[#FDFBF7] flex items-center justify-center font-bold text-sm">ف</div>
                  <span className="font-bold text-lg">فیکسرا (Fixera)</span>
                </div>
                <p className="text-sm text-[#8C6D4F] leading-relaxed">سامانه هوشمند مدیریت خدمات و تعمیرات با قابلیت پیگیری لحظه‌ای.</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base">دسترسی سریع مشتریان</h4>
                <ul className="space-y-2 text-sm text-[#8C6D4F]">
                  <li><Link href="/request" className="hover:text-[#3D2C1E]">ثبت درخواست تعمیر</Link></li>
                  <li><Link href="/track" className="hover:text-[#3D2C1E]">پیگیری وضعیت دستگاه با کد</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base">دسترسی ادمین</h4>
                {/* یک دکمه مخفی یا اختصاصی برای تست حالت مدیریت */}
                <button 
                  onClick={toggleAdminMode}
                  className="text-xs bg-[#D5C3A5]/30 hover:bg-[#D5C3A5]/60 text-[#3D2C1E] px-3 py-2 rounded-xl transition-all border border-[#D5C3A5]/50 cursor-pointer"
                >
                  {isAdmin ? "خروج از حالت مدیریت 🔓" : "ورود به عنوان مدیر (تست) 🔐"}
                </button>
              </div>
            </div>
            
            <div className="border-t border-[#D5C3A5]/40 mt-10 pt-6 text-center text-xs text-[#8C6D4F]">
              تمامی حقوق محفوظ است © ۱۴۰۵ | سامانه هوشمند فیکسرا
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}