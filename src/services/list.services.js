const { listName } = require('../../engines/config.json');
const List = require('../../entities/listClient.entity');
const Response = require('../../entities/response.entity');

module.exports = class ListService {
  constructor() {
    this.list = new List();
  }

  ping = () => "pong";

  init = async () =>{
    const response = new Response()
    try {
      await this.list.init(listName);
      response.result = {newListId : process.env.LIST_ID}
    } catch (error) {
      response.setError(error);
    }

    return response;
  }

  remove = async () => {
    const response = new Response()

    await this.list.remove(process.env.LIST_ID);
    await this.list.init(listName);

    response.setResult(process.env.LIST_ID)
    return response;
  }
}