import { PDFFile } from '@/types/pdf';
import { FileText } from 'lucide-react';
import { PDFPageThumbnail } from './PDFPageThumbnail';
import { useMemo } from 'react';

interface PDFPreviewProps {
  files: PDFFile[];
}

export function PDFPreview({ files }: PDFPreviewProps) {
  const totalPages = files.reduce((sum, file) => sum + file.pageCount, 0);

  // Create file URLs for preview
  const fileUrls = useMemo(() => {
    return files.map(file => URL.createObjectURL(file.file));
  }, [files]);

  if (files.length === 0) {
    return (
      <div className="glass rounded-lg p-12 flex flex-col items-center justify-center h-full">
        <FileText className="w-20 h-20 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Preview Available</h3>
        <p className="text-muted-foreground text-center">
          Upload PDF files to see a preview
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-6 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        <p className="text-sm text-muted-foreground">
          {files.length} file{files.length !== 1 ? 's' : ''} • {totalPages} total page{totalPages !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex-1 bg-background/50 rounded-lg overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, fileIndex) => 
            file.pages.map((page) => (
              <PDFPageThumbnail
                key={page.id}
                fileUrl={fileUrls[fileIndex]}
                page={page}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
