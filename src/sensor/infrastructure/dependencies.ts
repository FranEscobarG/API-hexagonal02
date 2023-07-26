import { RegisterDataSensorUseCase } from "../application/RegisterDataSensorUseCase";
import { GetAllDataSensorUseCase } from "../application/GetAllDataSensorUseCase";

import { RegisterDataSensorController } from "./controllers/RegisterDataSensorController";
import { GetAllDataSensorController } from "./controllers/GetAllDataSensorController";

import { MysqlSensorRepository } from "./MysqlSensorRepository";

export const mysqlSensorRepository = new MysqlSensorRepository();

export const registerDataSensorUseCase = new RegisterDataSensorUseCase( mysqlSensorRepository );
export const getAllDataSensorUseCase = new GetAllDataSensorUseCase( mysqlSensorRepository );


export const registerDataSensorController = new RegisterDataSensorController(
  registerDataSensorUseCase
);
export const getAllDataSensorController = new GetAllDataSensorController(
  getAllDataSensorUseCase
);

