import * as mongoose from "mongoose";

export const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
  },
  urlCode: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  clickCount: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
