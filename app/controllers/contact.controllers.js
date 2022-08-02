const ContactService = require('../services/contact.services');

module.exports = class ContactController {
  constructor() {
    this.service = new ContactService();
  }

  ping = (req, res) => res.status(200).json(this.service.ping());

}