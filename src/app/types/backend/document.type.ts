export interface IDocument {
  _id?: string;
  title: string;
  document: string | File;
  thumbnail: string | File
  type: 'pdf' | 'excel' | 'word';
}
