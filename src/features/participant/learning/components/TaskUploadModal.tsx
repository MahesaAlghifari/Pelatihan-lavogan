import { useState } from 'react';
import { Upload, X, Link as LinkIcon, FileText } from 'lucide-react';
import { Material } from '../types/learning.types';
import { submitTaskData } from '../services/learningService';

interface TaskUploadModalProps {
  material: Material;
  initialLink?: string;
  onClose: () => void;
  onSuccess: (materialId: string, payload: { link?: string; fileName?: string }) => void;
}

export function TaskUploadModal({
  material,
  initialLink = '',
  onClose,
  onSuccess,
}: TaskUploadModalProps) {
  const [taskLink, setTaskLink] = useState(initialLink);
  const [taskFile, setTaskFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskLink && !taskFile) {
      alert('Harap lampirkan link tugas atau unggah file terlebih dahulu.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTaskData({
        materialId: material.id,
        link: taskLink,
        file: taskFile || undefined,
      });

      if (response.success) {
        onSuccess(material.id, {
          link: taskLink.trim() || undefined,
          fileName: taskFile?.name,
        });
        onClose();
      }
    } catch (error) {
      alert('Gagal mengirim tugas. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white text-slate-900 rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--primary-light)' }}>
              <Upload className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>Pengumpulan Tugas</h3>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{material.title || material.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 rounded-xl border border-border bg-slate-50">
            <h4 className="font-semibold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>Instruksi Praktik</h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {material.assignment?.description || 'Silakan kerjakan instruksi praktik berdasarkan materi dan unggah hasilnya berupa URL atau dokumen PDF/ZIP.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>URL Hasil Tugas (Drive / Figma / GitHub)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  value={taskLink}
                  onChange={(e) => setTaskLink(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 text-sm"
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <hr className="flex-1 border-border" />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Atau Unggah File</span>
              <hr className="flex-1 border-border" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>File Dokumen Tugas (PDF / ZIP)</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input-background)' }}>
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
                  {taskFile ? (
                    <>
                      <FileText className="w-8 h-8 mb-2" style={{ color: 'var(--primary)' }} />
                      <p className="text-sm font-medium px-4 text-center truncate max-w-xs" style={{ color: 'var(--text-primary)' }}>{taskFile.name}</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Klik untuk mengganti file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-7 h-7 mb-2" style={{ color: 'var(--text-tertiary)' }} />
                      <p className="mb-1 text-sm text-center px-4" style={{ color: 'var(--text-secondary)' }}>
                        <span className="font-semibold" style={{ color: 'var(--primary)' }}>Klik untuk unggah</span> atau drag and drop
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Maksimal 10MB</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" accept=".pdf,.zip,.rar" onChange={(e) => { if (e.target.files && e.target.files[0]) setTaskFile(e.target.files[0]); }} />
              </label>
            </div>

            <div className="pt-4 border-t border-border flex gap-3 justify-end">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium border border-border hover:bg-muted transition-colors text-sm" style={{ color: 'var(--text-primary)' }}>
                Batal
              </button>
              <button type="submit" disabled={isSubmitting || (!taskLink && !taskFile)} className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm flex items-center gap-2 ${(!taskLink && !taskFile) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 shadow-md'}`} style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                {isSubmitting ? 'Mengirim...' : 'Kumpulkan Tugas'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}