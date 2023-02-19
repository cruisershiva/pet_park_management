const socket = require('socket.io');
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
const portn = 8000;
const server = app.listen(portn, () => {
    console.log(`server started on http://localhost:${portn}/`);
    
});
const users ={};

const io = socket(server, {
    cors: {
        origin: '*',
        handlePreflightRequests: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials": "true"
            });
            res.end();
        }
    }
});

io.on('connection', (socket) => {
    socket.on('new-user-joined',(name) => {
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', `user joined ${name}`);
    });
    socket.on('send', (message) => {
        socket.broadcast.emit('receive', {
            message: message, 
            name: users[socket.id]
        })

    });
})