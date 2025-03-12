import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type DropzoneProps = {
  onSubmit: (files: FileList) => void;
};

export const Dropzone = ({ onSubmit }: DropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const selectedFilesCount = fileList != null ? fileList.length : 0;

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setFileList(selectedFiles);
  };

  const handleSubmit = () => {
    if (fileList === null) return;
    onSubmit(fileList!);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors",
          isDragging && "border-primary bg-primary/5",
          !isDragging && "border-muted-foreground/25 hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}>
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-1">Choose a file or drag and drop</h3>
          <p className="text-sm text-muted-foreground mb-3 hidden">Upload up to 5 files (max 10MB each)</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
          />
          {selectedFilesCount > 0 ? (
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleSubmit();
              }}>
              Upload {selectedFilesCount} {selectedFilesCount === 1 ? "file" : "files"}
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                openFileDialog();
              }}>
              Select file
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
