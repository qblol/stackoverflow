const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {type:String,required:true},
  content: String,
  category: String,
  postedBy: Schema.Types.Mixed,
  upvote: Schema.Types.Mixed,
  downvote: Schema.Types.Mixed,
  answers: Schema.Types.Mixed
},{
  timestamps: true
});

const Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
