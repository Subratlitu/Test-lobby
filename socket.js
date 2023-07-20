//Socket connection
const messageModel = require("./model/messageModel")
const users = ["asfasdfa","jkdfngan"]


module.exports = function(io) {
    io.on('connection', async (socket) => {
           socket.on('joined-user', async(data) =>{
               //Storing users connected in a room in memory
               var user = {};
               user[socket.id] = data.username;
               if(users[data.roomname]){
                   users[data.roomname].push(user);
               }
               else{

                   users[data.roomname] = [user];
               }
               
               //Joining the Socket Room
               socket.join(data.roomname);
       
               //Emitting New Username to Clients
            //    let isUserExist = await messageModel.isAlreadyUser("aaaa",data.email)
            
            //    if(!isUserExist){
            //     socket.emit('joined-user', {username: data.username} );
            //    }
               socket.emit('joined-user', {username: data.username} );
       
               //Send online users array
               //io.to(data.roomname).emit('online-users', getUsers(users[data.roomname]))
           })
       
           //Emitting messages to Clients
           let lastTenMessage = await messageModel.getTenMessage();
           lastTenMessage = lastTenMessage.reverse()
            
           for (const message of lastTenMessage) {
              socket.emit('chat1', { username: message.sender, message: message.messageText , createdAt:message.createdAt });
           }

           socket.on('chat', (data) =>{
            
               let checkMessage = 
               messageModel.saveMessage(
                data.username,
                "",
                data.message,
                3
               )
               socket.emit('chat1', {username: data.username, message: data.message,createdAt: new Date().toISOString()});
           })
           socket.on('chat-time', (data) =>{
           let x = messageModel.removeCurrentMessage(data.currentTime,data.username,data.message)
            
        })
           //Broadcasting the user who is typing
           socket.on('typing', (data) => {
               socket.emit('typing', data.username)
           }
           
           
           )
       
           //Remove user from memory when they disconnect
        //    socket.on('disconnecting', ()=>{
        //        var rooms = Object.keys(socket.rooms);
        //        var socketId = rooms[0];
        //        var roomname = rooms[1];
        //        users[roomname].forEach((user, index) => {
        //            if(user[socketId]){
        //                users[roomname].splice(index, 1)
        //            }
        //        });
       
        //        //Send online users array
        //        io.to(roomname).emit('online-users', getUsers(users[roomname]))
        //    })
       })
  };
