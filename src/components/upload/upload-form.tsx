"use client";
import generatePdfSummary from "@/actions/upload-actions";
import UploadFormInput from "@/components/upload/upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size < 20 * 1024 * 1024,
      "File size must be less than 20mb"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF"
    ),
});

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
    },
    onUploadError: (err) => {
      console.log("error occurred while uploading", err);
      toast.error("Error occurred while uploading", {
        description: err.message,
      });
    },
    onUploadBegin: (file: string) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      console.log("Submitted");

      const formData = new FormData(e.currentTarget);

      const file = formData.get("file") as File;

      const validateFields = schema.safeParse({ file });

      console.log(validateFields, "validate fields should be console logged");

      if (!validateFields.success) {
        toast.error("❌ Something went wrong", {
          description:
            validateFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });

        setIsLoading(false);
        return;
      }

      toast.message("📄Uploading PDF...", {
        description: "We are uploading your PDF! ",
      });

      const response = await startUpload([file]);

      if (!response) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);
        return;
      }

      toast.message("📄Processing PDF", {
        description: "Hang tight! Our AI is reading through your document! ✨",
      });

      console.log(response, "response should be console logged");

      const result = await generatePdfSummary(response);

      // console.log(result, "result should be console logged");

      const { data = null, message = null } = result || {};

      // console.log(data, "data should be console logged");

      if (data) {
        toast.message("📄 Saving PDF...", {
          description: "Hang tight! We are saving your summary! ✨",
        });
        formRef.current?.reset();
        setIsLoading(false);
        if (data.summary) {
          // Handle summary data if needed
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred", error);
      formRef.current?.reset();
      toast.error("An error occurred", {
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UploadForm;
