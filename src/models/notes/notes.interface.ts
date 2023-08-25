export interface NoteData {
  body?: string;
  tags?: string[];
  createdAt?: number;
  id?: string;
  isEncrypted?: boolean;
  title?: string;
  updatedAt?: number;
  userId?: string;
}

export interface MenuBottomSheetProps {
  testID?: string;
  noteId: string;
  body: string;
  title: string;
  isEncrypted: boolean;
  isFavourite: boolean;
  toggleEditingMode: () => void;
}
