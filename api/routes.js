const express = require('express');
const router = express.Router();
const MatchInfo = require('./assets')

router.post('/', (req, res) => {
    console.log("Saving match info", req.body)

    let { p1Name, p2Name, p1Score, p2Score } = req.body

    let newMatch = new MatchInfo({
        p1Name,
        p2Name,
        p1Score,
        p2Score
    })

    // All fields are filled, else 400 (bad request)
    if (!p1Name || !p2Name || !p1Score || !p2Score) {
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