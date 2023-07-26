// SendEmailController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SendEmailToUserUseCase } from "../../application/SendEmailToUserUseCase";

export class SendEmailController {
  constructor(readonly sendEmailToUserUseCase: SendEmailToUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    try {
      // Obtiene los datos para el correo electrónico, asunto y contenido 
      const { subject, content } = data;
      const token = req.header('authorization'); // Corrige la clave para acceder al token

      if (!token || !token.startsWith("Bearer ")) return res.status(401).json('Access Denied');

      const tokenWithoutBearer = token.slice(7); // Eliminar la parte "Bearer " del token

      // Verificar y decodificar el token JWT
      const decodedToken = jwt.verify(tokenWithoutBearer, "secreto") as { id: number, email: string };

      // Obtener el correo electrónico de destino del token decodificado
      const destEmail = decodedToken.email;

      const success = await this.sendEmailToUserUseCase.run(destEmail, subject, content);

      if (success) {
        // Code HTTP: 200 -> Éxito
        res.status(200).json({
          status: "success",
          data: "Correo electrónico enviado correctamente",
        });
      } else {
        // Code HTTP: 500 -> Error del servidor
        res.status(500).json({
          status: "error",
          data: "Ocurrió un error al enviar el correo electrónico",
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
