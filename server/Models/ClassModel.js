const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ClassSchema = new Schema({

    title : {
        type: String, 
        required : true,
    },
    description : {
        type: String, 
    },
    coverImage : {
        type: String,
        default: "",
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    code: {
        type: String, 
        unique: true, 
        required: true
    },


}, {timestamps: true})

const Class = mongoose.model("Class", ClassSchema)

module.exports = Class