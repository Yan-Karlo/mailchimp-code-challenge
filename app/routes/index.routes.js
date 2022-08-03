const ContactRoute = require('./v1/contact.routes');
const ListRoute = require('./v1/list.routes');

module.exports = class IndexRoute {
  constructor(router) {
    this.router = router;
    this.version = 'v1';
  }

  Initialize() {
    new ContactRoute(this);
    new ListRoute(this);

    return this.router;
  }

}