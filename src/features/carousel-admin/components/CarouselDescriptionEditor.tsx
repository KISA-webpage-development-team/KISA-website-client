import { useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

// Bold, italic and underline only. `formats` also limits what a paste keeps.
const MODULES = { toolbar: [["bold", "italic", "underline"]] };
const FORMATS = ["bold", "italic", "underline"];

const TOOLBAR_LABELS: Record<string, string> = {
  ".ql-bold": "굵게",
  ".ql-italic": "기울임",
  ".ql-underline": "밑줄",
};

type CarouselDescriptionEditorProps = {
  id: string;
  label: string;
  value: string;
  invalid: boolean;
  placeholder?: string;
  /** `isUserEdit` is false when Quill rewrites the value on its own. */
  onChange: (html: string, isUserEdit: boolean) => void;
  onBlur: () => void;
};

/**
 * Restricted Quill editor for the carousel description. Client-only: load it
 * with next/dynamic and `ssr: false`.
 */
export default function CarouselDescriptionEditor({
  id,
  label,
  value,
  invalid,
  placeholder,
  onChange,
  onBlur,
}: CarouselDescriptionEditorProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<ReactQuill>(null);

  // Quill's contentEditable root has no accessible name or role of its own.
  useEffect(() => {
    const root = quillRef.current?.getEditor().root;
    if (root) {
      root.id = id;
      root.setAttribute("role", "textbox");
      root.setAttribute("aria-multiline", "true");
      root.setAttribute("aria-required", "true");
      root.setAttribute("aria-label", label);
    }
    Object.entries(TOOLBAR_LABELS).forEach(([selector, buttonLabel]) => {
      wrapperRef.current
        ?.querySelector(selector)
        ?.setAttribute("aria-label", buttonLabel);
    });
  }, [id, label]);

  useEffect(() => {
    quillRef.current
      ?.getEditor()
      .root.setAttribute("aria-invalid", String(invalid));
  }, [invalid]);

  return (
    <div
      ref={wrapperRef}
      data-invalid={invalid}
      className="carousel-description-editor type-body-sm text-foreground [&_.ql-toolbar]:rounded-t-md [&_.ql-container]:rounded-b-md [&_.ql-editor]:min-h-40"
    >
      <style jsx global>{`
        .carousel-description-editor .ql-toolbar.ql-snow {
          border-color: var(--color-border);
          font-family: inherit;
        }

        .carousel-description-editor .ql-container.ql-snow {
          border-color: var(--color-border);
          font: inherit;
        }

        .carousel-description-editor:focus-within .ql-toolbar.ql-snow,
        .carousel-description-editor:focus-within .ql-container.ql-snow {
          border-color: var(--color-brand-primary);
        }

        .carousel-description-editor[data-invalid="true"]
          .ql-container.ql-snow {
          border-color: var(--color-error);
        }

        .carousel-description-editor .ql-editor {
          padding: 0.5rem 0.75rem;
        }

        .carousel-description-editor .ql-editor.ql-blank::before {
          left: 0.75rem;
          right: 0.75rem;
          color: var(--color-muted-foreground);
          font-style: normal;
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={MODULES}
        formats={FORMATS}
        placeholder={placeholder}
        value={value}
        onChange={(html: string, _delta: unknown, source: string) =>
          onChange(html, source === "user")
        }
        onBlur={() => onBlur()}
      />
    </div>
  );
}
