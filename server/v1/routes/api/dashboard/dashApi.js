const express = require("express");
const { dashBoard } = require("../../../controller/dashboard/dashController");
const _ = express.Router();

_.get("/", dashBoard);
module.exports = _;
