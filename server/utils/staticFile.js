const fs = require("fs").promises;
const path = require("path");

const lib = {};
lib.storePath = path.join(__dirname, "/../.store");
lib.delete = async (file) => {
  if (!file) {
    //console.log("Not a file");
    return;
  }

  if (Array.isArray(file)) {
    for (const element of file) {
      await fs.unlink(path.join(lib.storePath, element));
      //console.log("del::", file);
    }
  } else {
    await fs.unlink(path.join(lib.storePath, file));
    //console.log("del::", file);
  }
  //console.log("del::", file);
};

module.exports = lib;
