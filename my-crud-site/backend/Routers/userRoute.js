const express = require("express");
const router = express.Router();
const userCntrl = require("../Controllers/userCntrl");

router.post("/register", userCntrl.registerUsers);
router.get("/getUsers", userCntrl.getAllUsers);
router.get("/getUsers/:id", userCntrl.getUsersById);
router.put("/edit/:id", userCntrl.updateUser);
router.delete("/delete/:id", userCntrl.deleteUser);
module.exports = router;
