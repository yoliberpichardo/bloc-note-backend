import mongoose, { Document } from "mongoose";
import { IUser } from "./User";

export interface INote extends Document {
  title: string;
  description: string;
  user: IUser["_id"];
}

const NoteSchema = new mongoose.Schema<INote>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INote>("Note", NoteSchema);
