const ContactController = require('../../controllers/contact.controllers');
// const router = require('../index.routes');

module.exports = class UserRoute {
  constructor(router) {
    this.controller = new ContactController();
    this.router = router.router;

    this.router.get(`/contacts/ping`, this.controller.ping);
    this.router.get(`/contacts/sync/:report?`, this.controller.sync);
  }
}