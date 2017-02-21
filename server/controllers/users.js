const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

module.exports = {
  getUsers: (req,res) => {
    User.find() // .sort('date')
    .then((data) => {
      res.json(data)
    })
  },
  getUser: (req,res) => {
    User.findOne({username: req.params.username})
    .then((data) => {
      res.json(data)
    })
  },
  createUser: (req,res) => {
    User.findOne({username: req.body.username})
    .then((data) => {
      if(data != null) res.send('Username is already taken')
      else{
        let newUser = new User({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, saltRounds)
        })
        newUser.save()
        .then((data) => {
          res.json(data)
        })
      }
    })
  },
  editUser: (req,res) => {
    User.findOneAndUpdate({username: req.params.username},{
      password: bcrypt.hashSync(req.body.password, saltRounds)
    },{new: true})
    .then((data) => {
      res.json(data)
    })
  },
  deleteUser: (req,res) => {
    User.findOneAndRemove({username: req.params.username})
    .then((data) => {
      res.send(`${req.params.username} has been successfully removed`)
    })
  },
  login: (req,res) => {
    User.findOne({username: req.body.username})
    .then((data) => {
      if(data != null) {
        let verification = bcrypt.compareSync(req.body.password, data.password)
        if(bcrypt.compareSync(req.body.password, data.password)) {
          let token = jwt.sign( {username: data.username}, config.secret, {expiresIn : 600*600});
          res.send(token)
        }else{
          res.send('Wrong password')
        }
      } else {
        res.send('Wrong username')
      }
    })
  }
}
