import express from "express";

import { createUserController, getAllUserController, loginUserController, sendEmailController } from "./dependencies";

export const userRouter = express.Router();

userRouter.get(
  "/getAll",
  getAllUserController.run.bind(getAllUserController)
);
userRouter.post(
  "/create",
  createUserController.run.bind(createUserController)
);
userRouter.post(
  "/login",
  loginUserController.run.bind(loginUserController)
);

userRouter.post(
  "/sendemail",
  sendEmailController.run.bind(sendEmailController)
);

