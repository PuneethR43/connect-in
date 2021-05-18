const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('../../app/models/User')
const config = require('config')

/* USER ROUTES */
// @GET user
router.get('/', (req, res) => res.send('user route'))

// @POST user
router.post('/', [
    check('name', 'Name cannot be Empty!').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password cannot be less than 5 characters').isLength({ min: 5 })
],
async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }else{
    const {name, email, password} = req.body

    try {
        const existingUser = await User.findOne({email})  
        if(existingUser){
            return res.status(400).json({errors: [{ msg: 'Account/E-mail already exists' }] })
        } else {
            // initialize avatar and then use it inside new User
            const avatar = gravatar.url(email, {
                s: 200, // size
                d: 'mm' // default image
            })
            // Or write Gravatar code directly here
            user = new User({
                name,
                email,
                password,
                avatar
                // avatar: gravatar.url(email, {
                //     s: 200, // size
                //     d: 'mm' // default image
                // })
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            const payload = {
                user: {
                    id: user.id
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
    }
}
})

module.exports = router