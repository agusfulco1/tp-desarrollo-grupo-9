import express from "express";

// El server recibe las rutas y recibe el puerto 
export class Server {
  #app

  constructor(app, port) {
    this.#app = app;
    this.port = port;
    this.#app.use(express.json()) 
  }

   get app() {
    return this.#app
  }

  // healthcheck() {
  //   this.app.get("/healthcheck", (req, res) => {
  //     res.json({ status: "ok" });
  //   });
  // }

  launch() {
    this.app.listen(this.port, () => {
      console.log(`El servidor inicializo correctamente en el puerto ${this.port}`);
    });
  }
}


