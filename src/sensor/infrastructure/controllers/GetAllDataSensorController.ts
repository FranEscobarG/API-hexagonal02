import { Request, Response } from "express";

import { GetAllDataSensorUseCase } from "../../application/GetAllDataSensorUseCase";

export class GetAllDataSensorController {
  constructor(readonly getAllDataSensorUseCase: GetAllDataSensorUseCase) { }

  async run(req: Request, res: Response) {
    try {
      const dataSensor = await this.getAllDataSensorUseCase.run();
      console.log(dataSensor);
      if (dataSensor)
        res.status(200).send({
          status: "success",
          data: dataSensor.map((datoCO: any) => {
            return {
              id: datoCO?.id,
              co_ppm: datoCO?.co_ppm,
              reg_date: datoCO?.reg_date
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
