import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { DashboardPage } from "@/features/participant/dashboard/DashboardPage";

describe("LMS DashboardPage updated adjustments", () => {
  it("renders Quiz & Assignment Progress, Certificates Available with View Certificates CTA, Not Started pie chart, focused Continue Learning, and inline due dates", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    // Section 1: KPI Cards
    expect(screen.getByText("Curriculum Progress")).toBeInTheDocument();
    expect(screen.getByText("72%")).toBeInTheDocument();
    expect(screen.getByText("Quiz & Assignment Progress")).toBeInTheDocument();
    expect(screen.queryByText("Learning Achievements")).not.toBeInTheDocument();
    expect(screen.getByText("Quizzes Passed")).toBeInTheDocument();
    expect(screen.getByText("Assignments Submitted")).toBeInTheDocument();
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(
      screen.getByText("Leadership Strategy Certificate")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your program completion certificate")
    ).toBeInTheDocument();
    expect(screen.queryByText(/certificates available/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/certificates earned/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/1 certificate/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /download certificate/i })
    ).toBeInTheDocument();

    // Section 2: Learning Activity (without Weekly Progress) & Module Completion Status
    expect(screen.getByText("Learning Activity")).toBeInTheDocument();
    expect(screen.getByText("Total Learning Time")).toBeInTheDocument();
    expect(screen.getByText("12.5 hours")).toBeInTheDocument();
    expect(screen.getByText("Highlighted Session")).toBeInTheDocument();
    expect(screen.queryByText("Weekly Progress")).not.toBeInTheDocument();

    expect(screen.getByText("Module Completion Status")).toBeInTheDocument();
    expect(screen.queryByText(/view all modules/i)).not.toBeInTheDocument();
    const pieSvg = screen.getByRole("img", {
      name: /module completion status: 5 total modules/i,
    });
    expect(pieSvg).toBeInTheDocument();
    expect(within(pieSvg).getByText("60%")).toBeInTheDocument();
    expect(within(pieSvg).getAllByText("20%")).toHaveLength(2);
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Not Started")).toBeInTheDocument();
    expect(screen.queryByText("Coming Soon")).not.toBeInTheDocument();
    expect(screen.getByText("3 modules")).toBeInTheDocument();
    expect(screen.getAllByText("1 module")).toHaveLength(2);

    // Section 3: Featured Continue Learning (Materi Pendukung & Informasi removed)
    expect(screen.getByText("Continue Learning")).toBeInTheDocument();
    expect(
      screen.getByText("03. Strategic Decision Making.mp4")
    ).toBeInTheDocument();
    expect(
      screen.getAllByText("Module: Leadership Strategy").length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.queryByText(/materi pendukung/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /view pdf/i })
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /previous learning item/i })
    );
    expect(screen.getByText("2 / 3")).toBeInTheDocument();

    // Section 3: Quiz & Assignments two-column layout, CTAs & deadline rows below CTAs
    expect(screen.getByText("Quiz & Assignments")).toBeInTheDocument();
    expect(screen.getByText("Latest Quiz")).toBeInTheDocument();
    expect(screen.getByText("Due in 2 days")).toBeInTheDocument();
    expect(screen.getByText("Aug 28, 2025")).toBeInTheDocument();
    const startQuizBtn = screen.getByRole("button", { name: /start quiz/i });
    expect(startQuizBtn).toBeInTheDocument();

    expect(screen.getByText("Latest Assignment")).toBeInTheDocument();
    expect(screen.getByText("Due in 4 days")).toBeInTheDocument();
    expect(screen.getByText("Aug 30, 2025")).toBeInTheDocument();
    const submitAssignBtn = screen.getByRole("button", {
      name: /submit assignment/i,
    });
    expect(submitAssignBtn).toBeInTheDocument();

    // Deadline row follows CTA button in DOM order
    expect(
      Boolean(
        startQuizBtn.compareDocumentPosition(screen.getByText("Due in 2 days")) &
          Node.DOCUMENT_POSITION_FOLLOWING
      )
    ).toBe(true);
    expect(
      Boolean(
        submitAssignBtn.compareDocumentPosition(
          screen.getByText("Due in 4 days")
        ) & Node.DOCUMENT_POSITION_FOLLOWING
      )
    ).toBe(true);
  });
});
