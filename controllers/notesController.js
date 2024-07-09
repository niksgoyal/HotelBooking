const Note = require("../models/note");

//Read Operation
const fetchNotes = async (req, res) => {
  try {
    //find the notes
    const notes = await Note.find({ user: req.user._id });
    //respond with them
    res.json({
      notes: notes,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//Read By Id
const fetchNote = async (req, res) => {
  try {
    //get id from url
    const noteId = req.params.id;

    //finding the note using id
    const note = await Note.findOne({ _id: noteId, user: req.user._id });

    //respond with the note
    res.json({
      note: note,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//Create Operation
const createNote = async (req, res) => {
  try {
    //get the sent in data of request body
    const uname = req.body.uname;
    const contact = req.body.contact;
    const datefrom = req.body.datefrom;
    const dateto = req.body.dateto;
    const pax = req.body.pax;

    //create a note with it
    const note = await Note.create({
      uname: uname,
      contact: contact,
      datefrom: datefrom,
      dateto: dateto,
      pax: pax,
      user: req.user._id,
    });

    //respond with a new node
    res.json({
      note: note,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//Update Operation
const updateNote = async (req, res) => {
  try {
    //get id from url
    const noteId = req.params.id;

    //get the data off the request body
    const uname = req.body.uname;
    const contact = req.body.contact;
    const datefrom = req.body.datefrom;
    const dateto = req.body.dateto;
    const pax = req.body.pax;

    //find ad update the record
    await Note.findOneAndUpdate(
      { _id: noteId, user: req.user._id },
      {
        uname: uname,
        contact: contact,
        datefrom: datefrom,
        dateto: dateto,
        pax: pax,
      }
    );

    //find the updated note
    const note = await Note.findById(noteId);
    //respond with the updated note
    res.json({ note: note });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

//Delete Operation
const deleteNote = async (req, res) => {
  try {
    //get the id from the url
    const noteId = req.params.id;
    //find the note and delete it
    const note = await Note.deleteOne({ _id: noteId, user: req.user._id });
    //respond with the deleted note
    res.json({ note: note });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchNotes: fetchNotes,
  fetchNote: fetchNote,
  createNote: createNote,
  updateNote: updateNote,
  deleteNote: deleteNote,
};
