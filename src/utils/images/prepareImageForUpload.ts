// Shrinks an image in the browser before it is uploaded through the app's
// /api/upload-to-cloudinary route, so any size an admin picks fits the
// route's request limit.

// Long edge of the uploaded image: the width the carousel serves
// (c_limit,w_1600), and the cap used when public/ images were shrunk.
export const MAX_LONG_EDGE = 1600;

// Vercel caps a function's request body at 4.5 MB; leave room for the
// multipart overhead around the file.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// Same quality as the public/ image shrink (80).
const JPEG_QUALITY = 0.8;

export function fitWithinLongEdge(
  width: number,
  height: number,
  maxEdge: number
): { width: number; height: number } {
  const scale = Math.min(1, maxEdge / Math.max(width, height));
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

function toJpegName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "");
  return `${base || "image"}.jpg`;
}

/**
 * Returns the file to upload: the original when it already fits within
 * MAX_LONG_EDGE and MAX_UPLOAD_BYTES, otherwise a JPEG resized to fit.
 * Transparent areas become white. Throws when the browser cannot read the
 * image or the result is still too large.
 */
export async function prepareImageForUpload(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  try {
    const fitsAlready =
      Math.max(bitmap.width, bitmap.height) <= MAX_LONG_EDGE &&
      file.size <= MAX_UPLOAD_BYTES;
    if (fitsAlready) return file;

    const { width, height } = fitWithinLongEdge(
      bitmap.width,
      bitmap.height,
      MAX_LONG_EDGE
    );
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not available");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
    );
    if (!blob) throw new Error("Image could not be encoded");
    if (blob.size > MAX_UPLOAD_BYTES) throw new Error("Image is still too large");

    return new File([blob], toJpegName(file.name), { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}
