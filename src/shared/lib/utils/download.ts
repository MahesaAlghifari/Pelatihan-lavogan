export function openUrl(
  url: string,
  target: "_self" | "_blank" = "_blank"
) {
  window.open(url, target);
}