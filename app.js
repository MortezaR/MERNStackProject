const Game = require('./game/game')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const maps = require("./routes/api/maps");
const User = require('./models/User');
const bodyParser = require('body-parser');
const passport = require('passport');

//added for sockets
const io = require("socket.io");
const gameServer = io.listen(8000);
const chatServer = io.listen(7000);

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/users", users);
app.use("/api/maps", maps);

const port = process.env.PORT || 5000;

// app.listen(port, () => {console.log(`Listening on port ${port}`)})



//added code for sockets
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/frontend/public/index.html');
});

gameServer.listen(process.env.PORT || 5000, () => {
    console.log(`gameServer started on port ${process.env.PORT || 5000}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});




let game = new Game();

gameServer.on('connection', function (socket) {
    
    console.log('a game user connected: ', socket.id);
    socket.emit('currentPlayers', game.getPlayers());
    
    game.addPlayer(socket.id, 'bbw', 50, 50);
    console.log(game.getPlayer(socket.id).toObj())
    gameServer.emit('newPlayer', game.getPlayer(socket.id).toObj());

    socket.on('newClickMove', function (moveData) {
        game.getPlayer(socket.id).getObject()
            .move(moveData.clickPos[0], moveData.clickPos[1]);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
        game.deletePlayer(socket.id);
        gameServer.emit('disconnect', socket.id);
        clearInterval(interval)
    });

    let interval = () => {
        console.log("im setting an interval");
        setInterval(() => {
            // Object.keys(players).forEach(key => {
            //     players[key] = updatePlayerMovement(players[key])
            // })
            socket.emit("updatePlayer", game.getPlayers())
        }, 1000 / 60)
    }

    interval()
});

chatServer.on('connection', function(socket){
    console.log('a chat user connected: ', socket.id);
    socket.on('chatMessage', (message)=> {
        console.log("incoming message")
        chatServer.emit('newMessage', message)
    })
})