const express = require('express');
const Question = require('../models/question');

module.exports = {
  getQuestions: (req,res) => {
    Question.find() // .sort('date')
    .then(function(data) {
      res.json(data)
    })
  },
  getQuestion: (req,res) => {
    Question.findOne({_id: req.params._id})
    .then((data) => {
      res.json(data)
    })
  },
  createQuestion: (req,res) => {
    let newQuestion = new Question({
      title: req.body.title,
      question: req.body.question,
      category: req.body.category,
      postedBy: req.body.postedBy,
      upvote: [],
      downvote: [],
      answers: []
    })
    newQuestion.save()
    .then((data) => {
      res.json(data)
    })
  },
  editQuestion: (req,res) => {
    Question.findOneAndUpdate({_id: req.params._id},{
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    },{new: true})
    .then((data) => {
      res.json(data)
    })
  },
  answerQuestion: (req,res) => {
    Question.findOne({_id: req.params._id})
    .then((data) => {
      data.answers.push({
        _id: mongoose.Types.ObjectId(),
        content: req.body.content,
        upvote: [],
        downvote: [],
        postedBy: req.body.postedBy
      })
      data.markModified('answers')
      data.save(() => {
        res.json(data)
      })
    })
  },
  upvoteQuestion: function(req,res){
    voteQuestion("upvote", req.params.id, req.body.username,function(v){
      res.json(v)
    })
  },
  downvoteQuestion: function(req,res){
    voteQuestion("downvote", req.params.id, req.body.username,function(v){
      res.json(v)
    })
  },
  upvoteAnswer: function(req,res){
    voteAnswer("upvote", req.params.id, req.params.ansid, req.body.username,function(v){
      res.json(v)
    })
  },
  downvoteAnswer: function(req,res){
    voteAnswer("downvote", req.params.id, req.params.ansid, req.body.username,function(v){
      res.json(v)
    })
  },
  deleteQuestion: (req,res) => {
    Question.findOneAndRemove({_id: req.params._id})
    .then((data) => {
      res.send(`${req.params._id} has been successfully removed`)
    })
  }
}

function voteQuestion(upordown, id, username, cb) {
  let cek = false
  Question.findOne({_id:id}, (err, data) => {
    if (err) return error
    else{
      data[upordown].forEach( (voting) => {
        if(voting.username === username) cek = true
      })

      if(cek == false){
        data[upordown].push({username: username})
        data.markModified(upordown)
        data.save( (err) => {
          if (err) return cb(err)
          else     return cb(data)
        })
      }
      else return cb({err :'already vote!'})
    }
  })
}

function voteAnswer(upordown, id, ansId, username, cb) {
  var arr
  var cek = false
  Question.findOne({_id:id}, (err, data) => {
    data.answers.forEach( (x) =>{
      if(x._id == ansId) arr = x
    })
    arr[upordown].forEach( (voting) => {
      if(voting.username == username){
        cek = true
      };
    })

    if(cek == false){
      arr[upordown].push({username: username})
      data.markModified('answers')
      data.save( (err) => {
        if (err) return cb(err)
        else     return cb(data)
      })
    }
    else return cb({err :'already vote!'})
  })
}
