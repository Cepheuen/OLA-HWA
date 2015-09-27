var mongoose = require('mongoose')
var musicSchema = mongoose.Schema({
  musicId: Number,
  songName: String,
  albumName: String,
  url: String
})
var playlistSchema = mongoose.Schema({
  crn: Number,
  songs: [musicSchema]
})
module.exports = mongoose.model('playlist_collections',playlistSchema)
