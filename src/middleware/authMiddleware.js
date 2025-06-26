const jwt = require("jsonwebtoken");
const { User } = require("../db");

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token del header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ error: "No se proporcionó token de autenticación" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Agregar el usuario al request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;
