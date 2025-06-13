// dailyReport.dao.js
import mongoose from 'mongoose';

// Use QLDB-specific connection
const qldbConnection = mongoose.connection.useDb('QLDB');

// Define schema
const dailyReportSchema = new mongoose.Schema({
  Province: String,
  TotalInfections: Number,
  DailyInfection: Number,
  TotalTreatment: Number,
  TotalRecover: Number,
  TotalDeath: Number,
  DailyDeath: Number,
  Date: Date,
  Type: String
}, { collection: 'DailyReport' });

// Prevent OverwriteError
const DailyReport = qldbConnection.models.DailyReport || qldbConnection.model('DailyReport', dailyReportSchema);

export const getLatestReportByProvinceAndType = async (provinceName, type) => {
  return await DailyReport
    .findOne(
      {
        Province: { $regex: `^${provinceName}$`, $options: 'i' },
        Type: { $regex: `^${type}$`, $options: 'i' }
      },
      {
        _id: 0,
        TotalInfections: 1,
        TotalInfection: 1,
        DailyInfection: 1,
        TotalTreatment: 1,
        TotalRecover: 1,
        TotalRecovered: 1,
        TotalDeath: 1,
        DailyDeath: 1,
        Date: 1
      }
    )
    .sort({ Date: -1 })
    .exec();
};
