import { query } from "../../database/mysql";
import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";
import { sendUpdatedDataToClients } from "../../websocket/WebsocketRouter"; // Importa la función para enviar datos actualizados

export class MysqlSensorRepository implements SensorRepository {

  async getAll(): Promise<Sensor[] | null> {
    const sql = "SELECT * FROM air_data";
    try {
      const [data]: any = await query(sql, []);
      const dataSensor = Object.values(JSON.parse(JSON.stringify(data)));

      return dataSensor.map(
        (datoCO: any) =>
          new Sensor(
            datoCO.id,
            datoCO.co_ppm,
            datoCO.reg_date
          )
      );
    } catch (error) {
      return null;
    }
  }

 
  async register(
    co_ppm: string,
  ): Promise<Sensor | null> {
    const sql = "INSERT INTO air_data (co_ppm) VALUES (?)";
    const params: any[] = [co_ppm];
    try {
      const [result]: any = await query(sql, params);
      const newSensorData = new Sensor(result.insertId, co_ppm, getFormattedDate());

      // Envía los datos actualizados a los clientes conectados
      sendUpdatedDataToClients(newSensorData);

      return newSensorData;
    } catch (error) {
      return null;
    }
  }
}

// Función para obtener la fecha actual en el formato 'YYYY-MM-DD HH:mm:ss'
function getFormattedDate(): string {
  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1;
  const day: number = currentDate.getDate();
  const hours: number = currentDate.getHours();
  const minutes: number = currentDate.getMinutes();
  const seconds: number = currentDate.getSeconds();

  const formattedDate: string = `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  return formattedDate;
}

function formatNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
  


  
//   async getById(userId: number): Promise<User | null> {
//     const sql = "SELECT * FROM users WHERE id=?";
//     const params: any[] = [userId];
//     try {
//       const [result]: any = await query(sql, params);
//       //El objeto Result es un objeto que contiene info generada de la bd
//       /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
//             estar dentro de un bloque try/catch si hay error se captura en el catch */
//       return new User(
//         result[0].id,
//         result[0].name,
//         result[0].lastname,
//         result[0].email,
//         result[0].phone,
//         result[0].password
//       );
//     } catch (error) {
//       return null;
//     }
//   }


// }
