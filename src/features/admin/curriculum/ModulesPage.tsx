import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, CheckCircle, Circle, X, AlertCircle } from 'lucide-react';
import { HierarchySelector } from '@/shared/components/common';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: string;
  hasQuiz: boolean;
  order: number;
}

export function ModulesPage() {
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedPath, setSelectedPath] = useState('');

  const learningPaths = [
    { id: 'html-css', name: 'HTML & CSS Fundamentals', scheme: 'Full Stack' },
    { id: 'javascript', name: 'JavaScript Basics', scheme: 'Full Stack' },
    { id: 'react', name: 'React Framework', scheme: 'Full Stack' },
  ];

  const [modulesData, setModulesData] = useState<{ [key: string]: Module[] }>({
    'html-css': [
      { id: 1, title: 'HTML Basics', description: 'Belajar dasar HTML', duration: '30 min', status: 'published', hasQuiz: true, order: 1 },
      { id: 2, title: 'CSS Styling', description: 'Styling dengan CSS', duration: '45 min', status: 'published', hasQuiz: true, order: 2 },
      { id: 3, title: 'Responsive Design', description: 'Membuat layout responsif', duration: '40 min', status: 'draft', hasQuiz: false, order: 3 },
    ],
    'javascript': [
      { id: 4, title: 'JavaScript Fundamentals', description: 'Dasar JavaScript', duration: '50 min', status: 'published', hasQuiz: true, order: 1 },
      { id: 5, title: 'DOM Manipulation', description: 'Manipulasi DOM', duration: '35 min', status: 'published', hasQuiz: true, order: 2 },
    ],
    'react': [
      { id: 6, title: 'Introduction to React', description: 'Pengenalan React', duration: '40 min', status: 'published', hasQuiz: true, order: 1 },
      { id: 7, title: 'Components & Props', description: 'Komponen dan Props', duration: '45 min', status: 'published', hasQuiz: true, order: 2 },
    ],
  });

  const [formData, setFormData] = useState({ title: '', description: '', duration: '', status: 'draft' });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({ title: '', description: '', duration: '', status: 'draft' });
    setShowModal(true);
  };

  const handleEdit = (module: Module) => {
    setModalMode('edit');
    setSelectedModule(module);
    setFormData({ title: module.title, description: module.description, duration: module.duration, status: module.status });
    setShowModal(true);
  };

  const handleView = (module: Module) => {
    setSelectedModule(module);
    setShowViewModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
      setModulesData({ ...modulesData, [selectedPath]: (modulesData[selectedPath] ?? []).filter(m => m.id !== id) });
    }
  };

  const handleSubmit = () => {
    const currentModules = modulesData[selectedPath] || [];
    if (modalMode === 'create') {
      const newModule: Module = {
        id: Math.max(...currentModules.map(m => m.id), 0) + 1,
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        status: formData.status,
        hasQuiz: false,
        order: currentModules.length + 1,
      };
      setModulesData({ ...modulesData, [selectedPath]: [...currentModules, newModule] });
    } else if (selectedModule) {
      setModulesData({
        ...modulesData,
        [selectedPath]: currentModules.map(m => m.id === selectedModule.id ? { ...m, ...formData } : m),
      });
    }
    setShowModal(false);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return <span className="px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}><CheckCircle className="w-3 h-3" /> Published</span>;
    }
    return <span className="px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}><Circle className="w-3 h-3" /> Draft</span>;
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Management Modul</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Pilih Learning Path untuk mengelola modul-modulnya</p>
        </div>
        <button onClick={handleCreate} disabled={!selectedPath} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
          <Plus className="w-5 h-5" /> Tambah Modul
        </button>
      </div>

      <HierarchySelector
        levels={[
          {
            label: 'Learning Path',
            options: learningPaths.map(path => ({ ...path, count: modulesData[path.id]?.length || 0 })),
            selected: selectedPath,
            onSelect: setSelectedPath,
          },
        ]}
      />

      {!selectedPath && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Learning Path</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Silakan pilih Learning Path terlebih dahulu untuk melihat dan mengelola modul-modulnya</p>
        </div>
      )}

      {selectedPath && (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Urutan</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Modul</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Durasi</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Status</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Quiz</th>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-primary)' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {modulesData[selectedPath]?.map((module) => (
                  <tr key={module.id} className="border-b hover:bg-muted/50 transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-semibold" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>{module.order}</div>
                    </td>
                    <td className="p-4"><p className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>{module.title}</p></td>
                    <td className="p-4"><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{module.duration}</p></td>
                    <td className="p-4">{getStatusBadge(module.status)}</td>
                    <td className="p-4">
                      {module.hasQuiz ? <CheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} /> : <span className="px-2 py-1 rounded text-xs" style={{ backgroundColor: 'var(--error-light)', color: 'var(--error)' }}>Belum ada</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleView(module)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleEdit(module)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(module.id)} className="p-2 rounded-lg hover:bg-error-light" style={{ color: 'var(--error)' }}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{modalMode === 'create' ? 'Tambah Modul Baru' : 'Edit Modul'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Learning Path</label>
                <input type="text" value={learningPaths.find(p => p.id === selectedPath)?.name} disabled className="w-full px-4 py-3 rounded-xl border border-input-border" style={{ backgroundColor: 'var(--muted)', color: 'var(--text-secondary)' }} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Modul</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Masukkan nama modul..." className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Deskripsi</label>
                <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Masukkan deskripsi modul..." className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2 resize-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Durasi</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="30 min" className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
                </div>
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3 justify-end">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted" style={{ color: 'var(--text-primary)' }}>Batal</button>
              <button onClick={handleSubmit} className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>{modalMode === 'create' ? 'Simpan Modul' : 'Update Modul'}</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Detail Modul</h2>
              <button onClick={() => setShowViewModal(false)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{selectedModule.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{selectedModule.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Durasi</p>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{selectedModule.duration}</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Status</p>
                  {getStatusBadge(selectedModule.status)}
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Quiz</p>
                  <p className="font-medium" style={{ color: selectedModule.hasQuiz ? 'var(--success)' : 'var(--error)' }}>{selectedModule.hasQuiz ? 'Ada' : 'Belum ada'}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3 justify-end">
              <button onClick={() => setShowViewModal(false)} className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted" style={{ color: 'var(--text-primary)' }}>Tutup</button>
              <button onClick={() => { setShowViewModal(false); handleEdit(selectedModule); }} className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>Edit Modul</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}