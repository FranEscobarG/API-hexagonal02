// EmailService.ts
import nodemailer from "nodemailer";

export class EmailService {
  async sendEmail(to: string, subject: string, content: string) {
    // Configurar el transporte del servicio de correo electrónico
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Por ejemplo, utiliza Gmail como servicio de correo electrónico
      port: 587,
      auth: {
        user: "escobar.gutierrez.3@gmail.com", // Reemplaza esto con tus credenciales de correo electrónico
        pass: "qemfmuelffumjhcq", // Reemplaza esto con tu contraseña de correo electrónico
      },
    });

    // Definir el contenido del correo electrónico
    const mailOptions = {
      from: "air.fresh.esc@gmail.com", // Reemplaza esto con tu dirección de correo electrónico
      to: to,
      subject: subject,
      text: content,
    };

    try {
      // Envía el correo electrónico
      await transporter.sendMail(mailOptions);
    } catch (error) {
      // Maneja los errores en caso de que falle el envío del correo electrónico
      console.error("Error al enviar el correo electrónico:", error);
      throw new Error("No se pudo enviar el correo electrónico");
    }
  }
}
