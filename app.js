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
// 

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


const pear = require('http').createServer(app);

app.listen(port, () => {console.log(`Listening on port ${port}`)})

//added code for sockets
app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/frontend/public/index.html');
});

gameServer.listen(pear, () => {
    console.log(`gameServer started on port ${pear}`);
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//





// gameServer.on('connection', function (socket) {
    
//     console.log('a game user connected: ', socket.id);
//     socket.emit('currentPlayers', game.getPlayers());
    
//     let numPlayers = Object.keys(game.getPlayers()).length;
//     console.log(numPlayers);
//     if (numPlayers < 1){
//         game.addPlayer(socket.id, 'bbw', 200, 200);
//     }else{
//         game.addPlayer(socket.id, 'piglet',
//          200 * (numPlayers + 1), 200 * (numPlayers + 1))
//     }

//     console.log(game.getPlayer(socket.id).toObj())
//     gameServer.emit('newPlayer', game.getPlayer(socket.id).toObj());

//     socket.on('newClickMove', function (moveData) {
//         game.getPlayer(socket.id).getObject()
//             .performAction(moveData.type, moveData.clickPos[0], moveData.clickPos[1]);
//     });

//     socket.on('disconnect', function () {
//         console.log('user disconnected: ', socket.id);
//         game.deletePlayer(socket.id);
//         gameServer.emit('disconnect', socket.id);
//         clearInterval(interval)
//     });

//     let interval = () => {
//         console.log("im setting an interval");
//         setInterval(() => {
//             socket.emit("updatePlayer", game.getPlayers())
//         }, 1000 / 60)
//     }

//     interval()
// });

// let chatters;
let rooms = {}
let games = {}

chatServer.on('connection', function(socket){
    let game = {};
    let inGame = false;

    console.log('a chat user connected: ', socket.id);
    setTimeout(() => {
        socket.emit('setupNewChatter', { rooms, id: socket.id }) 
    }, 2000)
    
    socket.on('requestRoom', (data) => {
        rooms[socket.id] = {
            roomName: data.roomName,
            chatters: {},
            roomId: socket.id
        }
        let newData = data;
        newData["roomId"] = socket.id;
        console.log('requested room')
        console.log(data)
        joinRoom(newData)
        chatServer.emit('updateRoomsInfo', rooms)
    })

    let addChatterToRoom = (username, roomId, playerId) => {
        console.log("adding chatter to room")
        console.log(roomId)
        console.log(rooms)
        rooms[roomId].chatters[playerId] = {
            id: playerId,
            username: username,
            ready: false
        }
    }

    let joinRoom = (data) => {
        console.log("player joining room")
        console.log(data)
        if (data.oldRoomId !== ''){
            leaveRoom(data)
        }
        addChatterToRoom(data.username, data.roomId, socket.id)
        let roomName = rooms[data.roomId].roomName
        socket.join(roomName)
        chatServer.in(roomName).emit('joinRoomInfo', {
            chatters: rooms[data.roomId].chatters,
            roomName: rooms[data.roomId].roomName,
            roomId: data.roomId
        })
        socket.emit('clearMsg')
    }

    let leaveRoom = (data) => {
        console.log("player leaving room")
        console.log(rooms)
        delete rooms[data.oldRoomId].chatters[data.myId]
        socket.leave(data.oldRoomName)
        console.log(data)
        if (data.oldRoomId === data.myId) {  //client was hosting room and left
            chatServer.to(data.oldRoomName).emit('deleteRoom')
            if (data.oldRoomId !== data.roomId){ //client is joining a new room and not hosting
                delete rooms[data.oldRoomId]
                chatServer.emit('updateRoomsInfo', rooms)
            } else { //client is hosting a new room
                chatServer.emit('updateRoomsInfo', rooms)
            }
        } else { //client was not hosting 
            let chatters = rooms[data.oldRoomId].chatters
            chatServer.emit('updateRoomsInfo', rooms)
            chatServer.to(data.oldRoomName).emit('updateChattersInfo', chatters)
        }
    }

    socket.on('joinRoom', data => joinRoom(data))

    // socket.on('disconnect', () => {
    //     delete rooms[socket.id]
    //     chatServer.emit('updateRoomsInfo', rooms)
    //     chatServer.emit('disconnectUser', socket.id)
    // })

    socket.on('chatMessage', (data) => {
        console.log("im receiving msg")
        chatServer.to(data.roomName).emit('newMessage', data)
    })

    socket.on('playerReady', (data) => {
        console.log('player is ready')
        rooms[data.roomId].chatters[data.id].ready = data.ready
        let newData = {id: socket.id, ready: data.ready}
        chatServer.to(data.roomName).emit('playerIsReady', newData)
    })
    
    socket.on('allLobbyPlayersReady', (roomName) => {
        chatServer.to(roomName).emit('goToGame')
        console.log(`starting game on ${socket.id}`)
    })


    

    socket.on('newClickMove', function (moveData) {
        if (!inGame) return null
        game.getPlayer(socket.id).getObject()
            .performAction(moveData.type, moveData.clickPos[0], moveData.clickPos[1]);
    });

    socket.on('disconnect', function () {
        if (inGame){
            console.log('user disconnected: ', socket.id);
            game.deletePlayer(socket.id);
            chatServer.to(roomName).emit('disconnect', socket.id);
        } else {
            delete rooms[socket.id]
            chatServer.emit('updateRoomsInfo', rooms)
            chatServer.emit('disconnectUser', socket.id)
        }
        // clearInterval(interval)
    });

    socket.on('playersAllReady', (data) => {
        console.log(data)
        inGame = true
        let players = rooms[data.roomId].chatters
        let playerIds = Object.keys(players).map((key) => {
            return players[key].id
        })
        game = new Game();
        console.log('the game host connected: ', socket.id);
        chatServer.to(data.roomName).emit('currentPlayers', game.getPlayers());

        let numPlayers = playerIds.length;
        console.log(numPlayers);
        game.addPlayer(playerIds[0], 'bbw', 200, 200);
        chatServer.to(`${playerIds[0]}`).emit('newPlayer', game.getPlayer(playerIds[0]).toObj());
        for (let i = 1; i < 4; i++) {
            game.addPlayer(playerIds[i], 'piglet',
                200 * (numPlayers + 1), 200 * (numPlayers + 1))
            chatServer.to(`${playerIds[i]}`).emit('newPlayer', game.getPlayer(playerIds[i]).toObj());
        }
        console.log(game.getPlayer(socket.id).toObj())

        let interval = () => {
            console.log("im setting an interval");
            setInterval(() => {
                // socket.emit("updatePlayer", game.getPlayers())
                chatServer.to(data.roomName).emit("updatePlayer", game.getPlayers())
            }, 1000 / 60)
        }

        interval()
    })


})