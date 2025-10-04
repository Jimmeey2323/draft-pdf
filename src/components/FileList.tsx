import { PDFFile } from '@/types/pdf';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { FileListItem } from './FileListItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface FileListProps {
  files: PDFFile[];
  onReorder: (files: PDFFile[]) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function FileList({ files, onReorder, onRemove, onClearAll }: FileListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = files.findIndex((f) => f.id === active.id);
      const newIndex = files.findIndex((f) => f.id === over.id);
      onReorder(arrayMove(files, oldIndex, newIndex));
    }
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{files.length} file{files.length !== 1 ? 's' : ''}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {files.map((file) => (
              <FileListItem key={file.id} file={file} onRemove={onRemove} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
