import type { Note } from "@/types";

export interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  deleteLoadingId?: number | null;
  onTagSearch?: (tag: string) => void;
}
