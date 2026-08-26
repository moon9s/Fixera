"use server";

import { db } from "@/app/db";

function sanitizeCode(code: string) {
  return code
    .replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/g, "")
    .trim()
    .toUpperCase();
}

export async function getAllRequests() {
  try {
    const requests = await db.request.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, data: requests };
  } catch (error) {
    console.error("خطا در دریافت لیست درخواست‌ها:", error);
    return { success: false, data: [] };
  }
}

export async function getRequestByTrackingCode(code: string) {
  try {
    const cleanCode = sanitizeCode(code);

    console.log("=== DEBUG TRACK ===");
    console.log("کد خام دریافتی:", JSON.stringify(code));
    console.log("کد پاکسازی‌شده:", JSON.stringify(cleanCode));

    const allRequests = await db.request.findMany({ select: { id: true } });
    console.log("همه‌ی id های موجود توی دیتابیس:", JSON.stringify(allRequests.map(r => r.id)));

    const request = await db.request.findUnique({
      where: { id: cleanCode },
      include: {
        customer: true,
        timeline: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    console.log("نتیجه پیدا شد؟", !!request);
    console.log("=== END DEBUG ===");

    if (!request) {
      return { success: false, data: null };
    }

    return { success: true, data: request };
  } catch (error) {
    console.error("خطا در دریافت اطلاعات درخواست:", error);
    return { success: false, data: null };
  }
}