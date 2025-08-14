const express = require("express");
const {
  getCloudFile,
  serachCloudFile,
  delAsset,
} = require("../../../controller/asset/assetController");
const _ = express.Router();
_.get("/", getCloudFile);
_.get("/search", serachCloudFile);
_.delete("/:public_id", delAsset);
module.exports = _;
