import { Schema } from "mongoose";

const settingsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  label: String,
  value: Schema.Types.Mixed,
  description: String,
  created: Date,
  modified: Date,
});

export default settingsSchema;
