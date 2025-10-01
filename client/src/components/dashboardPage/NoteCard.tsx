import { IconButton } from "@/components/IconButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Note } from "@/types";
import { Edit, Trash2 } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  deleteLoading?: boolean;
  onTagSearch?: (tag: string) => void;
}

export function NoteCard({ note, onEdit, onDelete, onTagSearch }: NoteCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {note.tags.map((tag, idx) => (
            <span
              key={tag + idx}
              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200 text-xs"
              onClick={() => {
                if (typeof onTagSearch === "function") onTagSearch(tag);
              }}
              title={`Search for tag: ${tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-2 whitespace-pre-line">{note.content}</div>
        <div className="flex flex-wrap justify-end gap-2">
          <IconButton variant="outline" onClick={onEdit} icon={<Edit className="h-5 w-5" />}>
            Edit
          </IconButton>
          <IconButton
            variant="destructive"
            onClick={onDelete}
            icon={<Trash2 className="h-5 w-5" />}
          >
            Delete
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}
