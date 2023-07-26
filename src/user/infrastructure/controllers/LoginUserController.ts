// LoginUserController.ts
import { Request, Response } from "express";
import { LoginUserUseCase } from "../../application/LogInUserUseCase";
import jwt from "jsonwebtoken";

export class LoginUserController {
  constructor(readonly loginUserUseCase: LoginUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.loginUserUseCase.run(data.email, data.password);

      if (user) {
        // Generar el token JWT con la información del usuario
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email
          },
          "secreto", // Reemplaza esto por una clave secreta más segura
          { expiresIn: "1h" } // expiración del token
        );

        // Enviar el token en el encabezado de la respuesta
        res.header("Authorization", `Bearer ${token}`);

        // Code HTTP: 200 -> Éxito
        res.status(200).json({
          status: "success",
          data: {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            token: token
          },
        });
      } else {
        // Code HTTP: 401 -> No autorizado
        res.status(401).json({
          status: "error",
          data: "Credenciales inválidas",
        });
      }
    } catch (error) {
      // Code HTTP: 500 -> Error interno del servidor
      res.status(500).json({
        status: "error",
        data: "Ocurrió un error en el servidor",
        msn: error,
      });
    }
  }
}
