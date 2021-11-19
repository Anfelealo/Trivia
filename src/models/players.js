const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const playerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(){
            if(this.password == "12345678"){
                throw(new Error("The password can't be 12345678"))
            }
        }
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }

        }
    ],
    score:{
            type: Number,
            default: 0
    }
})

playerSchema.methods.hashPassword = async function(password) {
    this.password = await bcrypt.hash(password, 5)
}

playerSchema.methods.verifyPassword = async function(password) {
    const isEqual = await bcrypt.compare(password, this.password)
    return isEqual
} 

playerSchema.methods.generateToken = function(name) {
    const token = jwt.sign({_id: name.toString()}, process.env.AUTH_PASSWORD)
    this.tokens = this.tokens.concat({token}) // also = [...this.tokens,{token}]
    this.save() 
    return token
}

const Player = mongoose.model("Player", playerSchema)
module.exports = Player