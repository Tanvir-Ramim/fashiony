const { BadRequestError } = require("../../error/customError");
const { Contact } = require("../../model/contactModel");
const appStatus = require("../../utils/appStatus");
const { tryCatch } = require("../../utils/tryCatch");

//post
const addContact = tryCatch(async (req, res, next) => {
  const data = req.body;
  const new_con = new Contact(data);
  const save_con = await new_con.save();
  if (!save_con) {
    throw new BadRequestError("Try Again");
  }
  appStatus(201, save_con, req, res, next);
});
//patch
const updateContact = tryCatch(async (req, res, next) => {
  const { address, email, contact, map } = req.body;
  const id = req.params.id;
  const lib = {};
  if (address) lib.address = address;
  if (email) lib.email = email;
  if (contact) lib.contact = contact;
  if (map) lib.map = map;
  const new_con = await Contact.findByIdAndUpdate(
    id,
    { $set: lib },
    { new: true }
  );

  if (!new_con) {
    throw new BadRequestError("Try Again");
  }
  appStatus(201, new_con, req, res, next);
});

//delete
const deleteContact = tryCatch(async (req, res, next) => {
  const id = req.params.id;
  const new_con = await Contact.findByIdAndDelete(id);

  if (!new_con) {
    throw new BadRequestError("Try AGain");
  }
  appStatus(204, "", req, res, next);
});
// get ? query
const getContact = tryCatch(async (req, res, next) => {
  const meow = await Contact.findById("66ceb292174d191de8ad7a7d");

  if (!meow) {
    return next(new BadRequestError("Try Again"));
  }

  appStatus(200, meow, req, res, next);
});

module.exports = { addContact, updateContact, deleteContact, getContact };
