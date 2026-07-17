import * as React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "../../utilities/cn";

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  className?: string;
}

export function FileUpload({
  accept,
  multiple,
  disabled,
  onFilesSelected,
  label = "Click to upload or drag and drop",
  helperText,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const openBrowser = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    onFilesSelected(Array.from(fileList));
  };

  return (
    <div className={className}>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={openBrowser}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openBrowser();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (!disabled) handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-8 text-center",
          "border-border-strong bg-surface transition-colors duration-fast ease-standard cursor-pointer",
          "hover:bg-surface-raised",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          isDragOver && "bg-surface-raised border-text-secondary",
          disabled && "pointer-events-none opacity-disabled",
        )}
      >
        <UploadCloud className="size-6 text-text-muted" aria-hidden="true" />
        <p className="text-body-sm text-text-primary">{label}</p>
        {helperText && <p className="text-caption text-text-secondary">{helperText}</p>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
