import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { GetAllUserUseCase } from "../application/GetAllUserUseCase";
import { LoginUserUseCase } from "../application/LogInUserUseCase";
import { SendEmailToUserUseCase } from "../application/SendEmailToUserUseCase";

import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllUserController } from "./controllers/GetAllUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { SendEmailController } from "./controllers/SendEmailController";

import { MysqlUserRepository } from "./MysqlUserRepository";

export const mysqlUserRepository = new MysqlUserRepository();

export const createUserUseCase = new CreateUserUseCase( mysqlUserRepository );
export const getAllUseCase = new GetAllUserUseCase( mysqlUserRepository );
export const loginUserUseCase = new LoginUserUseCase( mysqlUserRepository );
export const sendEmailToUserUseCase = new SendEmailToUserUseCase( mysqlUserRepository );


export const createUserController = new CreateUserController(
  createUserUseCase
);
export const getAllUserController = new GetAllUserController(
  getAllUseCase
);
export const loginUserController = new LoginUserController(
  loginUserUseCase
);
export const sendEmailController = new SendEmailController(
  sendEmailToUserUseCase
);

