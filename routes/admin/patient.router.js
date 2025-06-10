import express from "express";
import {
  addPatient,
  getPatients,
} from "../../controller/admin/patient.controller.js";

const patientRouter = express.Router();

// login
patientRouter.get("/search", getPatients);

// logout
patientRouter.post("/add", addPatient);

export default patientRouter;
