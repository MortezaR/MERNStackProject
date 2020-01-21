const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
let ObjectID = require('mongodb').ObjectID;

const Maps = require("../../models/Map")
const validateMapInput = require("../../validation/maps")

router.get("/test", (req, res) => {
    res.json({  msg: "This is the maps route" });
});

// router.post('/')

module.exports = router;