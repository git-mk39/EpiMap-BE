import express from "express";
import getDailyReports  from "../../controller/admin/dailyreport.controller.js";

const dailyReportRouter = express.Router();

dailyReportRouter.get("/", getDailyReports);

export default dailyReportRouter;
