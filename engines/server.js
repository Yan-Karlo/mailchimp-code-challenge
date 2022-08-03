const express = require('express');
const cors = require('cors');
const path = require('path');
const httpServer = require('http');
const IndexRouter = require('../src/routes/index.routes');

module.exports = class Server {

  constructor(port) {
    this.port = process.env.PORT || 3000;
    this.isRunning = false;
    this.app = express();
    this.router = express.Router();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, 'public')))
    this.app.use(cors());
    this.mapRoutes();
    this.engine = httpServer.createServer(this.app);
  }

  start = () => {
    this.engine.listen(this.port, console.info(`Listening on http://localhost:${this.port}`));
    this.isRunning = true;
  }

  stop = () => {
    this.engine.close();
  }

  mapRoutes() {
    const indexRoutes = new IndexRouter(this.router).Initialize();
    this.app.use(indexRoutes);
  }
}