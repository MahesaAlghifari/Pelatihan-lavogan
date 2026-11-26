import { useEffect, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  MessageSquare,
  Save,
  Send,
  StickyNote,
  User,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import type {
  DiscussionComment,
  Material,
  MaterialResource,
} from '../types/learning.types';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';

type TabKey = 'summary' | 'notes' | 'discussion';

interface MaterialTabsProps {
  material: Material;
  noteValue: string;
  discussions: DiscussionComment[];
  onSaveNote: (materialId: string, content: string) => void;
  onAddDiscussion: (materialId: string, message: string) => void;
}

function buildResourceContent(resource: MaterialResource, material: Material) {
  if (resource.previewContent) return resource.previewContent;

  if (resource.type.toUpperCase() === 'ZIP') {
    return `// Starter Code & Practice - ${material.name}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${material.name}</title>
</head>
<body>
  <header>
    <h1>MagangHub - Practice ${material.name}</h1>
  </header>
  <main>
    <p>Start writing your practice code here.</p>
  </main>
</body>
</html>`;
  }

  return `MAGANGHUB SUPPORTING MATERIAL
Material Title : ${material.name}
Document       : ${resource.label}
Instructor     : ${material.instructor ?? 'MagangHub Teaching Team'}

KEY TAKEAWAYS:
1. Understand the core structure and coding conventions for "${material.name}".
2. Follow the practice steps in the video/guide sequentially.
3. After finishing the material, take the evaluation quiz or complete the practical assignment.`;
}

function triggerResourceDownload(resource: MaterialResource, material: Material) {
  const content = buildResourceContent(resource, material);
  const ext = resource.type.toUpperCase() === 'ZIP' ? 'html' : 'txt';
  const safeBase = resource.label
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/(^-|-$)/g, '');
  const fileName = resource.fileName ?? `${safeBase}.${ext}`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);

  toast.success(`Downloading "${resource.label}" (${fileName}).`);
}

export function MaterialTabs({
  material,
  noteValue,
  discussions,
  onSaveNote,
  onAddDiscussion,
}: MaterialTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('summary');
  const [draftNote, setDraftNote] = useState(noteValue);
  const [commentText, setCommentText] = useState('');
  const [previewResource, setPreviewResource] =
    useState<MaterialResource | null>(null);

  useEffect(() => {
    setDraftNote(noteValue);
  }, [material.id, noteValue]);

  useEffect(() => {
    if (!previewResource) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewResource(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewResource]);

  const handleSaveNote = () => {
    onSaveNote(material.id, draftNote);
    toast.success('Personal study notes saved.');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) return;
    onAddDiscussion(material.id, trimmed);
    setCommentText('');
    toast.success('Question / comment posted.');
  };

  const tabs: Array<{
    key: TabKey;
    label: string;
    icon: typeof BookOpen;
    badge?: number;
  }> = [
    { key: 'summary', label: 'Summary', icon: BookOpen },
    { key: 'notes', label: 'Notes', icon: StickyNote },
    {
      key: 'discussion',
      label: 'Discussion',
      icon: MessageSquare,
      badge: discussions.length,
    },
  ];

  const keyPoints = material.keyPoints ?? [
    `Understand the core concepts of "${material.name}".`,
    'Apply industry-standard practices to hands-on exercises.',
    'Prepare your understanding before taking the evaluation quiz or practical assignment.',
  ];

  const resources: MaterialResource[] = material.resources ?? [
    {
      label: `Slides & Summary - ${material.name}`,
      size: '1.4 MB',
      type: 'PDF',
    },
    {
      label: 'Starter Code & Practice Examples',
      size: '420 KB',
      type: 'ZIP',
    },
  ];

  return (
    <>
      <div className={`${DASHBOARD_TOKENS.card} overflow-hidden`}>
        {/* Tab Header */}
        <div className="flex border-b border-[#E7ECF3] bg-[#F9FBFE] px-2 pt-2 gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-[13px] rounded-t-xl border-b-2 transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-white text-[#1677F9] border-[#1677F9] font-semibold'
                    : 'border-transparent text-[#667085] hover:text-[#171C2B] hover:bg-white/70 font-medium'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#EAF3FF] text-[#1677F9]">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'summary' && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h3 className={DASHBOARD_TOKENS.sectionHeading}>
                  About This Material
                </h3>
                <p className={DASHBOARD_TOKENS.bodyText}>
                  {material.description ??
                    `This session covers "${material.name}" in a structured format so participants can connect foundational concepts with practical implementation.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-3`}>
                  <h4 className={DASHBOARD_TOKENS.cardTitle}>
                    Key Takeaways
                  </h4>
                  <ul className="space-y-2.5">
                    {keyPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 ${DASHBOARD_TOKENS.description}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#1677F9] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-3`}>
                  <h4 className={DASHBOARD_TOKENS.cardTitle}>
                    Supporting Materials & Info
                  </h4>
                  <p className={DASHBOARD_TOKENS.metaText}>
                    Instructor:{' '}
                    <span className="font-medium text-[#171C2B]">
                      {material.instructor ?? 'MagangHub Teaching Team'}
                    </span>
                  </p>
                  <div className="space-y-2">
                    {resources.map((res, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-white border border-[#E7ECF3]"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-[13px] font-medium text-[#171C2B] truncate leading-snug">
                            {res.label}
                          </p>
                          <p className="text-[11px] font-normal text-[#667085] leading-normal">
                            {res.type} • {res.size}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setPreviewResource(res)}
                            aria-label={`View ${res.label}`}
                            className="h-8 px-2.5 rounded-lg text-xs font-semibold border border-[#E7ECF3] bg-white hover:bg-[#F3F6FB] text-[#171C2B] inline-flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#1677F9]" />
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerResourceDownload(res, material)}
                            aria-label={`Download ${res.label}`}
                            className="h-8 px-2.5 rounded-lg text-xs font-semibold bg-[#1677F9] hover:bg-[#1262D4] text-white inline-flex items-center gap-1 transition-colors"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <h3 className={DASHBOARD_TOKENS.sectionHeading}>
                    Personal Study Notes
                  </h3>
                  <p className={DASHBOARD_TOKENS.description}>
                    Notes are stored per material in your browser.
                  </p>
                </div>
                <span className={`${DASHBOARD_TOKENS.metaText} font-medium tabular-nums`}>
                  {draftNote.length} characters
                </span>
              </div>

              <textarea
                rows={5}
                value={draftNote}
                onChange={(e) => setDraftNote(e.target.value)}
                placeholder={`Write a summary or key points for "${material.name}"...`}
                className={DASHBOARD_TOKENS.input}
              />

              <div className="flex items-center justify-between">
                <span className="text-xs font-normal text-[#667085]">
                  {draftNote === noteValue && noteValue.length > 0
                    ? 'All changes saved'
                    : 'Click Save Notes to keep your changes'}
                </span>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Notes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'discussion' && (
            <div className="space-y-5">
              <form onSubmit={handlePostComment} className="space-y-2.5">
                <label className={`block ${DASHBOARD_TOKENS.subheading}`}>
                  Ask Instructor or Discuss Material
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a question or comment about this material..."
                    className={`${DASHBOARD_TOKENS.input} flex-1 h-9`}
                  />
                  <button
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`${DASHBOARD_TOKENS.btnPrimary} whitespace-nowrap`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Post
                  </button>
                </div>
              </form>

              <div className="space-y-3 pt-3 border-t border-[#E7ECF3]">
                {discussions.length === 0 ? (
                  <p className="text-sm font-normal text-[#667085] text-center py-6">
                    No discussions on this material yet. Be the first to ask!
                  </p>
                ) : (
                  discussions.map((item) => (
                    <div
                      key={item.id}
                      className={`${DASHBOARD_TOKENS.subcard} p-4 space-y-2`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#EAF3FF] text-[#1677F9] flex items-center justify-center">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-semibold text-[#171C2B]">
                            {item.author}
                          </span>
                          <span
                            className={
                              item.role === 'instructor'
                                ? DASHBOARD_TOKENS.badgeBlue
                                : DASHBOARD_TOKENS.badgeNeutral
                            }
                          >
                            {item.role === 'instructor'
                              ? 'Instructor'
                              : 'Participant'}
                          </span>
                        </div>
                        <span className="text-xs font-normal text-[#667085]">
                          {item.createdAt}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-normal text-[#667085] leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resource Preview Modal */}
      {previewResource && (
        <div
          className="fixed inset-0 bg-[#171C2B]/45 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPreviewResource(null);
          }}
        >
          <div className="bg-white text-[#171C2B] rounded-2xl border border-[#E7ECF3] max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-xl flex flex-col">
            <div className="px-5 py-4 border-b border-[#E7ECF3] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={DASHBOARD_TOKENS.iconBoxSm}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-base text-[#171C2B] truncate">
                    {previewResource.label}
                  </h3>
                  <p className="text-xs font-normal text-[#667085]">
                    {previewResource.type} • {previewResource.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => triggerResourceDownload(previewResource, material)}
                  className={DASHBOARD_TOKENS.btnPrimary}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  type="button"
                  aria-label="Close supporting material preview"
                  onClick={() => setPreviewResource(null)}
                  className="p-2 rounded-xl text-[#667085] hover:bg-[#F3F6FB] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-5 overflow-y-auto bg-[#F3F6FB]">
              <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-[#475467] bg-white p-5 rounded-xl border border-[#E7ECF3]">
                {buildResourceContent(previewResource, material)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
