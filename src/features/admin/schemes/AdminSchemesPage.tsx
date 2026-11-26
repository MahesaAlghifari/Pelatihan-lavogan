import { useState } from 'react';
import { CheckCircle2, Plus, RefreshCw, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { SchemeCard } from './SchemeCard';
import { SchemeForm } from './SchemeForm';
import { trainingsData } from '@/data/datadummy';
import { useSchemeEnrollment } from '@/features/participant/schemes/schemeEnrollmentStorage';

interface Scheme {
  id: string | number;
  name: string;
  thumbnail: string;
  description: string;
  competencies: string[];
  duration: string;
  participants: number;
  status: string;
}

export function AdminSchemesPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const { requests, reviewChangeRequest } = useSchemeEnrollment();

  const [schemes, setSchemes] = useState<Scheme[]>(() => {
    return trainingsData.map((training) => ({
      id: training.id,
      name: training.title,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', 
      description: training.description,
      competencies: training.learningPath.map(p => p.title),
      duration: training.duration,
      participants: Math.floor(Math.random() * 500) + 10,
      status: 'active',
    }));
  });

  const handleCreate = () => {
    setModalMode('create');
    setSelectedScheme(null);
    setShowModal(true);
  };

  const handleEdit = (scheme: Scheme) => {
    setModalMode('edit');
    setSelectedScheme(scheme);
    setShowModal(true);
  };

  const handleDelete = (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus skema ini?')) {
      setSchemes(schemes.filter(s => s.id !== id));
    }
  };

  const handleFormSubmit = (data: any) => {
    if (modalMode === 'create') {
      const newScheme: Scheme = {
        ...data,
        id: `new-${Date.now()}`,
        competencies: data.competencies.split(',').map((c: string) => c.trim()),
        participants: 0,
        status: 'active',
      };
      setSchemes([newScheme, ...schemes]);
    } else if (selectedScheme) {
      setSchemes(schemes.map(s => s.id === selectedScheme.id ? {
        ...s,
        ...data,
        competencies: data.competencies.split(',').map((c: string) => c.trim()),
      } : s));
    }
    setShowModal(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Management Skema</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Kelola skema pelatihan dan sertifikasi</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Plus className="w-5 h-5" /> Tambah Skema
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <SchemeCard 
            key={scheme.id}
            scheme={scheme}
            onEdit={() => handleEdit(scheme)}
            onView={() => console.log('View Scheme', scheme.id)} // Bisa dikembangkan dengan View Modal
            onDelete={() => handleDelete(scheme.id)}
          />
        ))}
      </div>

      {/* Pengajuan Perubahan Program Peserta */}
      <div className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <RefreshCw className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                Pengajuan Perubahan Program Peserta
              </h2>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                Tinjau dan setujui permintaan peserta untuk berpindah program pelatihan.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            {requests.filter((r) => r.status === 'pending').length} Menunggu Persetujuan
          </span>
        </div>

        {requests.length === 0 ? (
          <p className="text-sm py-4" style={{ color: 'var(--text-secondary)' }}>
            Belum ada pengajuan perubahan program dari peserta.
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-border bg-muted/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {req.participantName}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      ({req.participantEmail})
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold"
                      style={{
                        backgroundColor:
                          req.status === 'pending'
                            ? 'var(--warning-light)'
                            : req.status === 'approved'
                              ? 'var(--success-light)'
                              : 'var(--error-light)',
                        color:
                          req.status === 'pending'
                            ? 'var(--warning)'
                            : req.status === 'approved'
                              ? 'var(--success)'
                              : 'var(--error)',
                      }}
                    >
                      {req.status === 'pending'
                        ? 'Menunggu Review'
                        : req.status === 'approved'
                          ? 'Disetujui'
                          : 'Ditolak'}
                    </span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {req.currentSchemeName} → <strong>{req.requestedSchemeName}</strong>
                  </p>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Alasan: {req.reason}
                  </p>
                </div>

                {req.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        reviewChangeRequest(req.id, 'approved');
                        toast.success(`Perubahan program ke "${req.requestedSchemeName}" disetujui.`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Setujui
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        reviewChangeRequest(req.id, 'rejected', 'Program saat ini masih aktif berjalan.');
                        toast.info('Pengajuan perubahan program ditolak.');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Tolak
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <SchemeForm
          mode={modalMode}
          initialData={selectedScheme ? {
            ...selectedScheme,
            competencies: selectedScheme.competencies.join(', ')
          } : undefined}
          onClose={() => setShowModal(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}