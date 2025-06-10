import mongoose from "mongoose";
const { Schema } = mongoose;

const HealthcareFacilitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  function: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  // createdAt: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

const HealthcareFacility = mongoose.model(
  "HealthcareFacility",
  HealthcareFacilitySchema,
  "HealthcareFacility"
);

export default HealthcareFacility;
