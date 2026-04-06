const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://abhishek:Abhi@123@cluster0.hl55a9a.mongodb.net/bookmyshow",
  );
};

module.exports = connect;
