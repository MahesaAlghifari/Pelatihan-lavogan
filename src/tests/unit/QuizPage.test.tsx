import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { QuizPage } from '@/features/participant/learning/QuizPage';
import { QUIZ_RESULTS_STORAGE_KEY } from '@/features/participant/learning/hooks/useLearningProgress';

function renderQuizAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/participant/quiz/:id" element={<QuizPage />} />
        <Route path="/participant/learning" element={<div>Learning Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('QuizPage bug fixes and UX behavior', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows not found state when quiz id does not exist', () => {
    renderQuizAt('/participant/quiz/quiz-tidak-ada');
    expect(screen.getByText(/quiz not found/i)).toBeInTheDocument();
  });

  it('uses inline validation instead of alert, grades with review, allows retry, and bounds container width', async () => {
    const user = userEvent.setup();
    const { container } = renderQuizAt('/participant/quiz/css-props-pdf');

    // Container uses bounded max-w-3xl (not full-width fill)
    expect(container.firstElementChild?.className).toContain('max-w-3xl');

    // Jump to last question (#3) without answering #1 and #2 -> submit triggers inline alert & jumps to #1
    await user.click(screen.getByRole('button', { name: /question 3/i }));
    await user.click(screen.getByRole('button', { name: /submit quiz/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(
      /there are still 3 unanswered questions/i
    );
    expect(screen.getByText(/question 1 of 3/i)).toBeInTheDocument();

    // Answer all 3 questions cleanly (correct answers for css-props-pdf: index 1, 2, 2)
    await user.click(screen.getByRole('radio', { name: /padding/i }));
    await user.click(screen.getByRole('button', { name: /^next$/i }));
    await user.click(screen.getByRole('radio', { name: /^flex$/i }));
    await user.click(screen.getByRole('button', { name: /^next$/i }));
    await user.click(screen.getByRole('radio', { name: /border-radius/i }));

    await user.click(screen.getByRole('button', { name: /submit quiz/i }));

    // Result screen shows pass score, review, retry button, and saved localStorage result
    expect(screen.getByText(/congratulations, you passed!/i)).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByText(/answer summary/i)).toBeInTheDocument();

    const stored = JSON.parse(
      localStorage.getItem(QUIZ_RESULTS_STORAGE_KEY) || '{}'
    );
    expect(stored['css-props-pdf']?.passed).toBe(true);
    expect(stored['css-props-pdf']?.score).toBe(3);

    // Retry quiz resets to question 1
    await user.click(screen.getByRole('button', { name: /retake quiz/i }));
    expect(screen.getByText(/question 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/answered 0 of 3 questions/i)).toBeInTheDocument();
  });
});
