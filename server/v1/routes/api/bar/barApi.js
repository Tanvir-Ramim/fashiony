const express = require("express");
const { categoryBar } = require("../../../controller/bar/barController");
const _ = express.Router();

_.get("/", categoryBar);
module.exports = _;
