"use client";

import { useState } from "react";
import Link from "next/link";
import { getRequestByTrackingCode } from "@/app/data-service";
import { updateRequestByAdmin } from "@/app/actions";

export default function TrackPage() {
  const [inputCode, setInputCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setLoading(true);
    setSearched(true);

    const res = await getRequestByTrackingCode(inputCode.trim());

    setLoading(false);
    if (res.success) {
      setResult(res.data);
    } else {
      setResult(null);
    }
  };

  const handleCustomerResponse = async (approved: boolean) => {
    if (!result) return;

    const newStatus = approved ? "در حال تعمیر" : "لغو شده توسط مشتری";
    const newApprovalStatus = approved ? "تایید شده" : "رد شده";
    const note = approved
      ? "مشتری قیمت پیشنهادی را تایید کرد. شروع فرایند تعمیر."
      : "مشتری قیمت پیشنهادی را نپذیرفت و درخواست را لغو کرد.";

    const res = await updateRequestByAdmin(
      result.id,
      newStatus,
      result.price || "0",
      note,
      newApprovalStatus
    );

    if (res.success) {
      const updatedRes = await getRequestByTrackingCode(result.id);
      if (updatedRes.success) {
        setResult(updatedRes.data);
      }
      alert(approved ? "تایید شما ثبت شد. تعمیر دستگاه آغاز می‌گردد! 🛠️" : "پاسخ شما ثبت شد. 📦");
    } else {
      alert("خطا در ثبت پاسخ. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" dir="rtl">
      <div className="text-center mb-12">
        <span className="inline-block bg-[#F0EBE1] text-[#8C6D4F] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#D5C3A5]/40 shadow-sm">
          سیستم هوشمند رهگیری 🔍
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3D2C1E] mb-4">
          پیگیری وضعیت تعمیر دستگاه
        </h1>
        <p className="text-[#8C6D4F] max-w-xl mx-auto">
          کد پیگیری خود را وارد کنید تا از آخرین وضعیت و قیمت پیشنهادی مطلع شوید.
        </p>
      </div>

      <div className="bg-[#F0EBE1]/40 p-8 sm:p-10 rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm backdrop-blur-sm mb-10">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            required
            placeholder="مثال: FIX-123456"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-grow bg-[#FDFBF7] border border-[#D5C3A5]/60 rounded-2xl px-6 py-4 text-[#3D2C1E] text-center sm:text-right font-mono uppercase focus:outline-none"
            dir="ltr"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] font-bold px-8 py-4 rounded-2xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "در حال جستجو..." : "استعلام وضعیت 🚀"}
          </button>
        </form>
      </div>

      {searched && (
        <div>
          {result ? (
            <div className="bg-[#F0EBE1] p-8 sm:p-12 rounded-[2.5rem] border border-[#D5C3A5] shadow-md space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#D5C3A5]/40 pb-6 gap-4">
                <div>
                  <span className="text-xs text-[#8C6D4F] block mb-1">نام مشتری:</span>
                  <h3 className="text-xl font-bold text-[#3D2C1E]">{result.customer?.fullName}</h3>
                </div>
                <div>
                  <span className="text-xs text-[#8C6D4F] block mb-1">دستگاه:</span>
                  <span className="bg-[#FDFBF7] px-4 py-1.5 rounded-xl border border-[#D5C3A5]/40 text-[#3D2C1E] font-semibold text-sm">
                    {result.deviceModel}
                  </span>
                </div>
              </div>

              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#D5C3A5]/40 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs text-[#8C6D4F] block mb-1">وضعیت فعلی دستگاه:</span>
                    <span className="font-bold text-[#3D2C1E] text-lg">{result.status}</span>
                  </div>
                  <div className="bg-[#8C6D4F] text-white px-6 py-3 rounded-xl shadow-sm text-center">
                    <span className="text-xs block opacity-80">هزینه / قیمت برآورد شده:</span>
                    <span className="font-black text-lg">{result.price || "در حال برآورد..."}</span>
                  </div>
                </div>

                {result.price && result.price !== "برآورد نشده" && (
                  <div className="border-t border-[#D5C3A5]/30 pt-4 mt-2">
                    {result.priceApprovalStatus === "تایید شده" ? (
                      <div className="bg-emerald-100 text-emerald-800 text-xs font-bold p-3 rounded-xl text-center">
                        ✅ شما این قیمت پیشنهادی را تایید کرده‌اید و دستگاه در حال تعمیر است.
                      </div>
                    ) : result.priceApprovalStatus === "رد شده" ? (
                      <div className="bg-rose-100 text-rose-800 text-xs font-bold p-3 rounded-xl text-center">
                        ❌ این درخواست توسط شما لغو گردید.
                      </div>
                    ) : (
                      <div className="bg-[#F0EBE1]/60 p-4 rounded-xl border border-[#D5C3A5]/40">
                        <p className="text-xs font-bold text-[#3D2C1E] mb-3 text-center sm:text-right">
                          هزینه تعمیر مشخص شد. آیا با شروع کار موافقید؟
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleCustomerResponse(true)}
                            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                          >
                            🟢 تایید قیمت و شروع تعمیر
                          </button>
                          <button
                            onClick={() => handleCustomerResponse(false)}
                            className="flex-1 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm cursor-pointer"
                          >
                            🔴 عدم تایید / انصراف از تعمیر
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-[#D5C3A5]/40">
                <h4 className="font-bold text-[#3D2C1E] mb-6">📅 تایم‌لاین و تاریخچه مراحل</h4>
                <div className="relative border-r-2 border-[#D5C3A5] pr-6 space-y-6">
                  {result.timeline?.map((item: any, idx: number) => (
                    <div key={idx} className="relative">
                      <span className="absolute -right-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#8C6D4F] border-2 border-[#FDFBF7]"></span>
                      <span className="text-xs text-[#8C6D4F] block mb-1">{item.date}</span>
                      <h5 className="font-bold text-[#3D2C1E] text-sm">{item.title}</h5>
                      <p className="text-xs text-[#8C6D4F] mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#F0EBE1] p-8 rounded-[2.5rem] border border-[#D5C3A5] text-center shadow-sm">
              <h3 className="text-xl font-bold text-[#3D2C1E] mb-2">دستگاهی با این کد پیدا نشد!</h3>
              <p className="text-xs text-[#8C6D4F] mt-1">لطفاً مطمئن شوید کد پیگیری را به درستی وارد کرده‌اید.</p>
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-12">
        <Link href="/" className="inline-block bg-[#F0EBE1] text-[#3D2C1E] border border-[#D5C3A5] px-8 py-3.5 rounded-2xl font-medium">بازگشت به صفحه اصلی 🏠</Link>
      </div>
    </div>
  );
}