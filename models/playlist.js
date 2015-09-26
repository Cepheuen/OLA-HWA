var mongoose = require('mongoose')
var playlistSchema = mongoose.Schema({
  crn: Number,
  songs: [{
    musicId: Number,
    songName: String,
    albumName: String,
    link: String
  }]
})
module.exports = mongoose.model('playlist_collections',playlistSchema)
