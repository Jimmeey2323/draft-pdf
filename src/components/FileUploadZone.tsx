import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export function FileUploadZone({ onFilesSelected, isProcessing }: FileUploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true,
    disabled: isProcessing,
  });

  return (
    <div
      {...getRootProps()}
      className={`glass rounded-lg border-2 border-dashed p-8 text-center transition-all cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
      <p className="text-lg font-medium mb-2">
        {isDragActive ? 'Drop PDF files here' : 'Drag & drop PDF files'}
      </p>
      <p className="text-sm text-muted-foreground">
        or click to browse (max 50MB per file)
      </p>
    </div>
  );
}
