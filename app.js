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
const path = require('path');

//added for sockets
const io = require("socket.io");
const chatServer = io.listen(7000);

//

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
  }

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


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
//
//-------------------

// let game = new Game();

// gameServer.on('connection', function (socket) {
    
//     console.log('a game user connected: ', socket.id);
//     socket.emit('currentPlayers', game.getPlayers());
    
//     game.addPlayer(socket.id);
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
            
//         }, 1000 / 60)
//     }

//     interval()
// });

//-------------------

// let chatters;
let rooms = {}
let games = {}

chatServer.on('connection', function(socket){
    let game = {};
    let inGame = false;
    let currentRoomId = '';
    let currentRoomName = '';
    let interval;


    console.log('a chat user connected: ', socket.id);
    setTimeout(() => {
        socket.emit('setupNewChatter', { rooms, id: socket.id }) 
    }, 1000)
    
    socket.on('requestRoom', (data) => {
        rooms[socket.id] = {
            roomName: data.roomName,
            chatters: {},
            roomId: socket.id
        }
        let newData = data;
        newData["roomId"] = socket.id;
        console.log('requested room')
        currentRoomId = socket.id;
        currentRoomName = data.roomName;
        joinRoom(newData)
        chatServer.emit('updateRoomsInfo', rooms)
    })

    let addChatterToRoomsObj = (username, roomId, playerId) => {
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
        socket.leave(data.oldRoomName)
        currentRoomId = data.roomId;
        console.log(data)
        if (data.oldRoomId !== ''){
            leaveRoom(data) // maybe problem
        }
        addChatterToRoomsObj(data.username, data.roomId, socket.id)
        currentRoomName = rooms[currentRoomId].roomName
        socket.join(currentRoomName)
        chatServer.emit('updateRoomsInfo', rooms)
        chatServer.in(currentRoomName).emit('joinRoomInfo', {
            chatters: rooms[currentRoomId].chatters,
            roomName: currentRoomName,
            roomId: currentRoomId
        })
        socket.emit('clearMsg')
    }

    let leaveRoom = (data) => {
        console.log("player leaving room")
        if (data.oldRoomId === data.myId) {//host leaving hosted room
            chatServer.to(data.oldRoomName).emit('deleteRoom')
            if (data.oldRoomId !== data.roomId){//host leaving to other room
                delete rooms[data.oldRoomId]
            } 
        } else {//nonhost leaving room
            if (rooms[data.oldRoomId]) {//the room im leaving still exists
                delete rooms[data.oldRoomId].chatters[socket.id]
                let chatters = rooms[data.oldRoomId].chatters
                chatServer.to(data.oldRoomName).emit('updateChattersInfo', chatters)
            }
        }
        chatServer.emit('updateRoomsInfo', rooms)
    }

    socket.on('joinRoom', data => joinRoom(data))

    socket.on('chatMessage', (data) => {
        console.log("im receiving msg")
        chatServer.to(data.roomName).emit('newMessage', data)
    })

    socket.on('playerReady', (data) => {
        if(currentRoomId){
            console.log('player is ready')
            rooms[data.roomId].chatters[data.id].ready = data.ready
            let newData = { id: socket.id, ready: data.ready }
            chatServer.to(data.roomName).emit('playerIsReady', newData)
        }
    })
    
    socket.on('allLobbyPlayersReady', (roomName) => {
        chatServer.to(roomName).emit('goToGame')
        console.log(`starting game on ${socket.id}`)
    })

    socket.on('newClickMove', function (moveData) {
        console.log(moveData)
        games[moveData.gameId].getPlayer(socket.id).getObject()
            .performAction(moveData.type, moveData.clickPos[0], moveData.clickPos[1]);
    });

    socket.on('disconnect', function (id) {
        id = socket.id || id
        console.log('user disconnected: ', id);
        if (inGame) {//in game
            if (id===currentRoomId){//hosting game
                chatServer.to(currentRoomName).emit('disconnectHost');
                game
            } else {
                game.deletePlayer(id);
                chatServer.to(currentRoomName).emit('disconnectUser', id);
            }
        } 
        if (rooms[id]){//hosting chat
            delete rooms[id]
            } else {//not hosting vhat
                if (rooms[currentRoomId]){
                    delete rooms[currentRoomId].chatters[id]
                }
            chatServer.emit('updateRoomsInfo', rooms)
            chatServer.emit('disconnectUser', id)
        }
        clearInterval(interval)
        socket.disconnect()
    });


    socket.on('playersAllReady', (data) => {
        console.log(data)
        inGame = true
        let players = rooms[data.roomId].chatters
        let playerIds = Object.keys(players).map((key) => {
            return players[key].id
        })
        game = new Game();
        games[data.roomId] = game;
        console.log('the game host connected: ', socket.id);
        

        let numPlayers = playerIds.length;
        console.log(numPlayers);

        //initial player setups
        game.addPlayer(playerIds[0], 'bbw', 200, 200);
        chatServer.to(`${playerIds[0]}`).emit('newPlayer', game.getPlayer(playerIds[0]).toObj());
        // for (let i = 1; i < 4; i++) {
        //     game.addPlayer(playerIds[i], 'piglet',
        //     200 * (numPlayers + 1), 200 * (numPlayers + 1))
        //     chatServer.to(`${playerIds[i]}`).emit('newPlayer', game.getPlayer(playerIds[i]).toObj());
        // }
        chatServer.to(currentRoomName).emit('currentPlayers', game.getPlayers());
        console.log(game.getPlayer(socket.id).toObj())
        interval = () => {
            console.log("im setting an interval");
            setInterval(() => {
                // chatServer.to(currentRoomName).emit("updatePlayer", game.getPlayers())
                chatServer.to(currentRoomName).emit("updateGame", game.getPlayers(), game.getObjects());
                // chatServer.emit("updatePlayer", game.getPlayers())
            }, 1000 / 60)
        }

        interval()
    })


})