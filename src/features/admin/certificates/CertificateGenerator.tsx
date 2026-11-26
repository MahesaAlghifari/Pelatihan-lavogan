import { Award } from 'lucide-react';

export function CertificateGenerator() {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl border-4 p-12 relative mb-6" style={{ borderColor: 'var(--primary)' }}>
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: 'var(--primary)' }} />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 rounded-tr-xl" style={{ borderColor: 'var(--primary)' }} />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 rounded-bl-xl" style={{ borderColor: 'var(--primary)' }} />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: 'var(--primary)' }} />

      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
            <Award className="w-12 h-12 text-white" />
          </div>
        </div>
        <div>
          <h2 className="mb-2" style={{ color: 'var(--text-primary)' }}>Sertifikat Kompetensi</h2>
          <p style={{ color: 'var(--text-secondary)' }}>LearnHub - Platform E-Learning</p>
        </div>
        <div className="py-6">
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>Diberikan kepada</p>
          <h1 className="mb-6 font-bold" style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>[Nama Peserta]</h1>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Telah berhasil menyelesaikan program pelatihan</p>
          <h3 className="mt-4 font-semibold" style={{ color: 'var(--text-primary)' }}>[Nama Skema]</h3>
        </div>
        <div className="pt-6 border-t-2" style={{ borderColor: 'var(--border)' }}>
          <div className="flex justify-center gap-12 text-sm">
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Nomor Sertifikat</p>
              <p className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>CERT-00000</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)' }}>Tanggal Terbit</p>
              <p className="font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>DD/MM/YYYY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}