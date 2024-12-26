module.exports = {
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      if(req.user.role === 'Institution') {
        return next();
      }
      res.status(401).json({ message: 'Unauthorized access' });
    },
  
    checkRole: (role) => {
      return (req, res, next) => {
        if (req.user && req.user.role === role) {
          return next();
        }
        res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      };
    },
  };
  