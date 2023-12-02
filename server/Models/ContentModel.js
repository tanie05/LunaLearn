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
        enum: ['Notes', 'Announcement'],
        required: true,
    },
    description: {
        type: String
    },
    media: [{
        type: {
          type: String,
          required: true
        },
        data: {
          type: mongoose.Schema.Types.ObjectId, // Reference to the GridFS file object ID
          required: true
        }
      }]

}, {timestamps: true})

const Content = mongoose.model("Content", ContentSchema)

module.exports = Content