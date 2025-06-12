import PatientInfo from "../../model/patientInfo.model.js"; 
import DailyReport from "../../model/dailyReport.model.js";

export const getDailyReports = async (req, res) => {
  try {
    const { province, type, date } = req.query;

    const filter = {};

    if (province) filter.Province = province;
    if (type) filter.Type = type;
    if (date) {
      const parsedDate = new Date(`${date}T00:00:00.000Z`);
      const nextDate = new Date(`${date}T00:00:00.000Z`);
      nextDate.setUTCDate(parsedDate.getUTCDate() + 1);

      filter.Date = {
        $gte: parsedDate,
        $lt: nextDate,
      };
    }
   
    const reports = await DailyReport.find(filter).sort({ Date: -1 });

    // 👉 Tính tổng ca nhiễm mới và tử vong mới
    const totalNewInfections = reports.reduce(
      (sum, report) => sum + (report.DailyInfection || 0),
      0
    );
    const totalNewDeaths = reports.reduce(
      (sum, report) => sum + (report.DailyDeath || 0),
      0
    );

    res.status(200).json({
      totalNewInfections,
      totalNewDeaths,
      data: reports,
    });
  } catch (error) {
    console.error("Lỗi khi lấy báo cáo hàng ngày:", error.message);
    res.status(500).json({
      message: "Lỗi server khi lấy báo cáo",
      error: error.message,
    });
  }
};

export default getDailyReports;
