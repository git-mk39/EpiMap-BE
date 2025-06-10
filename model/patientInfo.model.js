import mongoose from "mongoose";
const { Schema } = mongoose;

const PatientInfoSchema = new Schema({
  PatientId: { type: Number, required: true },
  Patient: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Province: {
    type: [Number],
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  National: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Date: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const PatientInfo = mongoose.model("PatientInfo", PatientInfoSchema);

export default PatientInfo;
