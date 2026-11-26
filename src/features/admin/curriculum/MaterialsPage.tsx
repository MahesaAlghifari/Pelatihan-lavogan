import { useState } from 'react';
import { Upload, Eye, Trash2, Video, FileText, CheckCircle, Clock, AlertCircle, Pencil, X, User } from 'lucide-react';
import { HierarchySelector } from '@/shared/components/common';
import { learningPathModules, materials as initialMaterials } from '@/data/datadummy';

export function MaterialsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  
  const [localMaterials, setLocalMaterials] = useState(initialMaterials);

  const [previewMaterial, setPreviewMaterial] = useState<any>(null);
  const [editMaterial, setEditMaterial] = useState<any>(null);
  const [editFile, setEditFile] = useState<File | null>(null);

  const [uploadName, setUploadName] = useState('');
  const [uploadInstructor, setUploadInstructor] = useState('');
  const [uploadType, setUploadType] = useState('video');
  const [uploadStatus, setUploadStatus] = useState('draft');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const learningPaths = [
    { id: 'html-css', name: 'HTML & CSS Fundamentals' },
    { id: 'javascript', name: 'JavaScript Basics' },
    { id: 'react', name: 'React Framework' },
  ];

  const currentModules = selectedPath ? learningPathModules[selectedPath] || [] : [];
  const currentMaterials = selectedModule ? localMaterials[selectedModule] || [] : [];

  const handleDelete = (materialId: string, materialName: string) => {
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus materi "${materialName}"?`);
    if (isConfirmed) {
      setLocalMaterials((prev) => {
        const updatedModuleMaterials = (prev[selectedModule] ?? []).filter((m: any) => m.id !== materialId);
        return { ...prev, [selectedModule]: updatedModuleMaterials };
      });
    }
  };

  const handleUpload = () => {
    if (!uploadName || !uploadFile || !uploadInstructor) {
      alert('Mohon isi semua data (Judul, Instruktur, dan File) yang ingin diunggah.');
      return;
    }

    const newMaterial = {
      id: `mat-${Date.now()}`,
      name: uploadName,
      instructor: uploadInstructor,
      type: uploadType,
      status: uploadStatus,
      size: uploadType === 'video' ? '25 MB' : '2.5 MB',
      duration: uploadType === 'video' ? '12:00' : undefined,
      pages: uploadType === 'pdf' ? 20 : undefined,
      uploadDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setLocalMaterials((prev) => ({
      ...prev,
      [selectedModule]: [...(prev[selectedModule] || []), newMaterial],
    }));

    setUploadName('');
    setUploadInstructor('');
    setUploadFile(null);
    setUploadType('video');
    setUploadStatus('draft');
    setShowModal(false);
  };

  const handleSaveEdit = () => {
    if (!editMaterial.name || !editMaterial.instructor) {
      alert('Nama materi dan Instruktur tidak boleh kosong.');
      return;
    }

    setLocalMaterials((prev) => {
      const updatedModule = (prev[selectedModule] ?? []).map((m: any) => {
        if (m.id === editMaterial.id) {
          const updatedMat = { ...editMaterial };
          if (editFile) {
            updatedMat.size = editMaterial.type === 'video' ? '42 MB (Baru)' : '4.5 MB (Baru)';
            updatedMat.uploadDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ' (Diperbarui)';
          }
          return updatedMat;
        }
        return m;
      });
      return { ...prev, [selectedModule]: updatedModule };
    });

    setEditMaterial(null);
    setEditFile(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Management Materi</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Pilih Learning Path dan Modul untuk mengelola materi</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={!selectedModule}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Upload className="w-5 h-5" /> Upload Materi
        </button>
      </div>

      <HierarchySelector
        levels={[
          {
            label: 'Learning Path',
            options: learningPaths,
            selected: selectedPath,
            onSelect: (id) => { setSelectedPath(id); setSelectedModule(''); },
          },
          {
            label: 'Modul',
            options: currentModules.map((m: any) => ({ ...m, count: localMaterials[m.id]?.length || 0 })),
            selected: selectedModule,
            onSelect: setSelectedModule,
          },
        ]}
      />

      {!selectedPath && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Learning Path</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Silakan pilih Learning Path terlebih dahulu untuk melihat modul-modulnya</p>
        </div>
      )}

      {selectedPath && !selectedModule && (
        <div className="bg-card p-12 rounded-xl border border-border text-center">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warning)' }} />
          <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Pilih Modul</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Silakan pilih Modul untuk melihat dan mengelola materi di dalamnya</p>
        </div>
      )}

      {selectedPath && selectedModule && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentMaterials.length > 0 ? currentMaterials.map((material: any) => (
          <div key={material.id} className="bg-card p-6 rounded-xl border border-border">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: material.type === 'video' ? '#DBEAFE' : 'var(--error-light)' }}
              >
                {material.type === 'video' ? <Video className="w-6 h-6 text-blue-500" /> : <FileText className="w-6 h-6" style={{ color: 'var(--error)' }} />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium mb-1 truncate text-lg" style={{ color: 'var(--text-primary)' }}>{material.name}</p>
                <div className="flex items-center gap-1 text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
                  <User className="w-3.5 h-3.5" />
                  <span>Instruktur: <strong className="font-medium">{material.instructor || 'Tidak ada'}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <span>{material.size}</span>
                  {material.type === 'video' && <span>• {material.duration}</span>}
                  {material.type === 'pdf' && <span>• {material.pages} pages</span>}
                </div>
                <div className="flex items-center gap-2">
                  {material.status === 'published' ? (
                    <span className="px-2 py-1 rounded text-xs font-medium flex items-center gap-1" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
                      <CheckCircle className="w-3 h-3" /> Published
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded text-xs font-medium flex items-center gap-1" style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }}>
                      <Clock className="w-3 h-3" /> Draft
                    </span>
                  )}
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{material.uploadDate}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button onClick={() => setPreviewMaterial(material)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }} title="Preview">
                  <Eye className="w-4 h-4" />
                </button>
                <button onClick={() => setEditMaterial(material)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }} title="Edit">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(material.id, material.name)} className="p-2 rounded-lg hover:bg-error-light" style={{ color: 'var(--error)' }} title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {material.type === 'video' && (
              <div className="mt-4 bg-black rounded-xl aspect-video flex items-center justify-center">
                <div className="text-white text-center">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Video Preview</p>
                </div>
              </div>
            )}
          </div>
        )) : (
          <div className="lg:col-span-2 bg-card p-12 rounded-xl border border-border text-center">
            <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-tertiary)' }} />
            <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Belum Ada Materi</h3>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Modul ini belum memiliki materi. Upload materi pertama.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-xl font-medium transition-colors"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              Upload Materi
            </button>
          </div>
        )}
        </div>
      )}

      {/* MODAL UPLOAD MATERI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Upload Materi Baru</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Judul Materi</label>
                <input type="text" value={uploadName} onChange={(e) => setUploadName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input-border focus:ring-2 focus:outline-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Instruktur</label>
                <input type="text" value={uploadInstructor} onChange={(e) => setUploadInstructor(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input-border focus:ring-2 focus:outline-none" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Jenis Materi</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setUploadType('video')} className={`p-6 rounded-xl border-2 transition-colors ${uploadType === 'video' ? 'bg-muted' : 'hover:bg-muted'}`} style={{ borderColor: uploadType === 'video' ? 'var(--primary)' : 'var(--border)' }}>
                    <Video className="w-8 h-8 mx-auto mb-2" style={{ color: uploadType === 'video' ? 'var(--primary)' : 'var(--text-secondary)' }} />
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Video</p>
                  </button>
                  <button onClick={() => setUploadType('pdf')} className={`p-6 rounded-xl border-2 transition-colors ${uploadType === 'pdf' ? 'bg-muted' : 'hover:bg-muted'}`} style={{ borderColor: uploadType === 'pdf' ? 'var(--primary)' : 'var(--border)' }}>
                    <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: uploadType === 'pdf' ? 'var(--error)' : 'var(--text-secondary)' }} />
                    <p className="font-medium" style={{ color: 'var(--text-primary)' }}>PDF</p>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Upload File</label>
                <label className="border-2 border-dashed rounded-xl p-8 text-center block cursor-pointer hover:bg-muted/50" style={{ borderColor: 'var(--border)' }}>
                  <input type="file" className="hidden" accept={uploadType === 'video' ? 'video/mp4,video/quicktime' : 'application/pdf'} onChange={(e) => setUploadFile(e.target.files?.[0] || null)} />
                  <Upload className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--text-tertiary)' }} />
                  <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{uploadFile ? uploadFile.name : 'Drag & drop atau klik untuk upload'}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{uploadType === 'video' ? 'MP4, MOV untuk video' : 'PDF (max 100MB)'}</p>
                </label>
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Status Publikasi</label>
                <select value={uploadStatus} onChange={(e) => setUploadStatus(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3 justify-end sticky bottom-0 bg-card z-10">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted" style={{ color: 'var(--text-primary)' }}>Batal</button>
              <button onClick={handleUpload} className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>Upload Materi</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT MATERI */}
      {editMaterial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
          <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Edit Materi</h2>
              <button onClick={() => { setEditMaterial(null); setEditFile(null); }} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Materi</label>
                <input type="text" value={editMaterial.name} onChange={(e) => setEditMaterial({...editMaterial, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Nama Instruktur</label>
                <input type="text" value={editMaterial.instructor || ''} onChange={(e) => setEditMaterial({...editMaterial, instructor: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties} />
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Ganti/Reupload File ({editMaterial.type.toUpperCase()})</label>
                <label className="border-2 border-dashed rounded-xl p-6 text-center block cursor-pointer hover:bg-muted/50" style={{ borderColor: 'var(--border)' }}>
                  <input type="file" className="hidden" accept={editMaterial.type === 'video' ? 'video/mp4,video/quicktime' : 'application/pdf'} onChange={(e) => setEditFile(e.target.files?.[0] || null)} />
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-tertiary)' }} />
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{editFile ? `File baru terpilih: ${editFile.name}` : 'Klik untuk memilih file pengganti'}</p>
                </label>
              </div>
              <div>
                <label className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>Status Publikasi</label>
                <select value={editMaterial.status} onChange={(e) => setEditMaterial({...editMaterial, status: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-input-border focus:outline-none focus:ring-2" style={{ backgroundColor: 'var(--input-background)', color: 'var(--text-primary)' } as React.CSSProperties}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-border flex gap-3 justify-end sticky bottom-0 bg-card z-10">
              <button onClick={() => { setEditMaterial(null); setEditFile(null); }} className="px-6 py-3 rounded-xl font-medium border border-border hover:bg-muted" style={{ color: 'var(--text-primary)' }}>Batal</button>
              <button onClick={handleSaveEdit} className="px-6 py-3 rounded-xl font-medium" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>Simpan Perubahan</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW MATERI */}
      {previewMaterial && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
          <div className="bg-card rounded-xl border border-border max-w-4xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                {previewMaterial.type === 'video' ? <Video className="w-5 h-5 text-blue-500" /> : <FileText className="w-5 h-5 text-red-500" />}
                <h3 className="font-medium truncate text-lg" style={{ color: 'var(--text-primary)' }}>Preview: {previewMaterial.name}</h3>
              </div>
              <button onClick={() => setPreviewMaterial(null)} className="p-2 rounded-lg hover:bg-muted" style={{ color: 'var(--text-secondary)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-muted/30 flex items-center justify-center min-h-[400px]">
              {previewMaterial.type === 'video' ? (
                <div className="w-full max-w-3xl aspect-video bg-black rounded-lg flex flex-col items-center justify-center shadow-lg">
                   <Video className="w-16 h-16 text-white/50 mb-4" />
                   <p className="text-white/70">Video Player Placeholder</p>
                </div>
              ) : (
                <div className="w-full max-w-2xl h-[600px] bg-white rounded-lg shadow-lg flex flex-col items-center justify-center border border-border">
                   <FileText className="w-16 h-16 text-red-400 mb-4" />
                   <p className="text-gray-600 font-medium">PDF Viewer Placeholder</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}