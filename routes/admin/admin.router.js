import {
  authenticate,
  authorizeRoles,
} from "../../middleware/authentication.js";
import patientRouter from "./patient.router.js";

function webInitRouterAdmin(app) {
  app.use("/admin", authenticate, authorizeRoles("admin"));
  app.use("/admin/patients", patientRouter);
}

export default webInitRouterAdmin;
