import { IconButton } from "@/components/IconButton";
import { Input } from "@/components/ui/input";
import type { NewNote } from "@/types";
import { Save, XCircle } from "lucide-react";

interface NoteFormProps {
  note: NewNote;
  onChange: (note: NewNote) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  loading?: boolean;
  isEdit?: boolean;
}

export function NoteForm({ note, onChange, onSubmit, onCancel, loading, isEdit }: NoteFormProps) {
  return (
    <form className="space-y-2" onSubmit={onSubmit}>
      <Input
        placeholder="Title"
        value={note.title}
        onChange={(e) => onChange({ ...note, title: e.target.value })}
        required
      />
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {Array.isArray(note.tags) &&
            note.tags.map((tag, idx) => (
              <span
                key={tag + idx}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200"
                onClick={() => {
                  // Remove tag chip
                  const newTags = note.tags.filter((_, i) => i !== idx);
                  onChange({ ...note, tags: newTags });
                }}
                title="Remove tag"
              >
                {tag}
                <span className="ml-1 text-xs">×</span>
              </span>
            ))}
        </div>
        <Input
          placeholder="Type tag and press space"
          value={note._tagInput || ""}
          onChange={(e) => {
            const value = e.target.value;
            // If space is entered, add tag
            if (value.endsWith(" ")) {
              const newTag = value.trim();
              if (newTag && (!note.tags || !note.tags.includes(newTag))) {
                onChange({
                  ...note,
                  tags: [...(note.tags || []), newTag],
                  _tagInput: "",
                });
              } else {
                onChange({ ...note, _tagInput: "" });
              }
            } else {
              onChange({ ...note, _tagInput: value });
            }
          }}
        />
      </div>
      <textarea
        className="w-full rounded border p-2"
        placeholder="Content"
        value={note.content}
        onChange={(e) => onChange({ ...note, content: e.target.value })}
        required
        rows={4}
      />
      <div className="flex gap-2">
        <IconButton type="submit" icon={<Save className="h-5 w-5" />}>
          {isEdit ? "Update" : "Save"}
        </IconButton>
        <IconButton
          type="button"
          variant="outline"
          onClick={onCancel}
          icon={<XCircle className="h-5 w-5" />}
          disabled={loading}
        >
          Cancel
        </IconButton>
      </div>
    </form>
  );
}
