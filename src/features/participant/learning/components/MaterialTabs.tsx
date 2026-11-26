import { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  MessageSquare,
  Save,
  Send,
  StickyNote,
  User,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import type {
  DiscussionComment,
  Material,
  MaterialResource,
} from '../types/learning.types';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

type TabKey = 'summary' | 'notes' | 'discussion';

interface MaterialTabsProps {
  material: Material;
  noteValue: string;
  discussions: DiscussionComment[];
  onSaveNote: (materialId: string, content: string) => void;
  onAddDiscussion: (materialId: string, message: string) => void;
}

function buildResourceContent(resource: MaterialResource, material: Material) {
  if (resource.previewContent) return resource.previewContent;

  if (resource.type.toUpperCase() === 'ZIP') {
    return `// Starter Code & Latihan - ${material.name}
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${material.name}</title>
</head>
<body>
  <header>
    <h1>MagangHub - Latihan ${material.name}</h1>
  </header>
  <main>
    <p>Mulai tulis kode latihan Anda di bagian ini.</p>
  </main>
</body>
</html>`;
  }

  return `MATERI PENDUKUNG MAGANGHUB
Judul Materi : ${material.name}
Dokumen      : ${resource.label}
Instruktur   : ${material.instructor ?? 'Tim Pengajar MagangHub'}

RINGKASAN POIN UTAMA:
1. Pahami struktur dasar dan konvensi penulisan pada materi "${material.name}".
2. Ikuti langkah praktik di video/panduan secara berurutan.
3. Setelah selesai menonton atau membaca materi, kerjakan Quiz evaluasi atau Tugas Praktik.`;
}

function triggerResourceDownload(resource: MaterialResource, material: Material) {
  const content = buildResourceContent(resource, material);
  const ext = resource.type.toUpperCase() === 'ZIP' ? 'html' : 'txt';
  const safeBase = resource.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-|-$)/g, '');
  const fileName = resource.fileName ?? `${safeBase}.${ext}`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);

  toast.success(`Mengunduh "${resource.label}" (${fileName}).`);
}

export function MaterialTabs({
  material,
  noteValue,
  discussions,
  onSaveNote,
  onAddDiscussion,
}: MaterialTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');
  const [draftNote, setDraftNote] = useState(noteValue);
  const [commentText, setCommentText] = useState('');
  const [previewResource, setPreviewResource] =
    useState<MaterialResource | null>(null);

  useEffect(() => {
    setDraftNote(noteValue);
  }, [material.id, noteValue]);

  useEffect(() => {
    if (!previewResource) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewResource(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewResource]);

  const handleSaveNote = () => {
    onSaveNote(material.id, draftNote);
    toast.success('Catatan pribadi berhasil disimpan.');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;
    onAddDiscussion(material.id, trimmed);
    setCommentText('');
    toast.success('Pertanyaan / komentar berhasil dikirim.');
  };

  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: typeof BookOpen;
    badge?: number;
  }> = [
    { key: 'summary', label: 'Ringkasan', icon: BookOpen },
    { key: 'notes', label: 'Catatan', icon: StickyNote },
    {
      key: 'discussion',
      label: 'Diskusi',
      icon: MessageSquare,
      badge: discussions.length,
    },
  ];

  const keyPoints = material.keyPoints ?? [
    `Memahami konsep inti dari materi "${material.name}".`,
    'Menerapkan praktik standar industri pada studi kasus latihan.',
    'Menyiapkan pemahaman sebelum mengerjakan quiz evaluasi atau tugas praktik.',
  ];

  const resources: MaterialResource[] = material.resources ?? [
    {
      label: `Slide & Ringkasan - ${material.name}`,
      size: '1.4 MB',
      type: 'PDF',
    },
    {
      label: 'Starter Code & Contoh Latihan',
      size: '420 KB',
      type: 'ZIP',
    },
  ];

  return (
    <>
      <div className={`${DASHBOARD_TOKENS.card} overflow-hidden`}>
        {/* Tab Header */}
        <div className="flex border-b border-[#E7ECF3] bg-[#F9FBFE] px-2 pt-2 gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl border-b-2 transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1677F9] border-[#1677F9]'
                    : 'border-transparent text-[#667085] hover:text-[#171C2B] hover:bg-white/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#EAF3FF] text-[#1677F9]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'summary' && (
            <div className="space-y-5">
              <div>
                <h3 className={`${DASHBOARD_TOKENS.cardTitle} mb-1.5`}>
                  Tentang Materi Ini
                </h3>
                <p className="text-xs sm:text-sm font-normal text-[#667085] leading-relaxed">
                  {material.description ??
                    `Sesi ini membahas topik "${material.name}" secara terstruktur agar peserta magang mampu memahami konsep dasar hingga implementasi praktis di proyek nyata.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-3`}>
                  <h4 className="text-sm font-semibold text-[#171C2B]">
                    Poin Pembelajaran
                  </h4>
                  <ul className="space-y-2.5">
                    {keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-normal text-[#667085]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1677F9] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-3`}>
                  <h4 className="text-sm font-semibold text-[#171C2B]">
                    Materi Pendukung & Informasi
                  </h4>
                  <p className="text-xs font-normal text-[#667085]">
                    Instruktur:{' '}
                    <span className="font-semibold text-[#171C2B]">
                      {material.instructor ?? 'Tim Pengajar MagangHub'}
                    </span>
                  </p>
                  <div className="space-y-2">
                    {resources.map((res, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-white border border-[#E7ECF3]"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#171C2B] truncate">
                            {res.label}
                          </p>
                          <p className="text-[11px] font-normal text-[#667085] mt-0.5">
                            {res.type} • {res.size}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewResource(res)}
                            aria-label={`View ${res.label}`}
                            className="h-8 px-2.5 rounded-lg text-xs font-semibold border border-[#E7ECF3] bg-white hover:bg-[#F3F6FB] text-[#171C2B] inline-flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#1677F9]" />
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerResourceDownload(res, material)}
                            aria-label={`Unduh ${res.label}`}
                            className="h-8 px-2.5 rounded-lg text-xs font-semibold bg-[#1677F9] hover:bg-[#1262D4] text-white inline-flex items-center gap-1 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Unduh
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className={DASHBOARD_TOKENS.cardTitle}>
                    Catatan Belajar Pribadi
                  </h3>
                  <p className="text-xs font-normal text-[#667085]">
                    Catatan tersimpan otomatis per materi di browser Anda.
                  </p>
                </div>
                <span className="text-xs font-medium text-[#667085] tabular-nums">
                  {draftNote.length} karakter
                </span>
              </div>

              <textarea
                rows={5}
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder={`Tulis rangkuman atau poin penting untuk "${material.name}"...`}
                className={DASHBOARD_TOKENS.input}
              />

              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-[#667085]">
                  {draftNote === noteValue && noteValue.length > 0
                    ? 'Semua perubahan tersimpan'
                    : 'Klik simpan untuk menyimpan catatan'}
                </span>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Save className="w-3.5 h-3.5" />
                  Simpan Catatan
                </button>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-5">
              <form onSubmit={handlePostComment} className="space-y-2.5">
                <label className="block text-sm font-semibold text-[#171C2B]">
                  Tanya Instruktur atau Diskusi Materi
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Tulis pertanyaan atau tanggapan mengenai materi ini..."
                    className={`${DASHBOARD_TOKENS.input} flex-1 h-9`}
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`${DASHBOARD_TOKENS.btnPrimary} whitespace-nowrap`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Kirim
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-3 border-t border-[#E7ECF3]">
                {discussions.length === 0 ? (
                  <p className="text-sm font-normal text-[#667085] text-center py-6">
                    Belum ada diskusi pada materi ini. Jadilah yang pertama
                    bertanya!
                  </p>
                ) : (
                  discussions.map((item) => (
                    <div
                      key={item.id}
                      className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-2`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-semibold text-[#171C2B]">
                            {item.author}
                          </span>
                          <span
                            className={
                              item.role === 'instructor'
                                ? DASHBOARD_TOKENS.badgeBlue
                                : DASHBOARD_TOKENS.badgeNeutral
                            }
                          >
                            {item.role === 'instructor'
                              ? 'Instruktur'
                              : 'Peserta'}
                          </span>
                        </div>
                        <span className="text-xs font-normal text-[#667085]">
                          {item.createdAt}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-normal text-[#667085] leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resource Preview Modal */}
      {previewResource && (
        <div
          className="fixed inset-0 bg-[#171C2B]/45 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewResource(null);
          }}
        >
          <div className="bg-white text-[#171C2B] rounded-2xl border border-[#E7ECF3] max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-xl flex flex-col">
            <div className="px-5 py-4 border-b border-[#E7ECF3] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={DASHBOARD_TOKENS.iconBoxSm}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base text-[#171C2B] truncate">
                    {previewResource.label}
                  </h3>
                  <p className="text-xs font-normal text-[#667085]">
                    {previewResource.type} • {previewResource.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => triggerResourceDownload(previewResource, material)}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh
                </button>
                <button
                  type="button"
                  aria-label="Tutup pratinjau materi pendukung"
                  onClick={() => setPreviewResource(null)}
                  className="p-2 rounded-xl text-[#667085] hover:bg-[#F3F6FB] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 overflow-y-auto bg-[#F3F6FB]">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-[#475467] bg-white p-5 rounded-xl border border-[#E7ECF3]">
                {buildResourceContent(previewResource, material)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
