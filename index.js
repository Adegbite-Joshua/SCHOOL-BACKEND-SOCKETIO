const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { socketSendMessage, sendNotification } = require('./controller/socket.controller');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT1;

let onlineUsers = [];    

const addUserId =(mongoDbId, socketId)=>{
    mongoDbId!=null&&!onlineUsers.some((user)=>user.mongoDbId == mongoDbId) && onlineUsers.push({
        socketId,
        mongoDbId
    })
}

io.on('connection', (socket)=>{
    console.log('Socket accessed' + socket.id);
    socket.on('connectSocketId', (mongoose)=>{
        console.log('adding id', mongoose)
        addUserId(mongoose, socket.id)
    })

    socket.on('sendMessage', (messageDetails, partnerId)=>{
        socketSendMessage(messageDetails)
        sendNotification({
            senderId: messageDetails.senderId,
            message: messageDetails.message.slice(0,15),
            date: new Date(),
            name: messageDetails.senderName,
            type: 'message'
        }, partnerId)
        console.log(onlineUsers)
        const user = onlineUsers.find((user) => user.mongoDbId === partnerId) 
        if(user){
            socket.to(user.socketId).emit('getMessage', messageDetails)
            socket.to(user.socketId).emit("getNotification", {
                senderId: messageDetails.senderId,
                message: messageDetails.message.slice(0,15),
                date: new Date(),
                name: messageDetails.senderName,
                type: 'message'
            });
        }
    })

    socket.on('userJoined', (details)=>{
        const roomId = details.roomId
        const createdRooms = io.sockets.adapter.rooms;
        let classGoingOn = [];
        if (createdRooms.get(roomId)) {
            classGoingOn = Array.from(createdRooms.get(roomId));
        }
        if(classGoingOn.length==0 && details.userType=='student'){
            socket.emit('classNotStarted', {message: 'Class not started'})
            return;
        }
        socket.join(roomId);
        socket.to(roomId).emit('userConnected', {...details, classGoingOn});
        socket.emit('sendJoinedMembers', classGoingOn)
    })

    socket.on('disconnectCall', (details)=>{
        console.log(details);
        const createdRooms = io.sockets.adapter.rooms;
        let classGoingOn = [];
        // if (createdRooms.get(details.roomId)) {
            classGoingOn = Array.from(createdRooms.get(details.roomId));
        // }
        console.log(classGoingOn);
        socket.to(details.roomId).emit('memberDisconnected', details);
    })

    socket.on('disconnect', ()=>{                                                                      
        console.log(`User with socket id ${socket.id} disconnected`);
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
    })
})


server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
