import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { useUserStore } from "@/entities/user";

describe("LoginForm validation & authentication flow", () => {
  beforeEach(() => {
    localStorage.clear();
    useUserStore.getState().reset();
  });

  it("shows localized validation messages on empty or invalid submit", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <LoginForm />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /^masuk$/i }));

    expect(await screen.findByText("Email wajib diisi")).toBeInTheDocument();
    expect(screen.getByText("Password wajib diisi")).toBeInTheDocument();

    await user.type(screen.getByLabelText(/email/i), "bukan-email");
    await user.type(screen.getByLabelText(/^password$/i), "123");
    await user.click(screen.getByRole("button", { name: /^masuk$/i }));

    expect(
      await screen.findByText("Format email tidak valid")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Password minimal 6 karakter")
    ).toBeInTheDocument();
  });

  it("logs in Demo Peserta and redirects to /participant/dashboard", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/participant/dashboard"
            element={<div>Participant Home</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /demo peserta/i }));
    await user.click(screen.getByRole("button", { name: /^masuk$/i }));

    await waitFor(() => {
      expect(screen.getByText("Participant Home")).toBeInTheDocument();
    });
    expect(useUserStore.getState().currentUser?.role).toBe("participant");
  });

  it("logs in Demo Admin and redirects to /admin/dashboard", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin/dashboard" element={<div>Admin Home</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /demo admin/i }));
    await user.click(screen.getByRole("button", { name: /^masuk$/i }));

    await waitFor(() => {
      expect(screen.getByText("Admin Home")).toBeInTheDocument();
    });
    expect(useUserStore.getState().currentUser?.role).toBe("admin");
  });
});
