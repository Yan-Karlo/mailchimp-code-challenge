const ContactRoute = require('./v1/contact.routes');

module.exports = class IndexRoute {
  constructor(router) {
    this.router = router;
    this.version = 'v1';
  }

  Initialize() {
    new ContactRoute(this);

    return this.router;
  }

}