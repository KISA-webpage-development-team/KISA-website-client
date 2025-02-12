import React, { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { postPresignedURL, getPresignedURL } from "@/apis/images/queries";
import { putImageToS3 } from "@/apis/images/mutations";

type TextEditorProps = {
  token: string | undefined;
  text: string;
  setText: (e: string) => void;
};

export default function TextEditor({ token, text, setText }: TextEditorProps) {
  // Refers to the ReactQuill component when passed to the ref prop
  const reactQuillRef: any = useRef(null);

  // Custom toolbar image uploader
  const imageHandler = async () => {
    const quill = reactQuillRef?.current?.getEditor();

    if (!quill) return;

    // Create file holder
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple");
    input.click();

    // When file selection is submitted
    input.onchange = async () => {
      if (input.files) {
        for (const file of Array.from(input.files)) {
          // Make api call to get presigned URL
          let fileKey = `temp/${new Date().toISOString()}-${file.name}`;
          let fileType = file.type;
          const postRes = await postPresignedURL(token, {
            fileKey,
            fileType,
          });

          // Upload file to S3 using presigned URL
          await putImageToS3(postRes?.presignedURL, file);

          // Get presigned URL of uploaded image
          const getRes = await getPresignedURL(token, {
            fileKey,
            fileType,
          });

          // Insert image into editor
          const cursorPosition = quill.getSelection()?.index || 0;
          quill.insertEmbed(cursorPosition, "image", getRes?.fileURL);
          quill.setSelection(cursorPosition + 1);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["image", "link"],
          [{ size: ["small", false, "large", "huge"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "underline", "italic"],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <div className="quill-wrapper">
      <style jsx global>{`
        /* Increase default font size in the editor */
        .quill-wrapper .ql-container {
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

        /* Match the toolbar font size */
        .quill-wrapper .ql-toolbar {
          font-size: 16px;
        }

        /* Custom size classes */
        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="small"]::before {
          font-size: 14px;
          content: "Small";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item:not([data-value])::before {
          font-size: 16px;
          content: "Normal";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="large"]::before {
          font-size: 20px;
          content: "Large";
        }

        .quill-wrapper
          .ql-snow
          .ql-picker.ql-size
          .ql-picker-item[data-value="huge"]::before {
          font-size: 24px;
          content: "Huge";
        }

        /* Size classes for the editor and rendered content */
        .ql-editor p,
        .ql-editor ol,
        .ql-editor ul,
        .ql-editor pre,
        .ql-editor blockquote {
          margin-bottom: 1em;
        }

        .ql-size-small {
          font-size: 14px;
        }

        .ql-size-normal {
          font-size: 16px;
        }

        .ql-size-large {
          font-size: 20px;
        }

        .ql-size-huge {
          font-size: 24px;
        }
      `}</style>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        style={{ minHeight: 400, maxHeight: 800, height: "100%" }}
        modules={modules}
        value={text}
        onChange={(e: any) => setText(e)}
      />
    </div>
  );
}
