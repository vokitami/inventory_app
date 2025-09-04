import { roles } from '../config/roles.js';

export const checkRole = (action) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = roles[userRole]?.can;

    if (permissions && permissions.includes(action)) {
      return next();
    }

    res.status(403).json({ message: 'Acceso denegado. Permiso insuficiente.' });
  };
};
