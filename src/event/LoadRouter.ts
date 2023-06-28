import amqp from "amqplib";
import express from "express";

const config = {
  protocol: "amqp",
  hostname: "23.22.218.241",
  port: 5672,
  username: "franck",
  password: "221193",
};

export const loadRouter = express.Router();

loadRouter.get("/", async function loadEvent(req, res) {
  const conn = await amqp.connect(config);
  console.log("Conexión exitosa");

  const channel = await conn.createChannel();
  console.log("Canal creado exitosamente");

  const user = {
    name: "Francisco",
    email: "fran@gmail.com",
    password: "123456",
  };

  const message = JSON.stringify(user);

  await channel.sendToQueue("eventInitial", Buffer.from(message));
  console.log("Mensaje enviado:", message);

  await channel.close();
  await conn.close();

  res.status(200).send("OK");
});
