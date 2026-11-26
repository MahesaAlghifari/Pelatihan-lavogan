import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { ParticipantsTable } from './ParticipantsTable';
import { ParticipantDetail } from './ParticipantDetail';
import { participants as initialParticipants } from '@/data/datadummy';

export function AdminParticipantsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedParticipant, setSelectedParticipant] = useState<any | null>(null);

  // Menggunakan data dummy yang dimapping agar sesuai dengan interface tabel
  const participantsList = initialParticipants.map((p) => ({
    id: p.id,
    name: p.name,
    email: p.email,
    phone: p.phone,
    scheme: p.scheme,
    progress: p.progress,
    modules: Math.floor(p.progress / 10), // Dummy data logic
    quizzes: Math.floor(p.progress / 12), // Dummy data logic
    status: p.status,
    joinDate: p.joinDate,
  }));

  const filteredParticipants = participantsList.filter((p) => {
    if (selectedTab === 'active') return p.status === 'active';
    if (selectedTab === 'completed') return p.status === 'completed';
    return true;
  });

  const tabs = [
    { id: 'all', label: 'Semua Peserta', count: participantsList.length },
    { id: 'active', label: 'Aktif', count: participantsList.filter(p => p.status === 'active').length },
    { id: 'completed', label: 'Selesai', count: participantsList.filter(p => p.status === 'completed').length },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Management Peserta</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Kelola data dan progress peserta</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Plus className="w-5 h-5" /> Tambah Peserta
        </button>
      </div>

      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${selectedTab === tab.id ? '' : 'opacity-60'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 rounded-lg text-xs" style={{ backgroundColor: selectedTab === tab.id ? 'var(--primary-light)' : 'var(--muted)', color: selectedTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)' }}>
              {tab.count}
            </span>
            {selectedTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--primary)' }}></div>}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Cari peserta berdasarkan nama atau email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2"
            style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>
          <Filter className="w-5 h-5" /> Filter
        </button>
      </div>

      {/* Menggunakan Komponen Modular ParticipantsTable */}
      <ParticipantsTable participants={filteredParticipants} onView={(p) => setSelectedParticipant(p)} />

      <div className="flex items-center justify-between p-4 border-t border-border">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Menampilkan data peserta</p>
      </div>

      {/* Menggunakan Komponen Modular ParticipantDetail */}
      {selectedParticipant && (
        <ParticipantDetail participant={selectedParticipant} onClose={() => setSelectedParticipant(null)} />
      )}
    </div>
  );
}