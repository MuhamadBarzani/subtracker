import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: 4,
      maxLength: 30,
    },
    email: {
      type: String,
      index: true,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      minLength: 4,
      maxLength: 40,
      match: [/\S+@\S+\.\S/, "Please Enter a Valid Email address"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
      minLength: 4,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
