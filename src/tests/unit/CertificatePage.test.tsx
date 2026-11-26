import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { CertificatePage } from "@/features/participant/certificates/CertificatePage";
import {
  PROGRESS_STORAGE_KEY,
  QUIZ_RESULTS_STORAGE_KEY,
} from "@/features/participant/learning/hooks/useLearningProgress";

describe("CertificatePage graduation & claim flow", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows incomplete requirements when materials and quizzes are not finished", () => {
    render(
      <MemoryRouter>
        <CertificatePage />
      </MemoryRouter>
    );

    expect(screen.getByText("0 / 5")).toBeInTheDocument();
    expect(screen.getByText("0 / 2")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /lanjutkan belajar/i })
    ).toBeInTheDocument();
  });

  it("allows claiming a new certificate once all required materials and quizzes are completed", async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify([
        "html-intro-video",
        "html-tags-pdf",
        "html-forms-video",
        "css-fund-video",
        "css-props-pdf",
      ])
    );
    localStorage.setItem(
      QUIZ_RESULTS_STORAGE_KEY,
      JSON.stringify({
        "html-intro-video": {
          quizId: "html-intro-video",
          score: 5,
          total: 5,
          passed: true,
          completedAt: "2026-11-25T09:00:00Z",
        },
        "css-fund-video": {
          quizId: "css-fund-video",
          score: 5,
          total: 5,
          passed: true,
          completedAt: "2026-11-25T09:00:00Z",
        },
      })
    );

    render(
      <MemoryRouter>
        <CertificatePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Memenuhi Syarat")).toBeInTheDocument();
    expect(screen.getByText("5 / 5")).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();

    const claimButton = screen.getByRole("button", {
      name: /klaim sertifikat sekarang/i,
    });
    await user.click(claimButton);

    expect(
      screen.getByText("Pratinjau Sertifikat Pelatihan")
    ).toBeInTheDocument();
    expect(screen.getByText("CERT-FSW-2026-101")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sertifikat sudah diklaim/i })
    ).toBeInTheDocument();
  });
});
