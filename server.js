const { join } = require("path");

const port = 4000;
const http = require("http").createServer();

const io = require("socket.io")(http);

io.on('connection', (socket) => {
    socket.on('newUser', (data) => {
        socket.emit('newUser', `${data} Succesfully Entered Obito's Chat`);
        socket.broadcast.emit('newUser', `${data} Entered Obito's Chat`);
        console.log("Client Entered!");
        socket.on('chat', (data) => {
            socket.broadcast.emit('chat', data);
        });
    });
});

http.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

