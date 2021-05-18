const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    }, 
    location: {
        type: String
    }, 
    bio: {
        type: String
    }, 
    status: {
        type: String,
        required: true
    }, 
    skills: {
        type: [String],
        required: true
    }, 
    gitUserName: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            specialization: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
})

const profile = mongoose.model('profile', profileSchema)

module.exports = profile