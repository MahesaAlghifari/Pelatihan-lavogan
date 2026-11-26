import { useState } from 'react';
import { Upload, X, Link as LinkIcon, FileText } from 'lucide-react';
import { Material } from '../types/learning.types';
import { submitTaskData } from '../services/learningService';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

interface TaskUploadModalProps {
  material: Material;
  initialLink?: string;
  onClose: () => void;
  onSuccess: (materialId: string, payload: { link?: string; fileName?: string }) => void;
}

export function TaskUploadModal({
  material,
  initialLink = '',
  onClose,
  onSuccess,
}: TaskUploadModalProps) {
  const [taskLink, setTaskLink] = useState(initialLink);
  const [taskFile, setTaskFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskLink && !taskFile) {
      alert('Please attach a submission URL or upload a file first.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitTaskData({
        materialId: material.id,
        link: taskLink,
        file: taskFile || undefined,
      });

      if (response.success) {
        onSuccess(material.id, {
          link: taskLink.trim() || undefined,
          fileName: taskFile?.name,
        });
        onClose();
      }
    } catch (error) {
      alert('Failed to submit assignment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#171C2B]/45 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white text-[#171C2B] rounded-2xl border border-[#E7ECF3] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white z-10 p-5 border-b border-[#E7ECF3] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={DASHBOARD_TOKENS.iconBox}>
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className={DASHBOARD_TOKENS.sectionHeading}>Assignment Submission</h3>
              <p className={DASHBOARD_TOKENS.metaText}>{material.title || material.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#667085] hover:bg-[#F3F6FB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div className={`${DASHBOARD_TOKENS.subcard} p-4`}>
            <h4 className={`${DASHBOARD_TOKENS.subheading} mb-1`}>Practical Instructions</h4>
            <p className={DASHBOARD_TOKENS.description}>
              {material.assignment?.description || 'Complete the practical assignment based on this module and upload your work via URL or PDF/ZIP archive.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Submission URL (Drive / Figma / GitHub)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-[#98A2B3]" />
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  value={taskLink}
                  onChange={(e) => setTaskLink(e.target.value)}
                  className={DASHBOARD_TOKENS.inputWithIcon}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <hr className="flex-1 border-[#E7ECF3]" />
              <span className={DASHBOARD_TOKENS.mutedMetaLabel}>Or Upload File</span>
              <hr className="flex-1 border-[#E7ECF3]" />
            </div>

            <div>
              <label className={DASHBOARD_TOKENS.fieldLabel}>Assignment Document (PDF / ZIP)</label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D0D9E8] bg-[#F9FBFE] rounded-xl cursor-pointer hover:bg-[#F3F6FB] transition-colors">
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
                  {taskFile ? (
                    <>
                      <FileText className="w-7 h-7 mb-2 text-[#1677F9]" />
                      <p className="text-sm font-medium px-4 text-center truncate max-w-xs text-[#171C2B]">{taskFile.name}</p>
                      <p className="text-xs mt-1 text-[#667085]">Click to replace file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 mb-2 text-[#98A2B3]" />
                      <p className="mb-1 text-sm text-center px-4 text-[#667085]">
                        <span className="font-semibold text-[#1677F9]">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-[#98A2B3]">Maximum 10MB</p>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" accept=".pdf,.zip,.rar" onChange={(e) => { if (e.target.files && e.target.files[0]) setTaskFile(e.target.files[0]); }} />
              </label>
            </div>

            <div className="pt-4 border-t border-[#E7ECF3] flex gap-2.5 justify-end">
              <button type="button" onClick={onClose} className={DASHBOARD_TOKENS.btnOutline}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || (!taskLink && !taskFile)}
                className={DASHBOARD_TOKENS.btnPrimary}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}