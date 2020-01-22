const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const maps = require("./routes/api/maps");
const User = require('./models/User');
const bodyParser = require('body-parser');
const passport = require('passport');

// added constants for sockets
const io = require("socket.io");
const server = io.listen(8000);

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


//removed for sockets
// app.listen(port, () => {console.log(`Listening on port ${port}`)})



//added code for sockets
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/frontend/public/index.html');
});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});





let players = {};
let worldWidth = 3000;
let worldHeight = 3000;

let updatePlayerMovement = (player) => {
    let stopMovement = (player) => {
        if ((player.moveData.vector[0] < 0) && (player.x < 10 || player.x < player.moveData.clickPos[0])) {
            return true
        } else if ((player.moveData.vector[0] > 0) && (player.x > worldWidth - 10 || player.x > player.moveData.clickPos[0])) {
            return true
        } else if ((player.moveData.vector[1] < 0) && (player.y < 10 || player.y < player.moveData.clickPos[1])) {
            return true
        } else if ((player.moveData.vector[1] > 0) && (player.y > worldHeight - 10 || player.y > player.moveData.clickPos[1])) {
            return true
        } else {
            return false
        }
    }

    if (stopMovement(player)) {
        player.moveData.vector = [0, 0];
    } else {
        player.x = player.x + player.moveData.vector[0] * player.speed;
        player.y = player.y + player.moveData.vector[1] * player.speed;
    }

    if (player.x - player.width / 2 < 0) {
        player.x = player.width / 2;
    }
    if (player.y - player.height / 2 < 0) {
        player.y = player.height / 2;
    }
    if (player.x + player.width / 2 > worldWidth) {
        player.x = worldWidth - player.width / 2;
    }
    if (player.y + player.height / 2 > worldHeight) {
        player.y = worldHeight - player.height / 2;
    }

    if (player.x - player.width / 2 < 0) {
        player.x = player.width / 2;
    }
    if (player.y - player.height / 2 < 0) {
        player.y = player.height / 2;
    }
    if (player.x + player.width / 2 > worldWidth) {
        player.x = worldWidth - player.width / 2;
    }
    if (player.y + player.height / 2 > worldHeight) {
        player.y = worldHeight - player.height / 2;
    }
    return player
}


server.on('connection', function (socket) {

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });


    console.log('a user connected: ', socket.id);
    socket.emit('currentPlayers', players);

    players[socket.id] = {
        id: socket.id, x: 20, y: 20,
        speed: 1, width: 50, height: 50,
        moveData: { vector: [0, 0], clickPos: [20, 20] }
    };

    server.emit('newPlayer', players[socket.id]);

    socket.on('newClickMove', function (moveData) {
        players[socket.id].moveData = moveData;
    });

    socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
        delete players[socket.id];
        server.emit('disconnect', socket.id);
        clearInterval(interval)
    });

    let interval = () => {
        console.log("im setting an interval");
        setInterval(() => {
            Object.keys(players).forEach(key => {
                players[key] = updatePlayerMovement(players[key])
            })
            socket.emit("updatePlayer", players)
        }, 1000 / 60)
    }

    interval()
});

