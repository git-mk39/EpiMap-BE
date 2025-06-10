import express from "express";
import {
  addPatient,
  deletePatientsByIds,
  getPatients,
  updatePatient,
} from "../../controller/admin/patient.controller.js";

const patientRouter = express.Router();

// login
patientRouter.get("/search", getPatients);

// logout
patientRouter.post("/add", addPatient);

// delete
patientRouter.post("/delete", deletePatientsByIds);

// update
patientRouter.patch("/update", updatePatient);

export default patientRouter;
