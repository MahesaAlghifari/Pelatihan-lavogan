import {
  dashboardActivities,
  dashboardCertificates,
  dashboardChart,
  dashboardNotifications,
  dashboardRecentParticipants,
  dashboardRecentTrainings,
  dashboardSchedules,
  dashboardStats,
  dashboardTopInstructors,
  dashboardTopTrainings,
} from "../mock";

import type {
  DashboardData,
} from "../types";

export const dashboardService = {
  getDashboard(): DashboardData {
    return {
      stats: dashboardStats,

      chart: dashboardChart,

      recentTrainings: dashboardRecentTrainings,

      recentParticipants: dashboardRecentParticipants,

      activities: dashboardActivities,

      notifications: dashboardNotifications,

      schedules: dashboardSchedules,

      topTrainings: dashboardTopTrainings,

      topInstructors: dashboardTopInstructors,

      certificates: dashboardCertificates,
    };
  },

  getStats() {
    return dashboardStats;
  },

  getChart() {
    return dashboardChart;
  },

  getRecentTrainings() {
    return dashboardRecentTrainings;
  },

  getRecentParticipants() {
    return dashboardRecentParticipants;
  },

  getActivities() {
    return dashboardActivities;
  },

  getNotifications() {
    return dashboardNotifications;
  },

  getSchedules() {
    return dashboardSchedules;
  },

  getTopTrainings() {
    return dashboardTopTrainings;
  },

  getTopInstructors() {
    return dashboardTopInstructors;
  },

  getCertificates() {
    return dashboardCertificates;
  },
};