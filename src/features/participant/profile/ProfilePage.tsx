import { useMemo, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Camera,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Pencil,
  Phone,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  User,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { schemes } from '@/data/datadummy';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useSchemeEnrollment } from '@/features/participant/schemes/schemeEnrollmentStorage';
import {
  KeahlianSection,
  PekerjaanSection,
  PelatihanSection,
  PendidikanSection,
  SertifikasiSection,
} from './components/ProfileArraySections';
import {
  getInitials,
  readParticipantProfile,
  saveParticipantProfile,
  type ParticipantProfile,
} from './profileStorage';

interface FormErrors {
  name?: string;
  email?: string;
  nomor_telepon?: string;
}

type ProfileSectionTab =
  | 'all'
  | 'basic'
  | 'education'
  | 'work'
  | 'training'
  | 'certification'
  | 'skills';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatBirthDate(value: string) {
  if (!value) return '-';
  try {
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

export function ProfilePage() {
  const { currentUser } = useAuth();
  const { enrollment } = useSchemeEnrollment();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [savedProfile, setSavedProfile] = useState<ParticipantProfile>(() => {
    const stored = readParticipantProfile();
    if (currentUser) {
      const resolvedPhone =
        stored.nomor_telepon || currentUser.phone || stored.phone;
      return {
        ...stored,
        name: currentUser.fullName || stored.name,
        email: currentUser.email || stored.email,
        phone: resolvedPhone,
        nomor_telepon: resolvedPhone,
      };
    }
    return stored;
  });

  const [formData, setFormData] = useState<ParticipantProfile>(savedProfile);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<ProfileSectionTab>('all');

  const activeSchemeName = useMemo(() => {
    if (!enrollment) return formData.scheme;
    return (
      schemes.find((s) => s.id === enrollment.schemeId)?.name ?? formData.scheme
    );
  }, [enrollment, formData.scheme]);

  const validate = (data: ParticipantProfile): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = data.name.trim();
    const trimmedEmail = data.email.trim();
    const trimmedPhone = (data.nomor_telepon || data.phone).trim();

    if (!trimmedName) {
      nextErrors.name = 'Nama lengkap wajib diisi.';
    } else if (trimmedName.length < 3) {
      nextErrors.name = 'Nama lengkap minimal 3 karakter.';
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Alamat email wajib diisi.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Format alamat email tidak valid.';
    }

    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone) {
      nextErrors.nomor_telepon = 'Nomor telepon wajib diisi.';
    } else if (digitsOnly.length < 8) {
      nextErrors.nomor_telepon = 'Nomor telepon minimal 8 digit angka.';
    }

    return nextErrors;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Harap pilih file gambar (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran foto maksimal 2 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormData((prev) => ({
          ...prev,
          avatarUrl: reader.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleEnterEdit = () => {
    setFormData(savedProfile);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(savedProfile);
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setActiveTab((prev) => (prev === 'all' ? 'all' : 'basic'));
      toast.error('Mohon periksa kembali data profil Anda.');
      return;
    }

    const normalizedPhone = formData.nomor_telepon.trim();
    const normalized: ParticipantProfile = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: normalizedPhone,
      nomor_telepon: normalizedPhone,
      tempat_lahir: formData.tempat_lahir.trim(),
      tanggal_lahir: formData.tanggal_lahir.trim(),
      jenis_kelamin: formData.jenis_kelamin,
      domisili: formData.domisili.trim(),
      scheme: activeSchemeName,
    };

    setIsSaving(true);
    window.setTimeout(() => {
      saveParticipantProfile(normalized);
      setSavedProfile(normalized);
      setFormData(normalized);
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Profil berhasil diperbarui!');
    }, 200);
  };

  const displayData = isEditing ? formData : savedProfile;
  const initials = getInitials(displayData.name || savedProfile.name);

  const sectionTabs: Array<{
    key: ProfileSectionTab;
    label: string;
    icon: typeof LayoutGrid;
    count?: number;
  }> = [
    { key: 'all', label: 'Semua Bagian', icon: LayoutGrid },
    { key: 'basic', label: 'Informasi Dasar', icon: User },
    {
      key: 'education',
      label: 'Pendidikan',
      icon: GraduationCap,
      count: displayData.riwayat_pendidikan.length,
    },
    {
      key: 'work',
      label: 'Pekerjaan',
      icon: Briefcase,
      count: displayData.riwayat_pekerjaan.length,
    },
    {
      key: 'training',
      label: 'Pelatihan',
      icon: BookOpen,
      count: displayData.riwayat_pelatihan.length,
    },
    {
      key: 'certification',
      label: 'Sertifikasi',
      icon: Award,
      count: displayData.riwayat_sertifikasi.length,
    },
    {
      key: 'skills',
      label: 'Keahlian',
      icon: Sparkles,
      count: displayData.daftar_keahlian.length,
    },
  ];

  const showSection = (section: Exclude<ProfileSectionTab, 'all'>) =>
    activeTab === 'all' || activeTab === section;

  return (
    <div className="w-full space-y-5">
      {/* Header Profil & Tombol Khusus Edit */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500" />
        <div className="px-5 sm:px-7 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 min-w-0">
              <div className="relative -mt-12 shrink-0 self-start">
                {displayData.avatarUrl ? (
                  <img
                    src={displayData.avatarUrl}
                    alt={displayData.name || 'Foto profil'}
                    className="w-24 h-24 rounded-full border-4 border-card object-cover bg-muted shadow-xs"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-card flex items-center justify-center text-2xl font-bold bg-primary/10 text-primary shadow-xs">
                    {initials}
                  </div>
                )}

                {isEditing && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleAvatarChange}
                      className="hidden"
                      aria-label="Pilih file foto profil"
                    />
                    <button
                      type="button"
                      aria-label="Ubah foto profil"
                      title="Ubah foto profil"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0.5 right-0.5 p-2 rounded-full bg-primary text-white shadow-md hover:opacity-90 transition-opacity"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    className="text-xl sm:text-2xl font-bold truncate"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {displayData.name}
                  </h1>
                  {isEditing && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Mode Edit
                    </span>
                  )}
                </div>

                <p
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Peserta • {activeSchemeName}
                </p>

                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs pt-0.5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    {displayData.email}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {displayData.nomor_telepon || displayData.phone || '-'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {displayData.domisili || '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {isEditing && formData.avatarUrl && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, avatarUrl: undefined }))
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 border border-red-200 bg-white hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus Foto
                </button>
              )}

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEnterEdit}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  <Pencil className="w-4 h-4" />
                  Edit Profil
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-white hover:bg-muted transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Batal
                  </button>
                  <button
                    type="submit"
                    form="participant-profile-form"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                    }}
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigasi Section Profil */}
      <div
        role="tablist"
        aria-label="Bagian profil peserta"
        className="flex flex-wrap items-center gap-2"
      >
        {sectionTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-slate-600 border-border hover:bg-muted/60 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-muted text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <form
        id="participant-profile-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* 1. Informasi Dasar */}
        {showSection('basic') && (
          <section className="bg-card rounded-2xl border border-border p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2
                    className="text-base font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Informasi Dasar
                  </h2>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Identitas pribadi, kontak utama, dan data domisili peserta.
                  </p>
                </div>
              </div>
            </div>

            {!isEditing ? (
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Nama Lengkap
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5">
                    {displayData.name || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Alamat Email
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5 break-all">
                    {displayData.email || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Nomor Telepon
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5">
                    {displayData.nomor_telepon || displayData.phone || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Jenis Kelamin
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5">
                    {displayData.jenis_kelamin || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Tempat Lahir
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5">
                    {displayData.tempat_lahir || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Tanggal Lahir
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5">
                    {formatBirthDate(displayData.tanggal_lahir)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Domisili
                  </dt>
                  <dd className="text-sm font-semibold text-slate-900 mt-0.5">
                    {displayData.domisili || '-'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Program Pelatihan Aktif
                  </dt>
                  <dd className="text-sm font-semibold text-primary mt-0.5">
                    {activeSchemeName}
                  </dd>
                </div>
              </dl>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      aria-invalid={Boolean(errors.name)}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none ${
                        errors.name ? 'border-red-500' : 'border-border'
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Alamat Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      aria-invalid={Boolean(errors.email)}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-border'
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="profile-nomor-telepon"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-nomor-telepon"
                      name="nomor_telepon"
                      type="tel"
                      required
                      value={formData.nomor_telepon}
                      aria-invalid={Boolean(errors.nomor_telepon)}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          nomor_telepon: e.target.value,
                          phone: e.target.value,
                        });
                        if (errors.nomor_telepon)
                          setErrors((prev) => ({
                            ...prev,
                            nomor_telepon: undefined,
                          }));
                      }}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none ${
                        errors.nomor_telepon ? 'border-red-500' : 'border-border'
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                  {errors.nomor_telepon && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">
                      {errors.nomor_telepon}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="profile-tempat-lahir"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Tempat Lahir
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-tempat-lahir"
                      name="tempat_lahir"
                      type="text"
                      value={formData.tempat_lahir}
                      onChange={(e) =>
                        setFormData({ ...formData, tempat_lahir: e.target.value })
                      }
                      placeholder="Kota kelahiran"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-tanggal-lahir"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-tanggal-lahir"
                      name="tanggal_lahir"
                      type="date"
                      value={formData.tanggal_lahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggal_lahir: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-jenis-kelamin"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Jenis Kelamin
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      id="profile-jenis-kelamin"
                      name="jenis_kelamin"
                      value={formData.jenis_kelamin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          jenis_kelamin: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="profile-domisili"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Domisili
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-domisili"
                      name="domisili"
                      type="text"
                      value={formData.domisili}
                      onChange={(e) =>
                        setFormData({ ...formData, domisili: e.target.value })
                      }
                      placeholder="Contoh: Jakarta Selatan, DKI Jakarta"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none"
                      style={{ color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-scheme"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Program Pelatihan Aktif
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="profile-scheme"
                      name="scheme"
                      type="text"
                      readOnly
                      value={activeSchemeName}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/60 text-sm cursor-not-allowed"
                      style={{ color: 'var(--text-secondary)' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* 2. Riwayat Pendidikan */}
        {showSection('education') && (
          <PendidikanSection
            items={displayData.riwayat_pendidikan}
            editable={isEditing}
            onChange={(riwayat_pendidikan) =>
              setFormData((prev) => ({ ...prev, riwayat_pendidikan }))
            }
          />
        )}

        {/* 3. Riwayat Pekerjaan */}
        {showSection('work') && (
          <PekerjaanSection
            items={displayData.riwayat_pekerjaan}
            editable={isEditing}
            onChange={(riwayat_pekerjaan) =>
              setFormData((prev) => ({ ...prev, riwayat_pekerjaan }))
            }
          />
        )}

        {/* 4. Riwayat Pelatihan */}
        {showSection('training') && (
          <PelatihanSection
            items={displayData.riwayat_pelatihan}
            editable={isEditing}
            onChange={(riwayat_pelatihan) =>
              setFormData((prev) => ({ ...prev, riwayat_pelatihan }))
            }
          />
        )}

        {/* 5. Riwayat Sertifikasi */}
        {showSection('certification') && (
          <SertifikasiSection
            items={displayData.riwayat_sertifikasi}
            editable={isEditing}
            onChange={(riwayat_sertifikasi) =>
              setFormData((prev) => ({ ...prev, riwayat_sertifikasi }))
            }
          />
        )}

        {/* 6. Keahlian */}
        {showSection('skills') && (
          <KeahlianSection
            skills={displayData.daftar_keahlian}
            editable={isEditing}
            onChange={(daftar_keahlian) =>
              setFormData((prev) => ({ ...prev, daftar_keahlian }))
            }
          />
        )}

        {/* Footer Simpan Perubahan (hanya tampil saat Mode Edit aktif) */}
        {isEditing && (
          <div className="bg-card rounded-2xl border border-border p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
              Klik Simpan Perubahan untuk menerapkan pembaruan profil Anda.
            </p>

            <div className="flex flex-wrap items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-border bg-white hover:bg-muted transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <RotateCcw className="w-4 h-4" />
                Batal
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
