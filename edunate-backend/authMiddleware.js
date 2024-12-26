module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.user) {
        return next();
      }
      res.status(401).json({ message: 'Unauthorized access' });
    },
  };
  