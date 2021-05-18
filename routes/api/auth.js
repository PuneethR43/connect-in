const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('config')
const authenticateUser = require('../../app/middleware/authentication')
const User = require('../../app/models/User')

// @GET user
router.get('/', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.error('from auth route',error.message)
        res.status(500).send('Server Error')
    }
})

// @POST user to login
router.post('/',   [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password cannot be less than 5 characters!').isLength({ min: 5 })
],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
    const {email, password} = req.body

    try {
        const existingUser = await User.findOne({email})  
        if(!existingUser){
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }] })
        } else if(existingUser){
            const matchPassword = await bcrypt.compare(password, existingUser.password)
            if(!matchPassword){
                return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }] })
            }
            const payload = {
                user: {
                    id: existingUser.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'), 
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err
                    res.json({ token })
                }
            )
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
    }
}
})

module.exports = router