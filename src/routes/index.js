const { Router } = require("express");
const getCountries = require("../controllers/getCountries.js");
const getActivities = require("../controllers/getActivities.js");
const getCountriesById = require("../controllers/getCountriesById.js");
const postActivities = require("../controllers/postActivities.js");
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/:idPais", getCountriesById);
router.post("/activities", postActivities);
router.get("/activities", getActivities);
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
