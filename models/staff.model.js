const mongoose = require('mongoose');	
const bcrypt = require('bcryptjs');


const staffSchema = new mongoose.Schema({
    firstName: {required: true, type: String},
    lastName: {required: true, type: String},
    phoneNumber: {required: true, type: String},
    email: {required: true, type: String, unique: true},
    socketio_id: {type: String},
    password: {required: true, type: String},
    staffIndex: {required: true, type: String, unique:true},
    class: {required: true, type: String},
    address: {type: String},
    accountName: {type: String},
    accountNumber: {type: String},
    bankName: {type: String},
    bankCode: {type: String},
    localGovernment: {type: String},
    state: {type: String},
    links: {
        facebook: {type: String},
        twitter: {type: String},
        whatsapp: {type: String},
        other: {type: String}
    },
    subjectInfo: {
        subjectName: {required: true, type: String, unique:true},
        subjectDescription: {type: String},
        subjectPicUrl: {type: String}
    },
    activeStatus: {required: true, type: Boolean},
    messages: {required:true, type: Array},
    submittedWorks: {required:true, type: Array},
    timelines: {required:true, type: Array},
    groups: {required:true, type: Array},
    files: {required:true, type: Array},
    // filess: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Notification'
    // },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }
})

const notificationSchema = new mongoose.Schema({
    _id: {type: String},
    unread: {type: Number},
    notifications: {type: Array}
})

staffSchema.pre('save', function (next){
    bcrypt.hash(this.password, Number(process.env.PASSWORDSALTING))
    .then((hashedPassword)=>{
        this.password = hashedPassword
        console.log(this.password);
        next()
    })
    .catch((err)=>{
        console.log(err);
    })
})

staffSchema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (error, same)=>{
        if (!error) {
            callback(error, same)
            console.log(same)
        } else{
            next()
        }
    })
    
}

let jssonestaff = mongoose.model(`jssonestaffs`, staffSchema)
let jsstwostaff = mongoose.model(`jsstwostaffs`, staffSchema)
let jssthreestaff = mongoose.model(`jssthreestaffs`, staffSchema)
let sssonestaff = mongoose.model(`sssonestaffs`, staffSchema)
let ssstwostaff = mongoose.model(`ssstwostaffs`, staffSchema)
let sssthreestaff = mongoose.model(`sssthreestaffs`, staffSchema)

const notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)


// const staffSignUpModel = mongoose.model('classes', staffSchema)
// export default staffSchema
module.exports = {jssonestaff, jsstwostaff, jssthreestaff, sssonestaff, ssstwostaff, sssthreestaff, notification}