const List = require('../../entities/ListClient.entity');
const { listName } = require('../../engines/config.json');
const Response = require('../../entities/response.entity');

module.exports = class ListService {
  constructor() {
    this.list = new List();
  }

  ping = () => "pong";

  remove = async () => {
    const response = new Response()

    await this.list.remove(process.env.LIST_ID);
    await this.list.init(listName);

    response.setResult(process.env.LIST_ID)
    return response;
  }
}