const io = require("socket.io-client");
const readline = require("readline");

const socket = io.connect("http://localhost:4000");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter an Alias: ', (input) => {
    socket.emit('newUser', input);
    socket.on('newUser', (data) => console.log(data));
    rl.question('', (input) => {
        socket.emit('chat', input);
        rl.on('line', (input) => {
            socket.emit('chat', input);
        });
    });
});

socket.on('chat', (data) => {
    console.log(data);
});