"use server";

import { db } from "@/app/db";
import { revalidatePath } from "next/cache";

export async function createRequest(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string | null;
    const phone = formData.get("phone") as string | null;
    const deviceModel = formData.get("deviceModel") as string | null;
    const problem = formData.get("problem") as string | null;

    // گارد اصلی: اگه داده‌ی ضروری نیست، اصلاً به دیتابیس نزن
    if (!fullName?.trim() || !phone?.trim() || !deviceModel?.trim() || !problem?.trim()) {
      return { success: false, error: "لطفاً همه‌ی فیلدهای فرم را پر کنید." };
    }

    const randomId = "FIX-" + Math.floor(100000 + Math.random() * 900000);

    let customer = await db.customer.findUnique({
      where: { phone },
    });

    if (!customer) {
      customer = await db.customer.create({
        data: { fullName, phone },
      });
    }

    const savedRequest = await db.request.create({
      data: {
        id: randomId,
        customerId: customer.id,
        deviceModel,
        problem,
        status: "ثبت شده",
        timeline: {
          create: {
            title: "ثبت درخواست تعمیر",
            description: "دستگاه با موفقیت در سامانه ثبت شد.",
            date: new Date().toLocaleDateString("fa-IR"),
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: true, trackingCode: savedRequest.id };
  } catch (error) {
    console.error("خطا در ثبت درخواست:", error);
    return { success: false, error: "مشکلی در ثبت درخواست پیش آمد." };
  }
}

export async function updateRequestByAdmin(
  requestId: string,
  status: string,
  price: string,
  note: string,
  priceApprovalStatus?: string
) {
  try {
    await db.request.update({
      where: { id: requestId },
      data: {
        status,
        price,
        ...(priceApprovalStatus !== undefined && { priceApprovalStatus }),
        timeline: {
          create: {
            title: "بروزرسانی توسط مدیر",
            description: note,
            date: new Date().toLocaleDateString("fa-IR"),
          },
        },
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/track");
    return { success: true };
  } catch (error) {
    console.error("خطا در بروزرسانی:", error);
    return { success: false, error: "خطا در بروزرسانی" };
  }
}