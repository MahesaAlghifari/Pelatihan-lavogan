export function getFileExtension(
  filename: string
): string {
  return filename.split(".").pop() ?? "";
}

export function getFileName(
  filename: string
): string {
  return filename.replace(/\.[^/.]+$/, "");
}