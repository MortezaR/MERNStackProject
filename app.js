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



let game = new Game();

gameServer.on('connection', function (socket) {
    
    console.log('a game user connected: ', socket.id);
    socket.emit('currentPlayers', game.getPlayers());
    
    let numPlayers = Object.keys(game.getPlayers()).length;
    console.log(numPlayers);
    if (numPlayers < 1){
        game.addPlayer(socket.id, 'bbw', 200, 200);
    }else{
        game.addPlayer(socket.id, 'piglet',
         200 * (numPlayers + 1), 200 * (numPlayers + 1))
    }



    console.log(game.getPlayer(socket.id).toObj())
    gameServer.emit('newPlayer', game.getPlayer(socket.id).toObj());

    socket.on('newClickMove', function (moveData) {
        game.getPlayer(socket.id).getObject()
            .performAction(moveData.type, moveData.clickPos[0], moveData.clickPos[1]);
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
            socket.emit("updatePlayer", game.getPlayers())
        }, 1000 / 60)
    }

    interval()
});

// let chatters;
let rooms = {}

chatServer.on('connection', function(socket){
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
        joinRoom(newData)
        chatServer.emit('updateRoomsInfo', rooms)
    })

    let addChatterToRoom = (username, roomId, playerId) => {
        rooms[roomId].chatters[playerId] = {
            id: playerId,
            username: username,
            ready: false
        }
    }

    let joinRoom = (data) => {
            if (rooms[data.oldRoomId]){
                delete rooms[data.oldRoomId].chatters[data.myId]
                socket.leave(rooms[data.oldRoomId].roomName)
                if (Object.keys(rooms[data.oldRoomId].chatters).length===0){
                    delete rooms[data.oldRoomId]
                    chatServer.emit('updateRoomsInfo', rooms)
                }
            }
            addChatterToRoom(data.username, data.roomId, socket.id, socket)
            let roomName = rooms[data.roomId].roomName
            socket.join(roomName)
            chatServer.in(roomName).emit('joinRoomInfo', { 
                chatters: rooms[data.roomId].chatters, 
                roomName: rooms[data.roomId].roomName, 
                roomId: data.roomId 
            })
        }

    socket.on('joinRoom', data => joinRoom(data))

    socket.on('disconnect', () => {
        delete rooms[socket.id]
        chatServer.emit('updateRoomsInfo', rooms)
        chatServer.emit('disconnectUser', socket.id)
    })

    
    // setTimeout(()=> {
    //     socket.emit('setupCurrentChatters', chatters)
    // }, 2000)

    // setTimeout(()=> {
    //     chatters[socket.id] = { id: socket.id, username: "Fred", ready: false }
    //     socket.emit('setupNewChatter', {rooms, user: chatters[socket.id]}) 
    // }, 500)

    // socket.on('newChatterConnected', (chatter) => {
    //     socket.broadcast.emit('addNewChatter', chatter)
    // })



    socket.on('chatMessage', (data) => {
        console.log("im receiving msg")
        chatServer.in(data.roomName).emit('newMessage', data)
    })

    socket.on('playerReady', (data) => {
        console.log('player is ready')
        console.log(data)
        rooms[data.roomId].chatters[data.id].ready = data.ready
        let newData = {id: socket.id, ready: data.ready}
        chatServer.in(data.roomName).emit('playerIsReady', newData)
    })
    
})