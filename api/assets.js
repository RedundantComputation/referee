const mongoose = require('mongoose')

const tennisMatchSchema = new mongoose.Schema({
    p1Score: Number,
    p2Score: Number,
    p1Name: String,
    p2Name: String
})

const MatchInfo = mongoose.model('MatchInfo', tennisMatchSchema)

module.exports = MatchInfo;