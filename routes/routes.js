var express = require('express')
var mongoose = require('mongoose')
var router = express.Router();
var Music = require('../models/music.js')
var Playlist = require('../models/playlist.js')

router.get('/fetchMusic', function (req, res) {
  Music.find({},function(err,data){
    res.json(data)
  })
});
router.get('/fetchPlaylist',function(req,res){
  var crn = req.crn
  Playlist.find({'crn':crn},function(err,data){
    res.json(data)
  })
})
router.post('/createPlaylist',function(req,res){
  var data = req.body
  var mPlaylist = new Playlist(data)
  mPlaylist.save(function(err){
    if(err)
      res.json({status:'failure',error:err})
    else {
      res.json({status:'success',data:data})
    }
  })

})
module.exports = router;
