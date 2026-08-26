import Link from "next/link";
import { getAllRequests } from "@/app/data-service";
import { updateRequestByAdmin } from "@/app/actions";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const res = await getAllRequests();
  const requests = res.success ? res.data : [];

  async function handleAdminSubmit(formData: FormData) {
    "use server";
    const requestId = formData.get("requestId") as string;
    const status = formData.get("status") as string;
    const price = formData.get("price") as string;
    const note = formData.get("note") as string;

    await updateRequestByAdmin(requestId, status, price || "برآورد نشده", note || "بروزرسانی وضعیت و قیمت توسط مدیر");
    revalidatePath("/dashboard");
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <span className="inline-block bg-[#F0EBE1] text-[#8C6D4F] text-sm font-semibold px-4 py-1.5 rounded-full mb-3 border border-[#D5C3A5]/40 shadow-sm">
            پنل مدیریت اختصاصی ⚙️
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3D2C1E]">
            مدیریت قیمت، تایم‌لاین و پاسخ مشتریان
          </h1>
        </div>
        <Link href="/" className="bg-[#F0EBE1] text-[#3D2C1E] border border-[#D5C3A5] px-5 py-2.5 rounded-xl font-medium text-sm">مشاهده سایت اصلی 🌐</Link>
      </div>

      {requests.length === 0 ? (
        <div className="bg-[#FDFBF7] border border-[#D5C3A5]/60 p-12 sm:p-16 rounded-[2.5rem] text-center shadow-sm flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-[#F0EBE1] rounded-full flex items-center justify-center text-4xl shadow-inner border border-[#D5C3A5]/50">
            📭
          </div>
          <h3 className="text-2xl font-extrabold text-[#3D2C1E]">هیچ درخواستی در دیتابیس وجود ندارد</h3>
          <p className="text-sm text-[#8C6D4F] max-w-md mx-auto leading-relaxed">
            در حال حاضر هیچ سفارشی در سامانه ثبت نشده است. به محض اینکه مشتریان درخواست تعمیر جدیدی ثبت کنند، اطلاعات آن فوراً در اینجا نمایش داده خواهد شد.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md"
            >
              بازگشت به صفحه اصلی 🏠
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {requests.map((reqItem: any) => {
            const req = reqItem as any;
            return (
              <div key={req.id} className="bg-[#FDFBF7] border border-[#D5C3A5]/60 p-6 sm:p-8 rounded-[2rem] shadow-sm flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#D5C3A5]/30 pb-4">
                  <div>
                    <span className="font-mono font-bold text-[#8C6D4F] text-sm block mb-1" dir="ltr">{req.id}</span>
                    <h3 className="text-xl font-extrabold text-[#3D2C1E]">
                      {req.customer?.fullName} <span className="text-sm font-normal text-[#8C6D4F]">({req.deviceModel})</span>
                    </h3>
                    <p className="text-xs text-[#8C6D4F] mt-1">شماره تماس: <span className="font-mono" dir="ltr">{req.customer?.phone}</span></p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    {req.priceApprovalStatus === "تایید شده" && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        🟢 مشتری قیمت را تایید کرد
                      </span>
                    )}
                    {req.priceApprovalStatus === "رد شده" && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        🔴 مشتری قیمت را رد کرد
                      </span>
                    )}
                    {!req.priceApprovalStatus && req.price && req.price !== "برآورد نشده" && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                        ⏳ منتظر پاسخ مشتری
                      </span>
                    )}

                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#3D2C1E] text-white">
                      {req.status}
                    </span>
                  </div>
                </div>

                <form action={handleAdminSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  <input type="hidden" name="requestId" value={req.id} />

                  <div>
                    <label className="block text-xs font-bold text-[#3D2C1E] mb-2">💰 قیمت پیشنهادی مدیر (تومان)</label>
                    <input
                      type="text"
                      name="price"
                      defaultValue={req.price || ""}
                      placeholder="مثال: ۱,۵۰۰,۰۰۰ تومان"
                      className="w-full bg-[#F0EBE1]/55 border border-[#D5C3A5] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#3D2C1E] focus:outline-none focus:ring-2 focus:ring-[#8C6D4F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2C1E] mb-2">📝 توضیحات برای تایم‌لاین مشتری</label>
                    <input
                      type="text"
                      name="note"
                      placeholder="مثال: عیب‌یابی انجام شد. منتظر تایید"
                      className="w-full bg-[#F0EBE1]/55 border border-[#D5C3A5] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#3D2C1E] focus:outline-none focus:ring-2 focus:ring-[#8C6D4F]"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <label className="block text-xs font-bold text-[#3D2C1E] mb-2">تغییر وضعیت</label>
                      <select
                        name="status"
                        defaultValue={req.status}
                        className="w-full bg-[#F0EBE1]/55 border border-[#D5C3A5] rounded-xl px-3 py-3 text-xs sm:text-sm text-[#3D2C1E] cursor-pointer focus:outline-none"
                      >
                        <option value="ثبت شده">ثبت شده</option>
                        <option value="در حال عیب‌یابی">در حال عیب‌یابی</option>
                        <option value="در حال تعمیر">در حال تعمیر</option>
                        <option value="آماده تحویل">آماده تحویل</option>
                        <option value="لغو شده توسط مشتری">لغو شده</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] text-xs font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer self-end shadow-md"
                    >
                      ثبت و ارسال 🚀
                    </button>
                  </div>
                </form>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}