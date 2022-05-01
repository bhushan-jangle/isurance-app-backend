const express = require("express");
const router = express.Router();
const AuthController = require("../users/user.controller");

//Define endpoints

router.get("/getAllUsers", AuthController.getAllUsers);

router.post("/addInsuranceDetails", AuthController.addInsuranceDetails);

router.put("/updateInsuranceDetails", AuthController.updateInsuranceDetails);

module.exports = router;
