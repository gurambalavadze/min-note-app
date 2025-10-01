export async function fetchNotesByTags(tags: string[]): Promise<Note[]> {
  const query = tags.length > 0 ? `?tags=${tags.join(",")}` : "";
  const res = await fetch(`${NOTES_BASE_URL}${query}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch notes by tags");
  return res.json();
}
import type { NewNote, Note } from "@/types";
import { API_BASE_URL } from "./api";

const NOTES_BASE_URL = `${API_BASE_URL}/notes`;

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(NOTES_BASE_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function createNote(note: NewNote): Promise<Note> {
  const res = await fetch(NOTES_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(id: number, note: NewNote): Promise<Note> {
  const res = await fetch(`${NOTES_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id: number): Promise<void> {
  const res = await fetch(`${NOTES_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete note");
}
