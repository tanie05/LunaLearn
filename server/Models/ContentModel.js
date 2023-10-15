const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class', 
        required: true
    },
    contentType: {
        type: String,
        enum: ['Notes', 'Announcements', 'Assignments'],
        required: true,
    },
    description: {
        type: String
    },
    media: {
        type: [String]
    }

}, {timestamps: true})

const Content = mongoose.model("Content", ContentSchema)

module.exports = Content