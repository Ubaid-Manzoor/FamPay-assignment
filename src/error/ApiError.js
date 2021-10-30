class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  // we can have multiple error handler like this
  static badRequest({ message }) {
    return new ApiError(400, message);
  }
}

module.exports = ApiError;
