import { Request, Response } from "express";

import { RegisterDataSensorUseCase } from "../../application/RegisterDataSensorUseCase";

export class RegisterDataSensorController {
  constructor(readonly registerDataSensorUseCase: RegisterDataSensorUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const dataSensor = await this.registerDataSensorUseCase.run(
        data.co_ppm
      );

      if (dataSensor)
        //Code HTTP : 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: dataSensor?.id,
            co_ppm: dataSensor?.co_ppm,
            reg_date: dataSensor?.reg_date
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
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
