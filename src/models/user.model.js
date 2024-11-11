import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
