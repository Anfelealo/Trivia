const express = require("express")
const router = new express.Router()
const { getSingleTriviaQuestions, verifyAnswer, updateScore } = require("./utils")
const verifyToken = require("../middleware/auth")


router.get("/questions/single", verifyToken, (req, res) => {
    
    try {
        const question = getSingleTriviaQuestions()
        res.status(200).send(
            {
                data: { question },
                status: true,
                message: "User verified - question showed"
            })
    }
    catch(error){
        console.log(error)
        res.status(500).send(
            {
                data: {},
                status: false,
                message: "Invalid register"
            })
        
    }
})

router.post("/questions/response", verifyToken, async(req, res) => {
    try {
        const request = req.body
        const winner = await verifyAnswer(request.question, request.answer)
        console.log(winner, request.question, request.answer)
        const score = updateScore(req.headers["user"], winner)
        res.status(200).send(
            {
                data: { score },
                status: true,
                message: "Score updated"
            })
    }
    catch(error){
        console.log(error)
        res.status(500).send(
            {
                data: { error: error.toString() },
                status: false,
                message: "Error on response"
            })
    }
    
})

module.exports = router