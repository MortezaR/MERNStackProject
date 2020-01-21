const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const maps = require("./routes/api/maps");
const User = require('./models/User');
const bodyParser = require('body-parser');

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get("/", (req, res) => {
    // const user = new User({
    //     username: "Joe",
    //     password: "12345"
    // })
    // user.save()
    res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/maps", maps);

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Listening on port ${port}`)})