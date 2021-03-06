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
const server = require('http').Server(app);
const socket = require('socket.io');

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

//new code
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

const chatServer = socket(server);



// const pear = require('http').createServer(app);

// app.listen(port, () => {console.log(`Listening on port ${port}`)})

// //added code for sockets
// app.get('/index.html', function (req, res) {
//     res.sendFile(__dirname + '/frontend/public/index.html');
// });


// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
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
    let intervalId;

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
        currentRoomId = socket.id;
        currentRoomName = data.roomName;
        joinRoom(newData)
        chatServer.emit('updateRoomsInfo', rooms)
    })

    let addChatterToRoomsObj = (username, roomId, playerId) => {
        console.log("adding chatter to room")
        rooms[roomId].chatters[playerId] = {
            id: playerId,
            username: username,
            ready: false
        }
        console.log(rooms[roomId].chatters)
    }

    let joinRoom = (data) => {
        console.log("player joining room")
        socket.leave(data.oldRoomName)
        currentRoomId = data.roomId;
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
        console.log(rooms)
        chatServer.to(data.roomName).emit('newMessage', data)
        console.log(data);
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
        //error here
        games[moveData.gameId].getPlayer(socket.id).getObject()
            .performAction(moveData.type, moveData.clickPos[0], moveData.clickPos[1]);
    });

    socket.on('disconnect', function (id) {
        id = socket.id || id
        console.log('user disconnected: ', id);
        if (inGame) {//in game
            if (id===currentRoomId){//hosting game
                chatServer.to(currentRoomName).emit('disconnectHost');
                inGame = false;
                delete games[id];
                delete rooms[id];
            } else {
                game.deletePlayer(id);
                chatServer.to(currentRoomName).emit('disconnectUser', id);
            }
        } 
        if (rooms[id]){//hosting chat
            delete rooms[id];
            } else {//not hosting vhat
                if (rooms[currentRoomId]){
                    delete rooms[currentRoomId].chatters[id]
                }
            chatServer.emit('updateRoomsInfo', rooms)
            chatServer.emit('disconnectUser', id)
        }
        clearInterval(intervalId)
        socket.disconnect()
    });


    socket.on('playersAllReady', (data) => {
        let gameId = data.roomId;
        inGame = true;

        let players = rooms[data.roomId].chatters
        let playerIds = Object.keys(players).map((key) => {
            return players[key].id
        })
        game = new Game(data.map);
        games[data.roomId] = game;
        console.log('the game host connected: ', socket.id);

        let numPlayers = playerIds.length;

        //initial player setups
        game.addPlayer(playerIds[0], 'bbw', 200, 200);
        chatServer.to(currentRoomName).emit('newWolf', game.getPlayer(playerIds[0]).toObj());

        //test change here
        for (let i = 1; i < 4; i++) {
            game.addPlayer(playerIds[i], 'piglet',
                200 * (numPlayers + 1), 200 * (numPlayers + 1))
            chatServer.to(currentRoomName).emit('newPiglet', game.getPlayer(playerIds[i]).toObj());
        }
        interval = () => {
            intervalId = setInterval(() => {
                let gameInfo = game.getGameInfo();
                if (gameInfo.winner && inGame) {
                    let endGameData = {
                        winner: gameInfo.winner,
                        pigletIds: gameInfo.pigletIds,
                        wolfId: gameInfo.wolfId
                    }
                    chatServer.to(currentRoomName).emit("endGame", endGameData);
                    inGame = false;
                    setTimeout(() => {
                        chatServer.to(currentRoomName).emit('gameIsOver');
                        clearInterval(intervalId);
                        delete games[gameId];
                        delete rooms[gameId];
                        chatServer.emit('updateRoomsInfo', rooms)
                    }, 6000)
                }
                chatServer.to(currentRoomName).emit("updateGame", game.getPlayers(), game.getObjects(), gameInfo);
            }, 1000 / 100)
        }

        interval()
    })



    socket.on('soloPlayerReady', (map, wolf) => {
        inGame = true;
        let demoRoomName = socket.id;
        let numPiglets = 10;
        socket.join(demoRoomName);
        currentRoomId = socket.id;

        // let players = rooms[data.roomId].chatters
        // let playerIds = Object.keys(players).map((key) => {
        //     return players[key].id
        // })
        game = new Game(map);
        games[socket.id] = game;
        console.log('the game host connected: ', socket.id);

        //initial player setups
        if (wolf){
            game.addPlayer(socket.id, 'bbw', 200, 200);
            chatServer.to(demoRoomName).emit('newWolf', game.getPlayer(socket.id).toObj());
            let pigletSpawns = [[0, 0], [0, 0], [0, 0], [-400, 0], [-800, 0], [600, 0], [800, 0], [-800, 200], [800, 200], [600, 200]]
            for (let i = 1; i < numPiglets; i++) {
                game.addPlayer(i.toString(), 'piglet',
                    pigletSpawns[i][0], pigletSpawns[i][1])
                chatServer.to(demoRoomName).emit('newPiglet', game.getPlayer(i.toString()).toObj());
            }
            game.map.playerObjects[socket.id].dead = false;
        } else {
            game.addPlayer(socket.id, 'bbw', 100, 100);
            game.addPlayer(socket.id, 'piglet', 200, 200);
            chatServer.to(demoRoomName).emit('newPiglet', game.getPlayer(socket.id).toObj());
            game.map.playerObjects[socket.id].dead = false;
        }


        //test change here
        interval = () => {
            intervalId = setInterval(() => {
                let gameInfo = game.getGameInfo();
                if (gameInfo.winner && inGame) {
                    let endGameData = {
                        winner: gameInfo.winner,
                        pigletIds: gameInfo.pigletIds,
                        wolfId: gameInfo.wolfId
                    }
                    chatServer.to(demoRoomName).emit("endGame", endGameData);
                    inGame = false;
                    setTimeout(() => {
                        chatServer.to(demoRoomName).emit('gameIsOver');
                        clearInterval(intervalId);
                        delete games[socket.id];
                    }, 6000)
                }
                chatServer.to(demoRoomName).emit("updateGame", game.getPlayers(), game.getObjects(), gameInfo);
            }, 1000 / 100)
        }

        interval()
    })

})