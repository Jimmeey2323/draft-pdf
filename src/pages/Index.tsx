import { useState } from 'react';
import { FileUploadZone } from '@/components/FileUploadZone';
import { FileList } from '@/components/FileList';
import { MergeSettings } from '@/components/MergeSettings';
import { PDFPreview } from '@/components/PDFPreview';
import { Button } from '@/components/ui/button';
import { PDFFile, MergeSettings as MergeSettingsType } from '@/types/pdf';
import { processPDFFile, mergePDFs, downloadPDF } from '@/lib/pdfProcessor';
import { useToast } from '@/hooks/use-toast';
import { FileStack, Download } from 'lucide-react';

const Index = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const { toast } = useToast();

  const [mergeSettings, setMergeSettings] = useState<MergeSettingsType>({
    mergeType: 'vertical',
    orientation: 'portrait',
    quality: 'standard',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  });

  const handleFilesSelected = async (newFiles: File[]) => {
    setIsProcessing(true);
    
    try {
      const processedFiles: PDFFile[] = [];
      
      for (const file of newFiles) {
        if (file.size > 50 * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds 50MB limit`,
            variant: 'destructive',
          });
          continue;
        }

        const { pageCount, pages } = await processPDFFile(file);
        
        processedFiles.push({
          id: `${file.name}-${Date.now()}`,
          file,
          name: file.name,
          size: file.size,
          pageCount,
          pages,
        });
      }

      setFiles((prev) => [...prev, ...processedFiles]);
      
      toast({
        title: 'Files uploaded',
        description: `${processedFiles.length} file${processedFiles.length !== 1 ? 's' : ''} processed successfully`,
      });
    } catch (error) {
      toast({
        title: 'Processing failed',
        description: 'Failed to process PDF files',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMergeAndDownload = async () => {
    if (files.length === 0) {
      toast({
        title: 'No files',
        description: 'Please upload at least one PDF file',
        variant: 'destructive',
      });
      return;
    }

    setIsMerging(true);
    
    try {
      const mergedPdf = await mergePDFs(files, mergeSettings);
      downloadPDF(mergedPdf, 'merged-document.pdf');
      
      toast({
        title: 'Success',
        description: 'PDF merged and downloaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Merge failed',
        description: 'Failed to merge PDF files',
        variant: 'destructive',
      });
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileStack className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">PDF Manipulator</h1>
          </div>
          
          <Button
            onClick={handleMergeAndDownload}
            disabled={files.length === 0 || isMerging}
            size="lg"
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            {isMerging ? 'Merging...' : 'Merge & Download'}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Left Sidebar - Upload & Files */}
          <div className="lg:col-span-3 space-y-6 overflow-y-auto">
            <FileUploadZone
              onFilesSelected={handleFilesSelected}
              isProcessing={isProcessing}
            />
            <FileList
              files={files}
              onReorder={setFiles}
              onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
              onClearAll={() => setFiles([])}
            />
          </div>

          {/* Center - Preview */}
          <div className="lg:col-span-6 overflow-y-auto">
            <PDFPreview files={files} />
          </div>

          {/* Right Sidebar - Settings */}
          <div className="lg:col-span-3 overflow-y-auto">
            <div className="glass rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Merge Settings</h2>
              <MergeSettings settings={mergeSettings} onChange={setMergeSettings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
