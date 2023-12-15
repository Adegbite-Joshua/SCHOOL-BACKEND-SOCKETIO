const messageModel = require("../models/message.model")
const { notification } = require("../models/student.model")

const socketSendMessage = (message)=>{
    let newMessage = messageModel(message)
    newMessage.save()
    .then(()=>{})
    .catch((error)=>{
        console.log(error);
    })
}

const sendNotification = (notificationDetails, mongoDbId)=>{
    notification.findOne({_id: mongoDbId})//   { $inc: { "unread": 1 }, $push: {notifications: notificationDetails} }
    .then((res)=>{
        console.log(res)
        if(res==null){
            let notificationForm = notification({_id: mongoDbId, unread: 1, notifications: [notificationDetails]});
            notificationForm.save()
            .then((res2)=>{
                console.log(res2)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}

module.exports = {socketSendMessage, sendNotification}