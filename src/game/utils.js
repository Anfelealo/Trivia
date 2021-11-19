const Question = require("../models/question")
const Player = require("../models/players")

function getSingleTriviaQuestions(){
    const triviaQuestion = {
        question: "How old are you?2",
        answers: [
            "20", 
            "30", 
            "40", 
            "50"
        ],
        correctAns: "30"
    }
    insertQuestionIntoDB(triviaQuestion)

    return triviaQuestion
}

function insertQuestionIntoDB(question){
    Question.create({
        question: question.question,
        answer: question.correctAns
    }).catch(error => {
        console.log(error)
    })
}

async function verifyAnswer(question, answer){
    const trivia = await Question.findOne({question})
    if(trivia != null && trivia.answer == answer){
        return true
    }
    return false
}

async function updateScore(userName, winner){
    const player = await Player.findOne({name: userName})
    if(player == null){
        throw new Error("User does not exist")
    }
    if(winner == true){
        player.score++
        console.log(player.score)
        player.save()
    }
    return player.score
}

module.exports = {getSingleTriviaQuestions, verifyAnswer, updateScore}


