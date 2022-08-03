const ListService = require('../services/list.services');

module.exports = class ListController {
  constructor() {
    this.service = new ListService();
  }

  ping = (req, res) => res.status(200).json(this.service.ping());

  remove = async (req, res) => {
    const response = await this.service.remove();
    return res.status(200).json(response);
  }
}