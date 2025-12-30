import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    userA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// ❗IMPORTANT -> only ONE room per pair
roomSchema.index({ userA: 1, userB: 1 }, { unique: true });

// (optional but good) helps sorting latest chats
roomSchema.index({ updatedAt: -1 });

export default mongoose.model("Room", roomSchema);
