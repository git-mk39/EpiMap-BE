import mongoose from "mongoose";
const { Schema } = mongoose;

const AccountSchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin"],
  },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

const Account = mongoose.model("Admin", AccountSchema, "Admin");
export default Account;
