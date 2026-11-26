import {
  DASHBOARD_LIMIT,
} from "../constants";

import type {
  DashboardActivityItem,
  DashboardChartData,
  DashboardNotificationItem,
  DashboardParticipant,
  DashboardScheduleItem,
  DashboardTraining,
} from "../types";

/**
 * Limit dashboard collection.
 */
export function limitDashboardItems<T>(
  items: readonly T[],
  limit = DASHBOARD_LIMIT.RECENT_TRAININGS
): T[] {
  return items.slice(0, limit);
}

/**
 * Recent trainings.
 */
export function getRecentTrainings(
  trainings: readonly DashboardTraining[]
): DashboardTraining[] {
  return limitDashboardItems(
    trainings,
    DASHBOARD_LIMIT.RECENT_TRAININGS
  );
}

/**
 * Recent participants.
 */
export function getRecentParticipants(
  participants: readonly DashboardParticipant[]
): DashboardParticipant[] {
  return limitDashboardItems(
    participants,
    DASHBOARD_LIMIT.RECENT_PARTICIPANTS
  );
}

/**
 * Recent activities.
 */
export function getRecentActivities(
  activities: readonly DashboardActivityItem[]
): DashboardActivityItem[] {
  return limitDashboardItems(
    activities,
    DASHBOARD_LIMIT.ACTIVITIES
  );
}

/**
 * Dashboard schedules.
 */
export function getRecentSchedules(
  schedules: readonly DashboardScheduleItem[]
): DashboardScheduleItem[] {
  return limitDashboardItems(
    schedules,
    DASHBOARD_LIMIT.SCHEDULES
  );
}

/**
 * Dashboard notifications.
 */
export function getRecentNotifications(
  notifications: readonly DashboardNotificationItem[]
): DashboardNotificationItem[] {
  return limitDashboardItems(
    notifications,
    DASHBOARD_LIMIT.NOTIFICATIONS
  );
}

/**
 * Total trainings.
 */
export function getTotalTrainings(
  chart: readonly DashboardChartData[]
): number {
  return chart.reduce(
    (total, item) => total + item.training,
    0
  );
}

/**
 * Total participants.
 */
export function getTotalParticipants(
  chart: readonly DashboardChartData[]
): number {
  return chart.reduce(
    (total, item) => total + item.participant,
    0
  );
}

/**
 * Latest month in chart.
 */
export function getLatestMonth(
  chart: readonly DashboardChartData[]
): string {
  const latest = chart.at(-1);

  return latest?.month ?? "-";
}

/**
 * Check chart data.
 */
export function hasChartData(
  chart: readonly DashboardChartData[]
): boolean {
  return chart.length > 0;
}

/**
 * Check widget data.
 */
export function hasItems<T>(
  items: readonly T[]
): boolean {
  return items.length > 0;
}