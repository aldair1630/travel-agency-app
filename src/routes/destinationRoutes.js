const { Router } = require("express");
const {
  getAllDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

const router = Router();

router.get("/", getAllDestinations);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;