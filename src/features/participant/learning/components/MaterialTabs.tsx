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
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-border bg-muted/40 px-1.5 sm:px-2 pt-2 gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl border-b-2 transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-card text-primary border-primary'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tentang Materi Ini
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {material.description ??
                    `Sesi ini membahas topik "${material.name}" secara terstruktur agar peserta magang mampu memahami konsep dasar hingga implementasi praktis di proyek nyata.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                  <h4
                    className="text-sm font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Poin Pembelajaran
                  </h4>
                  <ul className="space-y-2.5">
                    {keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                  <h4
                    className="text-sm font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Materi Pendukung & Informasi
                  </h4>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Instruktur:{' '}
                    <span className="font-semibold text-slate-800">
                      {material.instructor ?? 'Tim Pengajar MagangHub'}
                    </span>
                  </p>
                  <div className="space-y-2.5">
                    {resources.map((res, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-white border border-border"
                      >
                        <div className="min-w-0">
                          <p
                            className="text-xs font-semibold truncate"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {res.label}
                          </p>
                          <p
                            className="text-[11px] mt-0.5"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {res.type} • {res.size}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewResource(res)}
                            aria-label={`View ${res.label}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-border hover:bg-muted transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            <Eye className="w-3.5 h-3.5 text-primary" />
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerResourceDownload(res, material)}
                            aria-label={`Unduh ${res.label}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-opacity hover:opacity-90"
                            style={{
                              backgroundColor: 'var(--primary)',
                              color: 'var(--primary-foreground)',
                            }}
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
                  <h3
                    className="text-base font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Catatan Belajar Pribadi
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Catatan tersimpan otomatis per materi di browser Anda.
                  </p>
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {draftNote.length} karakter
                </span>
              </div>

              <textarea
                rows={5}
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder={`Tulis rangkuman atau poin penting untuk "${material.name}"...`}
                className="w-full p-4 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                style={{ color: 'var(--text-primary)' }}
              />

              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {draftNote === noteValue && noteValue.length > 0
                    ? 'Semua perubahan tersimpan'
                    : 'Klik simpan untuk menyimpan catatan'}
                </span>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  <Save className="w-4 h-4" />
                  Simpan Catatan
                </button>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-5">
              <form onSubmit={handlePostComment} className="space-y-3">
                <label
                  className="block text-sm font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tanya Instruktur atau Diskusi Materi
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Tulis pertanyaan atau tanggapan mengenai materi ini..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Kirim
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-2 border-t border-border">
                {discussions.length === 0 ? (
                  <p
                    className="text-sm text-center py-6"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Belum ada diskusi pada materi ini. Jadilah yang pertama
                    bertanya!
                  </p>
                ) : (
                  discussions.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-border bg-muted/30 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className="text-sm font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.author}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              item.role === 'instructor'
                                ? 'bg-primary/10 text-primary'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.role === 'instructor'
                              ? 'Instruktur'
                              : 'Peserta'}
                          </span>
                        </div>
                        <span
                          className="text-xs"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {item.createdAt}
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewResource(null);
          }}
        >
          <div className="bg-white text-slate-900 rounded-2xl border border-border max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <div className="min-w-0">
                  <h3
                    className="font-bold text-base truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {previewResource.label}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {previewResource.type} • {previewResource.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => triggerResourceDownload(previewResource, material)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh
                </button>
                <button
                  type="button"
                  aria-label="Tutup pratinjau materi pendukung"
                  onClick={() => setPreviewResource(null)}
                  className="p-2 rounded-xl hover:bg-muted transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto bg-slate-50">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-slate-700 bg-white p-5 rounded-xl border border-border">
                {buildResourceContent(previewResource, material)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
