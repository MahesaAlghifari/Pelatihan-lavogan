import { useState } from 'react';
import { Plus, Eye, Edit, Trash2, AlertCircle, X } from 'lucide-react';
import { HierarchySelector } from '@/shared/components/common';
import { QuestionBuilder } from './QuestionBuilder';
import { learningPathModules, moduleMaterials, quizzes } from '@/data/datadummy';

export function AdminQuizPage() {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const learningPaths = [
    { id: 'html-css', name: 'HTML & CSS Fundamentals' },
    { id: 'javascript', name: 'JavaScript Basics' },
    { id: 'react', name: 'React Framework' },
  ];

  const currentModules = selectedPath ? learningPathModules[selectedPath] || [] : [];
  const currentMaterials = selectedModule ? moduleMaterials[selectedModule] || [] : [];
  const currentQuiz = selectedMaterial ? quizzes[selectedMaterial] : null;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Management Quiz</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Pilih Learning Path, Modul, dan Materi untuk mengelola quiz</p>
        </div>
        <button
          onClick={() => setShowQuestionModal(true)}
          disabled={!selectedMaterial}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Plus className="w-5 h-5" /> Tambah Soal
        </button>
      </div>

      <HierarchySelector
        levels={[
          {
            label: 'Learning Path',
            options: learningPaths,
            selected: selectedPath,
            onSelect: (id) => { setSelectedPath(id); setSelectedModule(''); setSelectedMaterial(''); },
          },
          {
            label: 'Modul',
            options: currentModules,
            selected: selectedModule,
            onSelect: (id) => { setSelectedModule(id); setSelectedMaterial(''); },
          },
          {
            label: 'Materi',
            options: currentMaterials.map(m => ({ ...m, count: quizzes[m.id] ? quizzes[m.id].questions.length : 0 })),
            selected: selectedMaterial,
            onSelect: setSelectedMaterial,
          },
        ]}
      />

      {/* Empty States */}
      {!selectedPath && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Learning Path</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Silakan pilih Learning Path terlebih dahulu</p>
        </div>
      )}

      {selectedPath && !selectedModule && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Modul</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Silakan pilih Modul untuk melihat materi-materinya</p>
        </div>
      )}

      {selectedPath && selectedModule && !selectedMaterial && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Materi</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {currentMaterials.length > 0 ? 'Silakan pilih Materi untuk melihat dan mengelola quiz-nya' : 'Modul ini belum memiliki materi. Upload materi terlebih dahulu.'}
          </p>
        </div>
      )}

      {/* Quiz Content */}
      {selectedPath && selectedModule && selectedMaterial && currentQuiz && (
        <div className="space-y-4">
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{currentQuiz.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{currentQuiz.questions.length} soal pilihan ganda</p>
              </div>
              <button className="px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Eye className="w-4 h-4" /> Preview Quiz
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {currentQuiz.questions.map((q: any, index: number) => (
              <div key={q.id} className="bg-card p-6 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold flex-shrink-0" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((option: string, optionIndex: number) => (
                        <div key={optionIndex} className={`p-3 rounded-xl border ${optionIndex === q.correctAnswer ? 'border-success' : 'border-border'}`} style={optionIndex === q.correctAnswer ? { backgroundColor: 'var(--success-light)' } : {}}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{String.fromCharCode(65 + optionIndex)}.</span>
                            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{option}</span>
                            {optionIndex === q.correctAnswer && <span className="ml-auto text-xs font-medium px-2 py-1 rounded" style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>Benar</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}><Edit className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg hover:bg-error-light" style={{ color: 'var(--error)' }}><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPath && selectedModule && selectedMaterial && !currentQuiz && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Quiz Belum Dibuat</h3>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Materi belum memiliki quiz. Tambahkan 5 soal pilihan ganda.</p>
          <button onClick={() => setShowQuestionModal(true)} className="px-6 py-3 rounded-xl font-medium transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            Buat Quiz
          </button>
        </div>
      )}

      {/* Builder Modal mengimpor QuestionBuilder */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Tambah Soal Baru</h2>
              <button onClick={() => setShowQuestionModal(false)} className="p-2 rounded-lg hover:bg-muted transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {/* QuestionBuilder dipanggil di sini */}
              <QuestionBuilder onSuccess={() => setShowQuestionModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}