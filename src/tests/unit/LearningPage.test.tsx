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

    // Video action bar: no "Submit Assignment", "Take Quiz" is locked initially
    expect(
      screen.queryByRole("button", { name: /submit assignment/i })
    ).not.toBeInTheDocument();
    const quizButton = screen.getByRole("button", { name: /take quiz/i });
    expect(quizButton).toBeDisabled();

    // Mark video completed -> unlocks quiz button
    await user.click(screen.getByRole("button", { name: /mark as completed/i }));
    expect(quizButton).toBeEnabled();

    // PDF material also has locked Take Quiz until marked complete
    await user.click(
      screen.getByRole("button", { name: /html tags reference\.pdf/i })
    );
    const pdfQuizButton = screen.getByRole("button", { name: /take quiz/i });
    expect(pdfQuizButton).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /mark as completed/i }));
    expect(pdfQuizButton).toBeEnabled();

    // Resource buttons: View & Download exist in Summary tab
    const viewButtons = screen.getAllByRole("button", { name: /^view/i });
    const downloadButtons = screen.getAllByRole("button", { name: /^download/i });
    expect(viewButtons.length).toBeGreaterThanOrEqual(2);
    expect(downloadButtons.length).toBeGreaterThanOrEqual(2);

    // Click View -> opens resource preview modal
    await user.click(viewButtons[0]!);
    expect(
      screen.getByRole("button", { name: /close supporting material preview/i })
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /close supporting material preview/i })
    );

    // Select Practical Assignment in Module List -> renders distinct TaskModuleCard
    await user.click(
      screen.getByRole("button", { name: /practical assignment: html basics/i })
    );
    expect(screen.getByText(/module practical assignment/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /submit assignment/i })
    ).toBeInTheDocument();

    // Hide Module List -> sidebar disappears and button updates
    await user.click(
      screen.getByRole("button", { name: /hide module list/i })
    );
    expect(screen.queryByText("Module List")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show module list/i })
    ).toBeInTheDocument();
  }, 15000);
});
