// External Dependencies
import { put } from '@vercel/blob';

export const uploadToBlob = async (fileName: string, fileBuffer: Buffer) => {
  const blob = await put(fileName, fileBuffer, {
    access: 'public',
  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    downloadUrl: blob.downloadUrl,
  };
};
