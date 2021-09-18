import * as mongoose from "mongoose";

export const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});
