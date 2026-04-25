import { FileUploadValue } from "@umichkisa-ds/web";

/**
 * Upload a menu image to Cloudinary via the app's API route.
 * The route is responsible for the actual Cloudinary call + signing.
 */
export async function uploadMenuImage(
  file: File,
  token: string
): Promise<FileUploadValue> {
  const timestamp = new Date().getTime();
  const fileName = `pocha-menu-${timestamp}`.replace(/ /g, "-");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("public_id", `/${fileName}`);
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
 * Delete a previously-uploaded image. Used for orphan cleanup when
 * the user cancels a menu form after uploading.
 */
export async function deleteMenuImage(
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
      console.error("Failed to delete image from Cloudinary");
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
}
