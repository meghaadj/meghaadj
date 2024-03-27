import { Schema } from "mongoose";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  form: Schema.Types.ObjectId,
  created: Date,
  modified: Date,
  deleted: Number,
  data: Object,
  access: Array,
  roles: Array,
  auditTrail: Array,
  owner: Schema.Types.ObjectId,
});

export default userSchema;
