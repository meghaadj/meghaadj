import { Schema } from "mongoose";

const roleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  machineName: String,
  created: Date,
  modified: Date,
  admin: Boolean,
  default: Boolean,
  deleted: Number,
  description: String,
});

export default roleSchema;
