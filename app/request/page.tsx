"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { createRequest } from "@/app/actions";

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [deviceType, setDeviceType] = useState("لپ‌تاپ");
  const [deviceModel, setDeviceModel] = useState("");

  // جلوگیری از دابل‌ساب‌میت واقعی (مثلاً دابل‌کلیک سریع روی دکمه)
  const isSubmittingRef = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    setLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData(event.currentTarget);

      // ترکیب نوع دستگاه و مدل دقیق
      const fullDeviceModel = `${deviceType} - ${deviceModel}`;
      formData.set("deviceModel", fullDeviceModel);

      // ارسال مستقیم FormData به سرور اکشن
      const result = await createRequest(formData);

      if (result && result.success && result.trackingCode) {
        setTrackingCode(result.trackingCode);
        setSubmitted(true);
      } else {
        setErrorMessage(result?.error || "خطایی در ثبت درخواست رخ داد.");
      }
    } catch (error) {
      console.error("خطا در ارسال:", error);
      setErrorMessage("خطایی در ارتباط با سرور رخ داد.");
    } finally {
      setLoading(false);
      isSubmittingRef.current = false;
    }
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block bg-[#F0EBE1] text-[#8C6D4F] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#D5C3A5]/40 shadow-sm">
          ثبت سفارش آنلاین 📝
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3D2C1E] mb-4">
          ثبت درخواست تعمیر دستگاه
        </h1>
        <p className="text-[#8C6D4F] max-w-xl mx-auto">
          فرم زیر را با دقت پر کنید تا پس از ثبت، کد پیگیری اختصاصی دریافت کنید.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-center">
          {errorMessage}
        </div>
      )}

      {!submitted ? (
        <div className="bg-[#F0EBE1]/40 p-8 sm:p-12 rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3D2C1E] mb-2">نام و نام خانوادگی</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="مثال: علی رضایی"
                  className="w-full bg-[#FDFBF7] border border-[#D5C3A5]/60 rounded-2xl px-4 py-3.5 text-[#3D2C1E] focus:outline-none focus:ring-2 focus:ring-[#8C6D4F]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#3D2C1E] mb-2">شماره تماس (موبایل)</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="09123456789"
                  className="w-full bg-[#FDFBF7] border border-[#D5C3A5]/60 rounded-2xl px-4 py-3.5 text-[#3D2C1E] text-left focus:outline-none focus:ring-2 focus:ring-[#8C6D4F]"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#3D2C1E] mb-2">نوع دستگاه</label>
                <select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D5C3A5]/60 rounded-2xl px-4 py-3.5 text-[#3D2C1E] focus:outline-none focus:ring-2 focus:ring-[#8C6D4F] cursor-pointer"
                >
                  <option value="لپ‌تاپ">لپ‌تاپ</option>
                  <option value="موبایل و تبلت">موبایل و تبلت</option>
                  <option value="کنسول بازی">کنسول بازی</option>
                  <option value="تجهیزات الکترونیکی">سایر تجهیزات</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#3D2C1E] mb-2">مدل دقیق دستگاه</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ASUS ZenBook"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-[#D5C3A5]/60 rounded-2xl px-4 py-3.5 text-[#3D2C1E] focus:outline-none focus:ring-2 focus:ring-[#8C6D4F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#3D2C1E] mb-2">شرح ایراد و توضیحات</label>
              <textarea
                name="problem"
                rows={4}
                required
                placeholder="مشکل دستگاه را شرح دهید..."
                className="w-full bg-[#FDFBF7] border border-[#D5C3A5]/60 rounded-2xl p-4 text-[#3D2C1E] focus:outline-none focus:ring-2 focus:ring-[#8C6D4F] resize-none"
              ></textarea>
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] font-bold px-10 py-4 rounded-2xl shadow-lg transition-all hover:-translate-y-1 cursor-pointer disabled:opacity-50"
              >
                {loading ? "در حال ثبت در دیتابیس..." : "ثبت نهایی درخواست و دریافت کد پیگیری 🚀"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-[#F0EBE1] p-8 sm:p-12 rounded-[2.5rem] border border-[#D5C3A5] text-center shadow-md">
          <div className="w-20 h-20 bg-[#8C6D4F] text-white text-4xl rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-inner">
            🎉
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D2C1E] mb-3">
            درخواست شما با موفقیت در دیتابیس ثبت شد!
          </h2>
          <p className="text-[#8C6D4F] mb-6 max-w-md mx-auto">
            کد پیگیری اختصاصی خود را یادداشت کنید:
          </p>
          <div className="bg-[#FDFBF7] border-2 border-dashed border-[#8C6D4F] py-4 px-6 rounded-2xl max-w-xs mx-auto mb-8 shadow-sm">
            <span className="text-2xl font-black text-[#3D2C1E] tracking-wider" dir="ltr">
              {trackingCode}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/track" className="w-full sm:w-auto bg-[#3D2C1E] text-[#FDFBF7] px-8 py-3.5 rounded-2xl font-medium">پیگیری آنلاین وضعیت دستگاه 🔍</Link>
            <Link href="/" className="w-full sm:w-auto bg-[#FDFBF7] text-[#3D2C1E] border border-[#D5C3A5] px-8 py-3.5 rounded-2xl font-medium">بازگشت به خانه 🏠</Link>
          </div>
        </div>
      )}
    </div>
  );
}