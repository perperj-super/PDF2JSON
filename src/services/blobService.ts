// External Dependencies
import { put } from '@vercel/blob';

export const uploadToBlob = async (fileName: string, fileBuffer: Buffer) => {
  try {
    const { url, pathname, downloadUrl } = await put(fileName, fileBuffer, {
      access: 'public',
      addRandomSuffix: true,
    });

    return {
      url,
      pathname,
      downloadUrl,
    };
  } catch (error: unknown) {
    console.error('Blob upload failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to upload file: ${errorMessage}`);
  }
};
