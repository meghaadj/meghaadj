import mongoose from "mongoose";

const ObjectId = (str) => {
  if (mongoose.isValidObjectId(str)) {
    return new mongoose.Types.ObjectId(str);
  }
};

export default ObjectId;
