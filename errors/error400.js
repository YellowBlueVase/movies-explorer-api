// 400 Request Error

class Error400 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = Error400;
