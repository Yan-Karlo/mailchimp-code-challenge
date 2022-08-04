const ListService = require('../services/list.services');

module.exports = class ListController {
  constructor() {
    this.service = new ListService();
  }

  ping = (req, res) => res.status(200).json(this.service.ping());

  init = async (req, res) => {
    const response = await this.service.init();
    return res.status(response.httpStatus || 200).json(response);
  }

  remove = async (req, res) => {
    const response = await this.service.remove();
    return res.status(response.httpStatus || 200).json(response);
  }
}