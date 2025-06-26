const { Router } = require("express");
const { getFlights } = require("../controllers/flightController");

const router = Router();

router.get("/", getFlights);

module.exports = router;
