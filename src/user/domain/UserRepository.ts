import { User } from "./User";

export interface UserRepository {
  getAll(): Promise<User[] | null>;

  createUser(
    name: string,
    lastname: string,
    email: string,
    phone: string,
    password: string
  ): Promise<User | null>;

  login(email: string, password: string): Promise<User | null>;

  sendEmailToUser(email: string, subject: string, content: string): Promise<boolean>;

}

  // validateUser(
  //   email: string,
  //   password: string
  // ): Promise<User | null>;