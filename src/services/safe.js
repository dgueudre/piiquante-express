function safe(middleware) {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      const { message } = error;
      res.status(500).json({ message });
      next(error);
    }
  };
}

module.exports = safe;
