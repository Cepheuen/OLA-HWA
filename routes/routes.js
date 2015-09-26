var express = require('express')
var mongoose = require('mongoose')
var router = express.Router();
var Music = require('../models/music.js')
var Playlist = require('../models/playlist.js')
var Game = require('../models/gamify.js')

router.get('/storeRide',function(req,res){
  var client_id = req.client_id
  var kms = req.kms
  var cost = req.cost
  Game.find({'client_id':client_id},function(err,data){
    data.kms = data.kms + kms
    data.totalCost = data.totalCost + cost
    data.monthlyCost = data.monthlyCost + cost
    data.points = data.kms / 5
    Game.update({'client_id':client_id})
  })
})
router.get('/fetchMusic', function (req, res) {
  Music.find({},function(err,data){
    res.json(data)
  })
});
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
