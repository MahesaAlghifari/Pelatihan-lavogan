import { useEffect, useState, type ReactNode } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  FileText,
  GraduationCap,
  MapPin,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import type {
  PekerjaanItem,
  PelatihanItem,
  PendidikanItem,
  SertifikasiItem,
} from '../profileStorage';

interface SectionCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  count: number;
  editable: boolean;
  addLabel?: string;
  onAdd?: () => void;
  children: ReactNode;
}

function ProfileSectionCard({
  title,
  subtitle,
  icon,
  count,
  editable,
  addLabel,
  onAdd,
  children,
}: SectionCardProps) {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2
                className="text-base font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {title}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-muted text-slate-600">
                {count}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
          </div>
        </div>

        {editable && onAdd && addLabel && (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {addLabel}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

const INPUT_CLASS =
  'w-full px-3.5 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40';

/* -------------------- 2. RIWAYAT PENDIDIKAN -------------------- */

const EMPTY_PENDIDIKAN: Omit<PendidikanItem, 'id'> = {
  nama_institusi: '',
  jenjang: 'S1',
  jurusan: '',
  periode_tahun: '',
  nilai_akhir: '',
  lokasi_institusi: '',
};

export function PendidikanSection({
  items,
  editable = false,
  onChange,
}: {
  items: PendidikanItem[];
  editable?: boolean;
  onChange: (next: PendidikanItem[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Omit<PendidikanItem, 'id'>>(EMPTY_PENDIDIKAN);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!editable) {
      setShowForm(false);
      setEditingId(null);
      setFormError('');
    }
  }, [editable]);

  const openAdd = () => {
    setEditingId(null);
    setDraft(EMPTY_PENDIDIKAN);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (item: PendidikanItem) => {
    setEditingId(item.id);
    setDraft({
      nama_institusi: item.nama_institusi,
      jenjang: item.jenjang,
      jurusan: item.jurusan,
      periode_tahun: item.periode_tahun,
      nilai_akhir: item.nilai_akhir,
      lokasi_institusi: item.lokasi_institusi,
    });
    setFormError('');
    setShowForm(true);
  };

  const saveDraft = () => {
    if (!draft.nama_institusi.trim() || !draft.jurusan.trim()) {
      setFormError('Nama institusi dan jurusan wajib diisi.');
      return;
    }
    if (editingId) {
      onChange(
        items.map((item) =>
          item.id === editingId ? { ...draft, id: editingId } : item
        )
      );
    } else {
      onChange([{ ...draft, id: `edu-${Date.now()}` }, ...items]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormError('');
  };

  return (
    <ProfileSectionCard
      title="Riwayat Pendidikan"
      subtitle="Latar belakang pendidikan formal terakhir atau yang sedang ditempuh."
      icon={<GraduationCap className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Tambah Pendidikan"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-primary/30 bg-muted/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">Nama Institusi</label>
              <input
                type="text"
                value={draft.nama_institusi}
                onChange={(e) => setDraft({ ...draft, nama_institusi: e.target.value })}
                placeholder="Contoh: Universitas Indonesia"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Jenjang</label>
              <select
                value={draft.jenjang}
                onChange={(e) => setDraft({ ...draft, jenjang: e.target.value })}
                className={INPUT_CLASS}
              >
                {['SMA/SMK', 'D3', 'D4', 'S1', 'S2', 'S3'].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Jurusan</label>
              <input
                type="text"
                value={draft.jurusan}
                onChange={(e) => setDraft({ ...draft, jurusan: e.target.value })}
                placeholder="Contoh: Teknik Informatika"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Periode Tahun</label>
              <input
                type="text"
                value={draft.periode_tahun}
                onChange={(e) => setDraft({ ...draft, periode_tahun: e.target.value })}
                placeholder="Contoh: 2020 - 2024"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Nilai Akhir</label>
              <input
                type="text"
                value={draft.nilai_akhir}
                onChange={(e) => setDraft({ ...draft, nilai_akhir: e.target.value })}
                placeholder="Contoh: IPK 3.75 / 4.00"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Lokasi Institusi</label>
              <input
                type="text"
                value={draft.lokasi_institusi}
                onChange={(e) => setDraft({ ...draft, lokasi_institusi: e.target.value })}
                placeholder="Contoh: Depok, Jawa Barat"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-border bg-white hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Simpan Pendidikan' : 'Tambahkan'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 py-1">
          Belum ada riwayat pendidikan tercatat.
        </p>
      ) : (
        <div className="divide-y divide-border/60">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary">
                    {item.jenjang || '-'}
                  </span>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {item.nama_institusi}
                  </h3>
                </div>
                <p className="text-sm text-slate-700">{item.jurusan}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>Periode: {item.periode_tahun || '-'}</span>
                  <span>Nilai Akhir: {item.nilai_akhir || '-'}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {item.lokasi_institusi || '-'}
                  </span>
                </div>
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit pendidikan ${item.nama_institusi}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-muted border border-transparent hover:border-border"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus pendidikan ${item.nama_institusi}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ProfileSectionCard>
  );
}

/* -------------------- 3. RIWAYAT PEKERJAAN -------------------- */

const EMPTY_PEKERJAAN: Omit<PekerjaanItem, 'id'> = {
  posisi: '',
  nama_perusahaan: '',
  periode_kerja: '',
  tipe_pekerjaan: 'Magang',
  lokasi_kerja: '',
  deskripsi_pekerjaan: '',
};

export function PekerjaanSection({
  items,
  editable = false,
  onChange,
}: {
  items: PekerjaanItem[];
  editable?: boolean;
  onChange: (next: PekerjaanItem[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Omit<PekerjaanItem, 'id'>>(EMPTY_PEKERJAAN);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!editable) {
      setShowForm(false);
      setEditingId(null);
      setFormError('');
    }
  }, [editable]);

  const openAdd = () => {
    setEditingId(null);
    setDraft(EMPTY_PEKERJAAN);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (item: PekerjaanItem) => {
    setEditingId(item.id);
    setDraft({
      posisi: item.posisi,
      nama_perusahaan: item.nama_perusahaan,
      periode_kerja: item.periode_kerja,
      tipe_pekerjaan: item.tipe_pekerjaan,
      lokasi_kerja: item.lokasi_kerja,
      deskripsi_pekerjaan: item.deskripsi_pekerjaan,
    });
    setFormError('');
    setShowForm(true);
  };

  const saveDraft = () => {
    if (!draft.posisi.trim() || !draft.nama_perusahaan.trim()) {
      setFormError('Posisi dan nama perusahaan wajib diisi.');
      return;
    }
    if (editingId) {
      onChange(
        items.map((item) =>
          item.id === editingId ? { ...draft, id: editingId } : item
        )
      );
    } else {
      onChange([{ ...draft, id: `work-${Date.now()}` }, ...items]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormError('');
  };

  return (
    <ProfileSectionCard
      title="Riwayat Pekerjaan"
      subtitle="Pengalaman kerja, magang, atau proyek profesional yang pernah dijalankan."
      icon={<Briefcase className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Tambah Pekerjaan"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-primary/30 bg-muted/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">Posisi</label>
              <input
                type="text"
                value={draft.posisi}
                onChange={(e) => setDraft({ ...draft, posisi: e.target.value })}
                placeholder="Contoh: Frontend Developer"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Nama Perusahaan</label>
              <input
                type="text"
                value={draft.nama_perusahaan}
                onChange={(e) => setDraft({ ...draft, nama_perusahaan: e.target.value })}
                placeholder="Contoh: PT Teknologi Maju"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Periode Kerja</label>
              <input
                type="text"
                value={draft.periode_kerja}
                onChange={(e) => setDraft({ ...draft, periode_kerja: e.target.value })}
                placeholder="Contoh: Jan 2025 - Jun 2025"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Tipe Pekerjaan</label>
              <select
                value={draft.tipe_pekerjaan}
                onChange={(e) => setDraft({ ...draft, tipe_pekerjaan: e.target.value })}
                className={INPUT_CLASS}
              >
                {['Magang', 'Penuh Waktu', 'Paruh Waktu', 'Kontrak', 'Freelance'].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Lokasi Kerja</label>
              <input
                type="text"
                value={draft.lokasi_kerja}
                onChange={(e) => setDraft({ ...draft, lokasi_kerja: e.target.value })}
                placeholder="Contoh: Jakarta Selatan (Hybrid)"
                className={INPUT_CLASS}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold mb-1">
                Deskripsi Pekerjaan
              </label>
              <textarea
                rows={3}
                value={draft.deskripsi_pekerjaan}
                onChange={(e) =>
                  setDraft({ ...draft, deskripsi_pekerjaan: e.target.value })
                }
                placeholder="Ringkas tanggung jawab utama dan pencapaian Anda..."
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-border bg-white hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Simpan Pekerjaan' : 'Tambahkan'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 py-1">
          Belum ada riwayat pekerjaan tercatat.
        </p>
      ) : (
        <div className="divide-y divide-border/60">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {item.posisi}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary">
                    {item.tipe_pekerjaan || '-'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700">
                  {item.nama_perusahaan} • {item.periode_kerja || '-'} •{' '}
                  {item.lokasi_kerja || '-'}
                </p>
                {item.deskripsi_pekerjaan && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.deskripsi_pekerjaan}
                  </p>
                )}
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit pekerjaan ${item.posisi}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-muted border border-transparent hover:border-border"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus pekerjaan ${item.posisi}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ProfileSectionCard>
  );
}

/* -------------------- 4. RIWAYAT PELATIHAN -------------------- */

const EMPTY_PELATIHAN: Omit<PelatihanItem, 'id'> = {
  nama_pelatihan: '',
  penyelenggara: '',
  periode_pelatihan: '',
  kategori_bidang: '',
  lokasi_pelatihan: '',
  deskripsi_pelatihan: '',
};

export function PelatihanSection({
  items,
  editable = false,
  onChange,
}: {
  items: PelatihanItem[];
  editable?: boolean;
  onChange: (next: PelatihanItem[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Omit<PelatihanItem, 'id'>>(EMPTY_PELATIHAN);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!editable) {
      setShowForm(false);
      setEditingId(null);
      setFormError('');
    }
  }, [editable]);

  const openAdd = () => {
    setEditingId(null);
    setDraft(EMPTY_PELATIHAN);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (item: PelatihanItem) => {
    setEditingId(item.id);
    setDraft({
      nama_pelatihan: item.nama_pelatihan,
      penyelenggara: item.penyelenggara,
      periode_pelatihan: item.periode_pelatihan,
      kategori_bidang: item.kategori_bidang,
      lokasi_pelatihan: item.lokasi_pelatihan,
      deskripsi_pelatihan: item.deskripsi_pelatihan,
    });
    setFormError('');
    setShowForm(true);
  };

  const saveDraft = () => {
    if (!draft.nama_pelatihan.trim() || !draft.penyelenggara.trim()) {
      setFormError('Nama pelatihan dan penyelenggara wajib diisi.');
      return;
    }
    if (editingId) {
      onChange(
        items.map((item) =>
          item.id === editingId ? { ...draft, id: editingId } : item
        )
      );
    } else {
      onChange([{ ...draft, id: `train-${Date.now()}` }, ...items]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormError('');
  };

  return (
    <ProfileSectionCard
      title="Riwayat Pelatihan"
      subtitle="Pelatihan, bootcamp, atau kursus pengembangan kompetensi yang diikuti."
      icon={<BookOpen className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Tambah Pelatihan"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-primary/30 bg-muted/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">Nama Pelatihan</label>
              <input
                type="text"
                value={draft.nama_pelatihan}
                onChange={(e) => setDraft({ ...draft, nama_pelatihan: e.target.value })}
                placeholder="Contoh: UI/UX Product Design"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Penyelenggara</label>
              <input
                type="text"
                value={draft.penyelenggara}
                onChange={(e) => setDraft({ ...draft, penyelenggara: e.target.value })}
                placeholder="Contoh: MagangHub Academy"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Periode Pelatihan
              </label>
              <input
                type="text"
                value={draft.periode_pelatihan}
                onChange={(e) =>
                  setDraft({ ...draft, periode_pelatihan: e.target.value })
                }
                placeholder="Contoh: Agu 2025 - Okt 2025"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Kategori Bidang</label>
              <input
                type="text"
                value={draft.kategori_bidang}
                onChange={(e) =>
                  setDraft({ ...draft, kategori_bidang: e.target.value })
                }
                placeholder="Contoh: Web Development"
                className={INPUT_CLASS}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold mb-1">Lokasi Pelatihan</label>
              <input
                type="text"
                value={draft.lokasi_pelatihan}
                onChange={(e) =>
                  setDraft({ ...draft, lokasi_pelatihan: e.target.value })
                }
                placeholder="Contoh: Daring (Online) / Bandung"
                className={INPUT_CLASS}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold mb-1">
                Deskripsi Pelatihan
              </label>
              <textarea
                rows={3}
                value={draft.deskripsi_pelatihan}
                onChange={(e) =>
                  setDraft({ ...draft, deskripsi_pelatihan: e.target.value })
                }
                placeholder="Materi utama dan hasil praktik selama pelatihan..."
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-border bg-white hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Simpan Pelatihan' : 'Tambahkan'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 py-1">
          Belum ada riwayat pelatihan tercatat.
        </p>
      ) : (
        <div className="divide-y divide-border/60">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {item.nama_pelatihan}
                  </h3>
                  {item.kategori_bidang && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-primary/10 text-primary">
                      {item.kategori_bidang}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-700">
                  {item.penyelenggara} • {item.periode_pelatihan || '-'} •{' '}
                  {item.lokasi_pelatihan || '-'}
                </p>
                {item.deskripsi_pelatihan && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.deskripsi_pelatihan}
                  </p>
                )}
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit pelatihan ${item.nama_pelatihan}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-muted border border-transparent hover:border-border"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus pelatihan ${item.nama_pelatihan}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ProfileSectionCard>
  );
}

/* -------------------- 5. RIWAYAT SERTIFIKASI -------------------- */

const EMPTY_SERTIFIKASI: Omit<SertifikasiItem, 'id'> = {
  nama_sertifikasi: '',
  lembaga_penerbit: '',
  masa_berlaku: '',
  lampiran_dokumen: '',
};

export function SertifikasiSection({
  items,
  editable = false,
  onChange,
}: {
  items: SertifikasiItem[];
  editable?: boolean;
  onChange: (next: SertifikasiItem[]) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Omit<SertifikasiItem, 'id'>>(EMPTY_SERTIFIKASI);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!editable) {
      setShowForm(false);
      setEditingId(null);
      setFormError('');
    }
  }, [editable]);

  const openAdd = () => {
    setEditingId(null);
    setDraft(EMPTY_SERTIFIKASI);
    setFormError('');
    setShowForm(true);
  };

  const openEdit = (item: SertifikasiItem) => {
    setEditingId(item.id);
    setDraft({
      nama_sertifikasi: item.nama_sertifikasi,
      lembaga_penerbit: item.lembaga_penerbit,
      masa_berlaku: item.masa_berlaku,
      lampiran_dokumen: item.lampiran_dokumen,
    });
    setFormError('');
    setShowForm(true);
  };

  const saveDraft = () => {
    if (!draft.nama_sertifikasi.trim() || !draft.lembaga_penerbit.trim()) {
      setFormError('Nama sertifikasi dan lembaga penerbit wajib diisi.');
      return;
    }
    if (editingId) {
      onChange(
        items.map((item) =>
          item.id === editingId ? { ...draft, id: editingId } : item
        )
      );
    } else {
      onChange([{ ...draft, id: `cert-${Date.now()}` }, ...items]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormError('');
  };

  return (
    <ProfileSectionCard
      title="Riwayat Sertifikasi"
      subtitle="Sertifikasi kompetensi atau lisensi resmi yang dimiliki."
      icon={<Award className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Tambah Sertifikasi"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-primary/30 bg-muted/30 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold mb-1">
                Nama Sertifikasi
              </label>
              <input
                type="text"
                value={draft.nama_sertifikasi}
                onChange={(e) =>
                  setDraft({ ...draft, nama_sertifikasi: e.target.value })
                }
                placeholder="Contoh: Junior Web Developer"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Lembaga Penerbit
              </label>
              <input
                type="text"
                value={draft.lembaga_penerbit}
                onChange={(e) =>
                  setDraft({ ...draft, lembaga_penerbit: e.target.value })
                }
                placeholder="Contoh: BNSP / LSP Teknologi"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">Masa Berlaku</label>
              <input
                type="text"
                value={draft.masa_berlaku}
                onChange={(e) =>
                  setDraft({ ...draft, masa_berlaku: e.target.value })
                }
                placeholder="Contoh: Okt 2025 - Okt 2028 atau Seumur Hidup"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1">
                Lampiran Dokumen
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={draft.lampiran_dokumen}
                  onChange={(e) =>
                    setDraft({ ...draft, lampiran_dokumen: e.target.value })
                  }
                  placeholder="Nama file atau URL sertifikat..."
                  className={INPUT_CLASS}
                />
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-white hover:bg-muted text-xs font-semibold cursor-pointer shrink-0">
                  <Upload className="w-3.5 h-3.5 text-primary" />
                  <span>File</span>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setDraft({ ...draft, lampiran_dokumen: file.name });
                      }
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold border border-border bg-white hover:bg-muted"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-primary text-white hover:opacity-90"
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Simpan Sertifikasi' : 'Tambahkan'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-sm text-slate-500 py-1">
          Belum ada riwayat sertifikasi tercatat.
        </p>
      ) : (
        <div className="divide-y divide-border/60">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1 min-w-0">
                <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {item.nama_sertifikasi}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-700">
                  {item.lembaga_penerbit} • Masa Berlaku: {item.masa_berlaku || '-'}
                </p>
                {item.lampiran_dokumen && (
                  <p className="text-xs text-primary font-medium inline-flex items-center gap-1 pt-0.5 truncate max-w-full">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.lampiran_dokumen}</span>
                  </p>
                )}
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit sertifikasi ${item.nama_sertifikasi}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-muted border border-transparent hover:border-border"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Hapus sertifikasi ${item.nama_sertifikasi}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ProfileSectionCard>
  );
}

/* -------------------- 6. KEAHLIAN (DAFTAR KEAHLIAN) -------------------- */

export function KeahlianSection({
  skills,
  editable = false,
  onChange,
}: {
  skills: string[];
  editable?: boolean;
  onChange: (next: string[]) => void;
}) {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;
    const exists = skills.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (!exists) {
      onChange([...skills, trimmed]);
    }
    setSkillInput('');
  };

  return (
    <ProfileSectionCard
      title="Keahlian"
      subtitle="Daftar kompetensi teknis maupun nonteknis yang Anda kuasai."
      icon={<Sparkles className="w-4 h-4" />}
      count={skills.length}
      editable={editable}
    >
      {editable && (
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            aria-label="Tambah keahlian baru"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Contoh: TypeScript, Figma, Data Analysis..."
            className={INPUT_CLASS}
          />
          <button
            type="button"
            onClick={addSkill}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-primary text-white hover:opacity-90 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Tambah Keahlian
          </button>
        </div>
      )}

      {skills.length === 0 ? (
        <p className="text-sm text-slate-500">Belum ada keahlian ditambahkan.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-primary/10 text-primary border border-primary/20"
            >
              <span>{skill}</span>
              {editable && (
                <button
                  type="button"
                  aria-label={`Hapus keahlian ${skill}`}
                  onClick={() => onChange(skills.filter((s) => s !== skill))}
                  className="p-0.5 rounded-full hover:bg-primary/20 text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
    </ProfileSectionCard>
  );
}
