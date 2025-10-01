import { Loader } from "@/components/Loader";
import { DashboardHeader, NoteForm, NoteList } from "@/components/dashboardPage";
import { TagSearchInput } from "@/components/dashboardPage/TagSearchInput";
import { createNote, deleteNote, fetchNotesByTags, updateNote } from "@/lib/notesApi";
import type { NewNote, Note } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, Toaster } from "sonner";
export default function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Use toast directly for notifications
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [newNote, setNewNote] = useState<NewNote>({
    title: "",
    content: "",
    tags: [],
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editNote, setEditNote] = useState<NewNote>({
    title: "",
    content: "",
    tags: [],
  });
  const [editNoteId, setEditNoteId] = useState<number | null>(null);

  // Fetch notes by tags
  const {
    data: notes = [],
    isLoading,
    error: queryError,
  } = useQuery<Note[]>({
    queryKey: ["notes", { tags: searchTags }],
    queryFn: () => fetchNotesByTags(searchTags),
  });

  const createMutation = useMutation({
    mutationFn: async (note: NewNote) => createNote(note),
    onSuccess: () => {
      toast.success("Note created successfully!", {
        position: "bottom-right",
        duration: 5000,
      });
      setNewNote({ title: "", content: "", tags: [] });
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Failed to create note.", {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });
  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMutation.mutate({
      ...newNote,
      tags:
        typeof newNote.tags === "string"
          ? (newNote.tags as string)
              .split(",")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : newNote.tags,
    });
  };

  // Update note mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, note }: { id: number; note: NewNote }) => updateNote(id, note),
    onSuccess: () => {
      toast.success("Note updated successfully!", {
        position: "bottom-right",
        duration: 5000,
      });
      setEditNoteId(null);
      setEditNote({ title: "", content: "", tags: [] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Failed to update note.", {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });
  const handleEditNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editNoteId) {
      updateMutation.mutate({
        id: editNoteId,
        note: {
          ...editNote,
          tags:
            typeof editNote.tags === "string"
              ? (editNote.tags as string)
                  .split(",")
                  .map((t: string) => t.trim())
                  .filter(Boolean)
              : editNote.tags,
        },
      });
    }
  };

  // Delete note mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => deleteNote(id),
    onSuccess: () => {
      toast.success("Note deleted successfully!", {
        position: "bottom-right",
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete note.", {
        position: "bottom-right",
        duration: 5000,
      });
    },
  });
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // Start editing
  const startEdit = (note: Note) => {
    setEditNoteId(note.id);
    setEditNote({
      title: note.title,
      content: note.content,
      tags: note.tags,
    });
  };

  // Notes are already filtered by backend
  const filteredNotes = notes;

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <DashboardHeader
          onNewNote={() => setShowForm(true)}
          onLogout={() => {
            localStorage.removeItem("access_token");
            navigate("/signin");
          }}
          searchTags={searchTags}
          onSearchTagsChange={setSearchTags}
        />
        {/* Search input row above notes */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative w-full flex items-center border rounded px-3 py-2 bg-white">
            <TagSearchInput searchTags={searchTags} onSearchTagsChange={setSearchTags} />
          </div>
        </div>
        <Toaster richColors position="bottom-right" />
        {isLoading && <Loader className="mx-auto mb-2" />}
        {queryError &&
          toast.error((queryError as Error).message, {
            position: "bottom-right",
            duration: 5000,
          })}
        {showForm && (
          <NoteForm
            note={newNote}
            onChange={setNewNote}
            onSubmit={handleAddNote}
            onCancel={() => setShowForm(false)}
            loading={createMutation.isPending}
            isEdit={false}
          />
        )}
        {editNoteId !== null && (
          <NoteForm
            note={editNote}
            onChange={setEditNote}
            onSubmit={handleEditNote}
            onCancel={() => setEditNoteId(null)}
            loading={updateMutation.isPending}
            isEdit={true}
          />
        )}
        {/* Only show NoteList if not loading and not creating a note */}
        {!isLoading && !showForm && (
          <NoteList
            notes={filteredNotes}
            onEdit={startEdit}
            onDelete={(note) => handleDelete(note.id)}
            deleteLoadingId={
              deleteMutation.isPending
                ? typeof deleteMutation.variables === "number"
                  ? deleteMutation.variables
                  : null
                : null
            }
            onTagSearch={(tag) => {
              if (!searchTags.includes(tag)) {
                setSearchTags([...searchTags, tag]);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
