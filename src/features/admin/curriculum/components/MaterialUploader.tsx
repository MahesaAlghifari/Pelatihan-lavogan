import { useState } from 'react';
import { Upload, Video, FileText } from 'lucide-react';
import { uploadMaterialData } from '../../services/adminService';

interface MaterialUploaderProps {
  onSuccess: () => void;
}

export function MaterialUploader({ onSuccess }: MaterialUploaderProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'video' | 'pdf'>('video');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    setIsSubmitting(true);
    await uploadMaterialData({ title, type, file });
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Judul Materi</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button type="button" onClick={() => setType('video')} className={`p-6 rounded-xl border-2 transition-colors ${type === 'video' ? 'bg-muted' : 'hover:bg-muted'}`} style={{ borderColor: type === 'video' ? 'var(--primary)' : 'var(--border)' }}>
          <Video className="w-8 h-8 mx-auto mb-2" style={{ color: type === 'video' ? 'var(--primary)' : 'var(--text-secondary)' }} />
          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Video</p>
        </button>
        <button type="button" onClick={() => setType('pdf')} className={`p-6 rounded-xl border-2 transition-colors ${type === 'pdf' ? 'bg-muted' : 'hover:bg-muted'}`} style={{ borderColor: type === 'pdf' ? 'var(--primary)' : 'var(--border)' }}>
          <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: type === 'pdf' ? 'var(--error)' : 'var(--text-secondary)' }} />
          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>PDF</p>
        </button>
      </div>

      <div>
        <label className="border-2 border-dashed rounded-xl p-8 text-center block cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: 'var(--border)' }}>
          <input type="file" className="hidden" accept={type === 'video' ? 'video/mp4' : 'application/pdf'} onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
          <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{file ? file.name : 'Pilih file'}</p>
        </label>
      </div>

      <button type="submit" disabled={isSubmitting || !file} className="w-full px-6 py-3 rounded-xl font-medium transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
        {isSubmitting ? 'Mengunggah...' : 'Upload Materi'}
      </button>
    </form>
  );
}