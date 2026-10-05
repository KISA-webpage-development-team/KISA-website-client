import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  MAX_UPLOAD_BYTES,
  fitWithinLongEdge,
  prepareImageForUpload,
} from "@/utils/images/prepareImageForUpload";

describe("fitWithinLongEdge", () => {
  it("scales a landscape image down to the long edge", () => {
    expect(fitWithinLongEdge(4000, 3000, 1600)).toEqual({ width: 1600, height: 1200 });
  });

  it("scales a portrait image down to the long edge", () => {
    expect(fitWithinLongEdge(1080, 1920, 1600)).toEqual({ width: 900, height: 1600 });
  });

  it("leaves an image that already fits unchanged", () => {
    expect(fitWithinLongEdge(1200, 800, 1600)).toEqual({ width: 1200, height: 800 });
  });
});

describe("prepareImageForUpload", () => {
  let drawnSize: { width: number; height: number } | null;
  let encodedAs: { type?: string; quality?: unknown } | null;

  const stubBitmap = (width: number, height: number) =>
    vi.stubGlobal(
      "createImageBitmap",
      vi.fn().mockResolvedValue({ width, height, close: vi.fn() }),
    );

  beforeEach(() => {
    drawnSize = null;
    encodedAs = null;
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(function (
      this: HTMLCanvasElement,
    ) {
      return {
        fillRect: vi.fn(),
        drawImage: vi.fn(() => {
          drawnSize = { width: this.width, height: this.height };
        }),
        set fillStyle(_value: string) {},
      } as unknown as CanvasRenderingContext2D;
    } as never);
    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(function (
      callback: BlobCallback,
      type?: string,
      quality?: unknown,
    ) {
      encodedAs = { type, quality };
      callback(new Blob(["resized"], { type: type ?? "image/png" }));
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("uploads a small image that already fits as is", async () => {
    stubBitmap(1200, 800);
    const file = new File(["small"], "poster.png", { type: "image/png" });

    expect(await prepareImageForUpload(file)).toBe(file);
    expect(drawnSize).toBeNull();
  });

  it("shrinks a large image to 1600px on the long edge as JPEG", async () => {
    stubBitmap(4000, 3000);
    const file = new File(["big"], "photo.png", { type: "image/png" });

    const prepared = await prepareImageForUpload(file);

    expect(drawnSize).toEqual({ width: 1600, height: 1200 });
    expect(encodedAs?.type).toBe("image/jpeg");
    expect(prepared.type).toBe("image/jpeg");
    expect(prepared.name).toBe("photo.jpg");
  });

  it("re-encodes an image that fits but is too heavy to upload", async () => {
    stubBitmap(1600, 1000);
    const file = new File([new Uint8Array(MAX_UPLOAD_BYTES + 1)], "heavy.png", {
      type: "image/png",
    });

    const prepared = await prepareImageForUpload(file);

    expect(drawnSize).toEqual({ width: 1600, height: 1000 });
    expect(prepared.type).toBe("image/jpeg");
  });

  it("fails when the browser cannot read the image", async () => {
    vi.stubGlobal("createImageBitmap", vi.fn().mockRejectedValue(new Error("decode")));
    const file = new File(["?"], "broken.png", { type: "image/png" });

    await expect(prepareImageForUpload(file)).rejects.toThrow();
  });
});
