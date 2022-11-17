const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require("./DogRoutes");
const temperaments = require("./TemperamentRoutes");

const router = Router();
router.use("/dogs", dogs);
router.use("/temperaments", temperaments);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
