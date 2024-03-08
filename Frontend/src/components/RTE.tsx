import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormData {
  image: FileList | null;
  title: string;
  slug: string;
  content: string;
  featuredImage: string; // Allow null since it's optional
  status: string;
}

interface RtePropTypes {
  name: FieldPath<FieldValues>;
  control: Control<FieldValues> | Control<FormData>;
  label: string;
  defaultValue: string;
}

export default function RTE({
  name,
  control,
  label,
  defaultValue,
}: RtePropTypes) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control as Control<FieldValues>}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
