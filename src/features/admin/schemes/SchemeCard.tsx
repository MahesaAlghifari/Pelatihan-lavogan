import { Edit, Eye, Trash2 } from 'lucide-react';

interface Scheme {
  id: string | number;
  name: string;
  thumbnail: string;
  description: string;
  duration: string;
  participants: number;
}

interface SchemeCardProps {
  scheme: Scheme;
  onEdit: (scheme: Scheme) => void;
  onView: (scheme: Scheme) => void;
  onDelete: (id: string | number) => void;
}

export function SchemeCard({ scheme, onEdit, onView, onDelete }: SchemeCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="h-48 bg-muted">
        <img src={scheme.thumbnail} alt={scheme.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{scheme.name}</h3>
          <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{scheme.description}</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Durasi: {scheme.duration}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{scheme.participants} peserta</p>
          </div>
          <span className="px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
            Active
          </span>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={() => onView(scheme)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>
            <Eye className="w-4 h-4" /> Lihat
          </button>
          <button onClick={() => onEdit(scheme)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => onDelete(scheme.id)} className="px-4 py-2 rounded-xl border border-border hover:bg-error-light transition-colors" style={{ color: 'var(--error)' }}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}