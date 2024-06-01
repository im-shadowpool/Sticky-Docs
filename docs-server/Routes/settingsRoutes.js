const { Router } = require("express");
const { settings } = require("../controllers/SettingsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post("/", authMiddleware, settings);

module.exports = router;
