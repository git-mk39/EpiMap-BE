import PatientInfo from "../../model/patientInfo.model.js";
import DailyReport from "../../model/dailyReport.model.js";

const getDataDailyReportPage = async (req, res) => {
  try {
    const { fromDate, toDate, typeDisease, province, page = 1 } = req.body;
    const query = {};
    if (fromDate || toDate) {
      query.Date = {};
      if (fromDate) query.Date.$gte = new Date(fromDate);
      if (toDate) query.Date.$lte = new Date(toDate);
    }

    if (typeDisease) {
      query.Type = typeDisease;
    }

    if (province && province.toLowerCase() !== "all") {
      query.Province = province;
    }

    const limit = 20;
    const skip = (Number(page) - 1) * limit;

    const total = await PatientInfo.countDocuments(query);
    const patients = await PatientInfo.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ Date: -1 });
    let dailyReportResult;

    const matchCondition = {};
    if (fromDate || toDate) {
      matchCondition.Date = {};
      if (fromDate) matchCondition.Date.$gte = new Date(fromDate);
      if (toDate) matchCondition.Date.$lte = new Date(toDate);
    }

    if (typeDisease) {
      matchCondition.Type = typeDisease;
    }

    if (province && province.toLowerCase() !== "all") {
      matchCondition.Province = province;

      // Tổng gộp toàn bộ cho một tỉnh
      const aggregation = await DailyReport.aggregate([
        { $match: matchCondition },
        {
          $group: {
            _id: null,
            TotalInfections: { $sum: "$TotalInfections" },
            DailyInfection: { $sum: "$DailyInfection" },
            TotalTreatment: { $sum: "$TotalTreatment" },
            TotalRecover: { $sum: "$TotalRecover" },
            TotalDeath: { $sum: "$TotalDeath" },
            DailyDeath: { $sum: "$DailyDeath" },
          },
        },
        { $project: { _id: 0 } },
      ]);

      dailyReportResult = aggregation[0] || {};
    } else {
      // Gộp theo từng ngày toàn quốc
      const aggregation = await DailyReport.aggregate([
        { $match: matchCondition },
        {
          $group: {
            _id: "$Date",
            TotalInfections: { $sum: "$TotalInfections" },
            DailyInfection: { $sum: "$DailyInfection" },
            TotalTreatment: { $sum: "$TotalTreatment" },
            TotalRecover: { $sum: "$TotalRecover" },
            TotalDeath: { $sum: "$TotalDeath" },
            DailyDeath: { $sum: "$DailyDeath" },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            Date: "$_id",
            _id: 0,
            TotalInfections: 1,
            DailyInfection: 1,
            TotalTreatment: 1,
            TotalRecover: 1,
            TotalDeath: 1,
            DailyDeath: 1,
          },
        },
      ]);

      dailyReportResult = aggregation;
    }

    res.status(200).json({
      status: "success",
      data: {
        patients,
        dailyReport: dailyReportResult,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      msg: "Lỗi truy vấn bệnh nhân",
      error: err.message,
    });
  }
};
export { getDataDailyReportPage };
