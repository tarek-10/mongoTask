const mongoose = require("mongoose");

const connection = async () => {
  return await mongoose
    .connect(process.env.CONNECTUION_URL)
    .then((result) => {
      console.log("DB Connected Successfully ...!");
    })
    .catch((error) => {
      console.log("Fail To Connect ...!");
    });
};

module.exports = connection;
