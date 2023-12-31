const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = new mongoose.Schema(
  {
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
  media: {
    type: String
  }
  }
);
const Content = mongoose.model("Content", ContentSchema)

module.exports = Content