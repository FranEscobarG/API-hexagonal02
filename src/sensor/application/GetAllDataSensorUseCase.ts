import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class GetAllDataSensorUseCase {
  constructor(readonly sensorRepository: SensorRepository) {}

  async run(): Promise<Sensor[] | null> {
    try {
      const result = await this.sensorRepository.getAll();
      console.log(result);
      return result;
    } catch (error) {
      return null;
    }
  }
}
