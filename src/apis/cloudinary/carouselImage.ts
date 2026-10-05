import { FileUploadValue } from "@umichkisa-ds/web";

/**
 * Upload a carousel image to Cloudinary's temp/ folder via the app's API
 * route. Saving the item moves it to the item's own image; `publicId` is what
 * the carousel API takes as imageTempPublicID.
 */
export async function uploadCarouselImage(
  file: File,
  token: string
): Promise<FileUploadValue> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("public_id", `carousel-${Date.now()}`);
  formData.append("folder", "temp");
  formData.append("resource_type", "image");

  const response = await fetch("/api/upload-to-cloudinary", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  const result = await response.json();
  return { url: result.secure_url, publicId: result.public_id };
}

/**
 * Delete a temp upload that was never saved (form cancelled or image swapped).
 */
export async function deleteCarouselTempImage(
  publicId: string,
  token: string
): Promise<void> {
  if (!publicId || !token) return;

  try {
    const response = await fetch("/api/delete-from-cloudinary", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok) {
      console.error("Failed to delete carousel temp image from Cloudinary");
    }
  } catch (error) {
    console.error("Error deleting carousel temp image from Cloudinary:", error);
  }
}
