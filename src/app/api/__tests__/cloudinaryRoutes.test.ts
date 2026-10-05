// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

const cloudinaryMock = vi.hoisted(() => ({
  config: vi.fn(),
  uploader: {
    upload_stream: vi.fn(),
    destroy: vi.fn(),
  },
  utils: { api_sign_request: vi.fn() },
}));

vi.mock("cloudinary", () => ({ v2: cloudinaryMock }));
vi.mock("@/lib/admin/requireAdmin", () => ({ requireAdmin: vi.fn() }));

import { requireAdmin } from "@/lib/admin/requireAdmin";
import { DELETE as deleteImage } from "@/app/api/delete-from-cloudinary/route";
import { POST as signParams } from "@/app/api/sign-cloudinary-params/route";
import { POST as uploadImage } from "@/app/api/upload-to-cloudinary/route";

const denied = () => Response.json({ error: "Unauthorized" }, { status: 401 });

function uploadRequest() {
  const formData = new FormData();
  formData.append("file", new File(["x"], "x.png", { type: "image/png" }));
  formData.append("public_id", "/x");
  formData.append("folder", "temp");
  formData.append("resource_type", "image");
  return new Request("http://localhost/api/upload-to-cloudinary", {
    method: "POST",
    body: formData,
  });
}

function jsonRequest(path: string, method: string, body: unknown) {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("Cloudinary route handlers reject non-admins", () => {
  beforeEach(() => {
    vi.mocked(requireAdmin).mockReset().mockResolvedValue(denied());
  });

  it("upload-to-cloudinary", async () => {
    const response = await uploadImage(uploadRequest());
    expect(response.status).toBe(401);
    expect(cloudinaryMock.uploader.upload_stream).not.toHaveBeenCalled();
  });

  it("delete-from-cloudinary", async () => {
    const response = await deleteImage(
      jsonRequest("/api/delete-from-cloudinary", "DELETE", {
        publicId: "pocha/menu-1",
      }),
    );
    expect(response.status).toBe(401);
    expect(cloudinaryMock.uploader.destroy).not.toHaveBeenCalled();
  });

  it("sign-cloudinary-params", async () => {
    const response = await signParams(
      jsonRequest("/api/sign-cloudinary-params", "POST", {
        paramsToSign: { public_id: "x", timestamp: 1 },
      }),
    );
    expect(response.status).toBe(401);
    expect(cloudinaryMock.utils.api_sign_request).not.toHaveBeenCalled();
  });
});
