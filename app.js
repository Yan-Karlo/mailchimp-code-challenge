require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const Server = require('./engines/server');
const List = require('./entities/listClient.entity');
const { listName } = require('./engines/config.json');

class App {
  constructor() {
    this.server = new Server(3000);
    this.list = new List(); 
  }

  async start() {
    this.list.init(listName)
      .then(() => {
        this.server.start()
      })
      .catch(error =>
        console.error(error)
      );
  }

  stop() {
    this.server.stop();
  }
}

const app = new App();
app.start();
