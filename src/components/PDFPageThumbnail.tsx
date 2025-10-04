import { Document, Page, pdfjs } from 'react-pdf';
import { PDFPage } from '@/types/pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFPageThumbnailProps {
  fileUrl: string;
  page: PDFPage;
}

export function PDFPageThumbnail({ fileUrl, page }: PDFPageThumbnailProps) {
  return (
    <div className="glass rounded-lg p-2 hover:ring-2 hover:ring-primary transition-all">
      <div className="relative bg-white rounded overflow-hidden">
        <Document file={fileUrl}>
          <Page
            pageNumber={page.pageNumber}
            width={200}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <p className="text-xs text-center mt-2 text-muted-foreground">
        Page {page.pageNumber}
      </p>
    </div>
  );
}
