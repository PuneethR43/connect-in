const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')

const authenticateUser = require('../../app/middleware/authentication')
const Post = require('../../app/models/Posts')
const User = require('../../app/models/User')
const Profile = require('../../app/models/Profile')
const posts = require('../../app/models/Posts')

// @Post posts
router.post('/', [ authenticateUser, 
    [
        check('text', 'Text is required!').not().isEmpty()
    ] 
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const newPost = new Post ({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.error('From Post Posts:-', error.message)
        res.status(500).json(error.message)
    }
})

// @GET all posts
router.get('/',  authenticateUser, async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error('From GET posts:-',error.message)
        res.status(500).json(error.message)
    }
})

// @GET post by ID
router.get('/:post_id', authenticateUser, async(req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
        if(!post){
            return res.status(404).json({ msg: 'Post not found!' })
        }
        res.json(post)
    } catch (error) {
        console.error('From GET post by ID;-',error.message)
        if(error.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found!' })
        }
        res.status(500).json(error.message)
    }
})

// @DELETE post
router.delete('/:post_id', authenticateUser, async(req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
        // Check if the post belongs to the user removing it
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'Not Authorized' })
        }
        if(!post){
            return res.status(404).json({ msg: 'Post not found!' })
        }
        await post.remove()
        res.json({msg: 'Post Deleted'})
    } catch (error) {
        console.error('From Delete Post',error.message)
        if(error.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found!' })
        }
        res.status(500).json(error.message)
    }
})

// @PUT like for a post
router.put('/like/:post_id', authenticateUser, async(req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)

        let oldLike = post.likes.filter((like) => {
            return like.user.toString() === req.user.id
        })
        if(oldLike.length > 0){
            return res.status(400).json({ msg: 'Post already liked!' })
        }
        post.likes.unshift({user: req.user.id})
        await post.save()
        res.json(post.likes)
    } catch (error) {
        console.error('From post likes', error.message)
        res.status(400).json(error.message)
    }
})

// @PUT unlike a post
router.put('/unlike/:post_id', authenticateUser, async(req,res) => {
    try{
        const post = await Post.findById(req.params.post_id)
        // If post has already been liked
        if(post.likes.filter((like) => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post has not yet been liked' })
        }
        // take remove index
        const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)
        await post.save()
        res.json(post.likes)
    }catch(error){
        console.error('From unlike;-',error.message)
        res.status(400).json(error.message)
    }
})

// @POST comment
router.post('/comment/:id', [ authenticateUser, 
    [
        check('text', 'comment cannot be empty!').not().isEmpty()
    ]
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
        const newComment = {
            user: req.user.id,
            name: user.name,
            text: req.body.text,
            avatar: user.avatar
        }
        post.comments.unshift(newComment)
        await post.save()
        res.json(post)
    } catch (error) {
        console.error('From POST comments;-', error.message)
        res.status(500).json(error.message)
    }
})

// @DELETE comment
router.delete('/comment/:post_id/:comment_id', authenticateUser, async(req, res) => {
    try{
        const post = await Post.findById(req.params.post_id)
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id)

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User Not Authorized!' })
        }
        const removeIndex = post.comments.map((comment) => comment.user.toString()).indexOf(req.user.id)
        
        post.comments.splice(removeIndex, 1)
        
        await post.save()

        res.json(post.comments)
    }catch(error){
        console.error('From DELETE comment:-',error.message)
        res.status(500).json(error.message)
    }    
})
// @GET comments
router.get('/comments/:post_id', authenticateUser, async(req, res) => {
    try {
        const post = await Post.findById(req.params.post_id)
        if(!post){
            return res.status(404).json({ msg: 'Post not found!' })
        }
        res.json(post.comments)
    } catch (error) {
        console.error('From GET post by ID;-',error.message)
        if(error.kind === 'ObjectId'){
            return res.status(404).json({ msg: 'Post not found!' })
        }
        res.status(500).json(error.message)
    }
})

module.exports = router