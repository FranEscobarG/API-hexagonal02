import { Server, Socket } from "socket.io";
import { MysqlSensorRepository } from "../sensor/infrastructure/MysqlSensorRepository";

// Mantener una lista de sockets (clientes) conectados
const connectedClients: Set<Socket> = new Set();
const sensorRepository = new MysqlSensorRepository();
let ioInstance: Server; // Variable para almacenar la instancia de io

// Función para obtener y emitir todos los datos actualizados a todos los clientes conectados
async function emitAllDataToClients() {
  // Obtener todos los datos de la base de datos
  const allSensorData = await sensorRepository.getAll();

  // Envía todos los datos al cliente cuando se conecte
  if (allSensorData) {
    const jsonData = JSON.stringify(allSensorData);
    for (const clientSocket of connectedClients) {
      clientSocket.emit("server:all_data", jsonData);
    }
  }
}

// Función para emitir eventos de inicio de sesión válido o inválido
export async function emitLoginEvent(success: boolean, user?: any) {
  if (ioInstance) {
    if (success) {
      ioInstance.emit("server:login_success", { message: "Sesión validada correctamente", user });
    } else {
      ioInstance.emit("server:login_failed", { message: "Credenciales inválidas" });
    }
  }
}

export function handleWebSockets(io: Server) {
  ioInstance = io; // Almacenar la instancia de io en la variable ioInstance

  io.on("connection", async (socket: Socket) => {
    console.log("Un usuario conectado!");

    // Agregar el socket (cliente) a la lista de clientes conectados
    connectedClients.add(socket);

    // Emitir todos los datos al cliente cuando se conecte
    await emitAllDataToClients();

    // Escucha el evento "disconnect" del cliente
    socket.on("disconnect", () => {
      console.log("Un usuario se desconecto!");

      // Remover el socket (cliente) de la lista de clientes conectados
      connectedClients.delete(socket);
    });
  });
}

// Función para enviar datos actualizados a todos los clientes conectados
export async function sendUpdatedDataToClients(data: any) {
  // Luego de actualizar los datos, emite la lista actualizada a todos los clientes
  await emitAllDataToClients();
}
