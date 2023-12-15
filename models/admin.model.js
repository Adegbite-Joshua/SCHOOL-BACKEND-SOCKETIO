const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokenUsedInSignUp: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    localGovernment: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    },
    token: {
        type: String,
        required: true
    },
    pictureUrl: {
        type: String,
    },
})

adminSchema.pre('validate', function (next){
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

adminSchema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (error, same)=>{
        if (!error) {
            callback(error, same)
            console.log(same)
        } else{
            next()
        }
    })
    
}

const entranceQuestionsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    questions: [
        {
            question: {type: String},
            options: {type: Array},
            correctAnswer: {type: Number},
            selectedAnswer: {type: String, allowNull: true},
            index: {type: Number, index: true}
        }
    ]
})

const notificationSchema = new mongoose.Schema({
    _id: {type: String},
    unread: {type: Number},
    notifications: {type: Array}
})

const courseSchema = new mongoose.Schema({
    class: {type: String},
    courses: [
                {
                    courseName: {
                        type: String,
                        required: true,
                        unique: true
                    },
                    courseDescription: {
                        type: String,
                        required: true,
                    },
                    image: {
                        type: String,
                        required: true,
                    },
                    class: {
                        type: Number,
                        required: true,
                    },
                    staffId: {
                        type: String,
                        required: true,
                        unique: true
                    },
                }
            ]
})

const currentTermDetailsSchema = new mongoose.Schema({
    name: {type: String},
    staffSalary: {type: Number},
    schoolFees: {type: Number},
    term: {type: Number},
    year: {type: Number}
})

const noticesAndNewsSchema = new mongoose.Schema({
    name: {type: String},
    noticesAndNews: [
        {
            type: {type: String},
            head: {type: String},
            body: {type: String},
        }
    ]
})

const adminModel = mongoose.model('admin', adminSchema);
const notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)
const entranceQuestions = mongoose.model('entranceQuestions', entranceQuestionsSchema);
const courseModel = mongoose.model('courses', courseSchema);
const currentTermDetails = mongoose.model('currentTermDetails', currentTermDetailsSchema)
const noticesAndNews = mongoose.model('noticesAndNews', noticesAndNewsSchema)

module.exports = {adminModel, entranceQuestions, notification, courseModel, currentTermDetails, noticesAndNews}