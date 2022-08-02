const ContactService = require('../services/contact.services');

module.exports = class ContactController {
  constructor() {
    this.service = new ContactService();
  }

  ping = (req, res) => res.status(200).json(this.service.ping());

  sync = async (req, res) => {
    const {report} = req.params
    const response = await this.service.sync(report);
    return res.status(201).json(response);
  }
}