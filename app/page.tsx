import Link from "next/link";
import Image from "next/image";

const mockServices = [
  {
    id: "serv-1",
    title: "تعمیر لپ‌تاپ",
    icon: "💻",
    image: "/img/laptop_motherboard_repair.webp",
    description: "تعمیرات تخصصی سخت‌افزار، تعویض ال‌سی‌دی، رفع مشکل شارژ، ارتقای رم و SSD و سرویس فن.",
    estimatedTime: "۲ الی ۴ روز کاری",
    badge: "محبوب‌ترین",
  },
  {
    id: "serv-2",
    title: "تعمیر موبایل و تبلت",
    icon: "📱",
    image: "/img/smartphone_repair.webp",
    description: "تعویض گلس تخصصی، تعویض باتری اصلی، تعمیرات آب‌خوردگی و رفع مشکلات پیچیده نرم‌افزاری.",
    estimatedTime: "۱ الی ۲ روز کاری",
    badge: "سریع‌ترین",
  },
  {
    id: "serv-3",
    title: "تعمیر کنسول بازی",
    icon: "🎮",
    image: "/img/game_console_repair.webp",
    description: "سرویس دوره‌ای و تعویض خمیر سیلیکون، رفع مشکل چراغ چشمک‌زن، تعمیرات دسته و پورت‌های HDMI.",
    estimatedTime: "۲ الی ۳ روز کاری",
    badge: "تخصصی",
  },
  {
    id: "serv-4",
    title: "تجهیزات الکترونیکی",
    icon: "🔌",
    image: "/img/circuit_board_repair.webp",
    description: "تعمیر انواع بردهای الکترونیکی صنعتی و خانگی، منبع تغذیه و ابزارهای هوشمند.",
    estimatedTime: "۳ الی ۵ روز کاری",
    badge: "فنی مهندسی",
  },
];

const features = [
  {
    title: "گارانتی معتبر تعمیرات",
    desc: "تمامی خدمات فیکسرا شامل ضمانت کیفیت و قطعات اورجینال است.",
    icon: "🛡️",
  },
  {
    title: "پیگیری لحظه‌ای وضعیت",
    desc: "با کد پیگیری می‌توانید در هر لحظه از وضعیت دقیق دستگاه خود باخبر شوید.",
    icon: "🔍",
  },
  {
    title: "کارشناسان متخصص",
    desc: "تیمی از زبده‌ترین تعمیرکاران حوزه‌ی سخت‌افزار و نرم‌افزار در کنار شما هستند.",
    icon: "👨‍🔧",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-[#FDFBF7] text-[#3D2C1E]">

      {/* 1. Hero Section (حبابی و مدرن) */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40">
          <div className="w-[600px] h-[600px] rounded-full bg-[#D5C3A5]/30 blur-3xl animate-pulse"></div>
        </div>

        <span className="inline-block bg-[#F0EBE1] text-[#8C6D4F] text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-[#D5C3A5]/40 shadow-sm transition-transform hover:scale-105">
          ✨ مدرن‌ترین سامانه مدیریت و پیگیری تعمیرات در ایران
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#3D2C1E] mb-6 leading-tight">
          تعمیرات حرفه‌ای، ساده و با <span className="text-[#8C6D4F] underline decoration-[#D5C3A5]/60 underline-offset-8">شفافیت کامل</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-[#8C6D4F] mb-12 leading-relaxed">
          لپ‌تاپ، موبایل یا کنسول بازی خود را با خیال راحت به فیکسرا بسپارید. از لحظه ثبت درخواست تا تحویل نهایی، قدم‌به‌قدم با شفافیت کامل همراه شما هستیم.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/request"
            className="w-full sm:w-auto bg-[#3D2C1E] hover:bg-[#8C6D4F] text-[#FDFBF7] px-8 py-4 rounded-2xl font-medium shadow-lg shadow-[#3D2C1E]/10 transition-all hover:-translate-y-1 text-center"
          >
            ثبت درخواست تعمیر 🛠️
          </Link>
          <Link
            href="/track"
            className="w-full sm:w-auto bg-[#F0EBE1] hover:bg-[#D5C3A5]/50 text-[#3D2C1E] border border-[#D5C3A5] px-8 py-4 rounded-2xl font-medium transition-all hover:-translate-y-1 text-center"
          >
            پیگیری آنلاین وضعیت دستگاه 🔍
          </Link>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-2xl shadow-[#3D2C1E]/10 border border-[#D5C3A5]/40">
          <Image
            src="/img/electronics_workbench.webp"
            alt="میز کار تعمیرات تخصصی فیکسرا"
            width={1200}
            height={700}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* 2. Services Preview (کارت‌های حبابی با کرسر پوینتر و افکت هاور) */}
      <section className="py-20 bg-[#F0EBE1]/40 border-t border-b border-[#D5C3A5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2C1E] mb-4">خدمات تخصصی فیکسرا</h2>
            <p className="text-[#8C6D4F] max-w-xl mx-auto">تعمیرات سریع، تخصصی و مطمئن انواع تجهیزات دیجیتال با استفاده از قطعات درجه یک</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockServices.map((service) => (
              <div
                key={service.id}
                className="group relative bg-[#FDFBF7] rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm hover:shadow-xl hover:shadow-[#8C6D4F]/10 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 text-xs font-semibold bg-[#FDFBF7]/90 backdrop-blur-sm text-[#8C6D4F] px-3 py-1 rounded-full border border-[#D5C3A5]/40">
                    {service.badge}
                  </span>
                </div>

                <div className="absolute top-[8.25rem] right-6 w-14 h-14 rounded-2xl bg-[#FDFBF7] text-2xl flex items-center justify-center shadow-md border border-[#D5C3A5]/30 group-hover:bg-[#8C6D4F] group-hover:text-white transition-all duration-300 z-10">
                  {service.icon}
                </div>

                <div className="p-8 pt-10">
                  <h3 className="text-xl font-bold text-[#3D2C1E] mb-3 group-hover:text-[#8C6D4F] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#8C6D4F] leading-relaxed mb-8 group-hover:text-[#3D2C1E] transition-colors">
                    {service.description}
                  </p>

                  <div className="border-t border-[#D5C3A5]/30 pt-4 flex items-center justify-between text-xs text-[#8C6D4F]">
                    <span>زمان تحویل:</span>
                    <span className="font-bold text-[#3D2C1E] bg-[#F0EBE1] px-2.5 py-1 rounded-lg">
                      {service.estimatedTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Features Section (چیدمان دو ستونی: عکس + ویژگی‌ها) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl shadow-[#3D2C1E]/10 border border-[#D5C3A5]/40 order-2 lg:order-1">
            <Image
              src="/img/fixing.png"
              alt="تیم متخصص تعمیرات فیکسرا"
              width={800}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-extrabold text-[#3D2C1E] mb-4">چرا فیکسرا را انتخاب کنیم؟</h2>
            <p className="text-[#8C6D4F] mb-10 leading-relaxed">ما با تکیه بر تخصص و تعهد، بهترین تجربه تعمیرات را برای شما رقم می‌زنیم</p>

            <div className="space-y-6">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-5 bg-[#F0EBE1]/50 p-6 rounded-[1.75rem] border border-[#D5C3A5]/40 hover:bg-[#F0EBE1] transition-all hover:shadow-md cursor-pointer">
                  <div className="w-14 h-14 flex-shrink-0 rounded-full bg-[#FDFBF7] text-2xl flex items-center justify-center shadow-sm border border-[#D5C3A5]/30">
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#3D2C1E] mb-1.5">{feat.title}</h3>
                    <p className="text-sm text-[#8C6D4F] leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (مراحل کار حبابی) */}
      <section className="py-20 bg-[#F0EBE1]/30 border-t border-[#D5C3A5]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-[#3D2C1E] mb-3">مراحل کار در فیکسرا</h2>
            <p className="text-[#8C6D4F]">چگونه دستگاه شما تعمیر و به دستتان می‌رسد؟</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FDFBF7] p-8 rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm relative group hover:shadow-lg transition-all cursor-pointer">
              <span className="absolute -top-4 right-8 w-10 h-10 rounded-2xl bg-[#8C6D4F] text-[#FDFBF7] flex items-center justify-center font-bold text-base shadow-md">۱</span>
              <h3 className="text-xl font-bold text-[#3D2C1E] mb-3 mt-2">ثبت درخواست آنلاین</h3>
              <p className="text-sm text-[#8C6D4F] leading-relaxed">مشخصات دستگاه و نوع ایراد را در فرم ثبت کرده و کد پیگیری اختصاصی دریافت کنید.</p>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm relative group hover:shadow-lg transition-all cursor-pointer">
              <span className="absolute -top-4 right-8 w-10 h-10 rounded-2xl bg-[#8C6D4F] text-[#FDFBF7] flex items-center justify-center font-bold text-base shadow-md">۲</span>
              <h3 className="text-xl font-bold text-[#3D2C1E] mb-3 mt-2">بررسی و اعلام هزینه</h3>
              <p className="text-sm text-[#8C6D4F] leading-relaxed">کارشناسان ما دستگاه را عیب‌یابی کرده و هزینه نهایی را جهت تأیید به شما اعلام می‌کنند.</p>
            </div>

            <div className="bg-[#FDFBF7] p-8 rounded-[2.5rem] border border-[#D5C3A5]/40 shadow-sm relative group hover:shadow-lg transition-all cursor-pointer">
              <span className="absolute -top-4 right-8 w-10 h-10 rounded-2xl bg-[#8C6D4F] text-[#FDFBF7] flex items-center justify-center font-bold text-base shadow-md">۳</span>
              <h3 className="text-xl font-bold text-[#3D2C1E] mb-3 mt-2">تعمیر و تحویل فوری</h3>
              <p className="text-sm text-[#8C6D4F] leading-relaxed">پس از تأیید شما، تعمیر آغاز شده و دستگاه پس از تست کامل با ضمانت تحویل می‌گردد.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}