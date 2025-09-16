const path = require("path");
function errorCatcher(err, req, res, next) {
  console.log(err);
  const errPath = path.extname(err.path || " ").toLowerCase();
  const error = {
    status: 500,
    message: "Internal Server Error",
    timestamp: new Date().toISOString(),
  };
  if (err.name === "traversalError") {
    error.status = 403;
    error.message = "Access denied";
  } else if (
    errPath === "" ||
    [".html", ".txt", ".json", ".img", ".png", ".jpeg", ".gif"].includes(
      errPath
    )
  ) {
    error.status = 404;
    error.message = "Content not found";
  } else {
    error.status = 415;
    error.message = "Unsupported Media Type";
  }
  return res.json(error);
}
module.exports = errorCatcher;
