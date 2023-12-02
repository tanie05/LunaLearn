const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({

userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
},
  todo: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    
  },
  subject: {
    type: String,
    
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
