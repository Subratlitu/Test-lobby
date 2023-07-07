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
const model = require("./script");
app.use(express.static('public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/f3.html');
});



io.on('connection', (socket) => {
	socket.on('sendname', (postData) => {
        console.log({username})
		model.saveData(postData.sender,postData.receiver,postData.query);
		io.emit('send name', (username));
	});

	socket.on('getaalldata', async (chat) => {
		let messages = await model.getData()
		io.emit('send message', (messages));
	});
});

server.listen(port, () => {
	console.log(`Server is listening at the port: ${port}`);
});
