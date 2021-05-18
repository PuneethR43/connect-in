const jwt = require('jsonwebtoken')
const config = require('config')

const authenticateUser = (req, res, next) => {
    // Get Token
    const token = req.header('x-auth')
    // No Token found
    if(!token){
        return res.status(401).json({ msg: 'No Token, Access denied' })
    }else{
        // Verify token
        let tokenData
        let secret = config.get('jwtSecret')
        try {
            tokenData = jwt.verify(token, secret)
            req.user = tokenData.user
            next()
        } catch (error) {
            res.status(401).json({ msg: 'Token is not valid' })
        }
    }
}

module.exports = authenticateUser