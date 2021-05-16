import express from 'express';
import healthRouter from './router/health';

const app = express();
const PORT = 8000;

const http = require('http').createServer(app);
const io = require('socket.io')(http);

let connectedUsers: any[] = [];

io.on('connection', socket => {
    console.log('A user connected');
    connectedUsers.push(socket.id);
    socket.broadcast.emit('update-user-list', { userIds: connectedUsers });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        connectedUsers = connectedUsers.filter(user => user !== socket.id);
        socket.broadcast.emit('update-user-list', { userIds: connectedUsers });
    })
});

io.on('error', function(err) {
    console.log("Error in connecting: " + err.message);
})

app.use('/', healthRouter);

http.listen(PORT, () => {
    console.log('listening on http://localhost:'+ PORT);
});