import { useEffect, useState } from 'react';
import { schemes } from '@/data/datadummy';

export const ENROLLED_SCHEME_STORAGE_KEY = 'maganghub_selected_scheme_v1';
export const SCHEME_CHANGE_REQUESTS_KEY = 'maganghub_scheme_change_requests_v1';
export const SCHEME_ENROLLMENT_EVENT = 'maganghub:scheme-enrollment-updated';

export interface SchemeEnrollment {
  schemeId: string;
  lockedAt: string;
}

export interface SchemeChangeRequest {
  id: string;
  participantName: string;
  participantEmail: string;
  currentSchemeId: string;
  currentSchemeName: string;
  requestedSchemeId: string;
  requestedSchemeName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  adminNote?: string;
}

function emitUpdate() {
  window.dispatchEvent(new CustomEvent(SCHEME_ENROLLMENT_EVENT));
}

export function getEnrolledScheme(): SchemeEnrollment | null {
  try {
    const raw = localStorage.getItem(ENROLLED_SCHEME_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SchemeEnrollment>;
    if (typeof parsed.schemeId === 'string' && parsed.schemeId) {
      return {
        schemeId: parsed.schemeId,
        lockedAt: parsed.lockedAt || new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function getSchemeChangeRequests(): SchemeChangeRequest[] {
  try {
    const raw = localStorage.getItem(SCHEME_CHANGE_REQUESTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SchemeChangeRequest[]) : [];
  } catch {
    return [];
  }
}

export function selectAndLockScheme(
  schemeId: string
): { ok: true; enrollment: SchemeEnrollment } | { ok: false; error: string } {
  const existing = getEnrolledScheme();
  if (existing) {
    return {
      ok: false,
      error:
        'Anda sudah memilih 1 program dan pilihan terkunci. Ajukan perubahan ke Admin untuk mengganti program.',
    };
  }

  const target = schemes.find((s) => s.id === schemeId);
  if (!target || !target.available) {
    return {
      ok: false,
      error: 'Program pelatihan yang dipilih tidak tersedia.',
    };
  }

  const enrollment: SchemeEnrollment = {
    schemeId,
    lockedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(ENROLLED_SCHEME_STORAGE_KEY, JSON.stringify(enrollment));
  } catch {
    // ignore storage quota errors
  }
  emitUpdate();
  return { ok: true, enrollment };
}

export function submitSchemeChangeRequest(params: {
  requestedSchemeId: string;
  reason: string;
  participantName: string;
  participantEmail: string;
}): { ok: true; request: SchemeChangeRequest } | { ok: false; error: string } {
  const enrollment = getEnrolledScheme();
  if (!enrollment) {
    return {
      ok: false,
      error: 'Pilih 1 program terlebih dahulu sebelum mengajukan perubahan.',
    };
  }

  if (params.requestedSchemeId === enrollment.schemeId) {
    return {
      ok: false,
      error: 'Program tujuan harus berbeda dengan program yang sedang diikuti.',
    };
  }

  const existingRequests = getSchemeChangeRequests();
  if (existingRequests.some((r) => r.status === 'pending')) {
    return {
      ok: false,
      error:
        'Masih ada pengajuan perubahan program yang menunggu persetujuan Admin.',
    };
  }

  const trimmedReason = params.reason.trim();
  if (trimmedReason.length < 10) {
    return {
      ok: false,
      error: 'Alasan pengajuan perubahan minimal 10 karakter.',
    };
  }

  const currentScheme = schemes.find((s) => s.id === enrollment.schemeId);
  const requestedScheme = schemes.find((s) => s.id === params.requestedSchemeId);

  if (!requestedScheme || !requestedScheme.available) {
    return {
      ok: false,
      error: 'Program tujuan tidak tersedia untuk dipilih.',
    };
  }

  const request: SchemeChangeRequest = {
    id: `req-${Date.now()}`,
    participantName: params.participantName || 'Peserta Magang',
    participantEmail: params.participantEmail || 'peserta@maganghub.id',
    currentSchemeId: enrollment.schemeId,
    currentSchemeName: currentScheme?.name ?? enrollment.schemeId,
    requestedSchemeId: requestedScheme.id,
    requestedSchemeName: requestedScheme.name,
    reason: trimmedReason,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(
      SCHEME_CHANGE_REQUESTS_KEY,
      JSON.stringify([request, ...existingRequests])
    );
  } catch {
    // ignore storage errors
  }
  emitUpdate();
  return { ok: true, request };
}

export function reviewSchemeChangeRequest(
  requestId: string,
  decision: 'approved' | 'rejected',
  adminNote?: string
) {
  const requests = getSchemeChangeRequests();
  const target = requests.find((r) => r.id === requestId);
  if (!target || target.status !== 'pending') return;

  const updatedRequests: SchemeChangeRequest[] = requests.map((r) =>
    r.id === requestId
      ? {
          ...r,
          status: decision,
          reviewedAt: new Date().toISOString(),
          adminNote: adminNote?.trim() || undefined,
        }
      : r
  );

  try {
    localStorage.setItem(
      SCHEME_CHANGE_REQUESTS_KEY,
      JSON.stringify(updatedRequests)
    );

    if (decision === 'approved') {
      const nextEnrollment: SchemeEnrollment = {
        schemeId: target.requestedSchemeId,
        lockedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        ENROLLED_SCHEME_STORAGE_KEY,
        JSON.stringify(nextEnrollment)
      );
    }
  } catch {
    // ignore storage errors
  }
  emitUpdate();
}

export function useSchemeEnrollment() {
  const [enrollment, setEnrollment] = useState<SchemeEnrollment | null>(() =>
    getEnrolledScheme()
  );
  const [requests, setRequests] = useState<SchemeChangeRequest[]>(() =>
    getSchemeChangeRequests()
  );

  useEffect(() => {
    const sync = () => {
      setEnrollment(getEnrolledScheme());
      setRequests(getSchemeChangeRequests());
    };
    window.addEventListener(SCHEME_ENROLLMENT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SCHEME_ENROLLMENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const pendingRequest = requests.find((r) => r.status === 'pending') ?? null;
  const latestRequest = requests[0] ?? null;

  return {
    enrollment,
    requests,
    pendingRequest,
    latestRequest,
    selectScheme: selectAndLockScheme,
    submitChangeRequest: submitSchemeChangeRequest,
    reviewChangeRequest: reviewSchemeChangeRequest,
  };
}
