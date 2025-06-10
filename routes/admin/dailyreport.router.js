import express from "express";
import { getDataDailyReportPage } from "../../controller/admin/dailyreport.controller.js";

const dailyReportRouter = express.Router();

dailyReportRouter.post("/", getDataDailyReportPage);

export default dailyReportRouter;
