import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SchemeData {
  id?: string | number;
  name: string;
  thumbnail: string;
  description: string;
  competencies: string;
  duration: string;
}

interface SchemeFormProps {
  initialData?: SchemeData | null;
  mode: 'create' | 'edit';
  onClose: () => void;
  onSubmit: (data: SchemeData) => void;
}

export function SchemeForm({ initialData, mode, onClose, onSubmit }: SchemeFormProps) {
  const [formData, setFormData] = useState<SchemeData>({
    name: '',
    thumbnail: '',
    description: '',
    competencies: '',
    duration: '3 Bulan',
  });

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData(initialData);
    }
  }, [initialData, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card z-10 p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {mode === 'create' ? 'Tambah Skema Baru' : 'Edit Skema'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Skema</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama skema..."
                className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Thumbnail URL</label>
              <input
                type="url"
                required
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Deskripsi</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Masukkan deskripsi singkat..."
                className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Kompetensi (pisahkan dengan koma)</label>
              <input
                type="text"
                required
                value={formData.competencies}
                onChange={(e) => setFormData({ ...formData, competencies: e.target.value })}
                placeholder="HTML, CSS, JavaScript"
                className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
              />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Durasi</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
              >
                <option value="1 Bulan">1 Bulan</option>
                <option value="1.5 Bulan">1.5 Bulan</option>
                <option value="2 Bulan">2 Bulan</option>
                <option value="3 Bulan">3 Bulan</option>
                <option value="6 Bulan">6 Bulan</option>
              </select>
            </div>
          </div>

          <div className="sticky bottom-0 bg-card p-6 border-t border-border flex gap-3 justify-end rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-medium border border-border hover:bg-muted transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold transition-colors hover:opacity-90 shadow-sm"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              {mode === 'create' ? 'Simpan Skema' : 'Update Skema'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}