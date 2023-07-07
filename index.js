const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', (client) => {
    console.log("lets goooo")     
});
server.listen(4000);