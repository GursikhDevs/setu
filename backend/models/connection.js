import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
userA: { type:mongoose.Schema.Types.ObjectId, ref: "User", required: true },//min(_id)
  userB: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // max(_id)
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //who sent req
  status: { type: String, enum: ["pending", "accepted", "declined", "blocked" ], default: "pending" },
  acceptedAt: { type: Date, default: null},
},
{ timestamps: true }
);



ConnectionSchema.pre("validate", function(next) {
  const a = this.userA?.toString();
  const b = this.userB?.toString();
  if (!a || !b) return next(new Error("userA and userB required"));
  if (a === b) return next(new Error("Cannot connect to self"));
  if (a > b) [this.userA, this.userB] = [this.userB, this.userA];
  next();
});

// hard guarantees
ConnectionSchema.index({ userA: 1, userB: 1 }, { unique: true });
// common queries
ConnectionSchema.index({ status: 1, userA: 1, updatedAt: -1 });
ConnectionSchema.index({ status: 1, userB: 1, updatedAt: -1 });
ConnectionSchema.index({ requester: 1, status: 1, updatedAt: -1 });

export default mongoose.model("Connection", ConnectionSchema);