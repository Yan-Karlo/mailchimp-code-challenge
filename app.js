require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const Server = require('./engines/server');

class App {
  constructor() {
    this.server = new Server(3000);
  }

  async start() {
    this.server.start()
  }

  stop() {
    this.server.stop();
  }
}

const app = new App();
app.start();
