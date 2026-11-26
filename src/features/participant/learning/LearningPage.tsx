import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Lock,
  PanelRightClose,
  PanelRightOpen,
  PlayCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { VideoPlayer } from './components/VideoPlayer';
import { TaskUploadModal } from './components/TaskUploadModal';
import { MaterialTabs } from './components/MaterialTabs';
import { TaskModuleCard } from './components/TaskModuleCard';
import {
  LAST_MATERIAL_STORAGE_KEY,
  useLearningProgress,
} from './hooks/useLearningProgress';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useParticipantProfile } from '@/features/participant/profile/profileStorage';
import { DASHBOARD_TOKENS } from '@/features/participant/shared/dashboardTokens';
import { useSchemeEnrollment } from '@/features/participant/schemes/schemeEnrollmentStorage';
import {
  learningPathModules,
  learningPaths,
  materials,
  moduleMaterials,
  quizzes,
  schemes,
} from '@/data/datadummy';
import type { Material, MaterialType, Module } from './types/learning.types';

const VIDEO_IDS: Record<string, string> = {
  'html-intro-video': 'UB1O30fR-EE',
  'html-forms-video': 'fNcJuPIZ2WE',
  'css-fund-video': 'yfoY53QXEnI',
  'js-basics-video': 'W6NZfCO5SIk',
};

const MODULE_TASK_MAP: Record<
  string,
  { id: string; name: string; description: string; duration: string }
> = {
  'html-basics': {
    id: 'task-html-basics',
    name: 'Tugas Praktik: HTML Basics',
    description:
      'Buat halaman profil web statis menggunakan elemen HTML5 semantik (header, main, section, form, footer) dan kumpulkan link repositori GitHub atau file ZIP.',
    duration: '45 min',
  },
  'css-styling': {
    id: 'task-css-styling',
    name: 'Tugas Praktik: CSS Styling',
    description:
      'Terapkan styling Flexbox & Grid responsif pada halaman profil HTML Anda, lalu unggah hasil proyek dalam bentuk URL atau arsip ZIP.',
    duration: '60 min',
  },
};

export function LearningPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enrollment } = useSchemeEnrollment();
  const activeSchemeId =
    enrollment?.schemeId || searchParams.get('scheme') || 'full-stack';
  const activeSchemeInfo = schemes.find((s) => s.id === activeSchemeId);
  const { currentUser } = useAuth();
  const profile = useParticipantProfile();

  const [activeMaterialId, setActiveMaterialId] = useState<string | null>(() => {
    if (activeSchemeId !== 'full-stack') return null;
    try {
      return localStorage.getItem(LAST_MATERIAL_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showModuleList, setShowModuleList] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  // Setiap video memiliki Quiz terkait; setiap akhir modul memiliki item Tugas Praktik
  const learningPath: Module[] = useMemo(() => {
    if (activeSchemeId === 'data-science') {
      const dsPaths = learningPaths['data-science'] ?? [];
      return dsPaths.map((stage, idx) => {
        const videoQuizId =
          idx % 2 === 0 ? 'js-basics-video' : 'html-intro-video';
        return {
          id: `ds-${stage.id}`,
          title: stage.title,
          modules: [
            {
              id: `ds-${stage.id}-video`,
              name: `Pengantar ${stage.title}`,
              type: 'video',
              duration: '20:00',
              contentUrl: 'rfscVS0vtbw',
              quizId: videoQuizId,
              status: 'active',
              instructor: 'Dr. Rina Wijaya, M.Kom.',
              description: `Materi pengenalan dan implementasi praktis untuk topik ${stage.title}.`,
            },
            {
              id: `ds-${stage.id}-pdf`,
              name: `Ringkasan & Dataset ${stage.title}.pdf`,
              type: 'pdf',
              duration: '15 hal',
              pages: 15,
              contentUrl: '',
              quizId: videoQuizId,
              status: 'active',
              instructor: 'Dr. Rina Wijaya, M.Kom.',
            },
            {
              id: `task-ds-${stage.id}`,
              name: `Tugas Praktik: ${stage.title}`,
              type: 'task',
              contentUrl: '',
              duration: '45 min',
              status: 'active',
              instructor: 'Dr. Rina Wijaya, M.Kom.',
              assignment: {
                title: `Tugas Praktik: ${stage.title}`,
                description: `Selesaikan studi kasus notebook untuk topik ${stage.title} dan kumpulkan link Colab/GitHub atau file PDF/ZIP.`,
              },
            },
          ],
        };
      });
    }

    return (learningPathModules['html-css'] ?? []).map((mod) => {
      const detailList = materials[mod.id] ?? [];
      const baseMaterials: Material[] = (moduleMaterials[mod.id] ?? []).map(
        (mat): Material => {
          const detail = detailList.find((d) => d.name === mat.name);
          const type = mat.type as MaterialType;
          const resolvedQuizId =
            type === 'video' || type === 'pdf'
              ? quizzes[mat.id]
                ? mat.id
                : 'html-intro-video'
              : undefined;

          return {
            ...mat,
            type,
            duration:
              detail?.duration ??
              (detail?.pages ? `${detail.pages} hal` : undefined),
            pages: detail?.pages,
            contentUrl:
              type === 'video' ? (VIDEO_IDS[mat.id] ?? 'UB1O30fR-EE') : '',
            quizId: resolvedQuizId,
            status: 'active',
            instructor: 'Muhammad Zacky',
          };
        }
      );

      const taskMeta = MODULE_TASK_MAP[mod.id];
      if (taskMeta && baseMaterials.length > 0) {
        baseMaterials.push({
          id: taskMeta.id,
          name: taskMeta.name,
          type: 'task',
          contentUrl: '',
          duration: taskMeta.duration,
          status: 'active',
          instructor: 'Tim Instruktur MagangHub',
          description: taskMeta.description,
          assignment: {
            title: taskMeta.name,
            description: taskMeta.description,
          },
        });
      }

      return {
        id: mod.id,
        title: mod.name,
        modules: baseMaterials,
      };
    });
  }, [activeSchemeId]);

  const {
    totalMaterials,
    completedCount,
    submittedTasks,
    notes,
    discussions,
    quizResults,
    progressPercentage,
    isItemCompleted,
    markAsCompleted,
    recordTaskSubmission,
    saveNote,
    addDiscussion,
    refreshQuizResults,
  } = useLearningProgress(learningPath);

  useEffect(() => {
    refreshQuizResults();
  }, [refreshQuizResults]);

  const allMaterials = useMemo(
    () => learningPath.flatMap((p) => p.modules),
    [learningPath]
  );

  const currentIndex = useMemo(() => {
    if (!activeMaterialId) return 0;
    const idx = allMaterials.findIndex((m) => m.id === activeMaterialId);
    return idx >= 0 ? idx : 0;
  }, [activeMaterialId, allMaterials]);

  const activeMaterial = allMaterials[currentIndex] ?? allMaterials[0];

  useEffect(() => {
    if (!activeMaterial || activeSchemeId !== 'full-stack') return;
    try {
      localStorage.setItem(LAST_MATERIAL_STORAGE_KEY, activeMaterial.id);
    } catch {
      // ignore storage errors
    }
  }, [activeMaterial, activeSchemeId]);

  const prevMaterial =
    currentIndex > 0 ? allMaterials[currentIndex - 1] : undefined;
  const nextMaterial =
    currentIndex < allMaterials.length - 1
      ? allMaterials[currentIndex + 1]
      : undefined;

  const isCompleted = activeMaterial
    ? isItemCompleted(activeMaterial.id) ||
      activeMaterial.status === 'completed'
    : false;

  const activeTask = activeMaterial
    ? submittedTasks[activeMaterial.id]
    : undefined;
  const activeVideoQuizResult = activeMaterial?.quizId
    ? quizResults[activeMaterial.quizId]
    : undefined;

  const handleMarkCompleted = () => {
    if (!activeMaterial || isCompleted) return;
    markAsCompleted(activeMaterial.id);
    toast.success(
      activeMaterial.type === 'video'
        ? `"${activeMaterial.name}" selesai ditonton. Quiz sekarang terbuka!`
        : activeMaterial.type === 'pdf'
          ? `"${activeMaterial.name}" selesai dibaca. Quiz sekarang terbuka!`
          : `"${activeMaterial.name}" ditandai selesai.`
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-3.5rem)] items-stretch">
      {/* Konten Utama Tengah (Fill container penuh di antara sidebar kiri & kanan) */}
      <div className="flex-1 w-full min-w-0 p-4 sm:p-6 space-y-4">
        {/* Bar Ringkas saat Daftar Modul disembunyikan */}
        {!showModuleList && (
          <div className={`${DASHBOARD_TOKENS.card} flex flex-wrap items-center justify-between gap-3 px-4 py-2.5`}>
            <div className="min-w-0 flex items-center gap-2.5">
              <h1 className="text-sm sm:text-base font-semibold text-[#171C2B] tracking-tight truncate">
                {activeMaterial?.name || 'Materi Pembelajaran'}
              </h1>
              <span className={DASHBOARD_TOKENS.badgeBlue}>
                {progressPercentage}%
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowModuleList(true)}
              aria-expanded={false}
              className={DASHBOARD_TOKENS.btnOutline}
            >
              <PanelRightOpen className="w-3.5 h-3.5 text-[#1677F9]" />
              Tampilkan Daftar Modul
            </button>
          </div>
        )}

        {/* Konten Player, Action Bar, dan Tab Materi */}
        <div className="w-full space-y-4 min-w-0">
          {activeMaterial?.type === 'task' ? (
            <TaskModuleCard
              material={activeMaterial}
              submittedTask={activeTask}
              onOpenSubmitModal={() => setShowTaskModal(true)}
            />
          ) : (
            activeMaterial && <VideoPlayer material={activeMaterial} />
          )}

          {/* Action Bar: Prev/Next + Tandai Selesai + Quiz (khusus video, terkunci sebelum selesai) */}
          <div className={`${DASHBOARD_TOKENS.card} p-4 space-y-3`}>
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <button
                  type="button"
                  onClick={() =>
                    prevMaterial && setActiveMaterialId(prevMaterial.id)
                  }
                  disabled={!prevMaterial}
                  className={DASHBOARD_TOKENS.btnOutline}
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Sebelumnya
                </button>
                <button
                  type="button"
                  onClick={() =>
                    nextMaterial && setActiveMaterialId(nextMaterial.id)
                  }
                  disabled={!nextMaterial}
                  className={DASHBOARD_TOKENS.btnOutline}
                >
                  Selanjutnya <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {activeMaterial?.type !== 'task' && (
                <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={handleMarkCompleted}
                    disabled={!activeMaterial || isCompleted}
                    className={
                      isCompleted
                        ? `${DASHBOARD_TOKENS.btnSuccessPill} disabled:opacity-90`
                        : DASHBOARD_TOKENS.btnOutline
                    }
                  >
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    {isCompleted ? 'Sudah Selesai' : 'Tandai Selesai'}
                  </button>

                  {(activeMaterial?.type === 'video' ||
                    activeMaterial?.type === 'pdf') &&
                    activeMaterial.quizId && (
                      <button
                        type="button"
                        disabled={!isCompleted}
                        onClick={() =>
                          isCompleted &&
                          navigate(`/participant/quiz/${activeMaterial.quizId}`)
                        }
                        title={
                          isCompleted
                            ? 'Kerjakan quiz untuk materi ini'
                            : `Selesaikan ${
                                activeMaterial.type === 'pdf'
                                  ? 'membaca dokumen'
                                  : 'menonton video'
                              } terlebih dahulu untuk membuka quiz`
                        }
                        className={
                          isCompleted
                            ? DASHBOARD_TOKENS.btnPrimary
                            : 'h-9 px-4 rounded-xl bg-[#F3F6FB] text-[#667085] text-xs font-semibold inline-flex items-center justify-center gap-1.5 border border-[#E7ECF3] disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap'
                        }
                      >
                        {isCompleted ? (
                          <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 shrink-0" />
                        )}
                        {activeVideoQuizResult?.passed
                          ? `Ulangi Quiz (Lulus ${activeVideoQuizResult.score}/${activeVideoQuizResult.total})`
                          : activeVideoQuizResult
                            ? `Kerjakan Quiz (${activeVideoQuizResult.score}/${activeVideoQuizResult.total})`
                            : 'Kerjakan Quiz'}
                      </button>
                    )}
                </div>
              )}
            </div>

            {(activeMaterial?.type === 'video' ||
              activeMaterial?.type === 'pdf') &&
              !isCompleted && (
                <p className="text-xs font-normal text-[#667085] flex items-start sm:items-center gap-1.5 pt-2.5 border-t border-[#E7ECF3]">
                  <Lock className="w-3.5 h-3.5 text-[#B45309] shrink-0 mt-0.5 sm:mt-0" />
                  <span>
                    Quiz terkunci. Klik <strong className="font-semibold text-[#171C2B]">Tandai Selesai</strong> setelah{' '}
                    {activeMaterial.type === 'pdf'
                      ? 'membaca dokumen'
                      : 'selesai menonton video'}{' '}
                    untuk membuka quiz.
                  </span>
                </p>
              )}
          </div>

          {/* Tab Ringkasan / Catatan / Diskusi */}
          {activeMaterial && (
            <MaterialTabs
              material={activeMaterial}
              noteValue={notes[activeMaterial.id] ?? ''}
              discussions={discussions[activeMaterial.id] ?? []}
              onSaveNote={saveNote}
              onAddDiscussion={(matId, msg) =>
                addDiscussion(
                  matId,
                  currentUser?.fullName || profile.name,
                  msg
                )
              }
            />
          )}
        </div>
      </div>

      {/* Sidebar Kanan: Info Materi + Daftar Modul Simpel (Split Sidebar, Dapat Disembunyikan) */}
      {showModuleList && (
        <aside className="w-full lg:w-80 2xl:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-[#E7ECF3] bg-white lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] flex flex-col">
          <div className="p-4 border-b border-[#E7ECF3] space-y-2.5 shrink-0 bg-white">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className={`${DASHBOARD_TOKENS.sectionLabel} truncate`}>
                  {activeSchemeInfo?.name ?? 'Full Stack Web Development'} •{' '}
                  {activeSchemeId === 'data-science'
                    ? 'Kurikulum Data Science'
                    : 'HTML & CSS Fundamentals'}
                </p>
                <h1 className="text-base font-semibold text-[#171C2B] tracking-tight mt-0.5 leading-snug">
                  {activeMaterial?.name || 'Materi Pembelajaran'}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => setShowModuleList(false)}
                aria-expanded={true}
                aria-label="Sembunyikan Daftar Modul"
                title="Sembunyikan Daftar Modul"
                className="shrink-0 w-7 h-7 rounded-lg border border-[#E7ECF3] bg-white text-[#667085] hover:bg-[#F3F6FB] flex items-center justify-center transition-colors"
              >
                <PanelRightClose className="w-4 h-4 text-[#1677F9]" />
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-semibold text-[#667085]">
                  Daftar Modul
                </span>
                <span className="text-[#667085] font-normal tabular-nums">
                  {completedCount} dari {totalMaterials} selesai •{' '}
                  <strong className="font-semibold text-[#1677F9]">{progressPercentage}%</strong>
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#E7ECF3] rounded-full overflow-hidden">
                <div
                  className={DASHBOARD_TOKENS.progressFillBlue}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E7ECF3]">
            {learningPath.map((section, index) => {
              const sectionDoneCount = section.modules.filter((m) =>
                isItemCompleted(m.id)
              ).length;
              const isSectionOpen = !collapsedSections[section.id];

              return (
                <div key={section.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedSections((prev) => ({
                        ...prev,
                        [section.id]: !prev[section.id],
                      }))
                    }
                    aria-expanded={isSectionOpen}
                    className="w-full px-4 py-2.5 bg-[#F9FBFE] hover:bg-[#F3F6FB] flex items-center justify-between gap-2 text-left transition-colors"
                  >
                    <span className="text-xs font-semibold text-[#171C2B] truncate">
                      {index + 1}. {section.title}
                    </span>
                    <span className="inline-flex items-center gap-1.5 shrink-0">
                      {section.modules.length > 0 && (
                        <span className="text-[11px] font-semibold text-[#1677F9] tabular-nums">
                          {sectionDoneCount}/{section.modules.length}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#98A2B3] transition-transform ${
                          isSectionOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                  </button>

                  {isSectionOpen && (
                    section.modules.length === 0 ? (
                      <div className="px-4 py-3 text-xs font-normal text-[#667085]">
                        Belum ada materi pada modul ini.
                      </div>
                    ) : (
                      <div className="divide-y divide-[#EFF3F8]">
                        {section.modules.map((material) => {
                          const isActive = activeMaterial?.id === material.id;
                          const materialDone =
                            isItemCompleted(material.id) ||
                            material.status === 'completed';
                          const quizInfo = material.quizId
                            ? quizResults[material.quizId]
                            : undefined;
                          const hasTask = Boolean(submittedTasks[material.id]);

                          return (
                            <button
                              type="button"
                              key={material.id}
                              onClick={() => setActiveMaterialId(material.id)}
                              className={`w-full text-left px-4 py-2.5 flex items-start gap-2.5 transition-colors hover:bg-[#F9FBFE] ${
                                isActive
                                  ? 'bg-[#EAF3FF]/70 border-l-[3px] border-[#1677F9]'
                                  : ''
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {materialDone ? (
                                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                                ) : material.status === 'locked' ? (
                                  <Lock className="w-4 h-4 text-[#98A2B3]" />
                                ) : material.type === 'task' ? (
                                  <FileCheck2 className="w-4 h-4 text-[#1677F9]" />
                                ) : material.type === 'pdf' ? (
                                  <FileText className="w-4 h-4 text-[#1677F9]" />
                                ) : (
                                  <PlayCircle className="w-4 h-4 text-[#1677F9]" />
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <p
                                  className={`text-[13px] leading-snug ${
                                    isActive
                                      ? 'text-[#1677F9] font-semibold'
                                      : 'text-[#171C2B] font-medium'
                                  }`}
                                >
                                  {material.name}
                                </p>

                                <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px]">
                                  <span className="font-normal text-[#667085]">
                                    {material.type === 'task'
                                      ? `Tugas • ${material.duration ?? '45 min'}`
                                      : `${material.type.toUpperCase()} • ${
                                          material.duration ??
                                          (material.type === 'pdf'
                                            ? 'Dokumen'
                                            : '10 min')
                                        }`}
                                  </span>

                                  {(material.type === 'video' ||
                                    material.type === 'pdf') &&
                                    !quizInfo && (
                                      <span className="text-[#667085]">
                                        • Ada Quiz
                                      </span>
                                    )}

                                  {quizInfo && (
                                    <span
                                      className={`font-semibold ${
                                        quizInfo.passed
                                          ? 'text-[#16A34A]'
                                          : 'text-[#B45309]'
                                      }`}
                                    >
                                      •{' '}
                                      {quizInfo.passed
                                        ? `Lulus ${quizInfo.score}/${quizInfo.total}`
                                        : `Quiz ${quizInfo.score}/${quizInfo.total}`}
                                    </span>
                                  )}

                                  {hasTask && (
                                    <span className="font-semibold text-[#1677F9]">
                                      • Terkumpul
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      )}

      {showTaskModal && activeMaterial && (
        <TaskUploadModal
          material={activeMaterial}
          initialLink={activeTask?.link ?? ''}
          onClose={() => setShowTaskModal(false)}
          onSuccess={(id, payload) => {
            recordTaskSubmission(id, payload);
            toast.success('Tugas berhasil dikumpulkan dan menunggu penilaian!');
          }}
        />
      )}
    </div>
  );
}
