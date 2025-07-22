import mongoose, { Document } from "mongoose";
import { IUser } from "./User";
import Counter from "./Counter";

export interface INote extends Document {
  id: string; // ID autoincremental (numérico)
  title: string;
  description: string;
  user: IUser["_id"];
}

const NoteSchema = new mongoose.Schema<INote>(
  {
    id: { type: String, unique: true }, // Campo autoincremental
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

// Middleware para autoincrementar antes de guardar
NoteSchema.pre<INote>("save", async function (next) {
  if (!this.isNew) return next(); // Solo aplica a nuevos documentos

  try {
    const counter = await Counter.findOneAndUpdate(
      {}, // Filtro vacío para obtener el contador
      { $inc: { seq: 1 } }, // Incrementa el contador
      { new: true, upsert: true } // Crea el contador si no existe
    );

    this.id = `${counter.seq}`; // Asigna el valor autoincremental
    next();
  } catch (err) {
    next(err as Error);
  }
});

export default mongoose.model<INote>("Note", NoteSchema);
