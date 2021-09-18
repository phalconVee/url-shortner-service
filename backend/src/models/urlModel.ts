import * as mongoose from "mongoose";

export const urlSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
