const router = require("express").Router();
const userController = require("../controllers/user");

router.post("/register", userController.signUp);
router.post("/login", userController.signIn);

module.exports = router;
