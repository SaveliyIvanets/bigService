function errorCatcher(err, req, res, next) {
  const error = {
    status: err.status || 500,
    message: err.message,
    timestamp: new Date().toISOString(),
  };
  if (err.name === "ValidationError" || err.name === "CastError") {
    error.status = 400;
  }
  res.json(error);
}
module.exports = errorCatcher;
