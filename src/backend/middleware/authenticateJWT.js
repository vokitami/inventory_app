import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      id: decoded.id,
      roleId: decoded.roleId,
      roleName: decoded.roleName,
      name: decoded.name
    };
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
