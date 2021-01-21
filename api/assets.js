const mongoose = require('mongoose')

const tennisMatchSchema = new mongoose.Schema({
    playerOneScore: Number,
    playerTwoScore: Number,
    playerOneName: String,
    playerTwoName: String
})

const MatchInfo = mongoose.model('MatchInfo', tennisMatchSchema)

module.exports = MatchInfo;