import mongoose from "mongoose";
const { Schema } = mongoose;

const LocationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "People",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const Location = mongoose.model("Location", LocationSchema, "Locations");

export default Location;
