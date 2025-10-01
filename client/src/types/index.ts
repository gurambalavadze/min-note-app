export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  title: string;
  content: string;
  tags: string[];
  _tagInput?: string; // transient UI state for tag input
}

export interface User {
  id?: number;
  name?: string;
  email: string;
  password: string;
}
