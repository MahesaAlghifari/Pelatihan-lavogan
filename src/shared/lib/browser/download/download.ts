/**
 * Download Helper
 * --------------------------------------------------------
 * Utility functions for downloading files
 */

export interface DownloadFileOptions {
  url: string;
  filename?: string;
  target?: "_self" | "_blank";
}

export interface DownloadBlobOptions {
  blob: Blob;
  filename: string;
}

export const download = {
  /**
   * Download file from URL
   */
  fromUrl({
    url,
    filename,
    target = "_self",
  }: DownloadFileOptions): void {
    const link = document.createElement("a");

    link.href = url;
    link.target = target;

    if (filename) {
      link.download = filename;
    }

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  },

  /**
   * Download Blob
   */
  fromBlob({
    blob,
    filename,
  }: DownloadBlobOptions): void {
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = objectUrl;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(objectUrl);
  },

  /**
   * Download JSON
   */
  json(data: unknown, filename: string): void {
    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    this.fromBlob({
      blob,
      filename,
    });
  },

  /**
   * Download Text
   */
  text(text: string, filename: string): void {
    const blob = new Blob([text], {
      type: "text/plain",
    });

    this.fromBlob({
      blob,
      filename,
    });
  },
};