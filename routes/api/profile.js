const express = require('express')
const router = express.Router()
const { check, validationResult, body } = require('express-validator')
const { set } = require('mongoose')
const request = require('request')
const config = require('config')

const authenticateUser = require('../../app/middleware/authentication')
const Profile = require('../../app/models/Profile')
const user = require('../../app/models/User')
const User = require('../../app/models/User')
const Posts = require('../../app/models/Posts')

// @GET logged in user profile
router.get('/me', authenticateUser, async(req, res) => {
    const userID = req.user.id
    try {
        const profile = await Profile.findOne({user: userID}).populate('user',['name', 'avatar'])

        if(!profile){
            return res.status(400).json({ msg: 'Profile Not Found!' })
        } else {
            res.json(profile)
        }
    } catch (error) {
        console.log('From profile/me',error.message)
        res.status(500).json(error.message)
    }

})

// @CREATE or UPDATE user profile
router.post('/', [ authenticateUser,
    [
        check('status', 'status required').not().isEmpty(),
        check('skills', 'skills required').not().isEmpty()
    ] 
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    } else {
        const {
            company,
            location,
            bio,
            status,
            skills,
            gitUserName
        } = req.body

        // Create Profile Object
        const profileFields = {}

        // Values for Profile
        profileFields.user = req.user.id
        if(company) profileFields.company = company
        if(location) profileFields.location = location
        if(bio) profileFields.bio = bio
        if(status) profileFields.status = status
        if(skills){
            profileFields.skills = skills.split(',').map((skill) => skill.trim())
        }
        if(gitUserName) profileFields.gitUserName = gitUserName
        // if(socialLinks){
        //     profileFields.socialLinks = socialLinks
        // }

        try {
            let profile = await Profile.findOne({ user: req.user.id })
            if(profile){
                // Update data if profile found
                let profile = await Profile.findOneAndUpdate(
                    { user: req.user.id }, 
                    {$set: profileFields}, 
                    {new: true}
                )
                // console.log(profile)
                return res.json(profile)
            } else {
                // Create profile if profile not found
                profile = new Profile(profileFields)
                await profile.save()
                // console.log(profile)
                return res.json(profile)
            }
        } catch (error) {
            console.log('From profile update',error.message)
            res.status(500).json(error.message)
        }
    }
})

// @GET all profiles
router.get('/profiles', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.log('From all profiles',error.message)
        res.status(400).json(error.message)
    }
})

// @GET profile based on ID
router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name','avatar'])
        if(!profile){
            return res.status(400).json({msg:'Profile not Found!'})
        }
        res.json(profile)
    } catch (error) {
        console.error('From profile on ID',error.message)
        if(error.kind == 'ObjectId'){
            return res.status(500).json({ msg: 'Server Error' })
        }
    }
})

// @DELETE profile & user and his posts
router.delete('/', authenticateUser,async(req, res) => {
    console.log('From Delete profile & user:-',req.user)
    try {
        // DELETE posts
        await Posts.deleteMany({ user: req.user.id })
        // DELETE profile
        await Profile.findOneAndDelete({ user: req.user.id })

        // DELETE user
        await User.findOneAndDelete({ _id: req.user.id })
        res.json({ msg: 'User Deleted!' })
    } catch (error) {
        console.error('From & user delete:-',error.message)
        if(error.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Profile not Found!' })
        }       
    }
})

// @PUT profile experience => Date format = yyyy-mm-dd(ex: 2010-01-01)
router.put('/experience', [ authenticateUser, 
    [
        check('title', 'Title cannot be empty').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'from is required').not().isEmpty()
    ]

], 
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        // const { title,company,location,from,to,current } = req.body 
        // const newExperience = { title,company,location,from,to,current }

        try {
            let profile = await Profile.findOne({ user: req.user.id })
            profile.experience.unshift(req.body)
            // profile.experience.unshift(newExperience)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error('From experience;-',error.message)
            res.status(500).json({error: error.message})
        }
    }
)

// @DELETE any experience from profile
router.delete('/experience/:exp_id', authenticateUser, async(req, res) => {
    try{
    const profile = await Profile.findOne({ user: req.user.id })
    const experience = profile.experience
    const remove = experience.map((exp) => exp.id).indexOf(req.params.exp_id)

    profile.experience.splice(remove, 1)

    await profile.save()
    res.json(profile)
    }catch(error){
        console.error('From experience delete',error.message)
        res.status(500).res.json(error.message)
    }
})

// @PUT education => Date format = yyyy-mm-dd(ex: 2010-01-01)
router.put('/education', [ authenticateUser, 
    [
        check('school', 'school is required').not().isEmpty(),
        check('degree', 'degree is required').not().isEmpty(),
        check('specialization', 'specialization is required').not().isEmpty(),
        check('from', 'from is required').not().isEmpty()
    ]
], 
    async(req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        // const { school,degree,specialization,from,to,current } = req.body 
        // const newExperience = { school,degree,specialization,from,to,current }

        try {
            let profile = await Profile.findOne({ user: req.user.id })
            profile.education.unshift(req.body)
            // profile.experience.unshift(newExperience)
            await profile.save()
            res.json(profile)
        } catch (error) {
            console.error('From education;-',error.message)
            res.status(500).json({error: error.message})
        }
    }
)

// @DELETE any education from profile
router.delete('/education/:edu_id', authenticateUser, async(req, res) => {
    try{
    const profile = await Profile.findOne({ user: req.user.id })
    const education = profile.education
    const remove = education.map((edu) => edu.id).indexOf(req.params.edu_id)

    profile.education.splice(remove, 1)

    await profile.save()
    res.json(profile)
    }catch(error){
        console.error('From education delete',error.message)
        res.status(500).res.json(error.message)
    }
})

module.exports = router