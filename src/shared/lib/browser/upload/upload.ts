export interface ReadFileOptions {
  file: File;
}

export const upload = {
  async readAsText(
    file: File
  ): Promise<string> {
    return await file.text();
  },

  async readAsArrayBuffer(
    file: File
  ): Promise<ArrayBuffer> {
    return await file.arrayBuffer();
  },

  async readAsDataURL(
    file: File
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () =>
        resolve(reader.result as string);

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  },
};