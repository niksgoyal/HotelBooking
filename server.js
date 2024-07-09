//load env files for localhost only
if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

//import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controllers/notesController");
const usersController = require("./controllers/usersController");
const requireAuth = require("./middleware/requireAuth");

//create an express app
const app = express();

//configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//connect to database
connectToDb();

//Routing
//signup
app.post("/signup", usersController.signup);

//login
app.post("/login", usersController.login);

//logout
app.get("/logout", usersController.logout);

//chechAuth
app.get("/check-auth", requireAuth, usersController.checkAuth);

//Read Operation
app.get("/notes", requireAuth, notesController.fetchNotes);

//Read Data by Id
app.get("/notes/:id", requireAuth, notesController.fetchNote);

//Create Operation
app.post("/notes", requireAuth, notesController.createNote);

//Update Operation
app.put("/notes/:id", requireAuth, notesController.updateNote);

//Delete Operation
app.delete("/notes/:id", requireAuth, notesController.deleteNote);

//start our server
app.listen(process.env.PORT || 8000);
