//client-side
const socket= io('http://localhost:8000');

let messagecont=document.querySelector('.container');
let inputmsg=document.querySelector('.input-send');
let sendmsg=document.querySelector('.send-message');

var audio=new Audio('ting.mp3')
const appendf=(message,position)=>{
const msgelement=document.createElement('div'); 
msgelement.innerText=message;
msgelement.classList.add('message');
msgelement.classList.add(position);
messagecont.append(msgelement);
if(position='left'){
audio.play();
}
}


let name=prompt("Enter your name to join the chat")
socket.emit('new-user-joined',name);

sendmsg.addEventListener('submit',(e)=>{
    e.preventDefault();
    let message=inputmsg.value;
    appendf(`You:${message}`,'right')
    socket.emit('send',message)
    inputmsg.value="";

})

socket.on('user-joined',name=>{
    appendf(`${name} joined the chat`,'right')
})

socket.on('recieve',data=>{

    appendf(`${data.name}:${data.message}`,'left')
})
socket.on('left',data =>{
    appendf(`${data} left the chat`,'left')
})