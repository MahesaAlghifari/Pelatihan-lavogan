import { useEffect, useState } from 'react';
import { participants } from '@/data/datadummy';

export const PROFILE_STORAGE_KEY = 'lavogan_participant_profile';
export const PROFILE_UPDATED_EVENT = 'lavogan:profile-updated';

export interface PendidikanItem {
  id: string;
  nama_institusi: string;
  jenjang: string;
  jurusan: string;
  periode_tahun: string;
  nilai_akhir: string;
  lokasi_institusi: string;
}

export interface PekerjaanItem {
  id: string;
  posisi: string;
  nama_perusahaan: string;
  periode_kerja: string;
  tipe_pekerjaan: string;
  lokasi_kerja: string;
  deskripsi_pekerjaan: string;
}

export interface PelatihanItem {
  id: string;
  nama_pelatihan: string;
  penyelenggara: string;
  periode_pelatihan: string;
  kategori_bidang: string;
  lokasi_pelatihan: string;
  deskripsi_pelatihan: string;
}

export interface SertifikasiItem {
  id: string;
  nama_sertifikasi: string;
  lembaga_penerbit: string;
  masa_berlaku: string;
  lampiran_dokumen: string;
}

export interface ParticipantProfile {
  // Identitas tampilan akun & sinkronisasi shell
  name: string;
  email: string;
  phone: string;
  scheme: string;
  avatarUrl?: string;

  // 1. Informasi Dasar
  nomor_telepon: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  domisili: string;

  // 2. Riwayat Pendidikan (Array)
  riwayat_pendidikan: PendidikanItem[];

  // 3. Riwayat Pekerjaan (Array)
  riwayat_pekerjaan: PekerjaanItem[];

  // 4. Riwayat Pelatihan (Array)
  riwayat_pelatihan: PelatihanItem[];

  // 5. Riwayat Sertifikasi (Array)
  riwayat_sertifikasi: SertifikasiItem[];

  // 6. Keahlian (Array)
  daftar_keahlian: string[];
}

export function getDefaultParticipantProfile(): ParticipantProfile {
  const first = participants[0];
  const defaultPhone = first?.phone ?? '+62 812-3456-7890';
  return {
    name: first?.name ?? 'Ahmad Sudirman',
    email: first?.email ?? 'ahmad.sudirman@email.com',
    phone: defaultPhone,
    scheme: first?.scheme ?? 'Full Stack Web Development',

    nomor_telepon: defaultPhone,
    tempat_lahir: 'Bandung',
    tanggal_lahir: '2001-05-14',
    jenis_kelamin: 'Laki-laki',
    domisili: 'Jakarta Selatan, DKI Jakarta',

    riwayat_pendidikan: [
      {
        id: 'edu-1',
        nama_institusi: 'Institut Teknologi Bandung',
        jenjang: 'S1',
        jurusan: 'Teknik Informatika',
        periode_tahun: '2019 - 2023',
        nilai_akhir: 'IPK 3.78 / 4.00',
        lokasi_institusi: 'Bandung, Jawa Barat',
      },
    ],

    riwayat_pekerjaan: [
      {
        id: 'work-1',
        posisi: 'Frontend Developer Intern',
        nama_perusahaan: 'PT Inovasi Digital Nusantara',
        periode_kerja: 'Jan 2025 - Jun 2025',
        tipe_pekerjaan: 'Magang',
        lokasi_kerja: 'Jakarta Selatan',
        deskripsi_pekerjaan:
          'Mengembangkan antarmuka dashboard berbasis React dan TypeScript serta melakukan integrasi REST API dengan tim backend.',
      },
    ],

    riwayat_pelatihan: [
      {
        id: 'train-1',
        nama_pelatihan: 'Bootcamp Full Stack Web Development',
        penyelenggara: 'MagangHub Academy',
        periode_pelatihan: 'Agu 2025 - Nov 2025',
        kategori_bidang: 'Web Development',
        lokasi_pelatihan: 'Daring (Online)',
        deskripsi_pelatihan:
          'Pelatihan intensif HTML5, CSS3, JavaScript modern, React, Node.js, dan deployment aplikasi web.',
      },
    ],

    riwayat_sertifikasi: [
      {
        id: 'cert-1',
        nama_sertifikasi: 'Junior Web Developer',
        lembaga_penerbit: 'BNSP / LSP Teknologi Digital',
        masa_berlaku: 'Okt 2025 - Okt 2028',
        lampiran_dokumen: 'sertifikat-jwd-ahmad-sudirman.pdf',
      },
    ],

    daftar_keahlian: [
      'HTML5 & CSS3',
      'JavaScript / TypeScript',
      'React & Tailwind CSS',
      'Node.js',
      'Git & GitHub',
    ],
  };
}

function normalizeStringArray(input: unknown, fallback: string[]): string[] {
  if (!Array.isArray(input)) return fallback;
  return input
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);
}

function normalizeItems<T extends { id?: string }>(
  input: unknown,
  fallback: T[],
  mapItem: (raw: Record<string, unknown>, idx: number) => T
): T[] {
  if (!Array.isArray(input)) return fallback;
  return input
    .filter((x): x is Record<string, unknown> => Boolean(x && typeof x === 'object'))
    .map(mapItem);
}

export function readParticipantProfile(): ParticipantProfile {
  const fallback = getDefaultParticipantProfile();
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ParticipantProfile>;
    const resolvedPhone =
      parsed.nomor_telepon?.trim() ||
      parsed.phone?.trim() ||
      fallback.nomor_telepon;

    return {
      name: parsed.name?.trim() || fallback.name,
      email: parsed.email?.trim() || fallback.email,
      phone: resolvedPhone,
      scheme: parsed.scheme?.trim() || fallback.scheme,
      avatarUrl: parsed.avatarUrl,

      nomor_telepon: resolvedPhone,
      tempat_lahir:
        typeof parsed.tempat_lahir === 'string'
          ? parsed.tempat_lahir
          : fallback.tempat_lahir,
      tanggal_lahir:
        typeof parsed.tanggal_lahir === 'string'
          ? parsed.tanggal_lahir
          : fallback.tanggal_lahir,
      jenis_kelamin:
        typeof parsed.jenis_kelamin === 'string'
          ? parsed.jenis_kelamin
          : fallback.jenis_kelamin,
      domisili:
        typeof parsed.domisili === 'string'
          ? parsed.domisili
          : fallback.domisili,

      riwayat_pendidikan: normalizeItems(
        parsed.riwayat_pendidikan,
        fallback.riwayat_pendidikan,
        (r, i) => ({
          id: String(r.id || `edu-${i}`),
          nama_institusi: String(r.nama_institusi ?? ''),
          jenjang: String(r.jenjang ?? ''),
          jurusan: String(r.jurusan ?? ''),
          periode_tahun: String(r.periode_tahun ?? ''),
          nilai_akhir: String(r.nilai_akhir ?? ''),
          lokasi_institusi: String(r.lokasi_institusi ?? ''),
        })
      ),

      riwayat_pekerjaan: normalizeItems(
        parsed.riwayat_pekerjaan,
        fallback.riwayat_pekerjaan,
        (r, i) => ({
          id: String(r.id || `work-${i}`),
          posisi: String(r.posisi ?? ''),
          nama_perusahaan: String(r.nama_perusahaan ?? ''),
          periode_kerja: String(r.periode_kerja ?? ''),
          tipe_pekerjaan: String(r.tipe_pekerjaan ?? ''),
          lokasi_kerja: String(r.lokasi_kerja ?? ''),
          deskripsi_pekerjaan: String(r.deskripsi_pekerjaan ?? ''),
        })
      ),

      riwayat_pelatihan: normalizeItems(
        parsed.riwayat_pelatihan,
        fallback.riwayat_pelatihan,
        (r, i) => ({
          id: String(r.id || `train-${i}`),
          nama_pelatihan: String(r.nama_pelatihan ?? ''),
          penyelenggara: String(r.penyelenggara ?? ''),
          periode_pelatihan: String(r.periode_pelatihan ?? ''),
          kategori_bidang: String(r.kategori_bidang ?? ''),
          lokasi_pelatihan: String(r.lokasi_pelatihan ?? ''),
          deskripsi_pelatihan: String(r.deskripsi_pelatihan ?? ''),
        })
      ),

      riwayat_sertifikasi: normalizeItems(
        parsed.riwayat_sertifikasi,
        fallback.riwayat_sertifikasi,
        (r, i) => ({
          id: String(r.id || `cert-${i}`),
          nama_sertifikasi: String(r.nama_sertifikasi ?? ''),
          lembaga_penerbit: String(r.lembaga_penerbit ?? ''),
          masa_berlaku: String(r.masa_berlaku ?? ''),
          lampiran_dokumen: String(r.lampiran_dokumen ?? ''),
        })
      ),

      daftar_keahlian: normalizeStringArray(
        parsed.daftar_keahlian,
        fallback.daftar_keahlian
      ),
    };
  } catch {
    return fallback;
  }
}

export function saveParticipantProfile(profile: ParticipantProfile): void {
  const syncedPhone = profile.nomor_telepon?.trim() || profile.phone?.trim() || '';
  const payload: ParticipantProfile = {
    ...profile,
    phone: syncedPhone,
    nomor_telepon: syncedPhone,
  };
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: payload }));
  } catch {
    // ignore storage errors
  }
}

export function getInitials(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'P';
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return `${words[0]![0] ?? ''}${words[words.length - 1]![0] ?? ''}`.toUpperCase();
}

export function useParticipantProfile(): ParticipantProfile {
  const [profile, setProfile] = useState<ParticipantProfile>(() =>
    readParticipantProfile()
  );

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(readParticipantProfile());
    };
    window.addEventListener(PROFILE_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return profile;
}
