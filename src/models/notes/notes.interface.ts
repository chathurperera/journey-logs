export interface NoteData {
  body: string;
  categories?: string[];
  createdAt?: number;
  id?: string;
  isLocked?: boolean;
  title: string;
  updatedAt?: number;
  userId?: string;
}
