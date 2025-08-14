const Brand = require("../model/brandModel");
const appError = require("http-errors");

const isUnique = async (req, res, next) => {
  try {
    //console.log(req.body);
    const ifThere = await Brand.findOne({ brandName: req.body.brandName });
    if (ifThere) {
      return next(appError(406, "Already there"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isUnique;
