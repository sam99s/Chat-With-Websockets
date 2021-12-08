const socket = io(); //envia todos los eventos al servidor

let message = document.getElementById("message");
let username = document.getElementById("username");
let send = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

send.addEventListener("click", function () {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
  });
});

message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
});

// No importa que se repita el nombre, chat:message, ya que son dos procesos distintos
socket.on("chat:message", function (data) {
  actions.innerHTML = ""; // Para borrar el is typing
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p>
    <em>${data} is typing a messsage...</em>
    </p>`;
});
