// dailyReport.dao.js
import mongoose from 'mongoose';

// Use QLDB-specific connection
const qldbConnection = mongoose.connection.useDb('QLDB');

// Define schema
const dailyReportSchema = new mongoose.Schema({
  Province: String,
  TotalInfections: Number,
  TotalInfection: Number,
  DailyInfection: Number,
  TotalTreatment: Number,
  TotalRecover: Number,
  TotalRecovered: Number,
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

export const getTop5ByInfectionsLatestDate = async (type) => {
  const latestEntry = await DailyReport
    .findOne({ Type: { $regex: `^${type}$`, $options: 'i' } })
    .sort({ Date: -1 })
    .select({ Date: 1 })
    .exec();

  if (!latestEntry) return [];

  const latestDate = latestEntry.Date;

  return await DailyReport
    .find(
      {
        Type: { $regex: `^${type}$`, $options: 'i' },
        Date: latestDate
      },
      {
        _id: 0,
        Province: 1,
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
    .sort({ TotalInfections: -1 })
    .limit(5)
    .exec();
};

export const getNationalStats = async (type) => {
  const latestDateDoc = await DailyReport
    .findOne({ Type: { $regex: `^${type}$`, $options: 'i' } })
    .sort({ Date: -1 })
    .select({ Date: 1 })
    .exec();

  if (!latestDateDoc) return null;

  const latestDate = latestDateDoc.Date;

  const result = await DailyReport.aggregate([
    {
      $match: {
        Type: { $regex: `^${type}$`, $options: 'i' },
        Date: latestDate
      }
    },
    {
      $group: {
        _id: null,
        TotalInfections: { $sum: "$TotalInfections" },
        TotalInfection: { $sum: "$TotalInfection" },
        DailyInfection: { $sum: "$DailyInfection" },
        TotalTreatment: { $sum: "$TotalTreatment" },
        TotalRecovered: { $sum: "$TotalRecover" },
        TotalRecover: { $sum: "$TotalRecover" },
        TotalDeath: { $sum: "$TotalDeath" },
        DailyDeath: { $sum: "$DailyDeath" }
      }
    },
    {
      $project: {
        _id: 0,
        TotalInfections: 1,
        TotalInfection: 1,
        DailyInfection: 1,
        TotalTreatment: 1,
        TotalRecover: 1,
        TotalRecovered: 1,
        TotalDeath: 1,
        DailyDeath: 1,
        Date: latestDate
      }
    }
  ]);

  return result[0] || null;
};

export const get10MostRecent = async (province, type) => {
  return await DailyReport
    .find({
      Province: { $regex: `^${province}$`, $options: 'i' },
      Type: { $regex: `^${type}$`, $options: 'i' }
    })
    .sort({ Date: -1 })
    .limit(10)
    .exec();
};