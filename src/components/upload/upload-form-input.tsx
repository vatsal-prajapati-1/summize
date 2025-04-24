"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef, useState } from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [fileError, setFileError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.name.endsWith('.pdf')) {
        setFileError('Only PDF files are allowed');
      } else {
        setFileError(null);
      }
    };

    return (
      <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end items-center gap-1.5">
            <Input
              id="file"
              type="file"
              name="file"
              accept="application/pdf"
              required
              className={cn(
                isLoading && "opacity-50 cursor-not-allowed",
                fileError && "border-destructive"
              )}
              disabled={isLoading}
              onChange={handleFileChange}
              aria-describedby="file-error"
            />
            <Button 
              disabled={isLoading || !!fileError} 
              type="submit"
              className="min-w-[120px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                "Upload PDF"
              )}
            </Button>
          </div>
          {fileError && (
            <p id="file-error" className="text-sm text-destructive text-right">
              {fileError}
            </p>
          )}
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
