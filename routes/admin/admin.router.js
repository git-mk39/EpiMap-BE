import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authentication.js";
import dailyReportRouter from "./dailyreport.router.js";
import patientRouter from "./patient.router.js";
import traceRouter from "./trace.router.js";

function webInitRouterAdmin(app) {
  app.use("/admin", authenticate, authorizeRoles("admin"));
  app.use("/admin/patients", patientRouter);
  app.use("/admin/daily-report", dailyReportRouter);
  app.use("/admin/trace",traceRouter)
}

export default webInitRouterAdmin;
