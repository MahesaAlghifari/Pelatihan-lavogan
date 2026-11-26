import type {
  DashboardActivityItem,
  DashboardCertificate,
  DashboardChartData,
  DashboardInstructor,
  DashboardNotificationItem,
  DashboardParticipant,
  DashboardScheduleItem,
  DashboardStat,
  DashboardTraining,
} from "../types";


/* -------------------------------------------------------------------------- */
/*                                   Stats                                    */
/* -------------------------------------------------------------------------- */

export const dashboardStats: DashboardStat[] = [
  {
    id: "training",

    key: "training",

    title: "Total Training",

    value: 48,

    trend: 12.4,

    description: "vs last month",
  },

  {
    id: "participant",

    key: "participant",

    title: "Participants",

    value: 1250,

    trend: 8.2,

    description: "Active learners",
  },

  {
    id: "certificate",

    key: "certificate",

    title: "Certificates",

    value: 842,

    trend: 15.1,

    description: "Issued",
  },

  {
    id: "completion",

    key: "completion",

    title: "Completion",

    value: 87,

    trend: 4.6,

    description: "Average completion",
  },
];



/* -------------------------------------------------------------------------- */
/*                                    Chart                                   */
/* -------------------------------------------------------------------------- */

export const dashboardChart: DashboardChartData[] = [
  {
    month: "Jan",
    training: 8,
    participant: 180,
  },

  {
    month: "Feb",
    training: 12,
    participant: 260,
  },

  {
    month: "Mar",
    training: 15,
    participant: 340,
  },

  {
    month: "Apr",
    training: 18,
    participant: 420,
  },

  {
    month: "May",
    training: 20,
    participant: 510,
  },

  {
    month: "Jun",
    training: 24,
    participant: 650,
  },
];



/* -------------------------------------------------------------------------- */
/*                                  Training                                  */
/* -------------------------------------------------------------------------- */

export const dashboardRecentTrainings: DashboardTraining[] = [
  {
    id: "1",

    title: "React Fundamental",

    instructor: "John Doe",

    participant: 120,

    completion: 80,

    status: "published",
  },

  {
    id: "2",

    title: "UI/UX Design",

    instructor: "Jane Smith",

    participant: 98,

    completion: 72,

    status: "published",
  },

  {
    id: "3",

    title: "Laravel Advanced",

    instructor: "Michael Tan",

    participant: 74,

    completion: 63,

    status: "draft",
  },
];



/* -------------------------------------------------------------------------- */
/*                                Participant                                 */
/* -------------------------------------------------------------------------- */

export const dashboardRecentParticipants: DashboardParticipant[] = [
  {
    id: "1",

    name: "Ahmad Fauzan",

    email: "ahmad@example.com",

    training: "React Fundamental",
  },

  {
    id: "2",

    name: "Siti Nurhaliza",

    email: "siti@example.com",

    training: "UI/UX Design",
  },

  {
    id: "3",

    name: "Budi Santoso",

    email: "budi@example.com",

    training: "Laravel Advanced",
  },
];



/* -------------------------------------------------------------------------- */
/*                                  Activity                                  */
/* -------------------------------------------------------------------------- */

export const dashboardActivities: DashboardActivityItem[] = [
  {
    id: "1",

    title: "New Participant",

    description:
      "Ahmad Fauzan joined React Fundamental.",

    time: "5 minutes ago",

    type: "participant",
  },

  {
    id: "2",

    title: "Training Published",

    description:
      "UI/UX Design has been published.",

    time: "30 minutes ago",

    type: "training",
  },

  {
    id: "3",

    title: "Certificate Issued",

    description:
      "Certificate generated successfully.",

    time: "1 hour ago",

    type: "certificate",
  },
];



/* -------------------------------------------------------------------------- */
/*                               Notification                                 */
/* -------------------------------------------------------------------------- */

export const dashboardNotifications:
  DashboardNotificationItem[] = [

  {
    id: "1",

    title: "New Participant",

    description:
      "Ahmad Fauzan joined React Fundamental.",

    time: "5 minutes ago",

    isRead: false,
  },

  {
    id: "2",

    title: "Training Published",

    description:
      "UI/UX Design has been published.",

    time: "30 minutes ago",

    isRead: false,
  },

  {
    id: "3",

    title: "Quiz Completed",

    description:
      "Laravel Advanced quiz completed.",

    time: "1 hour ago",

    isRead: true,
  },
];



/* -------------------------------------------------------------------------- */
/*                                  Schedule                                  */
/* -------------------------------------------------------------------------- */

export const dashboardSchedules:
  DashboardScheduleItem[] = [

  {
    id: "1",

    title: "React Fundamental",

    instructor: "John Doe",

    date: "2026-08-05",

    time: "09:00 WIB",

    location: "Online",
  },

  {
    id: "2",

    title: "UI/UX Design",

    instructor: "Jane Smith",

    date: "2026-08-06",

    time: "13:00 WIB",

    location: "Lab Komputer",
  },

  {
    id: "3",

    title: "Laravel Advanced",

    instructor: "Michael Tan",

    date: "2026-08-07",

    time: "08:30 WIB",

    location: "Room A",
  },
];



/* -------------------------------------------------------------------------- */
/*                               Top Training                                */
/* -------------------------------------------------------------------------- */

export const dashboardTopTrainings:
  DashboardTraining[] = [

  {
    id: "1",

    title: "React Fundamental",

    instructor: "John Doe",

    participant: 420,

    completion: 95,

    status: "published",
  },

  {
    id: "2",

    title: "UI/UX Design",

    instructor: "Jane Smith",

    participant: 380,

    completion: 91,

    status: "published",
  },

  {
    id: "3",

    title: "Laravel Advanced",

    instructor: "Michael Tan",

    participant: 320,

    completion: 88,

    status: "published",
  },
];



/* -------------------------------------------------------------------------- */
/*                              Top Instructor                               */
/* -------------------------------------------------------------------------- */

export const dashboardTopInstructors:
  DashboardInstructor[] = [

  {
    id: "1",

    name: "John Doe",

    training: 12,

    participant: 580,

    rating: 4.9,
  },

  {
    id: "2",

    name: "Jane Smith",

    training: 10,

    participant: 510,

    rating: 4.8,
  },

  {
    id: "3",

    name: "Michael Tan",

    training: 8,

    participant: 430,

    rating: 4.7,
  },
];



/* -------------------------------------------------------------------------- */
/*                                Certificate                                */
/* -------------------------------------------------------------------------- */

export const dashboardCertificates:
  DashboardCertificate[] = [

  {
    id: "1",

    participant: "Ahmad Fauzan",

    training: "React Fundamental",

    issuedAt: "2026-08-01",

    status: "issued",
  },

  {
    id: "2",

    participant: "Siti Nurhaliza",

    training: "UI/UX Design",

    issuedAt: "2026-08-02",

    status: "issued",
  },

  {
    id: "3",

    participant: "Budi Santoso",

    training: "Laravel Advanced",

    issuedAt: "2026-08-03",

    status: "pending",
  },
];