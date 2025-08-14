const express = require("express");
const {
  addContact,
  updateContact,
  deleteContact,
  getContact,
} = require("../../controller/contactController");
const _ = express.Router();

_.post("/", addContact);
_.patch("/:id", updateContact);
_.delete("/:id", deleteContact);
_.get("/", getContact); // ?query=all ,id
module.exports = _;
