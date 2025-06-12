import mongoose from "mongoose";
const { Schema } = mongoose;

const PeopleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Nam", "Nữ"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const People = mongoose.model("People", PeopleSchema, "People");

export default People;