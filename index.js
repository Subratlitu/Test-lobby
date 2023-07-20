
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');

const socket = require('socket.io')
const server = http.createServer(app);
const port = 5000;
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
const io = socket(server);
require('./socket')(io);
require("./scripts/mongoConnect");
const router = require("./routes/index")

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/f3.html');
// });

app.use('/', router)
// app.get('/', (req, res)=>{
//     res.render('index')
// })
// app.post('/room', (req, res) => {
//    let  userEmail = req.body.email;
//    let  username = req.body.username;
//     res.redirect(`/room?username=${username}`)
// })

// // //Rooms
// app.get('/room', (req, res)=>{
//     res.render('room')
// })

server.listen(port, () => {
	console.log(`Server is listening at the port: ${port}`);
});
 