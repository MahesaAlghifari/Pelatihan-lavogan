/* -------------------------------------------------------------------------- */
/*                                    Enums                                   */
/* -------------------------------------------------------------------------- */

export type TrainingStatus =
  | "draft"
  | "published";

export type CertificateStatus =
  | "issued"
  | "pending";

/* -------------------------------------------------------------------------- */
/*                                   Statistics                               */
/* -------------------------------------------------------------------------- */

export interface DashboardStat {

  id:
    | "training"
    | "participant"
    | "certificate"
    | "completion";


  key:
    | "training"
    | "participant"
    | "certificate"
    | "completion";


  title: string;


  value: number;


  trend: number;


  description: string;

}
export interface DashboardChartData {
  month: string;

  training: number;

  participant: number;
}

/* -------------------------------------------------------------------------- */
/*                                  Training                                  */
/* -------------------------------------------------------------------------- */

export interface DashboardTraining {
  id: string;

  title: string;

  instructor: string;

  participant: number;

  completion: number;

  status: TrainingStatus;
}

/* -------------------------------------------------------------------------- */
/*                                Participant                                 */
/* -------------------------------------------------------------------------- */

export interface DashboardParticipant {
  id: string;

  name: string;

  email: string;

  training: string;

  avatar?: string;
}

/* -------------------------------------------------------------------------- */
/*                                  Activity                                  */
/* -------------------------------------------------------------------------- */

export interface DashboardActivityItem {
  id: string;

  title: string;

  description: string;

  time: string;

  type:
    | "training"
    | "participant"
    | "certificate"
    | "system";
}

/* -------------------------------------------------------------------------- */
/*                                Notification                                */
/* -------------------------------------------------------------------------- */

export interface DashboardNotificationItem {
  id: string;

  title: string;

  description: string;

  time: string;

  isRead: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  Schedule                                  */
/* -------------------------------------------------------------------------- */

export interface DashboardScheduleItem {
  id: string;

  title: string;

  date: string;

  time: string;

  location?: string;
}

/* -------------------------------------------------------------------------- */
/*                                 Instructor                                 */
/* -------------------------------------------------------------------------- */

export interface DashboardInstructor {
  id: string;

  name: string;

  avatar?: string;

  training: number;

  participant: number;

  rating: number;
}

/* -------------------------------------------------------------------------- */
/*                                 Certificate                                */
/* -------------------------------------------------------------------------- */

export interface DashboardCertificate {
  id: string;

  participant: string;

  training: string;

  avatar?: string;

  issuedAt: string;

  status: CertificateStatus;
}

/* -------------------------------------------------------------------------- */
/*                                Dashboard Data                              */
/* -------------------------------------------------------------------------- */

export interface DashboardData {
  stats: DashboardStat[];

  chart: DashboardChartData[];

  recentTrainings: DashboardTraining[];

  recentParticipants: DashboardParticipant[];

  activities: DashboardActivityItem[];

  notifications: DashboardNotificationItem[];

  schedules: DashboardScheduleItem[];

  topTrainings: DashboardTraining[];

  topInstructors: DashboardInstructor[];

  certificates: DashboardCertificate[];
}
/* -------------------------------------------------------------------------- */
/*                                  Schedule                                  */
/* -------------------------------------------------------------------------- */

export interface DashboardScheduleItem {
  id: string;

  title: string;

  instructor: string;

  date: string;

  time: string;

  location?: string;
}