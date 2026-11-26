import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthProvider } from '@/features/auth/provider/AuthProvider';
import { SchemesPage } from '@/features/participant/schemes/SchemesPage';
import {
  ENROLLED_SCHEME_STORAGE_KEY,
  SCHEME_CHANGE_REQUESTS_KEY,
  reviewSchemeChangeRequest,
} from '@/features/participant/schemes/schemeEnrollmentStorage';

function renderSchemesPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <SchemesPage />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('SchemesPage single selection lock & admin change request', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('allows selecting 1 scheme, locks other schemes, and lets participant submit change request to admin', async () => {
    const user = userEvent.setup();
    renderSchemesPage();

    // Initially unselected: can pick 1 program
    expect(
      screen.getByRole('heading', { name: /select 1 training program/i })
    ).toBeInTheDocument();
    const pickButtons = screen.getAllByRole('button', {
      name: /select this program/i,
    });
    expect(pickButtons.length).toBe(2);

    // Pick first available scheme (Full Stack Web Development)
    await user.click(pickButtons[0]!);
    const confirmDialog = screen.getByRole('dialog');
    await user.click(
      within(confirmDialog).getByRole('button', {
        name: /confirm & lock program/i,
      })
    );

    // Locked status banner and card lock appear, persisted in localStorage
    expect(
      screen.getByText(/locked program \(max\. 1 program\)/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /locked \(max 1 program\)/i })
    ).toBeDisabled();
    expect(localStorage.getItem(ENROLLED_SCHEME_STORAGE_KEY)).toContain(
      'full-stack'
    );

    // Open change request modal for the other scheme
    await user.click(
      screen.getByRole('button', { name: /request switch to this program/i })
    );
    const requestDialog = screen.getByRole('dialog');

    // Empty / too-short reason shows validation message
    await user.click(
      within(requestDialog).getByRole('button', {
        name: /submit request to admin/i,
      })
    );
    expect(
      within(requestDialog).getByText(
        /change request reason must be at least 10 characters/i
      )
    ).toBeInTheDocument();

    // Valid reason submits pending request
    await user.type(
      within(requestDialog).getByLabelText(/reason for change request/i),
      'I want to focus on data analysis and machine learning for my internship placement.'
    );
    await user.click(
      within(requestDialog).getByRole('button', {
        name: /submit request to admin/i,
      })
    );

    expect(
      screen.getByText(/pending admin approval: switch to/i)
    ).toBeInTheDocument();
    const storedRequests = JSON.parse(
      localStorage.getItem(SCHEME_CHANGE_REQUESTS_KEY) || '[]'
    );
    expect(storedRequests).toHaveLength(1);
    expect(storedRequests[0].status).toBe('pending');
    expect(storedRequests[0].requestedSchemeId).toBe('data-science');

    // Simulating admin approval updates locked scheme
    act(() => {
      reviewSchemeChangeRequest(storedRequests[0].id, 'approved');
    });
    expect(localStorage.getItem(ENROLLED_SCHEME_STORAGE_KEY)).toContain(
      'data-science'
    );
  }, 15000);
});
