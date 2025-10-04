import { PDFDocument, degrees } from 'pdf-lib';
import { PDFFile, PDFPage, MergeSettings } from '@/types/pdf';

export async function processPDFFile(file: File): Promise<{ pageCount: number; pages: PDFPage[] }> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pageCount = pdfDoc.getPageCount();
  
  const pages: PDFPage[] = [];
  for (let i = 0; i < pageCount; i++) {
    const page = pdfDoc.getPage(i);
    const { width, height } = page.getSize();
    
    pages.push({
      id: `${file.name}-page-${i}`,
      fileId: file.name,
      pageNumber: i + 1,
      rotation: 0,
      width,
      height,
    });
  }
  
  return { pageCount, pages };
}

export async function mergePDFs(files: PDFFile[], settings: MergeSettings): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  
  if (settings.mergeType === 'vertical') {
    // Sequential concatenation
    for (const file of files) {
      const arrayBuffer = await file.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
  } else {
    // Horizontal 2-up merge
    const A4_WIDTH = 595.28; // A4 width in points
    const A4_HEIGHT = 841.89; // A4 height in points
    
    for (const file of files) {
      const arrayBuffer = await file.file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();
      
      for (let i = 0; i < pageCount; i += 2) {
        const newPage = mergedPdf.addPage([A4_WIDTH, A4_HEIGHT]);
        
        const [embeddedFirst] = await mergedPdf.embedPages([pdf.getPage(i)]);
        const firstPageSize = embeddedFirst.size();
        const scale = Math.min((A4_WIDTH / 2) / firstPageSize.width, A4_HEIGHT / firstPageSize.height);
        
        newPage.drawPage(embeddedFirst, {
          x: 0,
          y: A4_HEIGHT - (firstPageSize.height * scale),
          width: firstPageSize.width * scale,
          height: firstPageSize.height * scale,
        });
        
        if (i + 1 < pageCount) {
          const [embeddedSecond] = await mergedPdf.embedPages([pdf.getPage(i + 1)]);
          const secondPageSize = embeddedSecond.size();
          const scale2 = Math.min((A4_WIDTH / 2) / secondPageSize.width, A4_HEIGHT / secondPageSize.height);
          
          newPage.drawPage(embeddedSecond, {
            x: A4_WIDTH / 2,
            y: A4_HEIGHT - (secondPageSize.height * scale2),
            width: secondPageSize.width * scale2,
            height: secondPageSize.height * scale2,
          });
        }
      }
    }
  }
  
  return await mergedPdf.save();
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
