import { useState } from 'react';
import { saveQuizQuestion } from '../services/adminService';

interface QuestionBuilderProps {
  onSuccess: () => void;
}

export function QuestionBuilder({ onSuccess }: QuestionBuilderProps) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question || options.some(opt => !opt)) return;
    await saveQuizQuestion({ question, options, correctAnswer });
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Pertanyaan</label>
        <textarea rows={3} value={question} onChange={e => setQuestion(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input-border resize-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' }} />
      </div>

      <div>
        <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Pilihan Jawaban</label>
        <div className="space-y-3">
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-3">
              <input type="radio" name="correct" checked={correctAnswer === index} onChange={() => setCorrectAnswer(index)} className="w-5 h-5 accent-[var(--primary)]" />
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{String.fromCharCode(65 + index)}.</span>
              <input type="text" value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-input-border" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' }} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSubmit} className="px-6 py-3 rounded-xl font-medium w-full transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
        Simpan Soal
      </button>
    </div>
  );
}