import express from "express";
import { traceContacts } from "../../controller/admin/trace.controller.js";

const traceRouter = express.Router();

// GET /admin/trace/:patientId
traceRouter.get("/:patientId", traceContacts);

export default traceRouter;