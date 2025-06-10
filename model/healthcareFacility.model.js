import mongoose from "mongoose";
const { Schema } = mongoose;

const HealthcareFacilitySchema = new Schema({
  facilityId: { type: Number, required: true },
  ten: {
    type: String,
    required: true,
  },
  muc_dich: {
    type: String,
    required: true,
  },
  chuc_nang: {
    type: String,
    required: true,
  },
  toa_do: {
    type: [Number],
    required: true,
  },
  vi_tri: {
    type: String,
    required: true,
  },
  quy_mo: {
    type: Number,
    required: true,
  },
  tinh: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const HealthcareFacility = mongoose.model(
  "HealthcareFacility",
  HealthcareFacilitySchema
);

export default HealthcareFacility;
