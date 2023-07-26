import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { EmailService } from "./EmailService";
import { emitLoginEvent } from "../../websocket/WebsocketRouter"; 

export class MysqlUserRepository implements UserRepository {
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM users";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) =>
          new User(
            user.id,
            user.name,
            user.lastname,
            user.email,
            user.phone,
            user.password
          )
      );
    } catch (error) {
      return null;
    }
  }

  async createUser(
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
  ): Promise<User | null> {
    const sql = "INSERT INTO users (name, lastname, email, phone, password) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [name, lastname, email, phone, password];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new User(result.insertId, name, lastname, email, phone, password);
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const params: any[] = [email, password];
    try {
      const [data]: any = await query(sql, params);
      const userData = JSON.parse(JSON.stringify(data));

      if (userData.length === 1) {
        const user = userData[0];

        
        emitLoginEvent(true, user); // Emitir evento de inicio de sesión válido

        return new User(
          user.id,
          user.name,
          user.lastname,
          user.email,
          user.phone,
          user.password
        );
      } else {
        emitLoginEvent(false); // Emitir evento de inicio de sesión inválido
        return null;
      }
    } catch (error) {
      emitLoginEvent(false); // Emitir evento de inicio de sesión inválido
      return null;
    }
  } 

  async sendEmailToUser(email: string, subject: string, content: string): Promise<boolean> {
    try {
      // Lógica para enviar el correo electrónico utilizando el servicio de correo electrónico
      const emailService = new EmailService();
      await emailService.sendEmail(email, subject, content);
      return true;
    } catch (error) {
      return false;
    }
  }


}
