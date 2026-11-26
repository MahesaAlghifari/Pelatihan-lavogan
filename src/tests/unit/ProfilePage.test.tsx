import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProfilePage } from '@/features/participant/profile/ProfilePage';
import {
  getInitials,
  PROFILE_STORAGE_KEY,
} from '@/features/participant/profile/profileStorage';

describe('ProfilePage view/edit modes, category tabs & persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('computes proper first+last initials', () => {
    expect(getInitials('Ahmad Sudirman')).toBe('AS');
    expect(getInitials('Budi')).toBe('BU');
    expect(getInitials('')).toBe('P');
  });

  it('starts in read-only view mode on Basic Information with category tabs and without an All tab', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    // Category tabs exist, but an "All" tab does not
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(
      screen.queryByRole('tab', { name: /semua bagian|all/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: /basic information/i })
    ).toHaveAttribute('aria-selected', 'true');

    // Read-only initially: no editable inputs or save button yet
    expect(
      screen.getByRole('button', { name: /edit profile/i })
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/full name/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /save changes/i })
    ).not.toBeInTheDocument();

    // Switching category tabs filters cleanly
    expect(
      screen.getByRole('heading', { name: 'Basic Information' })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /education/i }));
    expect(
      screen.getByRole('heading', { name: 'Education History' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Basic Information' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('tab', { name: /skills/i }));
    expect(
      screen.getByRole('heading', { name: 'Skills' })
    ).toBeInTheDocument();
  });

  it('shows inline validation errors when editing with empty name or invalid email', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    await user.click(screen.getByRole('button', { name: /edit profile/i }));

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    await user.clear(nameInput);
    await user.clear(emailInput);
    await user.type(emailInput, 'not-an-email');

    const saveButtons = screen.getAllByRole('button', {
      name: /save changes/i,
    });
    await user.click(saveButtons[0]!);

    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter a valid email address.')
    ).toBeInTheDocument();
  });

  it('persists updated profile fields in localStorage and returns to view mode after saving', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    await user.click(screen.getByRole('button', { name: /edit profile/i }));

    const nameInput = screen.getByLabelText(/full name/i);
    const domisiliInput = screen.getByLabelText(/residence/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Siti Nurhaliza');
    await user.clear(domisiliInput);
    await user.type(domisiliInput, 'Surabaya, East Java');

    await user.click(screen.getByRole('tab', { name: /skills/i }));
    const skillInput = screen.getByLabelText(/add new skill/i);
    await user.type(skillInput, 'Docker');
    await user.click(screen.getByRole('button', { name: /add skill/i }));
    expect(screen.getByText('Docker')).toBeInTheDocument();

    const saveButtons = screen.getAllByRole('button', {
      name: /save changes/i,
    });
    await user.click(saveButtons[0]!);

    await waitFor(() => {
      const saved = JSON.parse(
        localStorage.getItem(PROFILE_STORAGE_KEY) || '{}'
      );
      expect(saved.name).toBe('Siti Nurhaliza');
      expect(saved.domisili).toBe('Surabaya, East Java');
      expect(saved.daftar_keahlian).toContain('Docker');
      // Returns to view mode after save
      expect(
        screen.getByRole('button', { name: /edit profile/i })
      ).toBeInTheDocument();
    });
  }, 15000);
});
