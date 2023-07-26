import express from "express";

import { registerDataSensorController, getAllDataSensorController } from "./dependencies";

export const sensorRouter = express.Router();

sensorRouter.get(
  "/getAllData",
  getAllDataSensorController.run.bind(getAllDataSensorController)
);
sensorRouter.post(
  "/register",
  registerDataSensorController.run.bind(registerDataSensorController)
);
