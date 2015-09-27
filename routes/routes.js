var express = require('express')
var mongoose = require('mongoose')
var router = express.Router();
var Music = require('../models/music.js')
var Playlist = require('../models/playlist.js')
var Game = require('../models/gamify.js')
var User = require('../models/user.js')

router.get('/storeRide',function(req,res){
  var client_id = req.query.client_id
  var kms = parseInt(req.query.kms)
  var cost = parseInt(req.query.cost)
  Game.findOne({'client_id':client_id},function(err,data){
    if(data!=null){
      data.kms = data.kms + kms
      data.totalCost = data.totalCost + cost
      data.monthlyCost = data.monthlyCost + cost
      data.points = data.kms / 5
      Game.update({'client_id':client_id},data,function(err){
        if(err)
          res.json({status:"failure"})
        else
          res.json({status:"success"})
      })
    }
    else{
      var data = {client_id:"",kms:0,totalCost:0,monthlyCost:0,points:0}
      data.client_id = parseInt(client_id)
      data.kms = parseInt(kms)
      data.totalCost = parseInt(cost)
      data.monthlyCost = parseInt(cost)
      data.points = parseInt(kms/5)
      var game = new Game(data)
      game.save(function(err){
        if(err)
          res.json({status: "failure",error:err})
        else
          res.json({status: "success"})
      })
    }
  })
})
router.get('/leadership',function(req,res){
  var user = req.query.userid
  Game.find({}).sort({points: 'descending'}).exec(function(err,data){
    if(!err)
    {
      res.json(data)
    }
    else{
      var data = {status: "failure"}
      res.json(data)
    }
  })
})
router.get('/fetchMusic', function (req, res) {
  Music.find({},function(err,data){
    res.json(data)
  })
});
router.get('/getUserDetails',function(req,res){
  var client_id = req.query.client_id
  User.find({client_id: client_id},function(err,data){
    console.log(data)
  })
})
router.get('/fetchPlaylist',function(req,res){
  var crn = req.query.crn
  Playlist.find({'crn':crn},function(err,data){
    res.json(data)
  })
})
router.post('/createPlaylist',function(req,res){
  var data = req.body
  var mPlaylist = new Playlist(data)
  console.log(data)
  mPlaylist.save(function(err){
    if(err)
      res.json({status:'failure',error:err})
    else {
      res.json({status:'success',data:data})
    }
  })

})
module.exports = router;
