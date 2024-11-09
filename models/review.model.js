import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Review", ReviewSchema);
