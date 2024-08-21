const JWT_SECRET = require("..");
const jwt = require('jsonwebtoken')


const isAuthenticated = (req,res,next) => {
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split(' ')[1]

    if(!token) {
        return res.status(401).json({message:"user is not authenticated"})
    }
    try {
            const decoded = jwt.verify(token,JWT_SECRET )
            req.user = decoded
            next()
    } catch (err) {
    return res.status(401).json({
        message:"Authenctication error and invalid token"
    })
    }

}

module.exports = isAuthenticated