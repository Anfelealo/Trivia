const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    try {
        const user = req.headers["user"]
        const token = req.headers["access-token"]
        //console.log(user, token)
        if (user == null) {
            throw new Error("Invalid user name")
        }
        if (token == null) {
            throw new Error("There is no token")
        }
        const userName = jwt.verify(token, process.env.AUTH_PASSWORD)
        if (userName._id != user) {
            throw new Error("The token does not match")
        }
        return next()
    }
    catch(error){
        res.status(401).send(
            {data:{error: error.toString()}, 
            status: false, 
            message: "Authentication error"})
    }
}

module.exports = verifyToken