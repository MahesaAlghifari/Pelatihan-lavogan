import { Eye, RotateCcw, MoreVertical } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  email: string;
  scheme: string;
  progress: number;
  modules: number;
  quizzes: number;
  status: string;
}

interface ParticipantsTableProps {
  participants: Participant[];
  onView: (p: Participant) => void;
}

export function ParticipantsTable({ participants, onView }: ParticipantsTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
              <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Peserta</th>
              <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Skema</th>
              <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Progress</th>
              <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Status</th>
              <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="border-b hover:bg-muted/50 transition-colors" style={{ borderColor: 'var(--border)' }}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)' }}>
                      <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>
                        {p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm" style={{ color: 'var(--text-primary)' }}>{p.scheme}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.progress}%`, backgroundColor: 'var(--primary)' }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.progress}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-lg text-sm font-medium" style={{ backgroundColor: p.status === 'completed' ? 'var(--success-light)' : 'var(--primary-light)', color: p.status === 'completed' ? 'var(--success)' : 'var(--primary)' }}>
                    {p.status === 'completed' ? 'Selesai' : 'Aktif'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onView(p)} className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}