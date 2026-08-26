import Link from "next/link";

const detailedServices = [
  {
    id: "serv-1",
    title: "تعمیر لپ‌تاپ و سرفیس",
    icon: "💻",
    category: "سخت‌افزار و نرم‌افزار",
    description: "تعمیرات تخصصی انواع مادربرد لپ‌تاپ، تعویض ال‌سی‌دی (LCD/OLED)، ارتقای رم و حافظه SSD، تعویض باتری و رفع مشکلات داغ شدن بیش از حد دستگاه.",
    features: ["استفاده از قطعات اورجینال", "تست کامل حرارتی و پایداری", "گارانتی کتبی خدمات"],
    estimatedTime: "۲ الی ۴ روز کاری",
    priceRange: "از ۵۰۰ هزار تومان به بالا",
  },
  {
    id: "serv-2",
    title: "تعمیر موبایل و تبلت",
    icon: "📱",
    category: "برندهای اپل، سامسونگ، شیائومی",
    description: "تعویض گلس تخصصی با دستگاه مکانیزه، تعویض باتری اصلی همراه با انتقال سلامت باتری، تعمیرات تخصصی آب‌خوردگی و رفع ایرادات شارژ.",
    features: ["تعویض گلس بدون آسیب به ال‌سی‌دی اصلی", "ضمانت ماندگاری باتری", "تحویل سریع در کمتر از ۴۸ ساعت"],
    estimatedTime: "۱ الی ۲ روز کاری",
    priceRange: "از ۳۰۰ هزار تومان به بالا",
  },
  {
    id: "serv-3",
    title: "تعمیر کنسول‌های بازی",
    icon: "🎮",
    description: "سرویس دوره‌ای انواع پلی‌استیشن (PS4, PS5) و ایکس‌باکس، تعویض خمیر سیلیکون فلزی (Liquid Metal)، رفع مشکل چراغ آبی/سفید مرگ و تعمیر پورت‌های آسیب‌دیده.",
    features: ["کاهش شدید صدای فن و گرما", "رفع مشکلات تصویر و پورت HDMI", "سرویس کامل قطعات داخلی"],
    estimatedTime: "۲ الی ۳ روز کاری",
    priceRange: "از ۴۰۰ هزار تومان به بالا",
  },
  {
    id: "serv-4",
    title: "تجهیزات الکترونیکی خاص",
    icon: "🔌",
    description: "عیب‌یابی و تعمیر انواع بردهای الکترونیکی صنعتی و خانگی، منابع تغذیه سوئیچینگ، مانیتورهای حرفه‌ای و ابزارهای هوشمند دیجیتال.",
    features: ["نقشه‌خوانی دقیق بردهای الکترونیکی", "استفاده از تجهیزات لحیم‌کاری پیشرفته", "تست در شرایط ولتاژ بالا"],
    estimatedTime: "۳ الی ۵ روز کاری",
    priceRange: "بسته به نوع برد و قطعات",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* هدر صفحه */}
      <div className="text-center mb-16">
        <span className="inline-block bg-[#F0EBE1] text-[#8C6D4F] text-sm font-semibold px-4 py-1.5 rounded-full mb-4 border border-[#D5C3A5]/40 shadow-sm">
          تخصص و مهندسی دقیق ⚡
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3D2C1E] mb-4">
          خدمات تخصصی سامانه فیکسرا
        </h1>
        <p className="text-[#8C6D4F] max-w-2xl mx-auto leading-relaxed">
          ما در فیکسرا با بهره‌گیری از تجهیزات مدرن روز و تعمیرکاران مجرب، طیف وسیعی از خدمات تعمیراتی را با بالاترین کیفیت و شفافیت به شما ارائه می‌دهیم.
        </p>
      </div>

      {/* لیست خدمات با کارت‌های حبابی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {detailedServices.map((service) => (
          <div
            key={service.id}
            className="group bg-[#F0EBE1]/40 p-8 sm:p-10 rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm hover:shadow-xl hover:shadow-[#8C6D4F]/10 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* بالای کارت: آیکون و دسته‌بندی */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#FDFBF7] text-3xl flex items-center justify-center shadow-inner border border-[#D5C3A5]/30 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="text-xs font-semibold bg-[#FDFBF7] text-[#8C6D4F] px-4 py-1.5 rounded-full border border-[#D5C3A5]/40 shadow-sm">
                  {service.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#3D2C1E] mb-3 group-hover:text-[#8C6D4F] transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-[#8C6D4F] leading-relaxed mb-6">
                {service.description}
              </p>

              {/* ویژگی‌ها */}
              <div className="space-y-2 mb-8 bg-[#FDFBF7]/60 p-5 rounded-2xl border border-[#D5C3A5]/30">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#3D2C1E]">
                    <span className="text-[#8C6D4F] font-bold">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* پایین کارت: زمان و قیمت */}
            <div className="border-t border-[#D5C3A5]/40 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="text-[#8C6D4F]">
                زمان تقریبی: <span className="font-bold text-[#3D2C1E]">{service.estimatedTime}</span>
              </div>
              <div className="bg-[#3D2C1E] text-[#FDFBF7] px-3.5 py-1.5 rounded-xl font-medium shadow-sm">
                {service.priceRange}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* بخش دعوت به اقدام (CTA) */}
      <div className="bg-[#F0EBE1] p-8 sm:p-12 rounded-[2.5rem] border border-[#D5C3A5] text-center shadow-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#3D2C1E] mb-4">
          دستگاه شما نیاز به تعمیر دارد؟
        </h3>
        <p className="text-[#8C6D4F] max-w-xl mx-auto mb-8 leading-relaxed">
          همین حالا درخواست خود را ثبت کنید تا ضمن دریافت کد پیگیری، از مشاوره رایگان کارشناسان ما بهره‌مند شوید.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/request"
            className="w-full sm:w-auto bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] px-8 py-4 rounded-2xl font-medium shadow-lg transition-all hover:-translate-y-1 text-center"
          >
            ثبت درخواست تعمیر 🛠️
          </Link>
          <Link
            href="/track"
            className="w-full sm:w-auto bg-[#FDFBF7] hover:bg-[#D5C3A5]/50 text-[#3D2C1E] border border-[#D5C3A5] px-8 py-4 rounded-2xl font-medium transition-all text-center"
          >
            پیگیری وضعیت دستگاه 🔍
          </Link>
        </div>
      </div>

    </div>
  );
}