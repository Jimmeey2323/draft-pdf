export interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number;
  thumbnail?: string;
  pages: PDFPage[];
}

export interface PDFPage {
  id: string;
  fileId: string;
  pageNumber: number;
  thumbnail?: string;
  rotation: number;
  width: number;
  height: number;
}

export type MergeType = 'vertical' | 'horizontal';
export type Orientation = 'portrait' | 'landscape';
export type Quality = 'draft' | 'standard' | 'high';

export interface MergeSettings {
  mergeType: MergeType;
  orientation: Orientation;
  quality: Quality;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}

export interface PreviewSettings {
  zoom: number;
  currentPage: number;
}
