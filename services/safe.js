const HttpError = require("./error");

function safe(middleware) {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      if (error.name === "HttpError") {
        const { status, message } = error;
        res.status(status).json({ message });
        return;
      }
      const { message } = error;
      res.status(500).json({ message });
      next(error);
    }
  };
}

module.exports = safe;
