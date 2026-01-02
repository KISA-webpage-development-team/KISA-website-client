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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return Response.json({ error: "No public ID provided" }, { status: 400 });
    }

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    return Response.json(result);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}
