import express from "express";
const app = new express();
const porta = 8000;
app.get("/", (req, res) => {
  res.send("Olá Mundo!");
});
app.listen(porta, () => {
  console.log("Servidor rodando no endereço http://127.0.0.1:8000\n");
});
  