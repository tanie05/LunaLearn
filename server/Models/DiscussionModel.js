const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class', 
        required: true
    },
    messages: [{
        userName: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }]
})

const Discussions = mongoose.model("Discussions", DiscussionSchema)

module.exports = Discussions