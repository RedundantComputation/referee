var express = require('express');
var router = express.Router();
var MatchInfo = require('../assets')

router.post('/', (req, res) => {
    console.log("Saving match info", req.body)

    let { playerOneName, playerTwoName, playerOneScore, playerTwoScore } = req.body

    let newMatch = new MatchInfo({
        playerOneName,
        playerTwoScore,
        playerOneScore,
        playerTwoScore
    })

    // All fields are filled, else 400 (bad request)
    if (!playerOneName || !playerTwoScore || !playerOneScore || !playerTwoScore) {
        return res.status(400).send({
            success: false,
            message: "Invalid request - Missing fields"
        })
    }

    newMatch.save((err, game) => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: "Failed to save match information"
            })
        }

        return res.status(201).send({
            sucess: true,
            message: "Match info saved successfully"
        })
    })
});

router.get('/', (req, res) => {
    MatchInfo.find({}, (err, games) => {
        if (err) {
            return res.status(404).send({
                success: false,
                message: "Failed to retrieve match information"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Successfully retrieved match information",
            data: {
                games
            }
        })
    })
})

module.exports = router;
