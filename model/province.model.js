import mongoose from "mongoose";
const { Schema } = mongoose;

const ProvinceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  population: {
    type: [Number],
    required: true,
  },
  rings: {
    type: [[Number]],
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Province = mongoose.model("Province", ProvinceSchema);

export default Province;
