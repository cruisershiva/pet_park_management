const socket =io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput =  document.getElementById('messageInp')
const messagecontainer= document.querySelector(".container")

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
}  
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
     append(`you:${message}`,'right')
     socket.emit('send', message);
})
const n = prompt("enter ur name to join");
socket.emit('new-user-joined', n);
socket.on('user-joined', (n) => {
    append(`${n} joined the chat`,'right')
})  
socket.on('receive', (data) => {
    append(`${data.name}:${data.message}`,'left')
});

// socket.on('user-joined', name=> {
//     append(`${name} joined the chat`,'right')
// })