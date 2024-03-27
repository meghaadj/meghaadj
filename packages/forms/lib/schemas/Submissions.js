import { Schema } from "mongoose";

const submissionSchema = new Schema({
  _id: Schema.Types.ObjectId,
  form: Schema.Types.ObjectId,
  created: Date,
  modified: Date,
  deleted: Number,
  owner: Schema.Types.ObjectId,
  data: Object,
  access: Array,
  auditTrail: Array,
});

export default submissionSchema;
