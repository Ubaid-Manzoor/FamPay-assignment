const ApiError = require("./ApiError");

module.exports = (error, req, res, next) => {
  if (error instanceof ApiError) {
    const { code, message } = error;
    res.status(code).json({
      message,
    });
    return;
  }

  // If nothing match return Internal server error
  res.status(500).json({
    message: "something went wrong",
  });
};
