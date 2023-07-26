import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class RegisterDataSensorUseCase {
  constructor(readonly sensorRepository: SensorRepository) { }

  async run(
    co_ppm: string
  ): Promise<Sensor | null> {
    try {
      const dataSensor = await this.sensorRepository.register(
        co_ppm
      );
      return dataSensor;
    } catch (error) {
      return null;
    }
  }
}
