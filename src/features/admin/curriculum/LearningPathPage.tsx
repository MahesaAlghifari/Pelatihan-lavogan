import { useState } from 'react';
import { Plus, AlertCircle, X } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { HierarchySelector } from '@/shared/components/common';
import { PathManager, PathItem } from './components/PathManager';

export function LearningPathPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState('');

  const [paths, setPaths] = useState<{ [key: string]: PathItem[] }>({
    'full-stack': [
      { id: 1, title: 'Pengenalan Web Development', modules: 2, order: 1 },
      { id: 2, title: 'HTML & CSS Fundamentals', modules: 3, order: 2 },
      { id: 3, title: 'JavaScript Basics', modules: 2, order: 3 },
      { id: 4, title: 'React Framework', modules: 3, order: 4 },
      { id: 5, title: 'Backend Development', modules: 2, order: 5 },
    ],
    'data-science': [
      { id: 6, title: 'Introduction to Data Science', modules: 2, order: 1 },
      { id: 7, title: 'Python Programming', modules: 3, order: 2 },
      { id: 8, title: 'Data Analysis with Pandas', modules: 3, order: 3 },
      { id: 9, title: 'Machine Learning Basics', modules: 4, order: 4 },
    ],
  });

  const moveItem = (fromIndex: number, toIndex: number) => {
    const items = [...(paths[selectedScheme] ?? [])];
    const [movedItem] = items.splice(fromIndex, 1);
    if (!movedItem) return;
    items.splice(toIndex, 0, movedItem);
    setPaths({ ...paths, [selectedScheme]: items });
  };

  const schemes = [
    { id: 'full-stack', name: 'Full Stack Web Development', paths: 5 },
    { id: 'data-science', name: 'Data Science & ML', paths: 4 },
    { id: 'mobile', name: 'Mobile App Development', paths: 0 },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Learning Path Management</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Pilih pelatihan dan kelola urutan learning path dengan drag & drop</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={!selectedScheme}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            <Plus className="w-5 h-5" /> Tambah Learning Path
          </button>
        </div>

        {/* Hierarchy Selector */}
        <HierarchySelector
          levels={[
            {
              label: 'Pilih Pelatihan',
              options: schemes.map(scheme => ({
                ...scheme,
                count: paths[scheme.id]?.length || 0,
              })),
              selected: selectedScheme,
              onSelect: setSelectedScheme,
            },
          ]}
        />

        {/* Empty State */}
        {!selectedScheme && (
          <div className="bg-card p-12 rounded-xl border border-border text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
            <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Pelatihan</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Silakan pilih pelatihan terlebih dahulu untuk melihat dan mengelola learning path-nya</p>
          </div>
        )}

        {/* Learning Paths */}
        {selectedScheme && (
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="mb-4">
              <h3 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                {schemes.find(s => s.id === selectedScheme)?.name}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {paths[selectedScheme]?.length || 0} Learning Paths
              </p>
            </div>

            <div className="space-y-3">
              {paths[selectedScheme]?.map((item, index) => (
                <PathManager
                  key={item.id}
                  item={item}
                  index={index}
                  moveItem={moveItem}
                />
              ))}

              {(!paths[selectedScheme] || paths[selectedScheme].length === 0) && (
                <div className="text-center py-12">
                  <p style={{ color: 'var(--text-secondary)' }}>Belum ada learning path</p>
                  <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 px-6 py-2 rounded-xl font-medium transition-colors"
                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                  >
                    Tambah Learning Path
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
            <div className="bg-card rounded-xl border border-border max-w-2xl w-full">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Tambah Learning Path Baru</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Pelatihan</label>
                  <input
                    type="text"
                    value={schemes.find(s => s.id === selectedScheme)?.name || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-input-border"
                    style={{ backgroundColor: 'var(--muted)', color: 'var(--text-secondary)' }}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Learning Path</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama learning path..."
                    className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Jumlah Modul</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2"
                    style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)', '--tw-ring-color': 'var(--ring)' } as React.CSSProperties}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-border flex gap-3 justify-end">
                <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Batal
                </button>
                <button className="px-6 py-3 rounded-xl font-medium transition-colors" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                  Simpan Learning Path
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}