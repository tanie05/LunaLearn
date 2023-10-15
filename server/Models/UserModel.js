const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["Teacher", "Student"],
        default: "Student"
    },
    classList: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)

module.exports = User