const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName: {required: true, type:String},
    lastName: {required: true, type:String},
    email: {required: true, type:String, unique: true},
    entranceTest: {
        startingTime: {type:String},
        testTaken: {type:Boolean},
        score: {type:String},
        ongoingAnswers: {type:Array},
        year: {type:String},
        questions: {type:Array},
    },
    currentSchoolFee: {
        partPayment: {
            amount: {type:String},
            ref: {type: String}
        },
        fullPayment: {
            amount: {type:String},
            ref: {type: String}
        }
    },
    password: {required: true, type:String},
    address: {required: true, type:String},
    class: {required: true, type:String},
    schoolTest: {
        remaingTime: {type:String},
        testTaken: {type:Boolean},
        ongoingAnswers: {type:Array}
    },
    phoneNumber: {type:String},
    pictureUrl: {type:String},
    links : {
        twitter: {type:String},
        facebook: {type:String},
        whatsapp: {type:String},
        other: {type:String}
    },
    matricNumber: {required: true, type:String},
    localGovernment: {type:String},
    state: {type:String},
    country: {type:String},
    subjects: {required: true, type:Array},
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    },
    academicResult: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicResult'
    },
    tasks: {type:Array}
})

const studentAcademicResultSchema = new mongoose.Schema({
    results: {type: Array}
})

const notificationSchema = new mongoose.Schema({
    _id: {type: String},
    unread: {type: Number},
    notifications: {type: Array}
})

const jssonestudent = mongoose.model(`jssonestudents`, studentSchema)
const jsstwostudent = mongoose.model(`jsstwostudents`, studentSchema)
const jssthreestudent = mongoose.model(`jssthreestudents`, studentSchema)
const sssonestudent = mongoose.model(`sssonestudents`, studentSchema)
const ssstwostudent = mongoose.model(`ssstwostudents`, studentSchema)
const sssthreestudent = mongoose.model(`sssthreestudents`, studentSchema)

const notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
const studentAcademicResult = mongoose.model('academicresults', studentAcademicResultSchema)

module.exports = {jssonestudent, jsstwostudent, jssthreestudent, sssonestudent, ssstwostudent, sssthreestudent, studentSchema, notification, studentAcademicResult}
