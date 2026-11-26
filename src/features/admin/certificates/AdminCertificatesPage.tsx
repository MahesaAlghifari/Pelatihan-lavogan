import { useState } from 'react';
import { Search, Download, Eye, Award, Calendar } from 'lucide-react';

export function AdminCertificatesPage() {
  const [selectedTab, setSelectedTab] = useState('issued');

  const certificates = [
    { id: 1, number: 'CERT-2026-001234', participant: 'Bob Johnson', email: 'bob@example.com', scheme: 'Full Stack Web Development', issueDate: '2026-06-01', status: 'issued' },
    { id: 2, number: 'CERT-2026-001233', participant: 'Sarah Davis', email: 'sarah@example.com', scheme: 'Data Science & ML', issueDate: '2026-05-30', status: 'issued' },
    { id: 3, number: 'CERT-2026-001232', participant: 'Mike Wilson', email: 'mike@example.com', scheme: 'Mobile App Development', issueDate: '2026-05-28', status: 'issued' },
    { id: 4, number: 'CERT-2026-001231', participant: 'Emma Brown', email: 'emma@example.com', scheme: 'Full Stack Web Development', issueDate: '2026-05-25', status: 'issued' },
    { id: 5, number: 'CERT-2026-001230', participant: 'James Taylor', email: 'james@example.com', scheme: 'Cloud Computing', issueDate: '2026-05-22', status: 'issued' },
  ];

  const tabs = [
    { id: 'issued', label: 'Sertifikat Diterbitkan', count: 487 },
    { id: 'template', label: 'Template Sertifikat', count: 1 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Management Sertifikat</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Kelola template dan riwayat penerbitan sertifikat</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-3 font-medium transition-colors relative ${selectedTab === tab.id ? '' : 'opacity-60'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            {tab.label}
            <span
              className="ml-2 px-2 py-0.5 rounded-lg text-xs"
              style={{
                backgroundColor: selectedTab === tab.id ? 'var(--primary-light)' : 'var(--muted)',
                color: selectedTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
              }}
            >
              {tab.count}
            </span>
            {selectedTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--primary)' }}></div>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {selectedTab === 'issued' ? (
        <div className="space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Cari sertifikat berdasarkan nomor atau nama peserta..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2"
                style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
              />
            </div>
            <button className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>
              Export PDF
            </button>
          </div>

          {/* Certificates Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Nomor Sertifikat</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Peserta</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Skema</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Tanggal Terbit</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="border-b hover:bg-muted/50 transition-colors" style={{ borderColor: 'var(--border)' }}>
                      <td className="p-4">
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{cert.number}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)' }}>
                            <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>
                              {cert.participant.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{cert.participant}</p>
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cert.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4"><p className="text-sm" style={{ color: 'var(--text-primary)' }}>{cert.scheme}</p></td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                          <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{cert.issueDate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }} title="Preview">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }} title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Menampilkan 1-5 dari 487 sertifikat</p>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Previous</button>
                <button className="px-4 py-2 rounded-xl text-sm font-medium transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>1</button>
                <button className="px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium" style={{ color: 'var(--text-primary)' }}>2</button>
                <button className="px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Next</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Template Editor */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h3 className="mb-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Template Sertifikat</h3>

            {/* Preview */}
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border-4 p-12 relative mb-6" style={{ borderColor: 'var(--primary)' }}>
              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: 'var(--primary)' }}></div>
              <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 rounded-tr-xl" style={{ borderColor: 'var(--primary)' }}></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 rounded-bl-xl" style={{ borderColor: 'var(--primary)' }}></div>
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: 'var(--primary)' }}></div>

              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <Award className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Sertifikat Kompetensi</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>LearnHub - Platform E-Learning</p>
                </div>
                <div className="py-6">
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Diberikan kepada</p>
                  <h1 className="mb-6 font-bold" style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>[Nama Peserta]</h1>
                  <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Telah berhasil menyelesaikan program pelatihan</p>
                  <h3 className="mt-4 font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>[Nama Skema]</h3>
                </div>
                <div className="pt-6 border-t-2" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex justify-center gap-12 text-sm">
                    <div>
                      <p style={{ color: 'var(--text-secondary)' }}>Nomor Sertifikat</p>
                      <p className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>[CERT-NUMBER]</p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--text-secondary)' }}>Tanggal Terbit</p>
                      <p className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>[DATE]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Settings */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Platform</label>
                <input
                  type="text"
                  defaultValue="LearnHub - Platform E-Learning"
                  className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2"
                  style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Warna Border</label>
                <input type="color" defaultValue="#0EA5A4" className="w-full h-12 rounded-xl border border-input-border" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Logo Platform</label>
                <input type="file" className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' }} />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>Reset</button>
              <button className="px-6 py-3 rounded-xl font-medium transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>Simpan Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}