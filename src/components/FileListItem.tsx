import { PDFFile } from '@/types/pdf';
import { Button } from '@/components/ui/button';
import { GripVertical, X, FileText } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FileListItemProps {
  file: PDFFile;
  onRemove: (id: string) => void;
}

export function FileListItem({ file, onRemove }: FileListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="glass rounded-lg p-3 flex items-center gap-3 group hover:bg-accent/50 transition-all"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="w-5 h-5" />
      </div>

      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
        <FileText className="w-5 h-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {file.pageCount} page{file.pageCount !== 1 ? 's' : ''} • {formatFileSize(file.size)}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(file.id)}
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
