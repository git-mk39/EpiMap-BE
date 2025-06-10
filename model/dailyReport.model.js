import mongoose from "mongoose";
const { Schema } = mongoose;

const DailyReportSchema = new Schema({
  Province: { type: String, required: true },
  TotalInfections: { type: Number, required: true },
  DailyInfection: {
    type: Number,
    required: true,
  },
  TotalTreatment: {
    type: Number,
    required: true,
  },
  TotalRecover: {
    type: Number,
    required: true,
  },
  TotalDeath: {
    type: Number,
    required: true,
  },
  DailyDeath: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Date: { type: Date, default: Date.now },
  // updatedAt: { type: Date, default: Date.now },
});

const DailyReport = mongoose.model(
  "DailyReport",
  DailyReportSchema,
  "DailyReport"
);
export default DailyReport;
