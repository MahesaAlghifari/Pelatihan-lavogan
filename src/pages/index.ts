/**
 * ==========================================================
 * AUTH
 * ==========================================================
 */

export * from "./auth";

/**
 * ==========================================================
 * ADMIN
 * ==========================================================
 */

export {
  DashboardPage as AdminDashboardPage,
  TrainingPage,
  TrainingCreatePage,
  TrainingDetailPage,
  TrainingEditPage,
} from "./admin";

/**
 * ==========================================================
 * PARTICIPANT
 * ==========================================================
 */

export {
  DashboardPage as ParticipantDashboardPage,
  SchemesPage,
  LearningPage,
  TrainingInfoPage,
  QuizPage,
  CertificatePage,
  ProfilePage,
} from "./participant";