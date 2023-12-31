const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "dpg-cm1a96i1hbls73afkt20-a",
    user: "smart_brain_db_i49j_user",
    password: "BxRgc8SzYEyu28LGh5rdBUUxtBpYlFja",
    database: "smart_brain_db_i49j",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });
const app = express();

app.use(bodyParser.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("it is working!");
});

app.post("/signin",signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port 3000 ${process.env.PORT}`);
});
