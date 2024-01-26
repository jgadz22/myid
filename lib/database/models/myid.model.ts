import { Document, Schema, model, models } from "mongoose";

export interface IMyid extends Document {
  _id: string;
  idTitle: string;
  idNumber: string;
  imageUrl: string;
  organizer: { _id: string; firstName: string; lastName: string };
}

const MyidSchema = new Schema({
  idTitle: { type: String, required: true },
  idNumber: { type: String, required: true },
  imageUrl: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Myid = models.Myid || model("Myid", MyidSchema);

export default Myid;
