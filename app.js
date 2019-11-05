/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const cors = require('cors');

const { login, postUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const cards = require("./routes/cards");
const users = require("./routes/users");

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const { PORT = 9999 } = process.env;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.json());


app.post("/signin", login);
app.post("/signup", postUser);

//app.use(auth);
app.use("/cards", cards);
app.use("/users", users);

app.listen(PORT);
