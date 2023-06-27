const express = require('express');
const socket = require('socket.io');
const app = express();
const cors = require('cors');


app.use(cors({
    origin:"*",
    credentials:true,
    optionsSuccessStatus:200,
}));
app.use(express.json());


const server = app.listen('3001', () => {
    console.log("Server Running on port 3001..");
})

io = socket(server, {
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Credentials'],
        withCredentials: true
    }
})
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('User joined room: ' + data); 
    });


    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED');
    });
});