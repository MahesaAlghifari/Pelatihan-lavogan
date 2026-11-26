import { useMemo, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Camera,
  GraduationCap,
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
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';
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
    return parsed.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return value;
  }
}

function formatGenderLabel(value: string) {
  if (value === 'Laki-laki') return 'Male';
  if (value === 'Perempuan') return 'Female';
  return value || '-';
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
  const [activeTab, setActiveTab] = useState<ProfileSectionTab>('basic');

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
      nextErrors.name = 'Full name is required.';
    } else if (trimmedName.length < 3) {
      nextErrors.name = 'Full name must be at least 3 characters.';
    }

    if (!trimmedEmail) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone) {
      nextErrors.nomor_telepon = 'Phone number is required.';
    } else if (digitsOnly.length < 8) {
      nextErrors.nomor_telepon = 'Phone number must be at least 8 digits.';
    }

    return nextErrors;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Maximum image size is 2 MB.');
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
      setActiveTab('basic');
      toast.error('Please review your profile details.');
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
      toast.success('Profile updated successfully!');
    }, 200);
  };

  const displayData = isEditing ? formData : savedProfile;
  const initials = getInitials(displayData.name || savedProfile.name);

  const sectionTabs: Array<{
    key: ProfileSectionTab;
    label: string;
    icon: typeof User;
    count?: number;
  }> = [
    { key: 'basic', label: 'Basic Information', icon: User },
    {
      key: 'education',
      label: 'Education',
      icon: GraduationCap,
      count: displayData.riwayat_pendidikan.length,
    },
    {
      key: 'work',
      label: 'Work Experience',
      icon: Briefcase,
      count: displayData.riwayat_pekerjaan.length,
    },
    {
      key: 'training',
      label: 'Training',
      icon: BookOpen,
      count: displayData.riwayat_pelatihan.length,
    },
    {
      key: 'certification',
      label: 'Certifications',
      icon: Award,
      count: displayData.riwayat_sertifikasi.length,
    },
    {
      key: 'skills',
      label: 'Skills',
      icon: Sparkles,
      count: displayData.daftar_keahlian.length,
    },
  ];

  return (
    <div className="w-full space-y-5">
      {/* Header Profil & Tombol Khusus Edit */}
      <div className={`${DASHBOARD_TOKENS.card} overflow-hidden`}>
        <div className="h-24 bg-gradient-to-br from-[#156EF5] via-[#2180FA] to-[#4CA3F7] relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/[0.08]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-20 -bottom-10 w-28 h-28 rounded-full bg-white/[0.06]"
          />
        </div>
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 min-w-0">
              <div className="relative -mt-12 shrink-0 self-start">
                {displayData.avatarUrl ? (
                  <img
                    src={displayData.avatarUrl}
                    alt={displayData.name || 'Foto profil'}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover bg-[#F3F6FB] shadow-xs"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold bg-[#EAF3FF] text-[#1677F9] shadow-xs">
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
                      aria-label="Choose profile photo"
                    />
                    <button
                      type="button"
                      aria-label="Change profile photo"
                      title="Change profile photo"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0.5 right-0.5 p-2 rounded-full bg-[#1677F9] hover:bg-[#1262D4] text-white shadow-sm transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className={`${DASHBOARD_TOKENS.pageTitle} truncate`}>
                    {displayData.name}
                  </h1>
                  {isEditing && (
                    <span className={DASHBOARD_TOKENS.badgeWarning}>
                      Edit Mode
                    </span>
                  )}
                </div>

                <p className="text-sm font-normal leading-relaxed text-[#667085]">
                  Participant • {activeSchemeName}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-normal leading-normal text-[#667085] pt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#1677F9]" />
                    {displayData.email}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#1677F9]" />
                    {displayData.nomor_telepon || displayData.phone || '-'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1677F9]" />
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
                  className="h-9 px-3.5 rounded-xl text-xs font-semibold text-[#DC2626] border border-[#FECACA] bg-white hover:bg-[#FEF2F2] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                </button>
              )}

              {!isEditing ? (
                <button
                  type="button"
                  onClick={handleEnterEdit}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={DASHBOARD_TOKENS.btnOutline}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="participant-profile-form"
                    disabled={isSaving}
                    className={DASHBOARD_TOKENS.btnPrimary}
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label="Participant profile categories"
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
              className={`h-9 inline-flex items-center gap-1.5 px-3.5 rounded-xl text-xs tracking-[-0.005em] border transition-colors ${
                isActive
                  ? 'bg-[#1677F9] text-white border-[#1677F9] font-semibold shadow-xs'
                  : 'bg-white text-[#667085] border-[#E7ECF3] font-medium hover:bg-[#F3F6FB] hover:text-[#171C2B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-medium leading-none tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F3F6FB] text-[#667085]'
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
        {/* 1. Basic Information */}
        {activeTab === 'basic' && (
          <section className={`${DASHBOARD_TOKENS.card} p-5 sm:p-6 space-y-5`}>
          <div className="flex items-center justify-between gap-3 border-b border-[#E7ECF3] pb-4">
            <div className="flex items-center gap-3">
              <div className={DASHBOARD_TOKENS.iconBox}>
                <User className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <h2 className={DASHBOARD_TOKENS.sectionHeading}>
                  Basic Information
                </h2>
                <p className={DASHBOARD_TOKENS.description}>
                  Personal identity, primary contact, and residence details.
                </p>
              </div>
            </div>
          </div>

          {!isEditing ? (
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Full Name
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug">
                  {displayData.name || '-'}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Email Address
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug break-all">
                  {displayData.email || '-'}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Phone Number
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug">
                  {displayData.nomor_telepon || displayData.phone || '-'}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Gender
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug">
                  {formatGenderLabel(displayData.jenis_kelamin)}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Place of Birth
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug">
                  {displayData.tempat_lahir || '-'}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Date of Birth
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug">
                  {formatBirthDate(displayData.tanggal_lahir)}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Residence
                </dt>
                <dd className="text-sm font-medium text-[#171C2B] mt-1 leading-snug">
                  {displayData.domisili || '-'}
                </dd>
              </div>
              <div>
                <dt className={DASHBOARD_TOKENS.mutedMetaLabel}>
                  Active Training Program
                </dt>
                <dd className="text-sm font-medium text-[#1677F9] mt-1 leading-snug">
                  {activeSchemeName}
                </dd>
              </div>
            </dl>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="profile-name"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
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
                    className={`${DASHBOARD_TOKENS.inputWithIcon} ${
                      errors.name ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : ''
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
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
                    className={`${DASHBOARD_TOKENS.inputWithIcon} ${
                      errors.email ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : ''
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="profile-nomor-telepon"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
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
                    className={`${DASHBOARD_TOKENS.inputWithIcon} ${
                      errors.nomor_telepon ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20' : ''
                    }`}
                  />
                </div>
                {errors.nomor_telepon && (
                  <p className="mt-1.5 text-xs font-medium text-[#DC2626]">
                    {errors.nomor_telepon}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="profile-tempat-lahir"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Place of Birth
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
                  <input
                    id="profile-tempat-lahir"
                    name="tempat_lahir"
                    type="text"
                    value={formData.tempat_lahir}
                    onChange={(e) =>
                      setFormData({ ...formData, tempat_lahir: e.target.value })
                    }
                    placeholder="City of birth"
                    className={DASHBOARD_TOKENS.inputWithIcon}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-tanggal-lahir"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
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
                    className={DASHBOARD_TOKENS.inputWithIcon}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-jenis-kelamin"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Gender
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
                  <select
                    id="profile-jenis-kelamin"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin === 'Laki-laki' ? 'Male' : formData.jenis_kelamin === 'Perempuan' ? 'Female' : formData.jenis_kelamin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        jenis_kelamin: e.target.value,
                      })
                    }
                    className={DASHBOARD_TOKENS.inputWithIcon}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="profile-domisili"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Residence
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
                  <input
                    id="profile-domisili"
                    name="domisili"
                    type="text"
                    value={formData.domisili}
                    onChange={(e) =>
                      setFormData({ ...formData, domisili: e.target.value })
                    }
                    placeholder="Example: South Jakarta, DKI Jakarta"
                    className={DASHBOARD_TOKENS.inputWithIcon}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-scheme"
                  className={DASHBOARD_TOKENS.fieldLabel}
                >
                  Active Training Program
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
                  <input
                    id="profile-scheme"
                    name="scheme"
                    type="text"
                    readOnly
                    value={activeSchemeName}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E7ECF3] bg-[#F3F6FB] text-sm font-normal text-[#667085] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}
          </section>
        )}

        {/* 2. Riwayat Pendidikan */}
        {activeTab === 'education' && (
          <PendidikanSection
            items={displayData.riwayat_pendidikan}
            editable={isEditing}
            onChange={(riwayat_pendidikan) =>
              setFormData((prev) => ({ ...prev, riwayat_pendidikan }))
            }
          />
        )}

        {/* 3. Riwayat Pekerjaan */}
        {activeTab === 'work' && (
          <PekerjaanSection
            items={displayData.riwayat_pekerjaan}
            editable={isEditing}
            onChange={(riwayat_pekerjaan) =>
              setFormData((prev) => ({ ...prev, riwayat_pekerjaan }))
            }
          />
        )}

        {/* 4. Riwayat Pelatihan */}
        {activeTab === 'training' && (
          <PelatihanSection
            items={displayData.riwayat_pelatihan}
            editable={isEditing}
            onChange={(riwayat_pelatihan) =>
              setFormData((prev) => ({ ...prev, riwayat_pelatihan }))
            }
          />
        )}

        {/* 5. Riwayat Sertifikasi */}
        {activeTab === 'certification' && (
          <SertifikasiSection
            items={displayData.riwayat_sertifikasi}
            editable={isEditing}
            onChange={(riwayat_sertifikasi) =>
              setFormData((prev) => ({ ...prev, riwayat_sertifikasi }))
            }
          />
        )}

        {/* 6. Keahlian */}
        {activeTab === 'skills' && (
          <KeahlianSection
            skills={displayData.daftar_keahlian}
            editable={isEditing}
            onChange={(daftar_keahlian) =>
              setFormData((prev) => ({ ...prev, daftar_keahlian }))
            }
          />
        )}

        {/* Save Changes Footer (only visible in Edit Mode) */}
        {isEditing && (
          <div className={`${DASHBOARD_TOKENS.card} p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3`}>
            <p className={DASHBOARD_TOKENS.description}>
              Click Save Changes to apply your profile updates.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 ml-auto">
              <button
                type="button"
                onClick={handleCancelEdit}
                className={DASHBOARD_TOKENS.btnOutline}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className={DASHBOARD_TOKENS.btnPrimary}
              >
                <Save className="w-3.5 h-3.5" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
