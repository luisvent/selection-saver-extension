var express = require("express");
const router = express.Router();
const selectionController = require("../controllers/selection_controller");

router.post("/get", selectionController.list);
router.post("/add", selectionController.save);

module.exports = router;
