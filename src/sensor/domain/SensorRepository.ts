import { Sensor } from "./Sensor";

export interface SensorRepository {
  getAll(): Promise<Sensor[] | null>;

  register(
    co_ppm: string
  ): Promise<Sensor | null>;
}
