import mongoose, { Document } from "mongoose";

interface ICounter extends Document {
  seq: number;
}

const CounterSchema = new mongoose.Schema<ICounter>({
  seq: { type: Number, default: 0 },
});

export default mongoose.model<ICounter>("Counter", CounterSchema);
