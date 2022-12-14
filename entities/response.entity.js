
module.exports = class Response {
  constructor() {
    this.isError = false;
    this.result = {};
    this.httpStatus = 200;
  }

  setError(error, contact = {}) {
    const err = JSON.parse(JSON.stringify(error, null, 4));
    const {
      response: {
        text = (err.name + ' ' + err.message)
      }
    } = err;
    const message = JSON.parse(text);

    this.httpStatus = err.status;
    this.isError = true;
    this.message = message;

    this.result = {
      firstName: contact.firstName || 'N/A',
      lastName: contact.lastName || 'N/A',
      email: contact.email || 'N/A',
    };
  }

  setResult(result) {
     this.result = {...result};
  }
}