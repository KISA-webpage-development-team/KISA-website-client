import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
} from "@/lib/cloudinary/env";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const publicId = formData.get("public_id") as string;
    const folder = formData.get("folder") as string;
    const resourceType = formData.get("resource_type") as string;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: publicId,
          folder: folder,
          resource_type: resourceType as "image" | "video" | "raw" | "auto",
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    return Response.json(result);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
