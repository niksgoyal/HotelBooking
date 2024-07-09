//load env file for mongodb url
if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv");
}
const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectToDb;
