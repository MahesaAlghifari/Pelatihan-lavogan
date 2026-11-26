/**
 * Dashboard Configuration
 */
export const DASHBOARD_CONFIG = {
  REFRESH_INTERVAL: 60_000,

  CHART_HEIGHT: 320,

  DEFAULT_LIMIT: 5,

  DEFAULT_MONTH_COUNT: 6,
} as const;

/**
 * Dashboard Limits
 */
export const DASHBOARD_LIMIT = {
  STATS: 4,

  RECENT_TRAININGS: 5,

  RECENT_PARTICIPANTS: 5,

  RECENT_CERTIFICATES: 5,

  ACTIVITIES: 5,

  NOTIFICATIONS: 5,

  SCHEDULES: 5,

  TOP_TRAININGS: 5,

  TOP_INSTRUCTORS: 5,
} as const;

/**
 * Empty State Messages
 */
export const DASHBOARD_EMPTY_MESSAGE = {
  STATS: "No statistics available.",

  CHART: "No chart data available.",

  TRAININGS: "No recent trainings.",

  PARTICIPANTS: "No recent participants.",

  CERTIFICATES: "No recent certificates.",

  ACTIVITIES: "No recent activities.",

  NOTIFICATIONS: "No notifications.",

  SCHEDULES: "No schedule available.",
} as const;

/**
 * Widget Titles
 */
export const DASHBOARD_TITLE = {
  STATS: "Statistics",

  CHART: "Analytics",

  RECENT_TRAINING: "Recent Training",

  RECENT_PARTICIPANT: "Recent Participants",

  RECENT_CERTIFICATE: "Recent Certificates",

  ACTIVITY: "Recent Activity",

  NOTIFICATION: "Notifications",

  SCHEDULE: "Today's Schedule",

  TOP_TRAINING: "Top Training",

  TOP_INSTRUCTOR: "Top Instructor",

  CALENDAR: "Calendar",
} as const;

/**
 * Widget Description
 */
export const DASHBOARD_DESCRIPTION = {
  CHART: "Training & participant analytics",

  RECENT_TRAINING: "Latest published trainings",

  RECENT_PARTICIPANT: "Newest registered participants",

  RECENT_CERTIFICATE: "Latest generated certificates",

  ACTIVITY: "Latest platform activity",

  NOTIFICATION: "Latest notifications",

  SCHEDULE: "Today's training schedule",

  TOP_TRAINING: "Most popular trainings",

  TOP_INSTRUCTOR: "Highest performing instructors",

  CALENDAR: "Training calendar",
} as const;