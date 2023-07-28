export interface NoteData {
  body: string;
  categories?: string[];
  createdAt?: number;
  id?: string;
  isEncrypted?: boolean;
  title: string;
  updatedAt?: number;
  userId?: string;
}
