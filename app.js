const { listName, API_KEY } = require('./engines/config.json');
process.env.API_KEY = API_KEY;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const Server = require('./engines/server');
const List = require('./entities/listClient.entity');

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
