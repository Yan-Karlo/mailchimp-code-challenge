const ListController = require('../../controllers/list.controllers');
// const router = require('../index.routes');

module.exports = class ListRoute {
  constructor(router) {
    this.controller = new ListController();
    this.router = router.router;

    this.router.get(`/lists/ping`, this.controller.ping);
    this.router.get(`/lists/init`, this.controller.init);
    this.router.delete(`/lists`, this.controller.remove);
  }
}