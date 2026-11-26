export function notificationLabel(
  total: number
) {
  return `${total} Notifications`;
}

export function hasNotification(
  total: number
) {
  return total > 0;
}