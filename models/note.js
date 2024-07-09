const mongoose = require("mongoose");
//creating schema
const noteSchema = new mongoose.Schema({
  uname: String,
  contact: String,
  datefrom: String,
  dateto: String,
  pax: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

//creating model
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
