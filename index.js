// const app = require('express')();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// io.on('connection', (client) => {
//     console.log("lets goooo")     
// });

// app.get('/test', (req, res) => {
//     res.sendFile(__dirname + '/f2.html');
//   });
// server.listen(4000);


const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/f2.html');
});



io.on('connection', (socket) => {
	socket.on('send name', (username) => {
        console.log({username})
		io.emit('send name', (username));
	});

	socket.on('send message', (chat) => {
		io.emit('send message', (chat));
	});
});

server.listen(port, () => {
	console.log(`Server is listening at the port: ${port}`);
});
