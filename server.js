import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Role } from './src/backend/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.SECRET_KEY;

app.use(cors());
app.use(bodyParser.json());

// REGISTER
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });
    if (userExist) return res.status(400).json({ error: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Rol por defecto "user"
    const defaultRole = await Role.findOne({ where: { name: 'user' } });
    if (!defaultRole) return res.status(500).json({ error: 'Rol por defecto no encontrado' });

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      RoleId: defaultRole.id, // ✅ asigna id del rol
    });

    res.json({ message: 'Usuario registrado con éxito', user: newUser });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({
      id: user.id,
      roleId: user.Role ? user.Role.id : null,
      roleName: user.Role ? user.Role.name : null,
      name: user.name
    }, SECRET, { expiresIn: '2h' });

    res.json({
      message: 'Login exitoso',
      token,
      roleId: user.Role ? user.Role.id : null,
      roleName: user.Role ? user.Role.name : null,
      name: user.name
    });
	
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
