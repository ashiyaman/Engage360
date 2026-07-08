const express = require('express')
const commentRouter = express.Router()

const Comment = require('../models/Comments')

commentRouter.get('/comments/:leadId', async(req, res) => {
    try{
        const comments = await Comment.find({lead: req.params.leadId}).populate("salesAgent", "name")

        if(!comments){
            res.status(200).json({message: "No Comments found yet!!"})
        }
        res.status(200).json({message: "Fetched comments successfully", data: comments})
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

commentRouter.post('/comment', async(req, res) => {
    try{
        const {description, lead, salesAgent} = req.body
        const comment = new Comment({description, lead, salesAgent})
        const savedComment = await comment.save()
    
        if(!savedComment){
            res.status(404).json({message: 'Unable to save comment'})
        }
        res.status(200).json({message: 'Comment saved successfully.', data: savedComment})
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
}) 

commentRouter.delete("/comment/:commentId", async(req, res) => {
     try{
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId)
        if(!deletedComment){
            res.status(400).send('ERROR: ', err.message)
        }
        res.status(200).json(deletedComment)
    }
    catch(err){
        res.status(400).send('ERROR: ', err.message)
    }
})

module.exports = {commentRouter}