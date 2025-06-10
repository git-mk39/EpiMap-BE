import mongoose from "mongoose";
const { Schema } = mongoose;

const ControlStationSchema = new Schema({
  STT: { type: Number, required: true },
  Name: { type: String, required: true },
  Location: { type: String, required: true },
  Trajectory: {
    type: String,
    required: true,
  },
  Area: {
    type: String,
    required: true,
  },
  Contiguous_zone: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Province: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ControlStation = mongoose.model("ControlStation", ControlStationSchema);
export default ControlStation;
