const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts_controller");
const passport = require("passport");

router.post("/create", passport.checkAuthentication, postController.create);
router.get("/delete/:id", passport.checkAuthentication, postController.destroy);

module.exports = router;