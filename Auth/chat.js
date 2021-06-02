var socket;

function appendmsg(name, type, text){
  const msgHTML = `<p class="${type}">${name}: ${text}</p>`;
  document.getElementById('chat').insertAdjacentHTML("beforeend", msgHTML);
  document.getElementById('chat').scrollTop += 500;

}

function AddMessageClick(){
  event.preventDefault();
  var msgerInput = document.getElementById('input');
  const msgText = msgerInput.value;
  if (!msgText) return;
  appendmsg("You", "msguser", msgText);
  msgerInput.value = "";
  socket.emit(
      'sendMessage',
      {
          from: "User",
          text: msgText
      }
  )
}

$(document).ready(function(){
  
    // під'єднуємось до сервера - створюєм новий сокет
     socket=io.connect('http://localhost:8080');
    // відправляємо повідомлення про під'єднання нового користувача
    socket.emit('joinclient', "is connected!");
    socket.on('toAllUsers', message => {
        console.log('toAllUsers -- client side', message);
        appendmsg("Server", "msgserver", message);
    });
    socket.on('joinserver', message => {
        console.log('joinserver -- client side', message);
        appendmsg("Server", "msgserver", message.msg);
    });

    socket.on('sendMessage', message => {
        console.log('sendMessage -- client side', message);
        appendmsg(message.user, "msgdefault", message.msg);
    });

    
  
});