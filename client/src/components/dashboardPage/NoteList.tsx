import { List } from "@/components/List";
import { FileEdit } from "lucide-react";
import { NoteCard } from "./NoteCard";

interface NoteListProps {
  notes: any[];
  onEdit: (note: any) => void;
  onDelete: (note: any) => void;
  deleteLoadingId?: number | null;
  onTagSearch?: (tag: string) => void;
}

export function NoteList(props: NoteListProps) {
  const { notes, onEdit, onDelete, deleteLoadingId, onTagSearch } = props;
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileEdit className="h-16 w-16 text-blue-400 mb-4" />
        <span className="text-blue-400 text-2xl font-semibold">
          No notes found. Create your first note!
        </span>
      </div>
    );
  }
  return (
    <List
      items={notes}
      renderItem={(note: any) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => onEdit(note)}
          onDelete={() => onDelete(note)}
          deleteLoading={deleteLoadingId === note.id}
          onTagSearch={onTagSearch}
        />
      )}
    />
  );
}
