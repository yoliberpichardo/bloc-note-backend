export interface Note {
  id: string;
  title: string;
  description: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NoteStore {
  [key: string]: Note;
}

// Opcional: DTO para creación/actualización de notas
export interface CreateNoteDto {
  title: string;
  description: string;
}

export interface UpdateNoteDto {
  title?: string;
  description?: string;
}
