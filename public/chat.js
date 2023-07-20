const output = document.getElementById('output');
const message = document.getElementById('message');
const send = document.getElementById('send');
const feedback = document.getElementById('feedback');
const roomMessage = document.querySelector('.room-message');
const users = document.querySelector('.users');
//Socket server URL

const socket = io.connect('http://localhost:5000');
//Fetch URL Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get('username');
const userEmail = urlParams.get('email')
const roomname = "Lobby"


//Display the roomname the user is connected to
roomMessage.innerHTML = `Connected in  ${roomname}`

//Emitting username and roomname of newly joined user to server
socket.emit('joined-user', {
    
    username: username,
    roomname: roomname,
    email: userEmail
})

//Sending data when user clicks send
send.addEventListener('click', () =>{
    socket.emit('chat', {
        username: username,
        message: message.value,
        roomname: roomname
    })
    console.log("$$$$$$",message.value)
   
})

//Sending username if the user is typing
message.addEventListener('keypress', () => {
    // console.log(process.env.NODE_SERVER)
    socket.emit('typing', {username: username, roomname: roomname})
})

//Displaying if new user has joined the room
socket.on('joined-user', (data)=>{
    output.innerHTML += '<p><span class="arrow1"></span> <strong><em>' + data.username + '</strong> has Joined the Room</em></p>';

})

//Displaying the message sent from user
// socket.on('chat1', (data) => {
//     console.log("^^^^^^^",data)
//     output.innerHTML += '<p><strong>' + data.username + '</strong>: ' + data.message + '</p>';
//     feedback.innerHTML = '';
//     document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight

// })


socket.on('chat1', (data) => {
  const messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-wrapper');

  const messageElement = document.createElement('p');
  messageElement.classList.add('message-element');

  const roundMark = document.createElement('span');
  roundMark.classList.add('round-mark');

  roundMark.innerText = '● '; // You can customize the round mark symbol here
  roundMark.addEventListener('mouseenter', () => {
    roundMark.innerText = '✖'; // Display the delete option
  });
  roundMark.addEventListener('mouseleave', () => {
    roundMark.innerText = '●'; // Restore the round mark symbol
  });
  roundMark.addEventListener('click', () => {
    messageWrapper.remove();
    socket.emit('chat-time', {
      username: data.username,
      message: data.message,
      currentTime: data.createdAt
    });
  });

  const senderName = document.createElement('span');
  senderName.classList.add('sender-name');
  senderName.innerText = data.username + ': ';

  const messageText = document.createElement('span');
  messageText.classList.add('message-text');
  messageText.innerText = data.message;

  // Format the createdAt date into the desired format "hh.mm"
  const createdAtDate = new Date(data.createdAt);
  const timeText = `${createdAtDate.getDate()}/${createdAtDate.getMonth() + 1}/${createdAtDate.getFullYear()} ${createdAtDate.getHours()}.${createdAtDate.getMinutes().toString().padStart(2, '0')}`;

  // Create the time element to display the time and date
  const timeElement = document.createElement('span');
  timeElement.classList.add('message-time');
  timeElement.innerText = timeText;

  // Append the sender name, message text, and time element to the message element
  messageElement.appendChild(roundMark);
  messageElement.appendChild(senderName);
  messageElement.appendChild(messageText);
  messageElement.appendChild(timeElement);

  messageWrapper.appendChild(messageElement);
  output.appendChild(messageWrapper);
       // Scroll the new message into view (bottom)
       messageWrapper.scrollIntoView({ behavior: 'smooth', block: 'end' });

       // Clear the input field after sending the message
       document.getElementById('message').value = '';
   
       // Set focus back to the input field for easy typing of the next message
       document.getElementById('message').focus();
  feedback.innerHTML = '';
  document.querySelector('.chat-message').scrollTop = document.querySelector('.chat-message').scrollHeight;
});


//Displaying if a user is typing
socket.on('typing', (user) => {
    feedback.innerHTML = '<p><em>' + user + ' is typing...</em></p>';
})

//Displaying online users
socket.on('online-users', (data) =>{
    users.innerHTML = ''
    data.forEach(user => {
        users.innerHTML += `<p>${user}</p>`
    });
})