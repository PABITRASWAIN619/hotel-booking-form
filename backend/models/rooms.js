const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
});

module.exports = mongoose.model("Room", roomSchema);
