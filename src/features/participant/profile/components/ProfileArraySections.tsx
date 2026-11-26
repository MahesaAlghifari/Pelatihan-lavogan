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
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

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
    <section className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 space-y-4`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7ECF3] pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={DASHBOARD_TOKENS.iconBox}>
            {icon}
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className={DASHBOARD_TOKENS.sectionHeading}>
                {title}
              </h2>
              <span className={DASHBOARD_TOKENS.badgeNeutral}>
                {count}
              </span>
            </div>
            <p className={DASHBOARD_TOKENS.description}>
              {subtitle}
            </p>
          </div>
        </div>

        {editable && onAdd && addLabel && (
          <button
            type="button"
            onClick={onAdd}
            className={DASHBOARD_TOKENS.btnSoftBlue}
          >
            <Plus className="w-3.5 h-3.5" />
            {addLabel}
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

const INPUT_CLASS = DASHBOARD_TOKENS.input;

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
      setFormError('Institution name and major are required.');
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
      title="Education History"
      subtitle="Latest or ongoing formal academic background."
      icon={<GraduationCap className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Add Education"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-[#BFDBFE] bg-[#F9FBFE] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Institution Name</label>
              <input
                type="text"
                value={draft.nama_institusi}
                onChange={(e) => setDraft({ ...draft, nama_institusi: e.target.value })}
                placeholder="Example: University of Indonesia"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Degree</label>
              <select
                value={draft.jenjang}
                onChange={(e) => setDraft({ ...draft, jenjang: e.target.value })}
                className={INPUT_CLASS}
              >
                {['High School', 'Diploma (D3)', 'Bachelor (D4)', 'Bachelor (S1)', 'Master (S2)', 'Doctorate (S3)'].map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Major / Field of Study</label>
              <input
                type="text"
                value={draft.jurusan}
                onChange={(e) => setDraft({ ...draft, jurusan: e.target.value })}
                placeholder="Example: Computer Science"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Period</label>
              <input
                type="text"
                value={draft.periode_tahun}
                onChange={(e) => setDraft({ ...draft, periode_tahun: e.target.value })}
                placeholder="Example: 2020 - 2024"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Final Grade / GPA</label>
              <input
                type="text"
                value={draft.nilai_akhir}
                onChange={(e) => setDraft({ ...draft, nilai_akhir: e.target.value })}
                placeholder="Example: GPA 3.75 / 4.00"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Location</label>
              <input
                type="text"
                value={draft.lokasi_institusi}
                onChange={(e) => setDraft({ ...draft, lokasi_institusi: e.target.value })}
                placeholder="Example: Bandung, West Java"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-[#DC2626]">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Save Education' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className={`${DASHBOARD_TOKENS.description} py-1`}>
          No education history recorded yet.
        </p>
      ) : (
        <div className="divide-y divide-[#E7ECF3]">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={DASHBOARD_TOKENS.badgeBlue}>
                    {item.jenjang || '-'}
                  </span>
                  <h3 className={DASHBOARD_TOKENS.subheading}>
                    {item.nama_institusi}
                  </h3>
                </div>
                <p className="text-[13px] font-normal leading-snug text-[#475467]">
                  {item.jurusan}
                </p>
                <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 ${DASHBOARD_TOKENS.metaText}`}>
                  <span>Period: {item.periode_tahun || '-'}</span>
                  <span>Grade: {item.nilai_akhir || '-'}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#98A2B3]" />
                    {item.lokasi_institusi || '-'}
                  </span>
                </div>
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit education ${item.nama_institusi}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F3F6FB] border border-transparent hover:border-[#E7ECF3]"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete education ${item.nama_institusi}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
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
      setFormError('Position and company name are required.');
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
      title="Work Experience"
      subtitle="Work, internship, or professional project experience."
      icon={<Briefcase className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Add Experience"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-[#BFDBFE] bg-[#F9FBFE] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Position / Role</label>
              <input
                type="text"
                value={draft.posisi}
                onChange={(e) => setDraft({ ...draft, posisi: e.target.value })}
                placeholder="Example: Frontend Developer"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Company Name</label>
              <input
                type="text"
                value={draft.nama_perusahaan}
                onChange={(e) => setDraft({ ...draft, nama_perusahaan: e.target.value })}
                placeholder="Example: Acme Tech Inc."
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Work Period</label>
              <input
                type="text"
                value={draft.periode_kerja}
                onChange={(e) => setDraft({ ...draft, periode_kerja: e.target.value })}
                placeholder="Example: Jan 2025 - Jun 2025"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Employment Type</label>
              <select
                value={draft.tipe_pekerjaan}
                onChange={(e) => setDraft({ ...draft, tipe_pekerjaan: e.target.value })}
                className={INPUT_CLASS}
              >
                {['Internship', 'Full-time', 'Part-time', 'Contract', 'Freelance'].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={DASHBOARD_TOKENS.fieldLabel}>Location</label>
              <input
                type="text"
                value={draft.lokasi_kerja}
                onChange={(e) => setDraft({ ...draft, lokasi_kerja: e.target.value })}
                placeholder="Example: South Jakarta (Hybrid)"
                className={INPUT_CLASS}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={DASHBOARD_TOKENS.fieldLabel}>
                Description
              </label>
              <textarea
                rows={3}
                value={draft.deskripsi_pekerjaan}
                onChange={(e) =>
                  setDraft({ ...draft, deskripsi_pekerjaan: e.target.value })
                }
                placeholder="Summarize your main responsibilities and achievements..."
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-[#DC2626]">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Save Experience' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className={`${DASHBOARD_TOKENS.description} py-1`}>
          No work experience recorded yet.
        </p>
      ) : (
        <div className="divide-y divide-[#E7ECF3]">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={DASHBOARD_TOKENS.subheading}>
                    {item.posisi}
                  </h3>
                  <span className={DASHBOARD_TOKENS.badgeBlue}>
                    {item.tipe_pekerjaan || '-'}
                  </span>
                </div>
                <p className="text-[13px] font-normal text-[#475467]">
                  {item.nama_perusahaan} • {item.periode_kerja || '-'} •{' '}
                  {item.lokasi_kerja || '-'}
                </p>
                {item.deskripsi_pekerjaan && (
                  <p className={DASHBOARD_TOKENS.description}>
                    {item.deskripsi_pekerjaan}
                  </p>
                )}
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit experience ${item.posisi}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F3F6FB] border border-transparent hover:border-[#E7ECF3]"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete experience ${item.posisi}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
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
      setFormError('Training name and organizer are required.');
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
      title="Training History"
      subtitle="Bootcamps, courses, and professional training programs attended."
      icon={<BookOpen className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Add Training"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-[#BFDBFE] bg-[#F9FBFE] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Training Name</label>
              <input
                type="text"
                value={draft.nama_pelatihan}
                onChange={(e) => setDraft({ ...draft, nama_pelatihan: e.target.value })}
                placeholder="Example: UI/UX Product Design"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Organizer</label>
              <input
                type="text"
                value={draft.penyelenggara}
                onChange={(e) => setDraft({ ...draft, penyelenggara: e.target.value })}
                placeholder="Example: MagangHub Academy"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>
                Training Period
              </label>
              <input
                type="text"
                value={draft.periode_pelatihan}
                onChange={(e) =>
                  setDraft({ ...draft, periode_pelatihan: e.target.value })
                }
                placeholder="Example: Aug 2025 - Oct 2025"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Field / Category</label>
              <input
                type="text"
                value={draft.kategori_bidang}
                onChange={(e) =>
                  setDraft({ ...draft, kategori_bidang: e.target.value })
                }
                placeholder="Example: Web Development"
                className={INPUT_CLASS}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={DASHBOARD_TOKENS.fieldLabel}>Location</label>
              <input
                type="text"
                value={draft.lokasi_pelatihan}
                onChange={(e) =>
                  setDraft({ ...draft, lokasi_pelatihan: e.target.value })
                }
                placeholder="Example: Online / Bandung"
                className={INPUT_CLASS}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className={DASHBOARD_TOKENS.fieldLabel}>
                Description
              </label>
              <textarea
                rows={3}
                value={draft.deskripsi_pelatihan}
                onChange={(e) =>
                  setDraft({ ...draft, deskripsi_pelatihan: e.target.value })
                }
                placeholder="Core topics and practical outcomes from this training..."
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {formError && <p className="text-xs font-medium text-[#DC2626]">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Save Training' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className={`${DASHBOARD_TOKENS.description} py-1`}>
          No training history recorded yet.
        </p>
      ) : (
        <div className="divide-y divide-[#E7ECF3]">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={DASHBOARD_TOKENS.subheading}>
                    {item.nama_pelatihan}
                  </h3>
                  {item.kategori_bidang && (
                    <span className={DASHBOARD_TOKENS.badgeBlue}>
                      {item.kategori_bidang}
                    </span>
                  )}
                </div>
                <p className="text-[13px] font-normal text-[#475467]">
                  {item.penyelenggara} • {item.periode_pelatihan || '-'} •{' '}
                  {item.lokasi_pelatihan || '-'}
                </p>
                {item.deskripsi_pelatihan && (
                  <p className={DASHBOARD_TOKENS.description}>
                    {item.deskripsi_pelatihan}
                  </p>
                )}
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit training ${item.nama_pelatihan}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F3F6FB] border border-transparent hover:border-[#E7ECF3]"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete training ${item.nama_pelatihan}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
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
      setFormError('Certification name and issuing organization are required.');
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
      title="Certifications"
      subtitle="Competency certifications and official licenses held."
      icon={<Award className="w-4 h-4" />}
      count={items.length}
      editable={editable}
      addLabel="Add Certification"
      onAdd={openAdd}
    >
      {editable && showForm && (
        <div className="p-4 rounded-xl border border-[#BFDBFE] bg-[#F9FBFE] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>
                Certification Name
              </label>
              <input
                type="text"
                value={draft.nama_sertifikasi}
                onChange={(e) =>
                  setDraft({ ...draft, nama_sertifikasi: e.target.value })
                }
                placeholder="Example: Junior Web Developer"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>
                Issuing Organization
              </label>
              <input
                type="text"
                value={draft.lembaga_penerbit}
                onChange={(e) =>
                  setDraft({ ...draft, lembaga_penerbit: e.target.value })
                }
                placeholder="Example: BNSP / Technology LSP"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Validity Period</label>
              <input
                type="text"
                value={draft.masa_berlaku}
                onChange={(e) =>
                  setDraft({ ...draft, masa_berlaku: e.target.value })
                }
                placeholder="Example: Oct 2025 - Oct 2028 or Lifetime"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>
                Document Attachment
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={draft.lampiran_dokumen}
                  onChange={(e) =>
                    setDraft({ ...draft, lampiran_dokumen: e.target.value })
                  }
                  placeholder="File name or certificate URL..."
                  className={INPUT_CLASS}
                />
                <label className="h-9 inline-flex items-center gap-1.5 px-3 rounded-xl border border-[#E7ECF3] bg-white hover:bg-[#F3F6FB] text-xs font-medium text-[#171C2B] cursor-pointer shrink-0 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-[#1677F9]" />
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

          {formError && <p className="text-xs font-medium text-[#DC2626]">{formError}</p>}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveDraft}
              className={DASHBOARD_TOKENS.btnPrimary}
            >
              <Check className="w-3.5 h-3.5" />
              {editingId ? 'Save Certification' : 'Add'}
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <p className={`${DASHBOARD_TOKENS.description} py-1`}>
          No certifications recorded yet.
        </p>
      ) : (
        <div className="divide-y divide-[#E7ECF3]">
          {items.map((item) => (
            <div
              key={item.id}
              className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
            >
              <div className="space-y-1.5 min-w-0">
                <h3 className={DASHBOARD_TOKENS.subheading}>
                  {item.nama_sertifikasi}
                </h3>
                <p className="text-[13px] font-normal text-[#475467]">
                  {item.lembaga_penerbit} • Valid: {item.masa_berlaku || '-'}
                </p>
                {item.lampiran_dokumen && (
                  <p className="text-xs text-[#1677F9] font-medium inline-flex items-center gap-1 pt-0.5 truncate max-w-full">
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.lampiran_dokumen}</span>
                  </p>
                )}
              </div>

              {editable && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    aria-label={`Edit certification ${item.nama_sertifikasi}`}
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg text-[#667085] hover:bg-[#F3F6FB] border border-transparent hover:border-[#E7ECF3]"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete certification ${item.nama_sertifikasi}`}
                    onClick={() => onChange(items.filter((x) => x.id !== item.id))}
                    className="p-1.5 rounded-lg text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
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
      title="Skills"
      subtitle="Technical and soft competencies you possess."
      icon={<Sparkles className="w-4 h-4" />}
      count={skills.length}
      editable={editable}
    >
      {editable && (
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            aria-label="Add new skill"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Example: TypeScript, Figma, Data Analysis..."
            className={INPUT_CLASS}
          />
          <button
            type="button"
            onClick={addSkill}
            className={`${DASHBOARD_TOKENS.btnPrimary} shrink-0`}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Skill
          </button>
        </div>
      )}

      {skills.length === 0 ? (
        <p className={DASHBOARD_TOKENS.description}>No skills added yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-[0.005em] bg-[#EAF3FF] text-[#1677F9] border border-[#BFDBFE]"
            >
              <span>{skill}</span>
              {editable && (
                <button
                  type="button"
                  aria-label={`Remove skill ${skill}`}
                  onClick={() => onChange(skills.filter((s) => s !== skill))}
                  className="p-0.5 rounded-full hover:bg-[#DCEAFE] text-[#1677F9]"
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
