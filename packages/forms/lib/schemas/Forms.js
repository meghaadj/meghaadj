import { Schema } from "mongoose";

const formSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  path: String,
  created: Date,
  modified: Date,
  deleted: Number,
  useToasts: Boolean,
  collectionName: String,
  components: Array,
  access: Array,
  version: Number,
  tags: [String],
  actions: [
    {
      on: [String],
      path: String,
    },
  ],
});

export default formSchema;
