const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    partnerCommonId: {type:String},
    senderId: {type:String},
    message: {type:String},
    messageDate: {type:String},
    messageTime: {type:String},
}, {timestamps:true})

const messageModel = mongoose.model('messages', messageSchema)

module.exports = messageModel;