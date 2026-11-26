import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProfilePage } from '@/features/participant/profile/ProfilePage';
import {
  getInitials,
  PROFILE_STORAGE_KEY,
} from '@/features/participant/profile/profileStorage';

describe('ProfilePage view/edit modes, section tabs & persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('computes proper first+last initials', () => {
    expect(getInitials('Ahmad Sudirman')).toBe('AS');
    expect(getInitials('Budi')).toBe('BU');
    expect(getInitials('')).toBe('P');
  });

  it('starts in read-only view mode with section tabs and requires clicking Edit Profil before editing', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    // Read-only initially: no editable inputs or save button yet
    expect(
      screen.getByRole('button', { name: /edit profil/i })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/nama lengkap/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /simpan perubahan/i })
    ).not.toBeInTheDocument();

    // Section tabs filter cleanly
    await user.click(screen.getByRole('tab', { name: /pendidikan/i }));
    expect(
      screen.getByRole('heading', { name: 'Riwayat Pendidikan' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Informasi Dasar' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /semua bagian/i }));
    expect(
      screen.getByRole('heading', { name: 'Informasi Dasar' })
    ).toBeInTheDocument();
  });

  it('shows inline validation errors when editing with empty name or invalid email', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    await user.click(screen.getByRole('button', { name: /edit profil/i }));

    const nameInput = screen.getByLabelText(/nama lengkap/i);
    const emailInput = screen.getByLabelText(/alamat email/i);
    await user.clear(nameInput);
    await user.clear(emailInput);
    await user.type(emailInput, 'bukan-email');

    const saveButtons = screen.getAllByRole('button', {
      name: /simpan perubahan/i,
    });
    await user.click(saveButtons[0]!);

    expect(screen.getByText('Nama lengkap wajib diisi.')).toBeInTheDocument();
    expect(
      screen.getByText('Format alamat email tidak valid.')
    ).toBeInTheDocument();
  });

  it('persists updated profile fields in localStorage and returns to view mode after saving', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    await user.click(screen.getByRole('button', { name: /edit profil/i }));

    const nameInput = screen.getByLabelText(/nama lengkap/i);
    const domisiliInput = screen.getByLabelText(/domisili/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Siti Nurhaliza');
    await user.clear(domisiliInput);
    await user.type(domisiliInput, 'Surabaya, Jawa Timur');

    const skillInput = screen.getByLabelText(/tambah keahlian baru/i);
    await user.type(skillInput, 'Docker');
    await user.click(screen.getByRole('button', { name: /tambah keahlian/i }));
    expect(screen.getByText('Docker')).toBeInTheDocument();

    const saveButtons = screen.getAllByRole('button', {
      name: /simpan perubahan/i,
    });
    await user.click(saveButtons[0]!);

    await waitFor(() => {
      const saved = JSON.parse(
        localStorage.getItem(PROFILE_STORAGE_KEY) || '{}'
      );
      expect(saved.name).toBe('Siti Nurhaliza');
      expect(saved.domisili).toBe('Surabaya, Jawa Timur');
      expect(saved.daftar_keahlian).toContain('Docker');
      // Returns to view mode after save
      expect(
        screen.getByRole('button', { name: /edit profil/i })
      ).toBeInTheDocument();
    });
  }, 15000);
});
