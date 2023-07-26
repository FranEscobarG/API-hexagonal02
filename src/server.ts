import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { handleWebSockets, sendUpdatedDataToClients } from "./websocket/WebsocketRouter";
import { userRouter } from "./user/infrastructure/UserRouter";
import { sensorRouter } from "./sensor/infrastructure/SensorRouter";
import { MysqlSensorRepository } from "./sensor/infrastructure/MysqlSensorRepository";

class App {
  private app: express.Application = express();
  private server: http.Server = http.createServer(this.app);
  private io: Server | null = null;

  constructor() {
    this.configure();
  }

  async configure() {
    this.app.use(express.json());
    this.app.use("/users", userRouter);
    this.app.use(cors()); // Habilita CORS para responder a solicitudes desde cualquier origen
    this.app.use("/sensor", sensorRouter);

    const sensorRepository = new MysqlSensorRepository();
    const allSensorData = await sensorRepository.getAll();

    // Envía todos los datos a los clientes conectados al iniciar la aplicación
    if (this.io && allSensorData) {
      sendUpdatedDataToClients(allSensorData);
    }
  }

  socketServer() {
    this.io = new Server(this.server, {
      cors: { origin: "*" } // Permitir conexiones desde cualquier origen en el socket.io
    });

    // Utiliza la función handleWebSockets para manejar los eventos de los WebSockets.
    handleWebSockets(this.io);
  }

  start() {
    this.server.listen(3000, () => {
      console.log(`Server online in port 3000`);
    });
  }
}

const app: App = new App();
app.socketServer();
app.start();
