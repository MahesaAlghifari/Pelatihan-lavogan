import { X, Mail, Phone, Calendar, BookOpen, Award, CheckCircle } from 'lucide-react';

interface Participant {
  id: number;
  name: string;
  email: string;
  phone?: string;
  scheme: string;
  progress: number;
  modules: number;
  quizzes: number;
  status: string;
  joinDate?: string;
}

interface ParticipantDetailProps {
  participant: Participant;
  onClose: () => void;
}

export function ParticipantDetail({ participant, onClose }: ParticipantDetailProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-2xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-card z-10 p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Detail Peserta</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Header Profile */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
              style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}
            >
              {participant.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{participant.name}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {participant.email}</span>
                {participant.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {participant.phone}</span>}
                {participant.joinDate && <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Bergabung: {participant.joinDate}</span>}
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Progress Section */}
          <div>
            <h4 className="font-semibold mb-4 text-lg" style={{ color: 'var(--text-primary)' }}>Progres Pelatihan</h4>
            
            <div className="mb-6 p-4 rounded-xl border border-border bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{participant.scheme}</span>
                <span className="font-bold" style={{ color: 'var(--primary)' }}>{participant.progress}%</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${participant.progress}%`, backgroundColor: 'var(--primary)' }} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Modul Selesai</p>
                  <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{participant.modules}</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl border border-border flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Quiz Lulus</p>
                  <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>{participant.quizzes}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: participant.status === 'completed' ? 'var(--success-light)' : 'var(--muted)', color: participant.status === 'completed' ? 'var(--success)' : 'var(--text-secondary)' }}>
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Status</p>
                  <p className="font-bold text-lg capitalize" style={{ color: participant.status === 'completed' ? 'var(--success)' : 'var(--text-primary)' }}>
                    {participant.status === 'completed' ? 'Selesai' : 'Aktif'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card p-6 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium transition-colors"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}