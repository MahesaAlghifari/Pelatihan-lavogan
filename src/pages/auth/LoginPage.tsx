import { Award, BookOpen, CheckCircle2, GraduationCap, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/features/auth/ui";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Kurikulum Terstruktur",
    description: "Video pembelajaran, modul PDF, dan latihan praktik berstandar industri.",
  },
  {
    icon: CheckCircle2,
    title: "Evaluasi & Quiz Otomatis",
    description: "Pantau pemahaman tiap modul dengan penilaian instan dan status tugas.",
  },
  {
    icon: Award,
    title: "Sertifikat Pelatihan Resmi",
    description: "Klaim dan unduh e-sertifikat resmi penyelesaian pelatihan MagangHub.",
  },
];

export function LoginPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-50">
      {/* Left Brand Showcase (Desktop) */}
      <section className="hidden lg:flex lg:col-span-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-teal-700 text-white p-12 flex-col justify-between">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-white">MagangHub</p>
            <p className="text-xs text-teal-100">Portal Pelatihan Resmi</p>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-lg space-y-8 my-auto py-8">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-teal-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Portal Pelatihan Resmi MagangHub
            </span>
            <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight text-white">
              Tingkatkan Keterampilan &amp; Kesiapan Karier Bersama MagangHub
            </h2>
            <p className="text-sm xl:text-base text-slate-200 leading-relaxed">
              Platform pembelajaran terpadu untuk peserta magang, instruktur, dan pengelola program pelatihan resmi MagangHub.
            </p>
          </div>

          <div className="space-y-4">
            {FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-3.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 p-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-400/20 text-teal-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/15 text-xs text-slate-200">
          <span>1.200+ Peserta Magang • 6 Program Pelatihan</span>
          <span>© 2026 MagangHub</span>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-10">
        {/* Compact Brand Header (Mobile/Tablet) */}
        <div className="flex lg:hidden items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">MagangHub</p>
            <p className="text-xs text-slate-500">Portal Pelatihan Resmi</p>
          </div>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}

export default LoginPage;
