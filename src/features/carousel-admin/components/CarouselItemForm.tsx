"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useSWRConfig } from "swr";
import { format, parse, startOfDay } from "date-fns";
import { Form, useForm } from "@umichkisa-ds/form";
import {
  Button,
  Card,
  CardTitle,
  DatePicker,
  DialogFooter,
  FileUpload,
  type FileUploadMessages,
  FileUploadValue,
  FormItem,
  Grid,
  LoadingSpinner,
  toast,
} from "@umichkisa-ds/web";

import {
  deleteCarouselTempImage,
  uploadCarouselImage,
} from "@/apis/cloudinary/carouselImage";
import { prepareImageForUpload } from "@/utils/images/prepareImageForUpload";
import {
  createCarouselItem,
  updateCarouselItem,
} from "@/apis/carousel/mutations";
import { ADMIN_CAROUSEL_URL } from "@/apis/carousel/swrHooks";
import type { CustomAxiosError } from "@/lib/axios/types";
import type {
  AdminCarouselItem,
  CarouselItem,
  CarouselItemFields,
} from "@/types/carousel";
import CarouselSlidePreview from "./CarouselSlidePreview";

// Quill touches `document` on import — client-only.
const CarouselDescriptionEditor = dynamic(
  () => import("./CarouselDescriptionEditor"),
  { ssr: false },
);

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const IMAGE_UPLOAD_MESSAGES: FileUploadMessages = {
  clickToUpload: "눌러서 업로드",
  uploadLabel: "이미지 업로드",
  removeLabel: "이미지 삭제",
  invalidType: () => "JPEG, PNG, WebP 이미지만 올릴 수 있습니다.",
  uploadFailed: "이미지 업로드에 실패했습니다.",
  removeFailed: "이미지를 삭제하지 못했습니다.",
};

// Transparent 1x1 GIF: keeps the preview's 3:2 frame empty until an upload.
const EMPTY_IMAGE_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const DESCRIPTION_ID = "carousel-item-description";

type CarouselItemFormValues = {
  title: string;
  description: string;
  link: string;
  /** Existing images (edit, template source) have an empty publicId. */
  image: FileUploadValue | null;
  endDate: Date | undefined;
};

type CarouselItemFormProps = {
  mode: "create" | "edit";
  /** The edited item, or in create mode the use-as-template source. */
  initialItem: AdminCarouselItem | undefined;
  token: string | undefined;
  /** The cancel button. The container confirms when there are changes. */
  onCancel: () => void;
  onSaved: () => void;
  onDirtyChange: (isDirty: boolean) => void;
};

const isRichTextEmpty = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim() === "";

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname !== ""
    );
  } catch {
    return false;
  }
};

const formatEndDate = (date: Date) => format(date, "yyyy.MM.dd");

const titleRules = {
  required: "제목을 입력하세요.",
  validate: (value: string) => value.trim() !== "" || "제목을 입력하세요.",
};

const linkRules = {
  validate: (value: string) =>
    value.trim() === "" ||
    isHttpUrl(value.trim()) ||
    "http:// 또는 https://로 시작하는 전체 주소를 입력하세요.",
};

const createEndDateRules = {
  validate: (value: Date | undefined) =>
    value === undefined ||
    value >= startOfDay(new Date()) ||
    "종료일은 오늘 이후여야 합니다.",
};

const descriptionRules = {
  validate: (value: string) => !isRichTextEmpty(value) || "설명을 입력하세요.",
};

const imageRules = {
  validate: (value: FileUploadValue | null) =>
    value !== null || "이미지를 올려 주세요.",
};

const saveErrorMessage = (error: unknown) => {
  const status = (error as CustomAxiosError).response?.status;
  if (status === 502) {
    return "이미지 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.";
  }
  if (status === 400) return "입력한 내용을 확인해 주세요.";
  return "저장에 실패했습니다.";
};

/**
 * Create / edit / use-as-template form for a home carousel item. Create lays
 * out beside a live preview of the slide; edit is the form alone, for the
 * edit dialog. Temp uploads that are replaced, removed or left unsaved are
 * deleted from Cloudinary.
 */
export default function CarouselItemForm({
  mode,
  initialItem,
  token,
  onCancel,
  onSaved,
  onDirtyChange,
}: CarouselItemFormProps) {
  const { mutate } = useSWRConfig();
  const isEdit = mode === "edit";
  const templateSourceID =
    !isEdit && initialItem ? initialItem.carouselItemID : null;

  const endDateRules = isEdit ? undefined : createEndDateRules;

  const methods = useForm<CarouselItemFormValues>({
    mode: "onTouched",
    defaultValues: {
      title: initialItem?.title ?? "",
      description: initialItem?.description ?? "",
      link: initialItem?.link ?? "",
      image: initialItem ? { url: initialItem.imageUrl, publicId: "" } : null,
      // Use as template leaves the end date empty.
      endDate:
        isEdit && initialItem?.endDate
          ? parse(initialItem.endDate, "yyyy-MM-dd", new Date())
          : undefined,
    },
  });
  const {
    register,
    setValue,
    getValues,
    resetField,
    trigger,
    watch,
    formState: { isDirty, errors },
  } = methods;

  const [isSaving, setIsSaving] = useState(false);

  const tokenRef = useRef(token);
  const isMountedRef = useRef(false);
  const isSavedRef = useRef(false);
  const deletedPublicIDsRef = useRef(new Set<string>());

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  // Fields without a DOM input of their own.
  useEffect(() => {
    register("description", descriptionRules);
    register("image", imageRules);
    register("endDate", endDateRules);
  }, [register, endDateRules]);

  const discardTempImage = useCallback((publicId: string) => {
    const currentToken = tokenRef.current;
    if (!publicId || !currentToken) return;
    if (deletedPublicIDsRef.current.has(publicId)) return;
    deletedPublicIDsRef.current.add(publicId);
    void deleteCarouselTempImage(publicId, currentToken);
  }, []);

  // Leaving the page (cancel, back, any in-app navigation) deletes an unsaved
  // temp upload.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      const image = getValues("image");
      if (!isSavedRef.current && image?.publicId) {
        discardTempImage(image.publicId);
      }
    };
  }, [getValues, discardTempImage]);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  useEffect(() => {
    if (!isDirty || isSaving) return undefined;
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Older browsers only prompt when returnValue is set.
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, isSaving]);

  const [title, description, link, image, endDate] = watch([
    "title",
    "description",
    "link",
    "image",
    "endDate",
  ]);

  const handleDescriptionChange = (html: string, isUserEdit: boolean) => {
    if (isUserEdit) {
      setValue("description", html, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    } else {
      // Quill normalizing the loaded HTML is not an edit.
      resetField("description", { defaultValue: html });
    }
  };

  const handleUpload = async (file: File): Promise<FileUploadValue> => {
    if (!token) {
      toast.error("로그인이 필요합니다.");
      throw new Error("Not logged in");
    }
    if (!(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)) {
      toast.error("JPEG, PNG, WebP 이미지만 올릴 수 있습니다.");
      throw new Error("Unsupported image type");
    }

    let prepared: File;
    try {
      prepared = await prepareImageForUpload(file);
    } catch (prepareError) {
      toast.error("이미지를 읽을 수 없습니다. 다른 파일을 선택해 주세요.");
      throw prepareError;
    }

    let uploaded: FileUploadValue;
    try {
      uploaded = await uploadCarouselImage(prepared, token);
    } catch (uploadError) {
      toast.error("이미지 업로드에 실패했습니다.");
      throw uploadError;
    }

    // The admin left while the upload was in flight.
    if (!isMountedRef.current) {
      discardTempImage(uploaded.publicId);
      throw new Error("Form closed during upload");
    }
    return uploaded;
  };

  const handleImageRemove = async (publicId: string) => {
    discardTempImage(publicId);
  };

  const handleImageChange = (next: FileUploadValue | null) => {
    const previous = getValues("image");
    if (previous?.publicId && previous.publicId !== next?.publicId) {
      discardTempImage(previous.publicId);
    }
    setValue("image", next, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleEndDateChange = (next: Date | undefined) => {
    setValue("endDate", next, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = async (values: CarouselItemFormValues) => {
    if (!token || isSaving || !values.image) return;
    setIsSaving(true);

    const fields: CarouselItemFields = {
      title: values.title.trim(),
      description: values.description,
      link: values.link.trim() || null,
      endDate: values.endDate ? format(values.endDate, "yyyy-MM-dd") : null,
    };
    const imageTempPublicID = values.image.publicId || null;

    try {
      if (isEdit && initialItem) {
        await updateCarouselItem(
          initialItem.carouselItemID,
          imageTempPublicID ? { ...fields, imageTempPublicID } : fields,
          token,
        );
      } else if (imageTempPublicID) {
        await createCarouselItem({ ...fields, imageTempPublicID }, token);
      } else if (templateSourceID !== null) {
        await createCarouselItem(
          { ...fields, copyImageFrom: templateSourceID },
          token,
        );
      } else {
        setIsSaving(false);
        return;
      }
    } catch (saveError) {
      toast.error(saveErrorMessage(saveError));
      setIsSaving(false);
      return;
    }

    isSavedRef.current = true;
    toast.success(isEdit ? "수정되었습니다." : "추가되었습니다.");
    void mutate([ADMIN_CAROUSEL_URL, token]);
    onSaved();
  };

  const previewItem: CarouselItem = {
    carouselItemID: initialItem?.carouselItemID ?? 0,
    title: title.trim() || "제목을 입력하세요",
    description: isRichTextEmpty(description)
      ? "<p>설명을 입력하세요</p>"
      : description,
    link: isHttpUrl(link.trim()) ? link.trim() : null,
    imageUrl: image?.url ?? EMPTY_IMAGE_URL,
  };

  const fields = (
    <>
      <Form.Input
        name="title"
        label="제목"
        placeholder="메인 배너에 보일 제목"
        rules={titleRules}
      />

      <FormItem
        htmlFor={DESCRIPTION_ID}
        label="설명"
        required
        error={errors.description?.message}
      >
        <CarouselDescriptionEditor
          id={DESCRIPTION_ID}
          label="설명"
          placeholder="메인 배너에 보일 설명"
          value={description}
          invalid={errors.description !== undefined}
          onChange={handleDescriptionChange}
          onBlur={() => void trigger("description")}
        />
      </FormItem>

      <Form.Input
        name="link"
        label="링크 (선택)"
        type="url"
        placeholder="https://"
        description="이미지를 누르면 이 주소가 새 창에서 열립니다."
        rules={linkRules}
      />

      <FormItem
        htmlFor="carousel-item-image"
        label="이미지"
        required
        description="JPEG, PNG, WebP · 큰 이미지는 자동으로 줄여서 올립니다 · 3:2 비율로 잘려 보입니다."
        error={errors.image?.message}
      >
        <FileUpload
          value={image}
          onChange={handleImageChange}
          onUpload={handleUpload}
          onRemove={handleImageRemove}
          accept={ACCEPTED_IMAGE_TYPES}
          disabled={isSaving}
          messages={IMAGE_UPLOAD_MESSAGES}
        />
      </FormItem>

      <FormItem
        htmlFor="endDate"
        label="종료일 (선택)"
        description="종료일이 지나면 자동으로 보관됩니다. 비워 두면 종료일 없이 게시됩니다."
        error={errors.endDate?.message}
      >
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          invalid={errors.endDate !== undefined}
          placeholder="종료일 없음"
          formatDate={formatEndDate}
          disabled={isSaving}
          // Edits keep past days: an existing item may already be past its end date.
          calendarProps={
            isEdit
              ? undefined
              : { disabled: { before: startOfDay(new Date()) } }
          }
        />
      </FormItem>
      {endDate ? (
        <div>
          <Button
            type="button"
            variant="tertiary"
            size="sm"
            onClick={() => handleEndDateChange(undefined)}
            disabled={isSaving}
          >
            종료일 지우기
          </Button>
        </div>
      ) : null}
    </>
  );

  const actions = (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        disabled={isSaving}
      >
        취소
      </Button>
      <Form.Button
        type="submit"
        variant="primary"
        disableWhenInvalid
        disabled={isSaving}
        className="gap-2"
      >
        {isSaving ? <LoadingSpinner size="sm" /> : null}
        {isSaving ? "저장 중..." : isEdit ? "저장" : "추가"}
      </Form.Button>
    </>
  );

  if (isEdit) {
    return (
      <Form
        form={methods}
        onSubmit={onSubmit}
        className="flex min-h-0 flex-col gap-4"
      >
        <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
          {fields}
        </div>
        <DialogFooter>{actions}</DialogFooter>
      </Form>
    );
  }

  return (
    <Grid columns={{ base: 1, lg: 2 }} gap="section">
      <Form form={methods} onSubmit={onSubmit} className="flex flex-col gap-4">
        {fields}
        <div className="flex justify-end gap-2">{actions}</div>
      </Form>

      <Card
        role="region"
        aria-labelledby="carousel-item-preview-heading"
        className="flex flex-col gap-4 self-start lg:sticky lg:top-6"
      >
        <CardTitle as="h2" id="carousel-item-preview-heading">
          미리보기
        </CardTitle>
        <CarouselSlidePreview item={previewItem} />
        <p className="type-caption text-muted-foreground">
          {image
            ? "홈페이지에 보이는 그대로입니다. 넘치는 제목과 설명은 잘립니다."
            : "이미지를 올리면 홈페이지와 같은 3:2 비율로 잘린 모습이 표시됩니다."}
        </p>
      </Card>
    </Grid>
  );
}
