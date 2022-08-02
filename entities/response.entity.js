
module.exports = class Response {
  constructor() {
    this.isError = false;
    this.result = {};
    this.httpStatus = 200;
  }

  setError(error, contact = {}) {
    const err = JSON.parse(JSON.stringify(error, null, 4));
    
    this.httpStatus = err.status;
    this.isError = true;
    this.message = err.response.text;
    this.result = {
      firstName: contact.firstName,
      lastName : contact.lastName,
      email: contact.email,
    }
  }

  setResult(result) {
     this.result = {...result};
  }
}