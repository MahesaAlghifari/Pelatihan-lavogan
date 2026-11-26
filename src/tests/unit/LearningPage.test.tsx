import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { LearningPage } from "@/features/participant/learning/LearningPage";

describe("LearningPage updated behavior", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("locks video quiz until marked complete, separates task card, has view/download resources, and toggles module list", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <LearningPage />
      </MemoryRouter>
    );

    // Video action bar: no "Kumpulkan Tugas", "Kerjakan Quiz" is locked initially
    expect(
      screen.queryByRole("button", { name: /kumpulkan tugas/i })
    ).not.toBeInTheDocument();
    const quizButton = screen.getByRole("button", { name: /kerjakan quiz/i });
    expect(quizButton).toBeDisabled();

    // Mark video completed -> unlocks quiz button
    await user.click(screen.getByRole("button", { name: /tandai selesai/i }));
    expect(quizButton).toBeEnabled();

    // PDF material also has locked Kerjakan Quiz until marked complete
    await user.click(
      screen.getByRole("button", { name: /html tags reference\.pdf/i })
    );
    const pdfQuizButton = screen.getByRole("button", { name: /kerjakan quiz/i });
    expect(pdfQuizButton).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /tandai selesai/i }));
    expect(pdfQuizButton).toBeEnabled();

    // Resource buttons: View & Unduh exist in Ringkasan tab
    const viewButtons = screen.getAllByRole("button", { name: /^view/i });
    const downloadButtons = screen.getAllByRole("button", { name: /^unduh/i });
    expect(viewButtons.length).toBeGreaterThanOrEqual(2);
    expect(downloadButtons.length).toBeGreaterThanOrEqual(2);

    // Click View -> opens resource preview modal
    await user.click(viewButtons[0]!);
    expect(
      screen.getByRole("button", { name: /tutup pratinjau materi pendukung/i })
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /tutup pratinjau materi pendukung/i })
    );

    // Select Tugas Praktik in Daftar Modul -> renders distinct TaskModuleCard
    await user.click(
      screen.getByRole("button", { name: /tugas praktik: html basics/i })
    );
    expect(screen.getByText(/penugasan praktik modul/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /kumpulkan tugas/i })
    ).toBeInTheDocument();

    // Hide Daftar Modul -> sidebar disappears and button updates
    await user.click(
      screen.getByRole("button", { name: /sembunyikan daftar modul/i })
    );
    expect(screen.queryByText("Daftar Modul")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /tampilkan daftar modul/i })
    ).toBeInTheDocument();
  }, 15000);
});
