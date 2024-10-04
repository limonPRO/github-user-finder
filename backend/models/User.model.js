import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "This field is required"],
    },
    lastName: {
      type: String,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
    email_verified: {
      type: Boolean
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("user", UserSchema);
