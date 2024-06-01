const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
 createUser,
 loginUser,
 manageUser,
 allUsers
} = require("../controllers/UserController");

const router = Router();

// router.get("/login", loginUserController);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.patch("/manage", authMiddleware, manageUser);
router.get("/allusers", allUsers);


module.exports = router;
