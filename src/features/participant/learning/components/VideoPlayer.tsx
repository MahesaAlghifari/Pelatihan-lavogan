import { Maximize, FileText, ExternalLink, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { Material } from '../types/learning.types';
import { useOptionalSidebar } from '@/widgets/shell/SidebarProvider';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

interface VideoPlayerProps {
  material: Material;
}

export function VideoPlayer({ material }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDocPreview, setShowDocPreview] = useState(false);
  const sidebar = useOptionalSidebar();
  const hideEmbedForDrawer = Boolean(sidebar?.mobileOpen);

  const getYoutubeUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&disablekb=1&modestbranding=1`;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const hasValidExternalPdf =
    material.contentUrl.startsWith('http://') ||
    material.contentUrl.startsWith('https://');

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl overflow-hidden w-full relative z-0 isolate group border border-[#E7ECF3] shadow-[0_1px_3px_rgba(16,24,40,0.04)] ${
        material.type === 'video' ? 'bg-slate-950' : 'bg-white'
      }`}
    >
      {material.type === 'video' ? (
        <div className="w-full aspect-video max-h-[calc(100dvh-14.5rem)] relative mx-auto">
          {hideEmbedForDrawer ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-xs text-slate-400">
              Menu navigasi terbuka
            </div>
          ) : (
            <iframe
              key={material.id}
              className="absolute top-0 left-0 w-full h-full border-0"
              src={getYoutubeUrl(material.contentUrl)}
              title={material.title || material.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <button
            type="button"
            aria-label="Layar penuh"
            onClick={toggleFullScreen}
            className="absolute bottom-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2 backdrop-blur-sm"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      ) : material.type === 'pdf' ? (
        showDocPreview ? (
          <div className="w-full min-h-[280px] sm:min-h-[340px] lg:h-[calc(100dvh-16rem)] max-h-[520px] p-6 overflow-y-auto bg-white text-left space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7ECF3] pb-3">
              <div className="flex items-center gap-2.5">
                <div className={DASHBOARD_TOKENS.iconBoxSm}>
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className={DASHBOARD_TOKENS.cardTitle}>
                  {material.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDocPreview(false)}
                className={DASHBOARD_TOKENS.btnOutline}
              >
                Tutup Pratinjau
              </button>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-[#667085]">
              <p className="font-semibold text-[#171C2B]">
                Ringkasan Materi Dokumen ({material.pages ? `${material.pages} Halaman` : 'Referensi'})
              </p>
              <p>
                Dokumen ini membahas konsep inti, sintaks standar industri, dan praktik terbaik yang digunakan pada modul terkait.
              </p>
              <ul className="space-y-2 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1677F9] shrink-0" />
                  <span>Struktur dasar dan konvensi penulisan kode yang rapi.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1677F9] shrink-0" />
                  <span>Contoh penerapan komponen dan atribut yang paling sering dipakai.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1677F9] shrink-0" />
                  <span>Checklist verifikasi mandiri sebelum melanjutkan ke tugas atau quiz.</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 bg-[#FAFCFF] w-full min-h-[280px] sm:min-h-[340px] lg:h-[calc(100dvh-16rem)] max-h-[520px]">
            <div className="w-16 h-16 rounded-2xl bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#171C2B] tracking-tight">Dokumen Materi (PDF)</h3>
              <p className="text-xs sm:text-sm font-normal text-[#667085] mt-1 max-w-md">
                {material.name} {material.pages ? `• ${material.pages} Halaman` : ''} — Silakan baca dokumen panduan ini untuk menyelesaikan sesi materi terkait.
              </p>
            </div>
            {hasValidExternalPdf ? (
              <a
                href={material.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${DASHBOARD_TOKENS.btnPrimary} mt-1`}
              >
                Buka Dokumen PDF <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setShowDocPreview(true)}
                className={`${DASHBOARD_TOKENS.btnPrimary} mt-1`}
              >
                Baca Dokumen PDF <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center w-full min-h-[280px] sm:min-h-[340px] lg:h-[calc(100dvh-16rem)] max-h-[520px] text-[#667085]">
          <PlayCircle className="w-14 h-14 mb-3 text-[#98A2B3]" />
          <p className="text-sm font-normal">Format materi tidak dikenali</p>
        </div>
      )}
    </div>
  );
}