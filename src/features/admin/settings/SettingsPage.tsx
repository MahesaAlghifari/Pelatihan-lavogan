import { Save } from 'lucide-react';

// PASTIKAN NAMA FUNGSI ADALAH SettingsPage
export function SettingsPage() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Kelola pengaturan platform</p>
      </div>

      <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="mb-4 font-bold" style={{ color: 'var(--text-primary)' }}>Informasi Platform</h3>
        {/* Isi dari komponen Settings lama Anda */}
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl mt-4" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Save className="w-5 h-5" /> Simpan Pengaturan
        </button>
      </div>
    </div>
  );
}